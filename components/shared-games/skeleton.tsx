export function SharedGamesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 rounded-xl bg-muted animate-pulse">
          <div className="p-2 rounded-lg bg-muted-foreground/20">
            <div className="w-6 h-6 rounded-md bg-muted-foreground/20" />
          </div>

          <div className="h-6 w-32 bg-muted-foreground/20 rounded-md" />
        </div>
      ))}
    </div>
  );
}
