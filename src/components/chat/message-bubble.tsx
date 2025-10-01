"use client";

import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/message.types";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/code-block";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { animateMessageEntry, animateCopySuccess } from "@/animations/message.animations";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = React.memo(function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  // Animate message entry
  useGSAP(() => {
    if (bubbleRef.current) {
      animateMessageEntry(bubbleRef.current, isUser);
    }
  }, [message.id]);

  // Animate copy success icon
  useEffect(() => {
    if (copied && iconRef.current) {
      const icon = iconRef.current.querySelector("svg");
      if (icon) {
        animateCopySuccess(icon as unknown as HTMLElement);
      }
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  // Función para detectar bloques de código
  const renderContent = () => {
    if (isUser) {
      return <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>;
    }

    // Para mensajes del asistente, usar Markdown
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
          code(props: React.ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
            const { inline, className, children, ...restProps } = props;
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && language) {
              return (
                <CodeBlock
                  code={codeString}
                  language={language}
                  showLineNumbers
                  className="my-2"
                >
                  <CodeBlockCopyButton />
                </CodeBlock>
              );
            }

            return (
              <code className={cn("font-mono text-xs bg-muted px-1.5 py-0.5 rounded", className)} {...restProps}>
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="text-sm">{children}</li>;
          },
          strong({ children }) {
            return <strong className="font-semibold text-foreground">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic">{children}</em>;
          },
        }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex w-full font-sans",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        ref={bubbleRef}
        className={cn(
          "max-w-[80%] rounded-lg shadow-sm relative group",
          isUser
            ? "bg-primary text-primary-foreground px-4 py-3"
            : "bg-muted text-foreground border border-border px-4 py-3 pr-12"
        )}
      >
        {renderContent()}

        {!isUser && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
            title="Copiar respuesta"
          >
            <span ref={iconRef}>
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
});