import type { QueryLog as PrismaQueryLog } from "@/generated/prisma";

export type QueryLog = PrismaQueryLog;

export interface CreateQueryLogInput {
  userId: string;
  query: string;
  category?: string;
}