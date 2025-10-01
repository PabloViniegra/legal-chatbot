import { conversationRepository } from "@/repositories/conversation.repository";
import { messageRepository } from "@/repositories/message.repository";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import type {
  ConversationWithMessages,
  ConversationWithPreview,
  CreateConversationInput,
  UpdateConversationInput,
} from "@/types/conversation.types";
import { NotFoundError, ValidationError } from "@/lib/errors";

export class ConversationService {
  async getUserConversations(userId: string): Promise<ConversationWithPreview[]> {
    if (!userId) {
      throw new ValidationError("Usuario requerido");
    }

    return conversationRepository.findByUserId(userId);
  }

  async getConversation(
    id: string,
    userId: string
  ): Promise<ConversationWithMessages> {
    if (!id || !userId) {
      throw new ValidationError("ID de conversación y usuario requeridos");
    }

    const conversation = await conversationRepository.findById(id, userId);

    if (!conversation) {
      throw new NotFoundError("Conversación", id);
    }

    return conversation;
  }

  async createConversation(data: CreateConversationInput) {
    logger.debug("createConversation - Input data", { userId: data.userId, title: data.title });

    if (!data.userId || !data.title) {
      logger.warn("Validation failed - missing userId or title");
      throw new ValidationError("Usuario y título requeridos");
    }

    logger.debug("Creating conversation with transaction");

    // Usar transacción para asegurar atomicidad
    const conversation = await prisma.$transaction(async (tx) => {
      // Crear conversación
      const newConversation = await tx.conversation.create({
        data,
      });

      logger.debug("Conversation created in transaction", { id: newConversation.id });

      // Crear mensaje inicial del sistema
      await tx.message.create({
        data: {
          conversationId: newConversation.id,
          role: "assistant",
          content: "¡Hola! ¿En qué puedo ayudarte con legislación española?",
        },
      });

      logger.debug("Initial message created in transaction");

      return newConversation;
    });

    logger.debug("Transaction completed", { id: conversation.id });

    return conversation;
  }

  async updateConversation(
    id: string,
    userId: string,
    data: UpdateConversationInput
  ) {
    const conversation = await conversationRepository.findById(id, userId);

    if (!conversation) {
      throw new NotFoundError("Conversación", id);
    }

    return conversationRepository.update(id, userId, data);
  }

  async deleteConversation(id: string, userId: string) {
    const conversation = await conversationRepository.findById(id, userId);

    if (!conversation) {
      throw new NotFoundError("Conversación", id);
    }

    await conversationRepository.delete(id, userId);
  }
}

export const conversationService = new ConversationService();