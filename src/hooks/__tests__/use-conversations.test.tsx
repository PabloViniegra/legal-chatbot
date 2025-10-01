import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';

// Mock global fetch
global.fetch = vi.fn();

const mockSetConversations = vi.fn();
const mockSetLoading = vi.fn();
const mockAddConversation = vi.fn();
const mockRemoveConversation = vi.fn();

// Mock zustand store
vi.mock('@/stores/chat.store', () => ({
  useChatStore: vi.fn(() => ({
    conversations: [],
    loading: false,
    setConversations: mockSetConversations,
    setLoading: mockSetLoading,
    addConversation: mockAddConversation,
    removeConversation: mockRemoveConversation,
  })),
}));

import { useConversations } from '../use-conversations';

describe('useConversations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchConversations', () => {
    it('debería obtener la lista de conversaciones', async () => {
      const mockConversations = [
        {
          id: 'conv_1',
          userId: 'user_123',
          title: 'Consulta laboral',
          category: 'laboral' as const,
          preview: 'Consulta sobre despido',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
          messages: [],
        },
        {
          id: 'conv_2',
          userId: 'user_123',
          title: 'Consulta civil',
          category: 'civil' as const,
          preview: 'Consulta sobre herencia',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
          messages: [],
        },
      ];

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ data: mockConversations }),
        status: 200,
      });

      const { result } = renderHook(() => useConversations());

      await act(async () => {
        await result.current.refetch();
      });

      expect(global.fetch).toHaveBeenCalledWith('/api/conversations');
      expect(mockSetConversations).toHaveBeenCalledWith(mockConversations);
    });

    it('debería manejar respuesta vacía', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ data: [] }),
        status: 200,
      });

      const { result } = renderHook(() => useConversations());

      await act(async () => {
        await result.current.refetch();
      });

      expect(mockSetConversations).toHaveBeenCalledWith([]);
    });

    it('debería manejar errores de red', async () => {
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useConversations());

      await act(async () => {
        try {
          await result.current.refetch();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('createConversation', () => {
    it('debería crear una nueva conversación', async () => {
      const newConversation = {
        id: 'conv_123456',
        userId: 'user_123456',
        title: 'Consulta sobre despido laboral',
        category: 'laboral' as const,
        createdAt: new Date('2024-01-01T10:00:00.000Z'),
        updatedAt: new Date('2024-01-01T10:30:00.000Z'),
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ data: newConversation }),
        status: 201,
      });

      const { result } = renderHook(() => useConversations());

      let createdConv;
      await act(async () => {
        createdConv = await result.current.createConversation({
          title: 'Consulta sobre despido laboral',
          category: 'laboral',
        });
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/conversations',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(createdConv).toBeDefined();
    });

    it('debería crear conversación sin categoría', async () => {
      const newConversation = {
        id: 'conv_123456',
        userId: 'user_123456',
        title: 'Consulta general',
        category: null,
        createdAt: new Date('2024-01-01T10:00:00.000Z'),
        updatedAt: new Date('2024-01-01T10:30:00.000Z'),
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ data: newConversation }),
        status: 201,
      });

      const { result } = renderHook(() => useConversations());

      let createdConv;
      await act(async () => {
        createdConv = await result.current.createConversation({
          title: 'Consulta general',
        });
      });

      expect(createdConv).toBeDefined();
    });

    it('debería manejar errores al crear conversación', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'Error al crear conversación' }),
        status: 400,
      });

      const { result } = renderHook(() => useConversations());

      await expect(
        act(async () => {
          await result.current.createConversation({
            title: 'Test',
          });
        })
      ).rejects.toThrow();
    });
  });

  describe.skip('updateConversation', () => {
    it('debería actualizar una conversación existente', async () => {
      const updatedConversation = {
        id: 'conv_123',
        userId: 'user_123',
        title: 'Título actualizado',
        category: 'civil' as const,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date(),
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ data: updatedConversation }),
        status: 200,
      });

      const { result } = renderHook(() => useConversations());

      let updated;
      await act(async () => {
        updated = await result.current.updateConversation('conv_123', {
          title: 'Título actualizado',
        });
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/conversations/conv_123',
        expect.objectContaining({
          method: 'PATCH',
        })
      );
      expect(updated).toBeDefined();
    });
  });

  describe('deleteConversation', () => {
    it('debería eliminar una conversación', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
        status: 200,
      });

      const { result } = renderHook(() => useConversations());

      await act(async () => {
        await result.current.deleteConversation('conv_123');
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/conversations/conv_123',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(mockRemoveConversation).toHaveBeenCalledWith('conv_123');
    });

    it('debería manejar errores al eliminar', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ error: 'No encontrada' }),
        status: 404,
      });

      const { result } = renderHook(() => useConversations());

      await expect(
        act(async () => {
          await result.current.deleteConversation('conv_invalid');
        })
      ).rejects.toThrow();
    });
  });
});
