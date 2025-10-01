import { conversationRepository } from "@/repositories/conversation.repository";
import { messageRepository } from "@/repositories/message.repository";
import { queryLogRepository } from "@/repositories/query-log.repository";
import { logger } from "@/lib/logger";
import type { ChatMessage } from "@/types/message.types";
import { NotFoundError, ValidationError } from "@/lib/errors";
import OpenAI from "openai";
import { systemPrompt } from "@/lib/ai-config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export class ChatService {
  async createOrGetConversation(userId: string, conversationId?: string) {
    if (conversationId) {
      const conversation = await conversationRepository.findById(
        conversationId,
        userId
      );
      if (!conversation) {
        throw new NotFoundError("Conversación", conversationId);
      }
      return conversation;
    }

    // Crear nueva conversación
    return conversationRepository.create({
      userId,
      title: "Nueva consulta",
    });
  }

  async saveUserMessage(
    conversationId: string,
    userId: string,
    content: string,
    isFirstMessage?: boolean
  ) {
    logger.debug("Saving user message", { conversationId, isFirstMessage });

    // Guardar mensaje del usuario
    await messageRepository.create({
      conversationId,
      role: "user",
      content,
      model: null,
      tokens: null,
    });

    // Generar título automático si es el primer mensaje
    if (isFirstMessage) {
      logger.debug("First message detected, generating title", { conversationId, userId });

      const conversation = await conversationRepository.findById(
        conversationId,
        userId
      );

      if (conversation) {
        logger.debug("Found conversation, generating title", { currentTitle: conversation.title });
        const generatedTitle = await this.generateTitle(content);

        logger.debug("Updating conversation title", { from: conversation.title, to: generatedTitle });
        const updated = await conversationRepository.update(conversationId, userId, {
          title: generatedTitle,
        });

        logger.debug("Title updated successfully", { newTitle: updated.title });
      } else {
        logger.warn("Conversation not found for title generation", { conversationId, userId });
      }
    }
  }

  async generateTitle(userMessage: string): Promise<string> {
    try {
      logger.debug("Generating title for message", { messagePreview: userMessage.substring(0, 100) });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Genera un título corto y descriptivo (máximo 50 caracteres) para esta consulta legal. Solo responde con el título, sin comillas ni puntos.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.5,
        max_tokens: 50,
      });

      const generatedTitle = response.choices[0]?.message?.content?.trim() || userMessage.substring(0, 50);
      logger.debug("Generated title", { title: generatedTitle });

      return generatedTitle;
    } catch (error) {
      logger.error("Error generating title", { error });
      const fallbackTitle = userMessage.substring(0, 50);
      logger.debug("Using fallback title", { title: fallbackTitle });
      return fallbackTitle;
    }
  }

  async saveAssistantMessage(
    conversationId: string,
    content: string,
    model: string,
    tokens: number | null
  ) {
    logger.debug("Saving assistant message", { conversationId, model, tokens });

    await messageRepository.create({
      conversationId,
      role: "assistant",
      content,
      model,
      tokens,
    });

    await conversationRepository.updateTimestamp(conversationId);
  }

  async logQuery(userId: string, query: string, category?: string) {
    await queryLogRepository.create({
      userId,
      query,
      category,
    });
  }

  async generateResponse(messages: ChatMessage[]) {
    if (!messages || messages.length === 0) {
      throw new ValidationError("Se requieren mensajes para generar respuesta");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 2000,
      stream_options: {
        include_usage: true, // Incluir información de tokens en el stream
      },
    });

    return response;
  }
}

export const chatService = new ChatService();