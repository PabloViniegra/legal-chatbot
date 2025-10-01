"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useConversations } from "@/hooks/use-conversations";
import { ConversationItem } from "./conversation-item";
import { UserProfile } from "./user-profile";
import { ConversationsListSkeleton } from "./conversation-skeleton";
import { Button } from "@/components/ui/button";
import { Plus, PanelLeftClose } from "lucide-react";
import { useChatStore } from "@/stores/chat.store";
import { animateConversationList } from "@/animations/sidebar.animations";

export function ConversationsList() {
  const { conversations, loading } = useConversations();
  const { sidebar } = useChatStore();
  const listRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(conversations.length);

  // Ordenar conversaciones por fecha de actualización (más recientes primero)
  const sortedConversations = [...conversations].sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return dateB - dateA;
  });

  // Animate conversation list on initial load
  useGSAP(() => {
    if (listRef.current && conversations.length > 0 && !loading) {
      const items = Array.from(listRef.current.querySelectorAll("[data-conversation-item]")) as HTMLElement[];
      if (items.length > 0) {
        animateConversationList(items);
      }
    }
  }, [conversations.length, loading]);

  // Track when new conversations are added
  useEffect(() => {
    prevLengthRef.current = conversations.length;
  }, [conversations.length]);

  const handleNewConversation = () => {
    // Simplemente limpiar la conversación activa
    // Esto permitirá al usuario empezar una nueva conversación desde el chat
    const { setActiveConversation } = useChatStore.getState();
    setActiveConversation(null);
  };

  if (loading) {
    return <ConversationsListSkeleton />;
  }

  return (
    <div className="flex flex-col h-full font-sans bg-sidebar">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
        <Button
          onClick={handleNewConversation}
          className="flex-1 font-medium"
          disabled={loading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva conversación
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={sidebar.close}
          className="hidden md:flex text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          title="Cerrar sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <div className="text-center p-4 text-sm text-sidebar-foreground/60">
            No hay conversaciones
          </div>
        ) : (
          <div ref={listRef} className="space-y-2">
            {sortedConversations.map((conversation) => (
              <ConversationItem key={conversation.id} conversation={conversation} />
            ))}
          </div>
        )}
      </div>
      <UserProfile />
    </div>
  );
}