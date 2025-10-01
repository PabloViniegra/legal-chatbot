"use client";

import { ChatInterface } from "@/components/chat/chat-interface";
import { ConversationsList } from "@/components/sidebar/conversations-list";
import { useChatStore } from "@/stores/chat.store";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useOnboardingTour } from "@/hooks/use-onboarding-tour";
import { TourCompletionModal } from "@/components/onboarding/tour-completion-modal";

export default function HomePage() {
  const { sidebar, activeConversationId } = useChatStore();
  const [shouldShowTour, setShouldShowTour] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Verificar si el usuario debe ver el tour
  useEffect(() => {
    async function checkTourStatus() {
      try {
        const response = await fetch("/api/user/tour");
        if (response.ok) {
          const data = await response.json();
          setShouldShowTour(!data.hasCompletedTour);
        }
      } catch (error) {
        console.error("Error checking tour status:", error);
      }
    }

    checkTourStatus();
  }, []);

  // Marcar tour como completado
  const handleTourComplete = async () => {
    try {
      await fetch("/api/user/tour", { method: "POST" });
      setShouldShowTour(false);
    } catch (error) {
      console.error("Error completing tour:", error);
    }
  };

  // Mostrar modal de finalización
  const handleShowCompletionModal = () => {
    setShowCompletionModal(true);
  };

  // Cerrar modal y marcar como completado
  const handleCloseCompletionModal = async () => {
    setShowCompletionModal(false);
    await handleTourComplete();
  };

  // Iniciar tour
  useOnboardingTour({
    enabled: shouldShowTour,
    onComplete: handleTourComplete,
    onShowCompletionModal: handleShowCompletionModal,
  });

  // Cerrar sidebar en mobile por defecto
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && sidebar.isOpen) {
        sidebar.close();
      }
    };

    // Ejecutar al montar
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-[calc(100vh-73px)] font-sans relative">
      {/* Overlay para mobile */}
      {sidebar.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={sidebar.close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebar.isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${
          sidebar.isOpen ? "md:w-80" : "md:w-0"
        } fixed md:relative inset-y-0 left-0 z-50 w-80 transition-all duration-300 border-r border-sidebar-border bg-sidebar overflow-hidden`}
      >
        <ConversationsList />
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-background w-full">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm shadow-sm p-4 flex items-center gap-2">
          <Button
            data-tour="toggle-sidebar"
            variant="ghost"
            size="sm"
            onClick={sidebar.toggle}
            className="text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label={sidebar.isOpen ? "Cerrar sidebar" : "Abrir sidebar"}
          >
            {sidebar.isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <h2 className="text-lg font-semibold text-foreground">
            {activeConversationId ? "Conversación" : "Nueva Consulta"}
          </h2>
        </div>
        <div data-tour="chat-area" className="flex-1 p-4 md:p-6 overflow-hidden">
          <ChatInterface conversationId={activeConversationId || undefined} />
        </div>
      </main>

      {/* Modal de finalización del tour */}
      <TourCompletionModal
        isOpen={showCompletionModal}
        onClose={handleCloseCompletionModal}
      />
    </div>
  );
}
