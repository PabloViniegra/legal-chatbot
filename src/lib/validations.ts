import { z } from "zod";

export const createConversationSchema = z.object({
  title: z.string().min(1).max(100),
  category: z.enum(["civil", "penal", "laboral", "mercantil"]).optional(),
});

export const updateConversationSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  category: z.enum(["civil", "penal", "laboral", "mercantil"]).optional(),
});

export const createMessageSchema = z.object({
  conversationId: z.string().cuid(),
  content: z.string().min(1).max(5000),
  role: z.enum(["user", "assistant", "system"]),
  tokens: z.number().optional(),
  model: z.string().optional(),
});

export const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1),
    })
  ).min(1, "Debe haber al menos un mensaje"),
  conversationId: z.string().cuid().optional(),
});

export type CreateConversationSchema = z.infer<typeof createConversationSchema>;
export type UpdateConversationSchema = z.infer<typeof updateConversationSchema>;
export type CreateMessageSchema = z.infer<typeof createMessageSchema>;
export type ChatRequestSchema = z.infer<typeof chatRequestSchema>;