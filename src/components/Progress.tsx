import { cn } from "@/lib/utils";

export const CircularProgress = ({
  percentage,
  size = 80,
  strokeWidth = 8,
  color = "text-primary",
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(color, "transition-all duration-1000 ease-out")}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs sm:text-lg font-bold">
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export const ProgressBar = ({
  percentage,
  color = "bg-primary",
  height = "h-2",
}: {
  percentage: number;
  color?: string;
  height?: string;
}) => (
  <div
    className={cn("w-full bg-muted/30 rounded-full overflow-hidden", height)}
  >
    <div
      className={cn(
        color,
        "rounded-full transition-all duration-1000 ease-out",
        height
      )}
      style={{ width: `${Math.min(percentage, 100)}%` }}
    />
  </div>
);