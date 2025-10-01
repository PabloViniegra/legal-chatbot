import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "@/components/ui/card";

export function MessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div
      className={`flex w-full font-sans ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="max-w-[80%] space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}

export function MessagesLoadingSkeleton() {
  return (
    <CardContent className="flex-1 overflow-y-auto space-y-4 p-6 font-sans">
      <MessageSkeleton isUser={false} />
      <MessageSkeleton isUser={true} />
      <MessageSkeleton isUser={false} />
      <MessageSkeleton isUser={true} />
      <MessageSkeleton isUser={false} />
    </CardContent>
  );
}