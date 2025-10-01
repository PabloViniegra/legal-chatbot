import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useChat } from '../use-chat';
import { useChatStore } from '@/stores/chat.store';

// Helper para crear un mock ReadableStream
function createMockStream(chunks: string[]) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      chunks.forEach(chunk => controller.enqueue(encoder.encode(chunk)));
      controller.close();
    },
  });
}

// Mock global fetch
global.fetch = vi.fn();

// Mock zustand store
vi.mock('@/stores/chat.store', () => ({
  useChatStore: {
    getState: vi.fn(),
  },
}));

describe('useChat', () => {
  const mockAddConversation = vi.fn();
  const mockSetActiveConversation = vi.fn();
  const mockUpdateConversation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    // Setup mock store getState
    (useChatStore.getState as any).mockReturnValue({
      addConversation: mockAddConversation,
      setActiveConversation: mockSetActiveConversation,
      updateConversation: mockUpdateConversation,
      activeConversationId: null,
    });

    (global.fetch as any).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('inicialización', () => {
    it('debería inicializar con valores por defecto', () => {
      const { result } = renderHook(() => useChat());

      expect(result.current.messages).toEqual([]);
      expect(result.current.input).toBe('');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.conversationId).toBeUndefined();
    });

    it('debería aceptar conversationId inicial', () => {
      const { result } = renderHook(() =>
        useChat({ conversationId: 'conv_123456' })
      );

      expect(result.current.conversationId).toBe('conv_123456');
    });
  });

  describe('setInput', () => {
    it('debería actualizar el input', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setInput('Test message');
      });

      expect(result.current.input).toBe('Test message');
    });
  });

  describe('sendMessage', () => {
    it.skip('debería enviar un mensaje y recibir respuesta streaming', async () => {
      // Mock respuesta del polling
      const pollMockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          data: {
            title: 'Consulta generada',
            updatedAt: new Date().toISOString(),
            messages: [{ content: 'Mensaje' }],
          },
        }),
      };

      // Mock respuesta principal con streaming
      const stream = createMockStream(['Respuesta ', 'del ', 'asistente']);

      const mockChatResponse = {
        ok: true,
        headers: new Headers({
          'X-Conversation-Id': 'conv_new123',
        }),
        body: stream,
      };

      (global.fetch as any).mockImplementation((url: string) => {
        if (url.includes('/api/conversations/')) {
          return Promise.resolve(pollMockResponse);
        }
        if (url === '/api/chat') {
          return Promise.resolve(mockChatResponse);
        }
        return Promise.reject(new Error('Unexpected fetch'));
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('¿Cuál es el plazo de prescripción?');
      });

      // Esperar timers de polling
      await act(async () => {
        await vi.runAllTimersAsync();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Verificar que hay mensajes
      expect(result.current.messages.length).toBeGreaterThanOrEqual(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/chat',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    it.skip('debería establecer conversationId desde el header', async () => {
      const pollMockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          data: {
            title: 'Consulta generada',
            updatedAt: new Date().toISOString(),
            messages: [],
          },
        }),
      };

      const stream = createMockStream(['Response']);

      const mockChatResponse = {
        ok: true,
        headers: new Headers({
          'X-Conversation-Id': 'conv_new123',
        }),
        body: stream,
      };

      (global.fetch as any).mockImplementation((url: string) => {
        if (url.includes('/api/conversations/')) {
          return Promise.resolve(pollMockResponse);
        }
        return Promise.resolve(mockChatResponse);
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Test');
      });

      await act(async () => {
        await vi.runAllTimersAsync();
      });

      await waitFor(() => {
        expect(result.current.conversationId).toBe('conv_new123');
      });
    });

    it('no debería enviar mensaje vacío', async () => {
      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('   ');
      });

      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('no debería enviar mientras está cargando', async () => {
      const stream = createMockStream(['Response']);

      (global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        body: stream,
      });

      const { result } = renderHook(() => useChat());

      // Enviar primer mensaje
      act(() => {
        result.current.sendMessage('Message 1');
      });

      // Intentar enviar segundo mensaje mientras está cargando
      await act(async () => {
        await result.current.sendMessage('Message 2');
      });

      // Solo debería haberse llamado fetch una vez
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('debería manejar errores de la API', async () => {
      const mockErrorResponse = {
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Error del servidor' }),
      };

      (global.fetch as any).mockResolvedValue(mockErrorResponse);

      const onError = vi.fn();
      const { result } = renderHook(() => useChat({ onError }));

      await expect(async () => {
        await act(async () => {
          await result.current.sendMessage('Test');
        });
      }).rejects.toThrow();

      expect(onError).toHaveBeenCalled();
    });

    it.skip('debería actualizar mensajes durante el streaming', async () => {
      const stream = createMockStream(['Chunk 1', ' Chunk 2', ' Chunk 3']);

      (global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        body: stream,
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Test');
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Debería haber al menos un mensaje del asistente
      const assistantMessages = result.current.messages.filter(
        (m) => m.role === 'assistant'
      );
      expect(assistantMessages.length).toBeGreaterThan(0);
    });
  });

  describe('stop', () => {
    it.skip('debería poder detener la request en curso', async () => {
      const { result } = renderHook(() => useChat());

      const stream = createMockStream(['Response']);

      (global.fetch as any).mockResolvedValue({
        ok: true,
        headers: new Headers(),
        body: stream,
      });

      act(() => {
        result.current.sendMessage('Test');
      });

      act(() => {
        result.current.stop();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe('reset', () => {
    it('debería resetear el estado del chat', async () => {
      const { result } = renderHook(() => useChat());

      // Agregar algún estado
      act(() => {
        result.current.setInput('Test input');
      });

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.messages).toEqual([]);
      expect(result.current.input).toBe('');
      expect(result.current.conversationId).toBeUndefined();
    });
  });
});
