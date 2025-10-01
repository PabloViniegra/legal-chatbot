"use client";

import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";

interface TourCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TourCompletionModal({ isOpen, onClose }: TourCompletionModalProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && iconRef.current && contentRef.current && sparklesRef.current) {
      const tl = gsap.timeline();

      // Animación del icono
      tl.fromTo(
        iconRef.current,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );

      // Animación de las estrellas
      tl.fromTo(
        sparklesRef.current.children,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(2)",
        },
        "-=0.3"
      );

      // Animación del contenido
      tl.fromTo(
        contentRef.current.children,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Animación de pulsación continua del icono
      gsap.to(iconRef.current, {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md font-sans">
        <DialogTitle className="sr-only">Tour Completado</DialogTitle>
        <div className="flex flex-col items-center justify-center py-6 px-4 space-y-6">
          {/* Icono principal con animación */}
          <div ref={iconRef} className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <CheckCircle2 className="w-20 h-20 text-primary relative z-10" />
          </div>

          {/* Estrellas decorativas */}
          <div ref={sparklesRef} className="absolute top-10 left-0 right-0 flex justify-around px-8 pointer-events-none">
            <Sparkles className="w-6 h-6 text-primary/60" />
            <Sparkles className="w-5 h-5 text-primary/40" />
            <Sparkles className="w-7 h-7 text-primary/50" />
            <Sparkles className="w-5 h-5 text-primary/40" />
            <Sparkles className="w-6 h-6 text-primary/60" />
          </div>

          {/* Contenido del texto */}
          <div ref={contentRef} className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              ¡Tour Completado!
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Ya conoces todas las funcionalidades principales de LexIA.
              Ahora estás listo para realizar tus consultas legales.
            </p>
            <div className="pt-4">
              <Button
                onClick={onClose}
                className="px-8 py-2 font-semibold transition-all hover:scale-105"
              >
                ¡Empezar a usar LexIA!
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
