import { Skeleton, Card } from "@heroui/react";

export default function SkeletonGrid({ count = 16 }: { count?: number }) {
  return (
    <div className="grid gap-3 xl:gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-3 space-y-3">
          <Skeleton className="h-5 w-2/3 rounded" />
          <div className="flex gap-2 items-center">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}
