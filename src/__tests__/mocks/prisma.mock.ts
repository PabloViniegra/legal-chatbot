import { vi } from 'vitest';
import type { PrismaClient } from '@/generated/prisma';

/**
 * Mock de Prisma Client para tests
 * Proporciona una implementación completa de los métodos de Prisma
 */
export const createMockPrismaClient = () => {
  const mockPrisma = {
    conversation: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
      count: vi.fn(),
    },
    message: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
      count: vi.fn(),
    },
    user: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
    queryLog: {
      findMany: vi.fn(),
      create: vi.fn(),
      count: vi.fn(),
    },
    $transaction: vi.fn((callback) => {
      if (typeof callback === 'function') {
        return callback(mockPrisma);
      }
      return Promise.resolve([]);
    }),
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  } as unknown as PrismaClient;

  return mockPrisma;
};

// Mock de Prisma para importación por defecto
export const mockPrismaClient = createMockPrismaClient();

// Mock del módulo completo
vi.mock('@/lib/prisma', () => ({
  default: mockPrismaClient,
}));
