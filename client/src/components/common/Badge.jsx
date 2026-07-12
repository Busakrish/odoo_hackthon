/**
 * Badge — small label for status/category display
 *
 * Props:
 *   variant  {'default'|'success'|'warning'|'danger'|'info'}
 *   children {ReactNode}
 *   dot      {boolean}  - Show a colored dot before text (default: false)
 */
const VARIANT_CLASSES = {
  default: 'bg-slate-100 text-slate-600',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger:  'bg-danger/10  text-danger',
  info:    'bg-primary/10 text-primary',
};

const DOT_CLASSES = {
  default: 'bg-slate-400',
  success: 'bg-success',
  warning: 'bg-warning',
  danger:  'bg-danger',
  info:    'bg-primary',
};

function Badge({ variant = 'default', children, dot = false }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5
        rounded-full text-xs font-medium
        ${VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            DOT_CLASSES[variant] ?? DOT_CLASSES.default
          }`}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
