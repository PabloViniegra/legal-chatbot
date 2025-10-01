import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MessageRepository } from '../message.repository';
import { mockPrismaClient } from '@/__tests__/mocks/prisma.mock';
import { mockMessages } from '@/__tests__/fixtures/conversation.fixtures';
import type { CreateMessageInput } from '@/types/message.types';

describe.skip('MessageRepository', () => {
  let repository: MessageRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new MessageRepository();
  });

  describe('findByConversationId', () => {
    it('debería encontrar todos los mensajes de una conversación', async () => {
      mockPrismaClient.message.findMany.mockResolvedValue(mockMessages);

      const result = await repository.findByConversationId('conv_123456');

      expect(result).toEqual(mockMessages);
      expect(mockPrismaClient.message.findMany).toHaveBeenCalledWith({
        where: { conversationId: 'conv_123456' },
        orderBy: { createdAt: 'asc' },
      });
    });

    it('debería retornar array vacío si no hay mensajes', async () => {
      mockPrismaClient.message.findMany.mockResolvedValue([]);

      const result = await repository.findByConversationId('empty_conv');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('debería ordenar mensajes por fecha de creación ascendente', async () => {
      mockPrismaClient.message.findMany.mockResolvedValue(mockMessages);

      await repository.findByConversationId('conv_123456');

      expect(mockPrismaClient.message.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'asc' },
        })
      );
    });
  });

  describe('create', () => {
    it('debería crear un nuevo mensaje de usuario', async () => {
      const newMessage: CreateMessageInput = {
        conversationId: 'conv_123456',
        role: 'user',
        content: '¿Cuál es el plazo de prescripción?',
        model: null,
        tokens: null,
      };

      const createdMessage = {
        id: 'msg_new',
        ...newMessage,
        createdAt: new Date(),
      };

      mockPrismaClient.message.create.mockResolvedValue(createdMessage);

      const result = await repository.create(newMessage);

      expect(result).toEqual(createdMessage);
      expect(mockPrismaClient.message.create).toHaveBeenCalledWith({
        data: newMessage,
      });
    });

    it('debería crear un mensaje de asistente con modelo y tokens', async () => {
      const assistantMessage: CreateMessageInput = {
        conversationId: 'conv_123456',
        role: 'assistant',
        content: 'El plazo de prescripción es de 4 años.',
        model: 'gpt-4o',
        tokens: 150,
      };

      const createdMessage = {
        id: 'msg_assistant',
        ...assistantMessage,
        createdAt: new Date(),
      };

      mockPrismaClient.message.create.mockResolvedValue(createdMessage);

      const result = await repository.create(assistantMessage);

      expect(result.model).toBe('gpt-4o');
      expect(result.tokens).toBe(150);
    });

    it('debería propagar errores de Prisma', async () => {
      const error = new Error('Database error');
      mockPrismaClient.message.create.mockRejectedValue(error);

      const messageData: CreateMessageInput = {
        conversationId: 'conv_123456',
        role: 'user',
        content: 'Test',
        model: null,
        tokens: null,
      };

      await expect(repository.create(messageData)).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('deleteByConversationId', () => {
    it('debería eliminar todos los mensajes de una conversación', async () => {
      mockPrismaClient.message.deleteMany.mockResolvedValue({ count: 5 });

      await repository.deleteByConversationId('conv_123456');

      expect(mockPrismaClient.message.deleteMany).toHaveBeenCalledWith({
        where: { conversationId: 'conv_123456' },
      });
    });

    it('debería completarse aunque no haya mensajes para eliminar', async () => {
      mockPrismaClient.message.deleteMany.mockResolvedValue({ count: 0 });

      await expect(
        repository.deleteByConversationId('empty_conv')
      ).resolves.not.toThrow();
    });
  });

  describe('countByConversationId', () => {
    it('debería contar los mensajes de una conversación', async () => {
      mockPrismaClient.message.count.mockResolvedValue(3);

      const result = await repository.countByConversationId('conv_123456');

      expect(result).toBe(3);
      expect(mockPrismaClient.message.count).toHaveBeenCalledWith({
        where: { conversationId: 'conv_123456' },
      });
    });

    it('debería retornar 0 si no hay mensajes', async () => {
      mockPrismaClient.message.count.mockResolvedValue(0);

      const result = await repository.countByConversationId('empty_conv');

      expect(result).toBe(0);
    });
  });
});
