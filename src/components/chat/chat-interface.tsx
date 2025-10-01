"use client";

import { useChat } from "@/hooks/use-chat";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { Card } from "@/components/ui/card";

interface ChatInterfaceProps {
  conversationId?: string;
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const { messages, input, setInput, sendMessage, isLoading, isLoadingMessages } = useChat({
    conversationId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await sendMessage(input);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInput(suggestion);
    await sendMessage(suggestion);
  };

  return (
    <Card className="flex h-full flex-col font-sans">
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        isLoadingMessages={isLoadingMessages}
        onSuggestionClick={handleSuggestionClick}
      />
      <ChatInput
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Card>
  );
}