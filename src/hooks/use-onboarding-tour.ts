"use client";

import { driver, type Config, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect, useState } from "react";

interface UseOnboardingTourProps {
  enabled: boolean;
  onComplete?: () => void;
  onShowCompletionModal?: () => void;
}

export function useOnboardingTour({ enabled, onComplete, onShowCompletionModal }: UseOnboardingTourProps) {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!enabled || hasStarted) return;

    // Esperar a que el DOM esté completamente cargado
    const timer = setTimeout(() => {
      const driverSteps: DriveStep[] = [
        {
          element: "aside",
          popover: {
            title: "Historial de Conversaciones",
            description: "Aquí encontrarás todas tus consultas anteriores. Puedes acceder a ellas en cualquier momento.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "[data-tour='chat-area']",
          popover: {
            title: "Área de Chat",
            description: "Este es el espacio principal donde realizarás tus consultas sobre legislación española y verás las respuestas.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "[data-tour='chat-input']",
          popover: {
            title: "Escribe tu Consulta",
            description: "Escribe aquí cualquier pregunta relacionada con legislación española. Por ejemplo: '¿Cuáles son mis derechos en caso de despido?'",
            side: "top",
            align: "center",
          },
        },
        {
          element: "[data-tour='toggle-sidebar']",
          popover: {
            title: "Mostrar/Ocultar Historial",
            description: "Usa este botón para mostrar u ocultar el historial de conversaciones cuando lo necesites.",
            side: "bottom",
            align: "start",
          },
        },
      ];

      const driverConfig: Config = {
        showProgress: true,
        steps: driverSteps,
        nextBtnText: "Siguiente",
        prevBtnText: "Anterior",
        doneBtnText: "Finalizar",
        progressText: "{{current}} de {{total}}",
        onDestroyStarted: () => {
          // Si no hay más pasos, completar el tour
          if (!driverObj.hasNextStep()) {
            driverObj.destroy();
            return true;
          }

          // Si el usuario está cerrando antes de terminar, no pedir confirmación
          driverObj.destroy();
          if (onComplete) {
            onComplete();
          }
          return true;
        },
        onDestroyed: (element, step, options) => {
          // Solo mostrar el modal si se completó el tour (último paso)
          if (options.state?.activeIndex === driverSteps.length - 1 || !driverObj.hasNextStep()) {
            if (onShowCompletionModal) {
              onShowCompletionModal();
            }
          } else if (onComplete) {
            // Si se cerró antes de terminar, solo marcar como completado
            onComplete();
          }
        },
      };

      const driverObj = driver(driverConfig);
      driverObj.drive();
      setHasStarted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [enabled, hasStarted, onComplete, onShowCompletionModal]);

  return { hasStarted };
}
