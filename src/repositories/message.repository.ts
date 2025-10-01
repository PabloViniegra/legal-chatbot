import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";
import type { Message, CreateMessageInput } from "@/types/message.types";

export class MessageRepository {
  async findByConversationId(conversationId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
  }

  async create(data: CreateMessageInput): Promise<Message> {
    logger.debug("Creating message", { conversationId: data.conversationId, role: data.role });
    try {
      const result = await prisma.message.create({
        data,
      });
      logger.debug("Message created successfully", { id: result.id });
      return result;
    } catch (error) {
      logger.error("Error creating message", { error, data });
      throw error;
    }
  }

  async deleteByConversationId(conversationId: string): Promise<void> {
    await prisma.message.deleteMany({
      where: { conversationId },
    });
  }

  async countByConversationId(conversationId: string): Promise<number> {
    return prisma.message.count({
      where: { conversationId },
    });
  }
}

export const messageRepository = new MessageRepository();