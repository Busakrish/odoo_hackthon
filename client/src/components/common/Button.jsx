import { Loader2 } from 'lucide-react';

/**
 * Button — primary reusable button
 *
 * Props:
 *   variant   {'primary'|'secondary'|'danger'|'ghost'|'outline'}
 *   size      {'sm'|'md'|'lg'}
 *   loading   {boolean}   - Shows spinner and disables button
 *   disabled  {boolean}
 *   leftIcon  {ReactNode}
 *   rightIcon {ReactNode}
 *   children  {ReactNode}
 *   className {string}
 *   ...rest   — all standard button attributes (onClick, type, etc.)
 */
const VARIANT_CLASSES = {
  primary:   'bg-primary text-white hover:bg-primary-700 focus:ring-primary/30',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300',
  danger:    'bg-danger text-white hover:bg-red-600 focus:ring-danger/30',
  ghost:     'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-200',
  outline:   'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-200',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2   text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
};

function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        focus:outline-none focus:ring-2 transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary}
        ${SIZE_CLASSES[size] ?? SIZE_CLASSES.md}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}

export default Button;
