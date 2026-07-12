/**
 * LoadingSkeleton — animated placeholder while data loads
 *
 * Props:
 *   rows        {number}   - Number of skeleton rows (default: 5)
 *   type        {string}   - 'table' | 'card' | 'detail' (default: 'table')
 */
function LoadingSkeleton({ rows = 5, type = 'table' }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-3 bg-slate-200 rounded w-1/2 mb-4" />
            <div className="h-7 bg-slate-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="h-px bg-slate-200 rounded my-4" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-4 bg-slate-200 rounded flex-1" />
          </div>
        ))}
      </div>
    );
  }

  // Default: table rows
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
          <div className="h-6 w-16 bg-slate-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
