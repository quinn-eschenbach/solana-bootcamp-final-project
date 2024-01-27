import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
export function ReviewCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-56" />
        </CardTitle>
        <Skeleton className="h-2 w-16 mt-1" />
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        <Skeleton className="h-3 w-full mt-2" />
        <Skeleton className="h-3 w-44 mt-2" />
      </CardContent>
      <CardFooter className="mt-auto">
        <p className="text-muted-foreground text-sm"> 0 of 10 Rating</p>
        <Button className="ml-auto" disabled variant={"ghost"}>
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}
