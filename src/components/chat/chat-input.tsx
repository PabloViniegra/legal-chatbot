"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { animateChatInput, animateSendButton } from "@/animations/chat.animations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  selectedCategory: string | undefined;
  setSelectedCategory: (value: string) => void;
  hasConversationId: boolean;
}

const LEGAL_CATEGORIES = [
  { value: "civil", label: "Derecho Civil" },
  { value: "penal", label: "Derecho Penal" },
  { value: "laboral", label: "Derecho Laboral" },
  { value: "mercantil", label: "Derecho Mercantil" },
];

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  selectedCategory,
  setSelectedCategory,
  hasConversationId,
}: ChatInputProps) {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Animate input on mount
  useGSAP(() => {
    if (inputContainerRef.current) {
      animateChatInput(inputContainerRef.current);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que se haya seleccionado categoría si es nueva conversación
    if (!hasConversationId && !selectedCategory) {
      return;
    }

    if (buttonRef.current) {
      animateSendButton(buttonRef.current);
    }
    onSubmit(e);
  };

  // Determinar si el botón debe estar deshabilitado
  const isSubmitDisabled = isLoading || !input.trim() || (!hasConversationId && !selectedCategory);

  return (
    <CardFooter ref={inputContainerRef} className="border-t p-4 font-sans">
      <form onSubmit={handleSubmit} className="flex w-full gap-2 flex-col sm:flex-row" data-tour="chat-input">
        {/* Selector de categoría - solo visible si no hay conversación activa */}
        {!hasConversationId && (
          <div className="w-full sm:w-auto">
            <Select
              value={selectedCategory || ""}
              onValueChange={setSelectedCategory}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Selecciona categoría" />
              </SelectTrigger>
              <SelectContent>
                {LEGAL_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex gap-2 flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta legal..."
            disabled={isLoading}
            className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm font-sans ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
          />
          <Button
            ref={buttonRef}
            type="submit"
            disabled={isSubmitDisabled}
            className="transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </CardFooter>
  );
}