import { describe, it, expect, beforeEach, vi } from 'vitest';
import { conversationRepository } from '@/repositories/conversation.repository';
import { messageRepository } from '@/repositories/message.repository';
import { queryLogRepository } from '@/repositories/query-log.repository';
import { NotFoundError, ValidationError } from '@/lib/errors';
import {
  mockConversation,
  mockConversationWithMessages,
} from '@/__tests__/fixtures/conversation.fixtures';

// Mock dependencies
vi.mock('@/repositories/conversation.repository');
vi.mock('@/repositories/message.repository');
vi.mock('@/repositories/query-log.repository');
vi.mock('openai');

import { ChatService } from '../chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ChatService();
  });

  describe('createOrGetConversation', () => {
    it('debería obtener una conversación existente si se proporciona ID', async () => {
      vi.spyOn(conversationRepository, 'findById').mockResolvedValue(
        mockConversationWithMessages
      );

      const result = await service.createOrGetConversation(
        'user_123456',
        'conv_123456'
      );

      expect(result).toEqual(mockConversationWithMessages);
      expect(conversationRepository.findById).toHaveBeenCalledWith(
        'conv_123456',
        'user_123456'
      );
    });

    it('debería lanzar NotFoundError si la conversación no existe', async () => {
      vi.spyOn(conversationRepository, 'findById').mockResolvedValue(null);

      await expect(
        service.createOrGetConversation('user_123456', 'nonexistent')
      ).rejects.toThrow(NotFoundError);
    });

    it('debería crear nueva conversación si no se proporciona ID', async () => {
      vi.spyOn(conversationRepository, 'create').mockResolvedValue(
        mockConversation
      );

      const result = await service.createOrGetConversation('user_123456');

      expect(result).toEqual(mockConversation);
      expect(conversationRepository.create).toHaveBeenCalledWith({
        userId: 'user_123456',
        title: 'Nueva consulta',
      });
    });
  });

  describe('saveUserMessage', () => {
    it('debería guardar un mensaje del usuario', async () => {
      vi.spyOn(messageRepository, 'create').mockResolvedValue({
        id: 'msg_new',
        conversationId: 'conv_123456',
        role: 'user',
        content: 'Test message',
        createdAt: new Date(),
        model: null,
        tokens: null,
      });

      await service.saveUserMessage(
        'conv_123456',
        'user_123456',
        'Test message'
      );

      expect(messageRepository.create).toHaveBeenCalledWith({
        conversationId: 'conv_123456',
        role: 'user',
        content: 'Test message',
        model: null,
        tokens: null,
      });
    });

    it('no debería generar título si no es el primer mensaje', async () => {
      vi.spyOn(messageRepository, 'create').mockResolvedValue({
        id: 'msg_new',
        conversationId: 'conv_123456',
        role: 'user',
        content: 'Segundo mensaje',
        createdAt: new Date(),
        model: null,
        tokens: null,
      });

      await service.saveUserMessage(
        'conv_123456',
        'user_123456',
        'Segundo mensaje',
        false
      );

      expect(messageRepository.create).toHaveBeenCalled();
    });
  });

  describe('saveAssistantMessage', () => {
    it('debería guardar un mensaje del asistente', async () => {
      vi.spyOn(messageRepository, 'create').mockResolvedValue({
        id: 'msg_assistant',
        conversationId: 'conv_123456',
        role: 'assistant',
        content: 'Assistant response',
        createdAt: new Date(),
        model: 'gpt-4o',
        tokens: 100,
      });

      await service.saveAssistantMessage(
        'conv_123456',
        'Assistant response',
        'gpt-4o',
        100
      );

      expect(messageRepository.create).toHaveBeenCalledWith({
        conversationId: 'conv_123456',
        role: 'assistant',
        content: 'Assistant response',
        model: 'gpt-4o',
        tokens: 100,
      });
    });
  });

  describe('logQuery', () => {
    it('debería registrar una consulta del usuario', async () => {
      vi.spyOn(queryLogRepository, 'create').mockResolvedValue({
        id: 'ql_123',
        userId: 'user_123456',
        query: 'Test query',
        category: 'civil',
        createdAt: new Date(),
      });

      await service.logQuery('user_123456', 'Test query', 'civil');

      expect(queryLogRepository.create).toHaveBeenCalledWith({
        userId: 'user_123456',
        query: 'Test query',
        category: 'civil',
      });
    });

    it('debería permitir registrar consultas sin categoría', async () => {
      vi.spyOn(queryLogRepository, 'create').mockResolvedValue({
        id: 'ql_123',
        userId: 'user_123456',
        query: 'Test query',
        category: null,
        createdAt: new Date(),
      });

      await service.logQuery('user_123456', 'Test query');

      expect(queryLogRepository.create).toHaveBeenCalledWith({
        userId: 'user_123456',
        query: 'Test query',
        category: undefined,
      });
    });
  });

  describe('generateResponse', () => {
    it('debería lanzar ValidationError si no hay mensajes', async () => {
      await expect(service.generateResponse([])).rejects.toThrow(
        ValidationError
      );
      await expect(service.generateResponse([])).rejects.toThrow(
        'Se requieren mensajes para generar respuesta'
      );
    });

    // Nota: Tests de integración con OpenAI requieren mocks más complejos
    // y se deben hacer en tests de integración separados
  });
});
