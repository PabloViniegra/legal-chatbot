"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { animateSkeletonShimmer } from "@/animations/loading.animations";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  const skeletonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (skeletonRef.current) {
      animateSkeletonShimmer(skeletonRef.current);
    }
  }, []);

  return (
    <div
      ref={skeletonRef}
      data-slot="skeleton"
      className={cn("bg-accent rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
