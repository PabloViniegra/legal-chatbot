"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MessageBubble } from "./message-bubble";
import { MessagesLoadingSkeleton } from "./message-skeleton";
import type { Message } from "@/types/message.types";
import { CardContent } from "@/components/ui/card";
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion";
import { Loader } from "@/components/ai-elements/loader";
import { Scale } from "lucide-react";
import { animateWelcomeScreen, animateSuggestionPills } from "@/animations/chat.animations";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isLoadingMessages?: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

const LEGAL_SUGGESTIONS = [
  "¿Cuáles son mis derechos laborales básicos?",
  "¿Cómo puedo reclamar una herencia?",
  "¿Qué hacer ante un despido improcedente?",
  "¿Cuándo prescribe una deuda?",
  "¿Cómo funciona el derecho de desistimiento?",
];

export function ChatMessages({ messages, isLoading, isLoadingMessages, onSuggestionClick }: ChatMessagesProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Animate welcome screen on mount
  useGSAP(() => {
    if (welcomeRef.current && messages.length === 0) {
      animateWelcomeScreen(welcomeRef.current);
    }
  }, [messages.length]);

  // Animate suggestion pills
  useGSAP(() => {
    if (suggestionsRef.current && messages.length === 0) {
      const pills = Array.from(suggestionsRef.current.querySelectorAll("[data-suggestion-pill]")) as HTMLElement[];
      if (pills.length > 0) {
        animateSuggestionPills(pills);
      }
    }
  }, [messages.length]);

  // Mostrar skeleton si se están cargando mensajes de una conversación
  if (isLoadingMessages) {
    return <MessagesLoadingSkeleton />;
  }

  if (messages.length === 0) {
    return (
      <CardContent className="flex flex-1 flex-col items-center justify-center font-sans p-8">
        <div ref={welcomeRef} className="text-center text-muted-foreground max-w-2xl">
          <div data-welcome-logo className="mb-6 flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Scale className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h2 data-welcome-title className="text-3xl font-bold mb-3 text-foreground">
            ¡Bienvenido a LexIA!
          </h2>
          <p data-welcome-description className="text-base mb-2">Tu asistente legal especializado en legislación española.</p>
          <p data-welcome-description className="text-sm mb-8">
            Hazme cualquier pregunta sobre derecho civil, penal, laboral o mercantil.
          </p>

          {onSuggestionClick && (
            <div data-welcome-suggestions className="w-full">
              <p className="text-xs font-medium text-muted-foreground mb-3 text-left">
                Preguntas frecuentes:
              </p>
              <Suggestions ref={suggestionsRef} className="justify-start gap-2">
                {LEGAL_SUGGESTIONS.map((suggestion, index) => (
                  <Suggestion
                    key={index}
                    suggestion={suggestion}
                    onClick={onSuggestionClick}
                    className="font-sans text-xs"
                    data-suggestion-pill
                  />
                ))}
              </Suggestions>
            </div>
          )}
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className="flex-1 overflow-y-auto space-y-4 p-6 font-sans">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Loader size={20} />
          <span className="text-sm">Pensando...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </CardContent>
  );
}