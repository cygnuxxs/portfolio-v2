import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import LeetcodeIcon from "@/components/icons/leetcode.svg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const LeetcodeStats = ({ stats }: { stats: SubmissionStat[] }) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="text-orange-500/80 hover:text-orange-500" asChild>
        <Button
          className={cn(
            "flex gap-2 text-xs rounded-lg font-medium border border-primary",
            "[background:linear-gradient(to_bottom,var(--primary),var(--primary) 5%)]",
            "shadow-[inset_0_-0.1px_currentColor,inset_0_0_0_1px_currentColor,_0_0.1px_10px_currentColor]",
          )}
          size={"sm"}
          variant={"outline"}
        >
          <LeetcodeIcon /> <p className="hidden max-sm:block">Leetcode Stats</p>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent></HoverCardContent>
    </HoverCard>
  );
};

export default LeetcodeStats;
