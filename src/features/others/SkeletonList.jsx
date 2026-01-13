import { Skeleton } from "@/components/ui/skeleton";

const SkeletonList = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-20 rounded-full" />

        <Skeleton className="h-8 w-8 rounded-md" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <Skeleton className="h-4 w-24" />
    </div>
  );
};

export default SkeletonList;
