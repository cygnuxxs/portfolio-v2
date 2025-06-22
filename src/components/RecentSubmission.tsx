import Link from "next/link";
import { cn } from "@/lib/utils";

const RecentSubmissionCard = ({
  submission,
}: {
  submission: RecentSubmission;
}) => {
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus.includes("accepted"))
      return "text-green-600 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/30";
    if (normalizedStatus.includes("wrong"))
      return "text-red-600 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30";
    if (normalizedStatus.includes("time limit"))
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800/30";
    return "text-gray-600 bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800/30";
  };

  const formatTimestamp = (timestamp: string): string => {
    if (!timestamp || !/^\d+$/.test(timestamp)) return "Recently";

    try {
      const date = new Date(Number(timestamp) * 1000);

      if (isNaN(date.getTime())) return "Recently";

      const now = new Date("2025-06-22T11:00:00+05:30");
      const diffMs = now.getTime() - date.getTime();

      if (diffMs < 0) return "Just now";

      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 0) {
        return diffDays === 1 ? "Yesterday" : `${diffDays}d ago`;
      }
      if (diffHours > 0) return `${diffHours}h ago`;
      if (diffMinutes > 0) return `${diffMinutes}m ago`;
      if (diffSeconds >= 10) return `${diffSeconds}s ago`;
      return "Just now";
    } catch {
      return "Recently";
    }
  };

  const getLangBadgeColor = (lang: string) => {
    const langColors: Record<string, string> = {
      javascript:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      python:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      java: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      cpp: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "c++":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      typescript:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      go: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400",
      rust: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    };
    return (
      langColors[lang.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    );
  };

  return (
    <div className="flex group p-2.5 sm:p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300 bg-card/50 items-start justify-between gap-2 sm:gap-3 flex-1 min-w-0">
      <div className="flex flex-col flex-1 min-w-0">
        <Link
          href={"https://leetcode.com" + submission.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium pb-3 text-xs sm:text-sm hover:text-primary transition-colors truncate"
        >
          {submission.title}
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap w-full">
          <span
            className={cn(
              "px-1 sm:px-1.5 py-0.5 rounded text-xs font-medium border truncate max-w-[100px] sm:max-w-[120px]",
              getStatusColor(submission.statusDisplay)
            )}
          >
            {submission.statusDisplay}
          </span>

          <span
            className={cn(
              "px-1 sm:px-1.5 py-0.5 rounded text-xs font-medium truncate max-w-[100px] sm:max-w-[120px]",
              getLangBadgeColor(submission.lang)
            )}
          >
            {submission.lang}
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground pl-2 pt-1 truncate max-w-[80px] sm:max-w-[100px]">
        {formatTimestamp(submission.timestamp)}
      </p>
    </div>
  );
};

export default RecentSubmissionCard;
