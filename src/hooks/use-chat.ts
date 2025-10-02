"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useChatStore } from "@/stores/chat.store";
import type { Message } from "@/types/message.types";

interface UseChatOptions {
  conversationId?: string;
  onResponse?: (response: string) => void;
  onError?: (error: Error) => void;
}

export function useChat(options: UseChatOptions = {}) {
  const { conversationId: initialConversationId, onResponse, onError } = options;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(
    initialConversationId
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const abortControllerRef = useRef<AbortController | null>(null);
  const previousInitialConversationIdRef = useRef<string | undefined>(initialConversationId);

  // Resetear selectedCategory cuando se cambia de conversación existente a nueva conversación
  useEffect(() => {
    if (previousInitialConversationIdRef.current !== undefined && initialConversationId === undefined) {
      setSelectedCategory("");
    }
    previousInitialConversationIdRef.current = initialConversationId;
  }, [initialConversationId]);

  // Función de polling con exponential backoff para obtener título generado
  const pollForTitle = useCallback(async (conversationId: string, maxAttempts = 5, initialDelay = 500) => {
    let attempts = 0;
    let delay = initialDelay;

    while (attempts < maxAttempts) {
      try {
        const convResponse = await fetch(`/api/conversations/${conversationId}`);
        if (convResponse.ok) {
          const { data } = await convResponse.json();

          // Verificar si el título ya fue generado (no es el título temporal)
          if (data.title !== "Nueva consulta" && data.title !== "Generando título...") {
            const { updateConversation } = useChatStore.getState();

            // Obtener el último mensaje para el preview
            const messages = data.messages || [];
            const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
            const preview = lastMessage?.content?.substring(0, 100) || "";

            updateConversation(conversationId, {
              title: data.title,
              preview: preview,
              updatedAt: new Date(data.updatedAt),
            });

            return; // Título encontrado, salir del polling
          }
        }
      } catch (error) {
        console.error("Error polling for title:", error);
      }

      // Esperar antes del siguiente intento con exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, 5000); // Exponential backoff, max 5s
      attempts++;
    }
  }, []);

  // Detectar cambio de conversación desde el sidebar
  useEffect(() => {
    // Resetear selectedCategory cuando se cambia a nueva conversación (sin ID)
    if (!initialConversationId && conversationId) {
      setMessages([]);
      setConversationId(undefined);
      setSelectedCategory("");
      return;
    }

    const loadConversationMessages = async () => {
      if (initialConversationId && initialConversationId !== conversationId) {
        // Si cambió a una conversación diferente, cargar mensajes
        setConversationId(initialConversationId);
        setIsLoadingMessages(true);

        try {
          const response = await fetch(`/api/conversations/${initialConversationId}/messages`);
          if (response.ok) {
            const result = await response.json();
            setMessages(result.data || []);
          } else {
            console.error("Error loading messages");
            setMessages([]);
          }
        } catch (error) {
          console.error("Error loading messages:", error);
          setMessages([]);
        } finally {
          setIsLoadingMessages(false);
        }
      }
    };

    loadConversationMessages();
  }, [initialConversationId, conversationId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        conversationId: conversationId || "",
        role: "user",
        content: content.trim(),
        createdAt: new Date(),
        tokens: null,
        model: null,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages
              .concat(userMessage)
              .map((m) => ({ role: m.role, content: m.content })),
            conversationId,
            category: !conversationId && selectedCategory ? selectedCategory : undefined,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Error al enviar mensaje");
        }

        // Obtener ID de conversación del header
        const newConversationId = response.headers.get("X-Conversation-Id");
        if (newConversationId && !conversationId) {
          setConversationId(newConversationId);

          // Actualizar el store con la nueva conversación
          const { addConversation, setActiveConversation, activeConversationId } = useChatStore.getState();

          // Solo añadir al sidebar con título temporal
          addConversation({
            id: newConversationId,
            userId: "",
            title: "Generando título...",
            category: selectedCategory || undefined,
            preview: content.substring(0, 100),
            createdAt: new Date(),
            updatedAt: new Date(),
            messages: [],
          });

          // Si no había conversación activa, establecer esta como activa
          if (!activeConversationId) {
            setActiveConversation(newConversationId);
          }

          // Obtener la conversación completa después de que se genere el título con polling
          pollForTitle(newConversationId);
        }

        // Leer stream de respuesta
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let assistantResponse = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            assistantResponse += chunk;

            // Actualizar mensaje del asistente en tiempo real
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === "assistant") {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMessage, content: assistantResponse },
                ];
              } else {
                return [
                  ...prev,
                  {
                    id: `temp-assistant-${Date.now()}`,
                    conversationId: newConversationId || conversationId || "",
                    role: "assistant",
                    content: assistantResponse,
                    createdAt: new Date(),
                    tokens: null,
                    model: null,
                  } as Message,
                ];
              }
            });
          }
        }

        if (onResponse) {
          onResponse(assistantResponse);
        }

        // Solo actualizar preview si NO es una conversación nueva
        // Si es nueva, el timeout se encargará de obtener todos los datos
        if (conversationId && !newConversationId) {
          const { updateConversation } = useChatStore.getState();
          updateConversation(conversationId, {
            preview: assistantResponse.substring(0, 100),
            updatedAt: new Date(),
          });
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          // Request was cancelled
          return;
        }

        const error = err instanceof Error ? err : new Error("Error desconocido");
        if (onError) {
          onError(error);
        }
        throw error;
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, conversationId, selectedCategory, isLoading, onResponse, onError, pollForTitle]
  );

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setInput("");
    setConversationId(undefined);
    setSelectedCategory("");
  }, []);

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    isLoadingMessages,
    stop,
    reset,
    conversationId,
    selectedCategory,
    setSelectedCategory,
  };
}