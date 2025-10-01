"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { animateChatInput, animateSendButton } from "@/animations/chat.animations";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
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
    if (buttonRef.current) {
      animateSendButton(buttonRef.current);
    }
    onSubmit(e);
  };

  return (
    <CardFooter ref={inputContainerRef} className="border-t p-4 font-sans">
      <form onSubmit={handleSubmit} className="flex w-full gap-2" data-tour="chat-input">
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
          disabled={isLoading || !input.trim()}
          className="transition-all"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </CardFooter>
  );
}