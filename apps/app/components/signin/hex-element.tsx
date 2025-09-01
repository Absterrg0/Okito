


export const HexElement = ({ size = 40, delay = 0, className = "" }) => (
    <div 
      className={`absolute opacity-8 animate-hex-float ${className}`} 
      style={{ animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M17.5 6.5L12 3L6.5 6.5V17.5L12 21L17.5 17.5V6.5Z"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
        />
      </svg>
    </div>
  )