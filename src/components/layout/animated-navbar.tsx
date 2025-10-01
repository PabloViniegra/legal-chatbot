"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { UserButton } from "@clerk/nextjs";
import { Scale } from "lucide-react";
import { ThemeSwitcherWrapper } from "@/components/ui/theme-switcher-wrapper";
import { animateNavbar, animateLogo, animateTitle } from "@/animations/layout.animations";
import { DURATIONS, EASINGS } from "@/animations/config";
import { prefersReducedMotion } from "@/animations/utils";

export function AnimatedNavbar() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const brandContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      animateNavbar(headerRef.current);
    }

    if (logoRef.current) {
      animateLogo(logoRef.current);
    }

    if (titleRef.current) {
      animateTitle(titleRef.current);
    }

    // Add hover animation to brand (logo + title)
    if (brandContainerRef.current && !prefersReducedMotion()) {
      const brandElement = brandContainerRef.current;
      const logo = logoRef.current;
      const title = titleRef.current;

      const handleMouseEnter = () => {
        // Animate logo
        if (logo) {
          gsap.to(logo, {
            scale: 1.15,
            rotation: 360,
            duration: DURATIONS.medium,
            ease: EASINGS.smooth,
          });
        }

        // Animate title with color shift and scale
        if (title) {
          gsap.to(title, {
            scale: 1.05,
            x: 5,
            duration: DURATIONS.quick,
            ease: EASINGS.snappy,
          });
        }
      };

      const handleMouseLeave = () => {
        // Reset logo
        if (logo) {
          gsap.to(logo, {
            scale: 1,
            rotation: 0,
            duration: DURATIONS.medium,
            ease: EASINGS.elastic,
          });
        }

        // Reset title
        if (title) {
          gsap.to(title, {
            scale: 1,
            x: 0,
            duration: DURATIONS.quick,
            ease: EASINGS.snappy,
          });
        }
      };

      brandElement.addEventListener("mouseenter", handleMouseEnter);
      brandElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        brandElement.removeEventListener("mouseenter", handleMouseEnter);
        brandElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className="border-b border-border bg-card/50 backdrop-blur-sm shadow-sm"
    >
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <div ref={brandContainerRef} className="flex items-center gap-3 cursor-pointer">
          <div
            ref={logoRef}
            className="bg-primary p-2 rounded-lg shadow-md"
          >
            <Scale className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 ref={titleRef} className="text-xl font-bold text-foreground">
              LexIA
            </h1>
            <p className="text-xs text-muted-foreground">Asistente Legal IA</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitcherWrapper />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 ring-2 ring-border",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}