/**
 * PageHeader — reusable page title + description + optional action slot
 *
 * Props:
 *   title       {string}     - Main heading
 *   description {string}     - Subtitle / description (optional)
 *   actions     {ReactNode}  - Right-side action buttons (optional)
 *   breadcrumbs {Array}      - [{ label, to }] breadcrumb items (optional)
 */
function PageHeader({ title, description, actions, breadcrumbs }) {
  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span>/</span>}
              <span className={i === breadcrumbs.length - 1 ? 'text-slate-600 font-medium' : ''}>
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      )}

      {/* Title Row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
