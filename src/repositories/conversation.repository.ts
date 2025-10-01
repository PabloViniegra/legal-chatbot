import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";
import type {
  Conversation,
  ConversationWithMessages,
  ConversationWithPreview,
  CreateConversationInput,
  UpdateConversationInput,
} from "@/types/conversation.types";

export class ConversationRepository {
  async findById(
    id: string,
    userId: string
  ): Promise<ConversationWithMessages | null> {
    return prisma.conversation.findFirst({
      where: { id, userId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }

  async findByUserId(
    userId: string,
    limit = 20
  ): Promise<ConversationWithPreview[]> {
    const conversations = await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: limit,
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return conversations.map((conv) => ({
      ...conv,
      preview: conv.messages[0]?.content.substring(0, 100) || "",
    }));
  }

  async create(data: CreateConversationInput): Promise<Conversation> {
    logger.debug("Creating conversation", { userId: data.userId, title: data.title });
    try {
      const result = await prisma.conversation.create({
        data,
      });
      logger.debug("Conversation created successfully", { id: result.id });
      return result;
    } catch (error) {
      logger.error("Error creating conversation", { error, data });
      throw error;
    }
  }

  async update(
    id: string,
    userId: string,
    data: UpdateConversationInput
  ): Promise<Conversation> {
    logger.debug("Updating conversation", { id, userId, data });

    try {
      const updated = await prisma.conversation.update({
        where: { id, userId },
        data,
      });

      logger.debug("Conversation updated", { id, title: updated.title });
      return updated;
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        logger.warn("Conversation not found for update", { id, userId });
        throw new Error(`Conversation ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    await prisma.conversation.deleteMany({
      where: { id, userId },
    });
  }

  async updateTimestamp(id: string): Promise<void> {
    logger.debug("Updating timestamp for conversation", { id });

    await prisma.conversation.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    logger.debug("Timestamp updated successfully", { id });
  }
}

export const conversationRepository = new ConversationRepository();