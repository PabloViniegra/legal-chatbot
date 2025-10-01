import { vi } from 'vitest';

/**
 * Mock de OpenAI para tests
 */
export const mockOpenAIResponse = {
  id: 'chatcmpl-123',
  object: 'chat.completion',
  created: Date.now(),
  model: 'gpt-4o',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content: 'Esta es una respuesta de prueba del asistente legal.',
      },
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 50,
    completion_tokens: 20,
    total_tokens: 70,
  },
};

export const mockOpenAIStreamChunk = (content: string) => ({
  id: 'chatcmpl-123',
  object: 'chat.completion.chunk',
  created: Date.now(),
  model: 'gpt-4o',
  choices: [
    {
      index: 0,
      delta: {
        content,
      },
      finish_reason: null,
    },
  ],
});

export const createMockOpenAI = () => ({
  chat: {
    completions: {
      create: vi.fn().mockResolvedValue(mockOpenAIResponse),
    },
  },
});

// Mock del módulo OpenAI
vi.mock('openai', () => ({
  default: vi.fn(() => createMockOpenAI()),
}));
