import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import LeetcodeIcon from "@/components/icons/leetcode.svg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export interface SubmissionStat {
  difficulty: "Easy" | "Medium" | "Hard";
  count: number;
  submissions: number;
}

export interface LeetcodeStatsProps {
  stats: SubmissionStat[];
  totalQuestions: Record<"Easy" | "Medium" | "Hard", number>;
  totalAvailable: number;
}

const CircularProgress = ({ 
  percentage, 
  size = 80, 
  strokeWidth = 8,
  color = "text-primary"
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
        <span className="text-lg font-bold">{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
};

const ProgressBar = ({ 
  percentage, 
  color = "bg-primary",
  height = "h-2"
}: { 
  percentage: number; 
  color?: string;
  height?: string;
}) => (
  <div className={cn("w-full bg-muted/30 rounded-full overflow-hidden", height)}>
    <div 
      className={cn(color, "rounded-full transition-all duration-1000 ease-out", height)}
      style={{ width: `${Math.min(percentage, 100)}%` }}
    />
  </div>
);

const StatCard = ({ 
  difficulty, 
  count, 
  total, 
  acceptance,
  color,
  bgColor 
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
    <div className={cn(
      "group relative overflow-hidden rounded-xl border p-4 transition-all duration-300",
      "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
      bgColor
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-3 h-3 rounded-full shadow-sm",
            difficulty === 'Easy' && 'bg-green-500 shadow-green-500/30',
            difficulty === 'Medium' && 'bg-yellow-500 shadow-yellow-500/30',
            difficulty === 'Hard' && 'bg-red-500 shadow-red-500/30'
          )} />
          <span className={cn("font-semibold text-sm", color)}>
            {difficulty}
          </span>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg leading-none">
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
          difficulty === 'Easy' ? 'bg-green-500' :
          difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
        }
        height="h-1.5"
      />
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-muted-foreground">
          {percentage.toFixed(1)}% solved
        </span>
        <span className="text-xs text-muted-foreground">
          {acceptance}% accepted
        </span>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
};

const LeetcodeStats = ({
  stats = [],
  totalQuestions,
  totalAvailable,
}: LeetcodeStatsProps) => {
  const totalSolved = stats.reduce((sum, stat) => sum + stat.count, 0);
  const totalSubmissions = stats.reduce((sum, stat) => sum + stat.submissions, 0);
  const overallProgress = totalAvailable > 0 ? (totalSolved / totalAvailable) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "Hard":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/30";
      case "Medium":
        return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800/30";
      case "Hard":
        return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30";
      default:
        return "bg-gray-50 dark:bg-gray-950/20";
    }
  };

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button
          className={cn(
            "group relative overflow-hidden",
            "flex gap-2 text-xs rounded-xl font-medium border-2 border-primary/20",
            "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5",
            "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20",
            "transition-all duration-300 hover:scale-105",
            "text-primary hover:text-primary"
          )}
          size="sm"
          variant="ghost"
        >
          <LeetcodeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="hidden sm:inline">LeetCode</span>
          <span className="font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {totalSolved}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </Button>
      </HoverCardTrigger>
      
      <HoverCardContent 
        align="end" 
        className="w-96 p-0 border-2 border-primary/20 shadow-2xl shadow-primary/10 rounded-2xl overflow-hidden"
        sideOffset={8}
      >
        <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 p-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-primary/10">
              <LeetcodeIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              LeetCode Statistics
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center space-y-3">
              <CircularProgress 
                percentage={overallProgress} 
                size={100}
                strokeWidth={10}
                color="text-primary"
              />
              <div>
                <p className="text-3xl font-bold text-primary">
                  {totalSolved}
                </p>
                <p className="text-sm text-muted-foreground">
                  of {totalAvailable} solved
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {stats.map((stat) => {
                const acceptance = stat.submissions > 0 
                  ? ((stat.count / stat.submissions) * 100).toFixed(1)
                  : "0.0";

                return (
                  <StatCard
                    key={stat.difficulty}
                    difficulty={stat.difficulty}
                    count={stat.count}
                    total={totalQuestions[stat.difficulty]}
                    acceptance={acceptance}
                    color={getDifficultyColor(stat.difficulty)}
                    bgColor={getDifficultyBgColor(stat.difficulty)}
                  />
                );
              })}
            </div>
          </div>

          <div className="border-t border-primary/10 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Submissions</span>
                <span className="font-semibold">{totalSubmissions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-semibold">
                  {totalSubmissions > 0 ? ((totalSolved / totalSubmissions) * 100).toFixed(1) : '0'}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default LeetcodeStats;