import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ConversationRepository } from '../conversation.repository';
import { mockPrismaClient } from '@/__tests__/mocks/prisma.mock';
import {
  mockConversation,
  mockConversationWithMessages,
  mockConversationWithPreview,
  mockCreateConversationInput,
  mockConversations,
} from '@/__tests__/fixtures/conversation.fixtures';

describe.skip('ConversationRepository', () => {
  let repository: ConversationRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new ConversationRepository();
  });

  describe('findById', () => {
    it('debería encontrar una conversación por ID con mensajes', async () => {
      mockPrismaClient.conversation.findFirst.mockResolvedValue(
        mockConversationWithMessages
      );

      const result = await repository.findById('conv_123456', 'user_123456');

      expect(result).toEqual(mockConversationWithMessages);
      expect(mockPrismaClient.conversation.findFirst).toHaveBeenCalledWith({
        where: { id: 'conv_123456', userId: 'user_123456' },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });
    });

    it('debería retornar null si no encuentra la conversación', async () => {
      mockPrismaClient.conversation.findFirst.mockResolvedValue(null);

      const result = await repository.findById('nonexistent', 'user_123456');

      expect(result).toBeNull();
    });

    it('debería validar que el userId coincida', async () => {
      mockPrismaClient.conversation.findFirst.mockResolvedValue(null);

      await repository.findById('conv_123456', 'wrong_user');

      expect(mockPrismaClient.conversation.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'conv_123456', userId: 'wrong_user' },
        })
      );
    });
  });

  describe('findByUserId', () => {
    it('debería encontrar todas las conversaciones de un usuario con preview', async () => {
      const mockConversationsWithMessages = mockConversations.map((conv) => ({
        ...conv,
        messages: [
          {
            id: 'msg_1',
            conversationId: conv.id,
            role: 'assistant' as const,
            content: 'Test message content',
            createdAt: new Date(),
            model: null,
            tokens: null,
          },
        ],
      }));

      mockPrismaClient.conversation.findMany.mockResolvedValue(
        mockConversationsWithMessages
      );

      const result = await repository.findByUserId('user_123456');

      expect(result).toHaveLength(3);
      expect(result[0].preview).toBe('Test message content');
      expect(mockPrismaClient.conversation.findMany).toHaveBeenCalledWith({
        where: { userId: 'user_123456' },
        orderBy: { updatedAt: 'desc' },
        take: 20,
        include: {
          messages: {
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
      });
    });

    it('debería limitar el número de resultados', async () => {
      mockPrismaClient.conversation.findMany.mockResolvedValue([]);

      await repository.findByUserId('user_123456', 10);

      expect(mockPrismaClient.conversation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
        })
      );
    });

    it('debería manejar conversaciones sin mensajes', async () => {
      const conversationsWithoutMessages = mockConversations.map((conv) => ({
        ...conv,
        messages: [],
      }));

      mockPrismaClient.conversation.findMany.mockResolvedValue(
        conversationsWithoutMessages
      );

      const result = await repository.findByUserId('user_123456');

      expect(result[0].preview).toBe('');
    });

    it('debería truncar el preview a 100 caracteres', async () => {
      const longMessage = 'a'.repeat(200);
      const conversationWithLongMessage = [
        {
          ...mockConversation,
          messages: [
            {
              id: 'msg_1',
              conversationId: mockConversation.id,
              role: 'assistant' as const,
              content: longMessage,
              createdAt: new Date(),
              model: null,
              tokens: null,
            },
          ],
        },
      ];

      mockPrismaClient.conversation.findMany.mockResolvedValue(
        conversationWithLongMessage
      );

      const result = await repository.findByUserId('user_123456');

      expect(result[0].preview).toHaveLength(100);
      expect(result[0].preview).toBe(longMessage.substring(0, 100));
    });
  });

  describe('create', () => {
    it('debería crear una nueva conversación', async () => {
      mockPrismaClient.conversation.create.mockResolvedValue(mockConversation);

      const result = await repository.create(mockCreateConversationInput);

      expect(result).toEqual(mockConversation);
      expect(mockPrismaClient.conversation.create).toHaveBeenCalledWith({
        data: mockCreateConversationInput,
      });
    });

    it('debería propagar errores de Prisma', async () => {
      const error = new Error('Database error');
      mockPrismaClient.conversation.create.mockRejectedValue(error);

      await expect(
        repository.create(mockCreateConversationInput)
      ).rejects.toThrow('Database error');
    });
  });

  describe('update', () => {
    it('debería actualizar una conversación existente', async () => {
      const updatedConversation = {
        ...mockConversation,
        title: 'Título actualizado',
      };
      mockPrismaClient.conversation.update.mockResolvedValue(
        updatedConversation
      );

      const result = await repository.update('conv_123456', 'user_123456', {
        title: 'Título actualizado',
      });

      expect(result.title).toBe('Título actualizado');
      expect(mockPrismaClient.conversation.update).toHaveBeenCalledWith({
        where: { id: 'conv_123456', userId: 'user_123456' },
        data: { title: 'Título actualizado' },
      });
    });

    it('debería lanzar error si la conversación no existe', async () => {
      const prismaError = Object.assign(new Error('Not found'), {
        code: 'P2025',
      });
      mockPrismaClient.conversation.update.mockRejectedValue(prismaError);

      await expect(
        repository.update('nonexistent', 'user_123456', {
          title: 'New title',
        })
      ).rejects.toThrow('Conversation nonexistent not found');
    });
  });

  describe('delete', () => {
    it('debería eliminar una conversación', async () => {
      mockPrismaClient.conversation.deleteMany.mockResolvedValue({ count: 1 });

      await repository.delete('conv_123456', 'user_123456');

      expect(mockPrismaClient.conversation.deleteMany).toHaveBeenCalledWith({
        where: { id: 'conv_123456', userId: 'user_123456' },
      });
    });

    it('debería completarse aunque no exista la conversación', async () => {
      mockPrismaClient.conversation.deleteMany.mockResolvedValue({ count: 0 });

      await expect(
        repository.delete('nonexistent', 'user_123456')
      ).resolves.not.toThrow();
    });
  });

  describe('updateTimestamp', () => {
    it('debería actualizar el timestamp de una conversación', async () => {
      const now = new Date();
      vi.setSystemTime(now);

      mockPrismaClient.conversation.update.mockResolvedValue({
        ...mockConversation,
        updatedAt: now,
      });

      await repository.updateTimestamp('conv_123456');

      expect(mockPrismaClient.conversation.update).toHaveBeenCalledWith({
        where: { id: 'conv_123456' },
        data: { updatedAt: expect.any(Date) },
      });

      vi.useRealTimers();
    });
  });
});
