import { describe, it, expect, beforeEach } from 'vitest';
import { useChatStore } from '../chat.store';
import { mockConversations } from '@/__tests__/fixtures/conversation.fixtures';

describe('chatStore', () => {
  beforeEach(() => {
    // Reset store antes de cada test
    const store = useChatStore.getState();
    store.setConversations([]);
    store.setActiveConversation(null);
    store.setIsLoading(false);
    // Asegurarse que el sidebar esté abierto (estado inicial)
    if (!store.sidebar.isOpen) {
      store.sidebar.open();
    }
  });

  describe('activeConversation', () => {
    it('debería establecer conversación activa', () => {
      const { setActiveConversation, activeConversationId } =
        useChatStore.getState();

      expect(activeConversationId).toBeNull();

      setActiveConversation('conv_123456');

      expect(useChatStore.getState().activeConversationId).toBe('conv_123456');
    });

    it('debería poder limpiar conversación activa', () => {
      const { setActiveConversation } = useChatStore.getState();

      setActiveConversation('conv_123456');
      expect(useChatStore.getState().activeConversationId).toBe('conv_123456');

      setActiveConversation(null);
      expect(useChatStore.getState().activeConversationId).toBeNull();
    });
  });

  describe('conversations', () => {
    it('debería establecer lista de conversaciones', () => {
      const { setConversations, conversations } = useChatStore.getState();

      expect(conversations).toEqual([]);

      const conversationsWithPreview = mockConversations.map((conv) => ({
        ...conv,
        messages: [],
        preview: '',
      }));

      setConversations(conversationsWithPreview);

      expect(useChatStore.getState().conversations).toEqual(
        conversationsWithPreview
      );
    });

    it('debería añadir nueva conversación al inicio', () => {
      const { addConversation, conversations } = useChatStore.getState();

      const newConversation = {
        ...mockConversations[0],
        messages: [],
        preview: '',
      };

      addConversation(newConversation);

      const state = useChatStore.getState();
      expect(state.conversations).toHaveLength(1);
      expect(state.conversations[0]).toEqual(newConversation);

      // Añadir otra conversación
      const anotherConversation = {
        ...mockConversations[1],
        messages: [],
        preview: '',
      };

      useChatStore.getState().addConversation(anotherConversation);

      expect(useChatStore.getState().conversations).toHaveLength(2);
      expect(useChatStore.getState().conversations[0]).toEqual(
        anotherConversation
      );
    });

    it('debería eliminar conversación por ID', () => {
      const { setConversations, removeConversation } = useChatStore.getState();

      const conversationsWithPreview = mockConversations.map((conv) => ({
        ...conv,
        messages: [],
        preview: '',
      }));

      setConversations(conversationsWithPreview);
      expect(useChatStore.getState().conversations).toHaveLength(3);

      removeConversation('conv_123456');

      const state = useChatStore.getState();
      expect(state.conversations).toHaveLength(2);
      expect(
        state.conversations.find((c) => c.id === 'conv_123456')
      ).toBeUndefined();
    });

    it('debería actualizar conversación existente', () => {
      const { setConversations, updateConversation } = useChatStore.getState();

      const conversationsWithPreview = mockConversations.map((conv) => ({
        ...conv,
        messages: [],
        preview: '',
      }));

      setConversations(conversationsWithPreview);

      updateConversation('conv_123456', {
        title: 'Título actualizado',
        preview: 'Nuevo preview',
      });

      const state = useChatStore.getState();
      const updatedConv = state.conversations.find(
        (c) => c.id === 'conv_123456'
      );

      expect(updatedConv?.title).toBe('Título actualizado');
      expect(updatedConv?.preview).toBe('Nuevo preview');
    });

    it('debería mantener otras conversaciones sin cambios al actualizar', () => {
      const { setConversations, updateConversation } = useChatStore.getState();

      const conversationsWithPreview = mockConversations.map((conv) => ({
        ...conv,
        messages: [],
        preview: '',
      }));

      setConversations(conversationsWithPreview);

      const originalSecond = conversationsWithPreview[1];

      updateConversation('conv_123456', { title: 'Nuevo título' });

      const state = useChatStore.getState();
      const unchangedConv = state.conversations.find(
        (c) => c.id === originalSecond.id
      );

      expect(unchangedConv).toEqual(originalSecond);
    });

    it('no debería fallar al actualizar conversación inexistente', () => {
      const { setConversations, updateConversation } = useChatStore.getState();

      const conversationsWithPreview = mockConversations.map((conv) => ({
        ...conv,
        messages: [],
        preview: '',
      }));

      setConversations(conversationsWithPreview);

      expect(() => {
        updateConversation('nonexistent', { title: 'Test' });
      }).not.toThrow();

      // La lista de conversaciones no debería cambiar
      expect(useChatStore.getState().conversations).toEqual(
        conversationsWithPreview
      );
    });
  });

  describe('sidebar', () => {
    it('debería inicializar sidebar como abierto', () => {
      const { sidebar } = useChatStore.getState();

      expect(sidebar.isOpen).toBe(true);
    });

    it('debería alternar estado del sidebar', () => {
      const { sidebar } = useChatStore.getState();

      expect(sidebar.isOpen).toBe(true);

      sidebar.toggle();
      expect(useChatStore.getState().sidebar.isOpen).toBe(false);

      useChatStore.getState().sidebar.toggle();
      expect(useChatStore.getState().sidebar.isOpen).toBe(true);
    });

    it('debería abrir sidebar', () => {
      const { sidebar } = useChatStore.getState();

      sidebar.close();
      expect(useChatStore.getState().sidebar.isOpen).toBe(false);

      useChatStore.getState().sidebar.open();
      expect(useChatStore.getState().sidebar.isOpen).toBe(true);
    });

    it('debería cerrar sidebar', () => {
      const { sidebar } = useChatStore.getState();

      expect(sidebar.isOpen).toBe(true);

      sidebar.close();
      expect(useChatStore.getState().sidebar.isOpen).toBe(false);
    });

    it('debería ser idempotente al abrir/cerrar', () => {
      const { sidebar } = useChatStore.getState();

      sidebar.open();
      sidebar.open();
      expect(useChatStore.getState().sidebar.isOpen).toBe(true);

      useChatStore.getState().sidebar.close();
      useChatStore.getState().sidebar.close();
      expect(useChatStore.getState().sidebar.isOpen).toBe(false);
    });
  });

  describe('loading state', () => {
    it('debería inicializar isLoading como false', () => {
      const { isLoading } = useChatStore.getState();

      expect(isLoading).toBe(false);
    });

    it('debería establecer estado de carga', () => {
      const { setIsLoading } = useChatStore.getState();

      setIsLoading(true);
      expect(useChatStore.getState().isLoading).toBe(true);

      setIsLoading(false);
      expect(useChatStore.getState().isLoading).toBe(false);
    });
  });

  describe('integración de estado', () => {
    it('debería manejar flujo completo de conversación nueva', () => {
      const store = useChatStore.getState();

      // 1. Usuario no tiene conversaciones
      expect(store.conversations).toEqual([]);
      expect(store.activeConversationId).toBeNull();

      // 2. Crear nueva conversación
      const newConv = {
        ...mockConversations[0],
        messages: [],
        preview: '',
      };
      store.addConversation(newConv);

      // 3. Establecer como activa
      store.setActiveConversation(newConv.id);

      // 4. Verificar estado
      const state = useChatStore.getState();
      expect(state.conversations).toHaveLength(1);
      expect(state.activeConversationId).toBe(newConv.id);
    });

    it('debería manejar eliminación de conversación activa', () => {
      const store = useChatStore.getState();

      const conversationsWithPreview = mockConversations.map((conv) => ({
        ...conv,
        messages: [],
        preview: '',
      }));

      store.setConversations(conversationsWithPreview);
      store.setActiveConversation('conv_123456');

      expect(useChatStore.getState().activeConversationId).toBe('conv_123456');

      // Eliminar la conversación activa
      store.removeConversation('conv_123456');

      const state = useChatStore.getState();
      expect(
        state.conversations.find((c) => c.id === 'conv_123456')
      ).toBeUndefined();
      // La conversación activa sigue siendo la misma (necesitaría lógica adicional para limpiarla)
      expect(state.activeConversationId).toBe('conv_123456');
    });

    it('debería mantener estado consistente entre múltiples operaciones', () => {
      const store = useChatStore.getState();

      const conversationsWithPreview = mockConversations.map((conv) => ({
        ...conv,
        messages: [],
        preview: '',
      }));

      // Múltiples operaciones
      store.setConversations(conversationsWithPreview);
      store.setActiveConversation('conv_123456');
      store.sidebar.close();
      store.setIsLoading(true);

      const state1 = useChatStore.getState();
      expect(state1.conversations).toHaveLength(3);
      expect(state1.activeConversationId).toBe('conv_123456');
      expect(state1.sidebar.isOpen).toBe(false);
      expect(state1.isLoading).toBe(true);

      // Más operaciones
      store.updateConversation('conv_123456', { title: 'Updated' });
      store.sidebar.open();
      store.setIsLoading(false);

      const state2 = useChatStore.getState();
      expect(state2.conversations[0].title).toBe('Updated');
      expect(state2.sidebar.isOpen).toBe(true);
      expect(state2.isLoading).toBe(false);
    });
  });
});
