import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryLogRepository } from '../query-log.repository';
import { mockPrismaClient } from '@/__tests__/mocks/prisma.mock';
import type { QueryLog, CreateQueryLogInput } from '@/types/query-log.types';

describe.skip('QueryLogRepository', () => {
  let repository: QueryLogRepository;

  const mockQueryLog: QueryLog = {
    id: 'ql_123456',
    userId: 'user_123456',
    query: '¿Cuál es el plazo de prescripción?',
    category: 'civil',
    createdAt: new Date('2024-01-01T10:00:00Z'),
  };

  const mockQueryLogs: QueryLog[] = [
    mockQueryLog,
    {
      id: 'ql_234567',
      userId: 'user_123456',
      query: 'Información sobre despido laboral',
      category: 'laboral',
      createdAt: new Date('2024-01-02T10:00:00Z'),
    },
    {
      id: 'ql_345678',
      userId: 'user_123456',
      query: 'Cómo denunciar un robo',
      category: 'penal',
      createdAt: new Date('2024-01-03T10:00:00Z'),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new QueryLogRepository();
  });

  describe('create', () => {
    it('debería crear un nuevo log de consulta', async () => {
      const input: CreateQueryLogInput = {
        userId: 'user_123456',
        query: '¿Cuál es el plazo de prescripción?',
        category: 'civil',
      };

      mockPrismaClient.queryLog.create.mockResolvedValue(mockQueryLog);

      const result = await repository.create(input);

      expect(result).toEqual(mockQueryLog);
      expect(mockPrismaClient.queryLog.create).toHaveBeenCalledWith({
        data: input,
      });
    });

    it('debería crear un log sin categoría', async () => {
      const input: CreateQueryLogInput = {
        userId: 'user_123456',
        query: 'Consulta general',
      };

      const queryLogWithoutCategory = {
        ...mockQueryLog,
        category: null,
      };

      mockPrismaClient.queryLog.create.mockResolvedValue(
        queryLogWithoutCategory
      );

      const result = await repository.create(input);

      expect(result.category).toBeNull();
    });
  });

  describe('findByUserId', () => {
    it('debería encontrar todos los logs de un usuario', async () => {
      mockPrismaClient.queryLog.findMany.mockResolvedValue(mockQueryLogs);

      const result = await repository.findByUserId('user_123456');

      expect(result).toEqual(mockQueryLogs);
      expect(mockPrismaClient.queryLog.findMany).toHaveBeenCalledWith({
        where: { userId: 'user_123456' },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    });

    it('debería limitar el número de resultados', async () => {
      mockPrismaClient.queryLog.findMany.mockResolvedValue([]);

      await repository.findByUserId('user_123456', 10);

      expect(mockPrismaClient.queryLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
        })
      );
    });

    it('debería ordenar por fecha descendente (más recientes primero)', async () => {
      mockPrismaClient.queryLog.findMany.mockResolvedValue(mockQueryLogs);

      await repository.findByUserId('user_123456');

      expect(mockPrismaClient.queryLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'desc' },
        })
      );
    });

    it('debería retornar array vacío si el usuario no tiene logs', async () => {
      mockPrismaClient.queryLog.findMany.mockResolvedValue([]);

      const result = await repository.findByUserId('new_user');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('countByUserId', () => {
    it('debería contar los logs de un usuario', async () => {
      mockPrismaClient.queryLog.count.mockResolvedValue(42);

      const result = await repository.countByUserId('user_123456');

      expect(result).toBe(42);
      expect(mockPrismaClient.queryLog.count).toHaveBeenCalledWith({
        where: { userId: 'user_123456' },
      });
    });

    it('debería retornar 0 si el usuario no tiene logs', async () => {
      mockPrismaClient.queryLog.count.mockResolvedValue(0);

      const result = await repository.countByUserId('new_user');

      expect(result).toBe(0);
    });
  });

  describe('findByCategory', () => {
    it('debería encontrar logs por categoría', async () => {
      const civilLogs = [mockQueryLogs[0]];
      mockPrismaClient.queryLog.findMany.mockResolvedValue(civilLogs);

      const result = await repository.findByCategory('civil');

      expect(result).toEqual(civilLogs);
      expect(mockPrismaClient.queryLog.findMany).toHaveBeenCalledWith({
        where: { category: 'civil' },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    });

    it('debería limitar resultados por categoría', async () => {
      mockPrismaClient.queryLog.findMany.mockResolvedValue([]);

      await repository.findByCategory('laboral', 20);

      expect(mockPrismaClient.queryLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 20,
        })
      );
    });

    it('debería retornar array vacío si no hay logs de esa categoría', async () => {
      mockPrismaClient.queryLog.findMany.mockResolvedValue([]);

      const result = await repository.findByCategory('mercantil');

      expect(result).toEqual([]);
    });
  });
});
