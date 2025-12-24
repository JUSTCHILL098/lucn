import { Skeleton } from "@/components/ui/skeleton"

export default function StatusSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
    </div>
  )
}
