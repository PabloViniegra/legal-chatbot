import type { Message as PrismaMessage } from "@/generated/prisma";

export type Message = PrismaMessage;

export type MessageRole = "user" | "assistant" | "system";

export interface CreateMessageInput {
  conversationId: string;
  role: MessageRole;
  content: string;
  tokens?: number | null;
  model?: string | null;
}

export interface ChatMessage {
  role: MessageRole;
  content: string;
}