"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { animateAuthPage } from "@/animations/auth.animations";
import { DURATIONS, EASINGS } from "@/animations/config";
import { prefersReducedMotion } from "@/animations/utils";

interface AnimatedAuthWrapperProps {
  children: React.ReactNode;
  logo: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AnimatedAuthWrapper({
  children,
  logo,
  title,
  subtitle,
}: AnimatedAuthWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      animateAuthPage(containerRef.current);
    }

    // Add hover animation to logo
    if (logoRef.current && !prefersReducedMotion()) {
      const logoElement = logoRef.current;

      const handleMouseEnter = () => {
        gsap.to(logoElement, {
          scale: 1.1,
          rotation: 5,
          duration: DURATIONS.medium,
          ease: EASINGS.bounce,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(logoElement, {
          scale: 1,
          rotation: 0,
          duration: DURATIONS.medium,
          ease: EASINGS.elastic,
        });
      };

      logoElement.addEventListener("mouseenter", handleMouseEnter);
      logoElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        logoElement.removeEventListener("mouseenter", handleMouseEnter);
        logoElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-sans p-4">
      <div ref={containerRef} className="w-full max-w-md space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <div data-auth-logo className="flex justify-center mb-4">
            <div ref={logoRef} className="cursor-pointer">
              {logo}
            </div>
          </div>
          <h1 data-auth-title className="text-3xl font-bold text-foreground mb-2">
            {title}
          </h1>
          <p data-auth-subtitle className="text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Form content */}
        <div data-auth-form>{children}</div>
      </div>
    </div>
  );
}