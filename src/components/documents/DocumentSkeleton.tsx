
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DocumentSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Skeleton className="h-5 w-5" />
            </div>
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-36" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-48 mt-1" />
            </div>
          </div>
          <div className="flex mt-3 sm:mt-0 space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
