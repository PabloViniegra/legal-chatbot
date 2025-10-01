"use client";

import { useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { animateDialogContent } from "@/animations/modal.animations";

interface DeleteConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  conversationTitle: string;
}

export function DeleteConversationDialog({
  open,
  onOpenChange,
  onConfirm,
  conversationTitle,
}: DeleteConversationDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate dialog content when it opens
  useEffect(() => {
    if (open && contentRef.current) {
      const elements = [
        contentRef.current.querySelector("[data-dialog-title]"),
        contentRef.current.querySelector("[data-dialog-description]"),
        contentRef.current.querySelector("[data-dialog-footer]"),
      ].filter(Boolean) as HTMLElement[];

      if (elements.length > 0) {
        animateDialogContent(elements);
      }
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent ref={contentRef} className="sm:max-w-[425px] font-sans">
        <DialogHeader>
          <DialogTitle data-dialog-title className="text-foreground">
            ¿Eliminar conversación?
          </DialogTitle>
          <DialogDescription
            data-dialog-description
            className="text-muted-foreground"
          >
            Esta acción no se puede deshacer. Se eliminará permanentemente la
            conversación{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{conversationTitle}&rdquo;
            </span>{" "}
            y todos sus mensajes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter data-dialog-footer className="gap-2 sm:gap-0 space-x-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
