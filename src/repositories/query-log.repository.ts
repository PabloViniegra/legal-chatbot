import prisma from "@/lib/prisma";
import type { QueryLog, CreateQueryLogInput } from "@/types/query-log.types";

export class QueryLogRepository {
  async create(data: CreateQueryLogInput): Promise<QueryLog> {
    return prisma.queryLog.create({
      data,
    });
  }

  async findByUserId(userId: string, limit = 50): Promise<QueryLog[]> {
    return prisma.queryLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return prisma.queryLog.count({
      where: { userId },
    });
  }

  async findByCategory(category: string, limit = 50): Promise<QueryLog[]> {
    return prisma.queryLog.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}

export const queryLogRepository = new QueryLogRepository();