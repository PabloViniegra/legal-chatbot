"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function UserProfile() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <div className="p-4 border-t border-sidebar-border bg-sidebar">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-accent rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-sidebar-accent rounded w-24 mb-2"></div>
            <div className="h-3 bg-sidebar-accent rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-4 border-t border-sidebar-border bg-sidebar font-sans">
      <div className="flex items-center gap-3">
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || "Usuario"}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-sidebar-border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center ring-2 ring-sidebar-border">
            <User className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-sidebar-foreground truncate">
            {user.fullName || user.firstName || "Usuario"}
          </p>
          <p className="text-xs text-sidebar-foreground/60 truncate font-mono">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut()}
          className="text-sidebar-foreground/60 hover:text-destructive transition-colors"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}