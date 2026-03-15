import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar skeleton */}
      <aside className="flex w-56 shrink-0 flex-col gap-6 border-r border-[var(--gray-200)] p-4">
        {/* Logo placeholder */}
        <Skeleton className="h-8 w-32" />

        {/* Nav item placeholders */}
        <nav className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header skeleton */}
        <header className="flex items-center justify-end border-b border-[var(--gray-200)] px-6 py-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </header>

        {/* Content skeleton — 3 card placeholders */}
        <main className="flex flex-1 flex-col gap-6 p-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--gray-200)] p-5"
            >
              {/* Title placeholder */}
              <Skeleton className="mb-4 h-5 w-48" />

              {/* Text line placeholders */}
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-4 h-4 w-3/4" />

              {/* Tag placeholders */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
