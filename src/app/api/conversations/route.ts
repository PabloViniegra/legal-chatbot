import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { conversationService } from "@/services/conversation.service";
import { createConversationSchema } from "@/lib/validations";
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from "@/lib/errors";
import { ensureUserExists } from "@/lib/auth-helpers";
import { logger } from "@/lib/logger";

// GET /api/conversations
export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new UnauthorizedError();
    }

    // Asegurar que el usuario existe en la base de datos
    await ensureUserExists(userId);

    const conversations = await conversationService.getUserConversations(userId);

    return NextResponse.json({ data: conversations });
  } catch (error) {
    logger.error("GET /api/conversations error", { error });

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Error al obtener conversaciones" },
      { status: 500 }
    );
  }
}

// POST /api/conversations
export async function POST(request: Request) {
  try {
    logger.debug("POST /api/conversations - Start");

    const { userId } = await auth();
    logger.debug("User ID", { userId });

    if (!userId) {
      logger.warn("No user ID - Unauthorized");
      throw new UnauthorizedError();
    }

    // Asegurar que el usuario existe en la base de datos
    await ensureUserExists(userId);

    const body = await request.json();
    logger.debug("Request body", { body });

    // Validar datos
    const parseResult = createConversationSchema.safeParse(body);
    logger.debug("Validation result", { success: parseResult.success });

    if (!parseResult.success) {
      logger.warn("Validation failed", { error: parseResult.error });
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Datos inválidos" },
        { status: 400 }
      );
    }

    logger.debug("Creating conversation", {
      userId,
      title: parseResult.data.title,
    });

    const conversation = await conversationService.createConversation({
      userId,
      ...parseResult.data,
    });

    logger.debug("Conversation created", { id: conversation.id });

    return NextResponse.json({ data: conversation }, { status: 201 });
  } catch (error) {
    logger.error("POST /api/conversations error", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Error al crear conversación",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}