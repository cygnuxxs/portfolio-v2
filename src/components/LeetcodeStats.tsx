import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LeetcodeIcon from "@/components/icons/leetcode.svg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import RecentSubmissionCard from "./RecentSubmission";
import { CircularProgress } from "./Progress";
import StatCard from "./StatCard";
import Link from "next/link";
import { ExternalLink, Code } from "lucide-react";

const LeetcodeStats = ({
  stats = [],
  totalQuestions,
  totalAvailable,
  recentSubmissions = [],
}: LeetcodeStatsProps) => {
  const totalSolved = stats.reduce((sum, stat) => sum + stat.count, 0);
  const totalSubmissions = stats.reduce(
    (sum, stat) => sum + stat.submissions,
    0
  );
  const overallProgress =
    totalAvailable > 0 ? (totalSolved / totalAvailable) * 100 : 0;

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

  const StatsContent = () => (
    <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 p-2 sm:p-4 w-full max-w-full overflow-y-auto">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-6">
        <div className="p-1 sm:p-2 rounded-full bg-primary/10">
          <LeetcodeIcon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
        </div>
        <h3 className="font-bold text-sm sm:text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          LeetCode Statistics
        </h3>
      </div>
      <div className="flex flex-wrap gap-3 w-full overflow-y-auto">
        <div className="text-center flex-1 space-y-2">
          <div className="space-y-2">
            <Link
              href="https://leetcode.com/u/cygnuxxs/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 p-2 text-xs font-medium text-white bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg shadow-lg hover:shadow-xl hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 mx-auto"
              aria-label="Visit LeetCode profile"
            >
              <Code
                className={`w-4 h-4 transition-transform group-hover:rotate-12 duration-300`}
              />
              <span>Profile</span>
              <ExternalLink
                className={`w-3 h-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </div>
          <CircularProgress
            percentage={overallProgress}
            size={60}
            strokeWidth={6}
            color="text-primary"
          />
          <div>
            <p className="text-xl sm:text-3xl font-bold text-primary">
              {totalSolved}
            </p>
            <p className="text-xs text-muted-foreground">
              of {totalAvailable} solved
            </p>
          </div>

          {/* Summary Stats */}
          <div className="border-t border-primary/10 pt-2 sm:pt-4">
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between items-center p-1.5 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Submissions</span>
                <span className="font-semibold">
                  {totalSubmissions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-1.5 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-semibold">
                  {totalSubmissions > 0
                    ? ((totalSolved / totalSubmissions) * 100).toFixed(1)
                    : "0"}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Cards */}
        <div className="space-y-2 flex-1">
          {stats.map((stat) => {
            const acceptance =
              stat.submissions > 0
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
        {recentSubmissions.length > 0 && (
          <div className="flex-1 pt-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-xs text-foreground">
                Recent Submissions
              </h4>
              <span className="text-xs text-muted-foreground">
                ({recentSubmissions.length} latest)
              </span>
            </div>

            <div
              className="h-[19rem] flex flex-col gap-y-2 max-sm:max-w-[90vw] overflow-y-auto pr-1 scroll-smooth"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              {recentSubmissions.map((submission) => (
                <RecentSubmissionCard
                  key={submission.id}
                  submission={submission}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: HoverCard */}
      <div className="max-sm:hidden sm:block">
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button
              className={cn(
                "group relative overflow-hidden",
                "flex gap-2 text-xs rounded-xl font-medium border-2 border-primary/20",
                "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5",
                "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20",
                "transition-all duration-300",
                "text-primary hover:text-primary px-3 py-1.5"
              )}
              size="sm"
              variant="ghost"
              aria-label="View LeetCode Statistics"
            >
              <LeetcodeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">LeetCode</span>
              <span className="font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {totalSolved}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent
            align="end"
            className="max-w-screen w-fit p-0 border-2 border-primary/20 shadow-2xl shadow-primary/10 rounded-2xl overflow-hidden"
            sideOffset={8}
          >
            <StatsContent />
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Mobile: Dialog */}
      <div className="block sm:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className={cn(
                "group relative overflow-hidden",
                "flex gap-2 text-xs rounded-xl font-medium border-2 border-primary/20",
                "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5",
                "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20",
                "transition-all duration-300",
                "text-primary hover:text-primary px-4 py-2"
              )}
              size="sm"
              variant="ghost"
              aria-label="View LeetCode Statistics"
            >
              <LeetcodeIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {totalSolved}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[380px] h-[calc(100dvh-4rem)] overflow-y-auto p-0 border-2 border-primary/20 shadow-2xl shadow-primary/10 rounded-2xl">
            <DialogTitle hidden>Leetcode statistics</DialogTitle>
            <StatsContent />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default LeetcodeStats;
