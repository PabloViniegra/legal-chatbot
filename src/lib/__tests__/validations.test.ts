import { describe, it, expect } from 'vitest';
import {
  createConversationSchema,
  updateConversationSchema,
  createMessageSchema,
  chatRequestSchema,
} from '../validations';

describe('validations', () => {
  describe('createConversationSchema', () => {
    it('debería validar una conversación válida', () => {
      const validData = {
        title: 'Consulta sobre despido',
        category: 'laboral' as const,
      };

      const result = createConversationSchema.parse(validData);
      expect(result).toEqual(validData);
    });

    it('debería validar conversación sin categoría', () => {
      const validData = {
        title: 'Consulta general',
      };

      const result = createConversationSchema.parse(validData);
      expect(result.category).toBeUndefined();
    });

    it('debería rechazar título vacío', () => {
      const invalidData = {
        title: '',
      };

      expect(() => createConversationSchema.parse(invalidData)).toThrow();
    });

    it('debería rechazar título muy largo (>100 caracteres)', () => {
      const invalidData = {
        title: 'a'.repeat(101),
      };

      expect(() => createConversationSchema.parse(invalidData)).toThrow();
    });

    it('debería rechazar categoría inválida', () => {
      const invalidData = {
        title: 'Test',
        category: 'invalid',
      };

      expect(() => createConversationSchema.parse(invalidData)).toThrow();
    });

    it('debería aceptar todas las categorías válidas', () => {
      const categories = ['civil', 'penal', 'laboral', 'mercantil'] as const;

      categories.forEach((category) => {
        const data = { title: 'Test', category };
        expect(() => createConversationSchema.parse(data)).not.toThrow();
      });
    });
  });

  describe('updateConversationSchema', () => {
    it('debería validar actualización con título', () => {
      const validData = {
        title: 'Título actualizado',
      };

      const result = updateConversationSchema.parse(validData);
      expect(result).toEqual(validData);
    });

    it('debería validar actualización con categoría', () => {
      const validData = {
        category: 'civil' as const,
      };

      const result = updateConversationSchema.parse(validData);
      expect(result).toEqual(validData);
    });

    it('debería validar actualización vacía (todos los campos opcionales)', () => {
      const validData = {};

      const result = updateConversationSchema.parse(validData);
      expect(result).toEqual({});
    });

    it('debería rechazar título muy largo', () => {
      const invalidData = {
        title: 'a'.repeat(101),
      };

      expect(() => updateConversationSchema.parse(invalidData)).toThrow();
    });
  });

  describe('createMessageSchema', () => {
    it('debería validar mensaje de usuario válido', () => {
      const validData = {
        conversationId: 'clw3z4x5y0000abc123def456',
        content: '¿Cuál es el plazo de prescripción?',
        role: 'user' as const,
      };

      const result = createMessageSchema.parse(validData);
      expect(result.conversationId).toBe(validData.conversationId);
      expect(result.content).toBe(validData.content);
      expect(result.role).toBe('user');
    });

    it('debería validar mensaje de asistente con modelo y tokens', () => {
      const validData = {
        conversationId: 'clw3z4x5y0000abc123def456',
        content: 'Respuesta del asistente',
        role: 'assistant' as const,
        model: 'gpt-4o',
        tokens: 150,
      };

      const result = createMessageSchema.parse(validData);
      expect(result.model).toBe('gpt-4o');
      expect(result.tokens).toBe(150);
    });

    it('debería rechazar conversationId inválido (no CUID)', () => {
      const invalidData = {
        conversationId: 'invalid-id',
        content: 'Test',
        role: 'user' as const,
      };

      expect(() => createMessageSchema.parse(invalidData)).toThrow();
    });

    it('debería rechazar contenido vacío', () => {
      const invalidData = {
        conversationId: 'clw3z4x5y0000abc123def456',
        content: '',
        role: 'user' as const,
      };

      expect(() => createMessageSchema.parse(invalidData)).toThrow();
    });

    it('debería rechazar contenido muy largo (>5000 caracteres)', () => {
      const invalidData = {
        conversationId: 'clw3z4x5y0000abc123def456',
        content: 'a'.repeat(5001),
        role: 'user' as const,
      };

      expect(() => createMessageSchema.parse(invalidData)).toThrow();
    });

    it('debería rechazar rol inválido', () => {
      const invalidData = {
        conversationId: 'clw3z4x5y0000abc123def456',
        content: 'Test',
        role: 'invalid',
      };

      expect(() => createMessageSchema.parse(invalidData)).toThrow();
    });

    it('debería aceptar todos los roles válidos', () => {
      const roles = ['user', 'assistant', 'system'] as const;

      roles.forEach((role) => {
        const data = {
          conversationId: 'clw3z4x5y0000abc123def456',
          content: 'Test',
          role,
        };
        expect(() => createMessageSchema.parse(data)).not.toThrow();
      });
    });
  });

  describe('chatRequestSchema', () => {
    it('debería validar request con conversationId', () => {
      const validData = {
        messages: [
          { role: 'user' as const, content: 'Hola' },
          { role: 'assistant' as const, content: 'Hola, ¿en qué puedo ayudarte?' },
        ],
        conversationId: 'clw3z4x5y0000abc123def456',
      };

      const result = chatRequestSchema.parse(validData);
      expect(result.messages).toHaveLength(2);
      expect(result.conversationId).toBe(validData.conversationId);
    });

    it('debería validar request sin conversationId (nueva conversación)', () => {
      const validData = {
        messages: [{ role: 'user' as const, content: 'Primera consulta' }],
      };

      const result = chatRequestSchema.parse(validData);
      expect(result.conversationId).toBeUndefined();
    });

    it('debería rechazar array de mensajes vacío', () => {
      const invalidData = {
        messages: [],
      };

      expect(() => chatRequestSchema.parse(invalidData)).toThrow();
    });

    it('debería rechazar mensaje con contenido vacío', () => {
      const invalidData = {
        messages: [{ role: 'user' as const, content: '' }],
      };

      expect(() => chatRequestSchema.parse(invalidData)).toThrow();
    });

    it('debería validar múltiples mensajes', () => {
      const validData = {
        messages: [
          { role: 'system' as const, content: 'System prompt' },
          { role: 'user' as const, content: 'Pregunta 1' },
          { role: 'assistant' as const, content: 'Respuesta 1' },
          { role: 'user' as const, content: 'Pregunta 2' },
        ],
      };

      const result = chatRequestSchema.parse(validData);
      expect(result.messages).toHaveLength(4);
    });
  });
});
