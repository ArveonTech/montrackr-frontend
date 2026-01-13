import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const SkeletonCard = ({ className }) => {
  return (
    <Card className={cn(`py-2`, className)}>
      <CardHeader>
        <div className="w-full flex justify-between items-center md:gap-2">
          <div className="flex gap-2 items-center w-full">
            <Skeleton className="h-4 w-5 xl:w-10" />
            <Skeleton className="h-5 w-full xl:w-24" />
          </div>
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
