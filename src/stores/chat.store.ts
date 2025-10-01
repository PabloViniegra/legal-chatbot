import { create } from "zustand";
import type { ConversationWithPreview } from "@/types/conversation.types";

interface ChatStore {
  // Active conversation
  activeConversationId: string | null;
  setActiveConversation: (id: string | null) => void;

  // Conversations list
  conversations: ConversationWithPreview[];
  setConversations: (conversations: ConversationWithPreview[]) => void;
  addConversation: (conversation: ConversationWithPreview) => void;
  removeConversation: (id: string) => void;
  updateConversation: (id: string, data: Partial<ConversationWithPreview>) => void;

  // Sidebar
  sidebar: {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
  };

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  // Active conversation
  activeConversationId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),

  // Conversations list
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),
  removeConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
    })),
  updateConversation: (id, data) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, ...data } : c
      ),
    })),

  // Sidebar
  sidebar: {
    isOpen: true,
    toggle: () =>
      set((state) => ({
        sidebar: { ...state.sidebar, isOpen: !state.sidebar.isOpen },
      })),
    open: () =>
      set((state) => ({
        sidebar: { ...state.sidebar, isOpen: true },
      })),
    close: () =>
      set((state) => ({
        sidebar: { ...state.sidebar, isOpen: false },
      })),
  },

  // Loading states
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));