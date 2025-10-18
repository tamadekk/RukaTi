interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <h1
        className={`font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent ${sizeClasses[size]}`}
      >
        RukaTi
      </h1>
    </div>
  );
};

export default Logo;
