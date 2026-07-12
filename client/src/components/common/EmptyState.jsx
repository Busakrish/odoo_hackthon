import { PackageOpen } from 'lucide-react';

/**
 * EmptyState — shown when a list or table has no data
 *
 * Props:
 *   title       {string}     - Primary message
 *   description {string}     - Supporting text (optional)
 *   icon        {ReactNode}  - Custom icon (optional, defaults to PackageOpen)
 *   action      {ReactNode}  - CTA button or link (optional)
 */
function EmptyState({ title = 'No data found', description, icon, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Icon */}
      <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        {icon || <PackageOpen size={24} className="text-slate-400" />}
      </div>

      {/* Text */}
      <h3 className="text-base font-semibold text-slate-700 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 max-w-sm">{description}</p>
      )}

      {/* Action */}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
