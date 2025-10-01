"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useChatStore } from "@/stores/chat.store";
import { cn } from "@/lib/utils";
import type { ConversationWithPreview } from "@/types/conversation.types";
import { MessageSquare, Trash2 } from "lucide-react";
import { useConversations } from "@/hooks/use-conversations";
import { Button } from "@/components/ui/button";
import { DeleteConversationDialog } from "@/components/ui/delete-conversation-dialog";
import { animateDeleteButtonAppear, animateDeleteButtonDisappear } from "@/animations/sidebar.animations";

interface ConversationItemProps {
  conversation: ConversationWithPreview;
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  const { activeConversationId, setActiveConversation } = useChatStore();
  const { deleteConversation } = useConversations();
  const isActive = activeConversationId === conversation.id;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // Set initial opacity and handle hover animations
  useGSAP(() => {
    if (!itemRef.current || !deleteButtonRef.current) return;

    const item = itemRef.current;
    const deleteBtn = deleteButtonRef.current;

    // Set initial state
    gsap.set(deleteBtn, { opacity: 0 });

    const handleMouseEnter = () => {
      console.log("Mouse enter - showing delete button");
      animateDeleteButtonAppear(deleteBtn);
    };

    const handleMouseLeave = () => {
      console.log("Mouse leave - hiding delete button");
      animateDeleteButtonDisappear(deleteBtn);
    };

    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      item.removeEventListener("mouseenter", handleMouseEnter);
      item.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClick = () => {
    // Animate click feedback
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }
    setActiveConversation(conversation.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    await deleteConversation(conversation.id);
    if (isActive) {
      setActiveConversation(null);
    }
  };

  return (
    <div
      ref={itemRef}
      onClick={handleClick}
      data-conversation-item
      className={cn(
        "group flex items-center gap-2 rounded-lg p-3 cursor-pointer transition-colors hover:bg-sidebar-accent font-sans",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
      )}
    >
      <MessageSquare className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/60")} />
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground")}>{conversation.title}</p>
        {conversation.preview && (
          <p className="text-xs text-sidebar-foreground/60 truncate">
            {conversation.preview}
          </p>
        )}
      </div>
      <Button
        ref={deleteButtonRef}
        variant="ghost"
        size="sm"
        onClick={handleDeleteClick}
        className="text-sidebar-foreground/60 hover:text-destructive"
        title="Eliminar conversación"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <DeleteConversationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        conversationTitle={conversation.title}
      />
    </div>
  );
}