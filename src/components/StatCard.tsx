import { cn } from "@/lib/utils";
import { ProgressBar } from "./Progress";
const StatCard = ({
  difficulty,
  count,
  total,
  acceptance,
  color,
  bgColor,
}: {
  difficulty: string;
  count: number;
  total: number;
  acceptance: string;
  color: string;
  bgColor: string;
}) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border p-2 sm:p-4 transition-all duration-300",
        "hover:shadow-lg hover:border-primary/50",
        bgColor
      )}
    >
      <div className="flex items-center justify-between mb-1 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={cn(
              "w-2 h-2 sm:w-3 sm:h-3 rounded-full shadow-sm",
              difficulty === "Easy" && "bg-green-500 shadow-green-500/30",
              difficulty === "Medium" && "bg-yellow-500 shadow-yellow-500/30",
              difficulty === "Hard" && "bg-red-500 shadow-red-500/30"
            )}
          />
          <span className={cn("font-semibold text-xs", color)}>
            {difficulty}
          </span>
        </div>
        <div className="text-right">
          <p className="font-bold text-sm sm:text-lg leading-none">
            {count}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              /{total}
            </span>
          </p>
        </div>
      </div>

      <ProgressBar
        percentage={percentage}
        color={
          difficulty === "Easy"
            ? "bg-green-500"
            : difficulty === "Medium"
            ? "bg-yellow-500"
            : "bg-red-500"
        }
        height="h-1"
      />

      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-muted-foreground">
          {percentage.toFixed(1)}% solved
        </span>
        <span className="text-xs text-muted-foreground">
          {acceptance}% accepted
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 sm:duration-700" />
    </div>
  );
};
export default StatCard