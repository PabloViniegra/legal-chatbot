import { auth } from "@clerk/nextjs/server";
import { chatService } from "@/services/chat.service";
import { chatRequestSchema } from "@/lib/validations";
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from "@/lib/errors";
import { NextResponse } from "next/server";
import { ensureUserExists } from "@/lib/auth-helpers";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    logger.debug("POST /api/chat - Start");

    const { userId } = await auth();
    logger.debug("User ID", { userId });

    if (!userId) {
      logger.warn("No user ID - Unauthorized");
      throw new UnauthorizedError();
    }

    // Asegurar que el usuario existe en la base de datos
    await ensureUserExists(userId);

    const body = await req.json();
    logger.debug("Request body", { conversationId: body.conversationId, messagesCount: body.messages?.length });

    const { messages, conversationId } = chatRequestSchema.parse(body);
    logger.debug("Parsed data", { conversationId, messagesCount: messages.length });

    // Crear o obtener conversación
    logger.debug("Creating or getting conversation");
    const conversation = await chatService.createOrGetConversation(
      userId,
      conversationId
    );
    logger.debug("Conversation", { id: conversation.id });

    // Guardar mensaje del usuario
    const lastUserMessage = messages[messages.length - 1];
    logger.debug("Saving user message");
    await chatService.saveUserMessage(
      conversation.id,
      userId,
      lastUserMessage.content,
      !conversationId // Es el primer mensaje si no hay conversationId
    );

    // Registrar query para analytics
    logger.debug("Logging query");
    await chatService.logQuery(userId, lastUserMessage.content);

    // Generar respuesta con OpenAI
    logger.debug("Generating AI response");
    const response = await chatService.generateResponse(messages);

    // Crear stream y manejar completion
    let fullResponse = "";
    let usageTokens = 0;
    let modelUsed = "gpt-4o";
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            fullResponse += content;
            controller.enqueue(new TextEncoder().encode(content));

            // Capturar información de uso y modelo
            if (chunk.usage) {
              usageTokens = chunk.usage.total_tokens || 0;
              logger.debug("Captured usage tokens", { tokens: usageTokens });
            }
            if (chunk.model) {
              modelUsed = chunk.model;
              logger.debug("Captured model", { model: modelUsed });
            }
          }

          // Asegurar que tenemos el modelo correcto
          if (!modelUsed || modelUsed === "gpt-4o") {
            modelUsed = "gpt-4o"; // Valor por defecto
          }

          logger.debug("Final values", { model: modelUsed, tokens: usageTokens, responseLength: fullResponse.length });

          // Guardar respuesta del asistente con model y tokens
          await chatService.saveAssistantMessage(
            conversation.id,
            fullResponse,
            modelUsed,
            usageTokens > 0 ? usageTokens : null // Si no hay tokens, enviar null
          );

          controller.close();
        } catch (streamError) {
          logger.error("Stream error", { error: streamError });
          controller.error(streamError);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Conversation-Id": conversation.id,
      },
    });
  } catch (error) {
    logger.error("Chat API Error", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
