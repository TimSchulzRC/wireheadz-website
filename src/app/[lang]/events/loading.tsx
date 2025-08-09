export default function Loading() {
  return (
    <div
      className="container mx-auto py-12 md:py-16"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-pulse">
        <div className="h-8 w-48 rounded bg-muted" />
        <div className="h-4 w-80 max-w-[700px] rounded bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-border"
          >
            <div className="aspect-video w-full bg-muted" />
            <div className="space-y-3 p-4 animate-pulse">
              <div className="h-5 w-2/3 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading events…</span>
    </div>
  );
}
