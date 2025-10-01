import type { User as PrismaUser } from "@/generated/prisma";

export type User = PrismaUser;

export interface CreateUserInput {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}