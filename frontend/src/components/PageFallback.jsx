/**
 * Lightweight fallback shown while a lazy-loaded route chunk downloads.
 * Much smaller than the full Loader (which is also fine) — just a
 * centered Gigar-style spinner so the user sees immediate feedback.
 */
export default function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-gigar-red/15" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-gigar-red border-t-transparent" />
        </div>
        <p className="text-sm font-medium text-gigar-navy/70">Loading…</p>
      </div>
    </div>
  )
}
