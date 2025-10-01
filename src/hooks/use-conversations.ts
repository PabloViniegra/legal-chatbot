"use client";

import { useState, useEffect, useCallback } from "react";
import { useChatStore } from "@/stores/chat.store";

export function useConversations() {
  const {
    conversations,
    setConversations,
    addConversation,
    removeConversation,
  } = useChatStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/conversations");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al cargar conversaciones");
      }

      setConversations(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [setConversations]);

  const createConversation = useCallback(
    async (title: string, category?: string) => {
      try {
        const response = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, category }),
        });

        let result;
        try {
          result = await response.json();
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          throw new Error("Error al procesar la respuesta del servidor");
        }

        console.log("Create conversation response:", {
          status: response.status,
          result,
        });

        if (!response.ok) {
          const errorMessage =
            result.error || result.details || "Error al crear conversación";
          console.error("Error creating conversation:", {
            status: response.status,
            result,
          });
          throw new Error(errorMessage);
        }

        addConversation(result.data);
        return result.data;
      } catch (err) {
        console.error("Exception creating conversation:", err);
        throw err;
      }
    },
    [addConversation]
  );

  const deleteConversation = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/conversations/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Error al eliminar conversación");
        }

        removeConversation(id);
      } catch (err) {
        throw err;
      }
    },
    [removeConversation]
  );

  useEffect(() => {
    // Solo cargar conversaciones si el store está vacío
    if (conversations.length === 0) {
      fetchConversations();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
    createConversation,
    deleteConversation,
  };
}
