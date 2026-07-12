/**
 * Card — base container component
 *
 * Props:
 *   children    {ReactNode}
 *   className   {string}    - Additional Tailwind classes
 *   padding     {boolean}   - Whether to apply default padding (default: true)
 *   hover       {boolean}   - Adds hover shadow effect (default: false)
 *   onClick     {function}  - Makes card clickable
 */
function Card({ children, className = '', padding = true, hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-card rounded-xl border border-slate-200 shadow-card
        ${padding ? 'p-6' : ''}
        ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/**
 * Card.Header — optional header sub-component
 */
Card.Header = function CardHeader({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card.Title — styled card heading
 */
Card.Title = function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-base font-semibold text-slate-700 ${className}`}>{children}</h3>
  );
};

/**
 * Card.Divider — horizontal rule inside card
 */
Card.Divider = function CardDivider() {
  return <hr className="border-slate-100 my-4" />;
};

export default Card;
