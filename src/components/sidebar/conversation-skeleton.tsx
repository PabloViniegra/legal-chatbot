import { Skeleton } from "@/components/ui/skeleton";

export function ConversationSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-lg p-3">
      <Skeleton className="h-4 w-4 flex-shrink-0 rounded" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
      </div>
      <Skeleton className="h-8 w-8 rounded" />
    </div>
  );
}

export function ConversationsListSkeleton() {
  return (
    <div className="flex flex-col h-full font-sans bg-sidebar">
      <div className="p-4 border-b border-sidebar-border">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <ConversationSkeleton key={i} />
        ))}
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </div>
  );
}