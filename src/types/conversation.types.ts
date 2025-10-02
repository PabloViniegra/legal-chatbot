import type { Conversation as PrismaConversation, Message as PrismaMessage } from "@/generated/prisma";

export type Conversation = PrismaConversation;
export type Message = PrismaMessage;

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

export interface ConversationWithPreview extends Conversation {
  messages: Message[];
  preview: string;
}

export interface CreateConversationInput {
  userId: string;
  title: string;
  category: string;
}

export interface UpdateConversationInput {
  title?: string;
  category?: string;
}