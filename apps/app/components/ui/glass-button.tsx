import { Button } from "./button";
interface GlassButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
}

export default function GlassButton({ 
  onClick, 
  children, 
  className = "",
  variant = 'default',
  disabled = false
}: GlassButtonProps) {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `
          bg-primary/10 hover:bg-primary/20 
          dark:bg-primary/15 dark:hover:bg-primary/25 
          text-primary border-primary/30 hover:border-primary/50
          shadow-primary/10 hover:shadow-primary/20
        `;
      case 'secondary':
        return `
          bg-secondary/10 hover:bg-secondary/20 
          dark:bg-secondary/15 dark:hover:bg-secondary/25 
          text-secondary border-secondary/30 hover:border-secondary/50
          shadow-secondary/10 hover:shadow-secondary/20
        `;
      default:
        return `
          bg-background/50 hover:bg-background/70 
          dark:bg-background/30 dark:hover:bg-background/50 
          text-foreground border-border hover:border-primary/30
          shadow-foreground/5 hover:shadow-foreground/10
        `;
    }
  };

  return (
    <Button
      onClick={onClick}
      className={`
        w-full h-12 text-sm font-semibold 
        crypto-glass border 
        transition-all duration-300 ease-out
        shadow-lg hover:shadow-xl 
        relative overflow-hidden
        ${getVariantClasses()}
        ${className}
      `}
      disabled={disabled}
    >
      <div className="flex items-center justify-center relative z-10">
        {children}
      </div>
    </Button>
  )
}