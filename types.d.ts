type ThemeColors =
  | "Zinc"
  | "Slate"
  | "Neutral"
  | "Gray"
  | "Stone"
  | "Red"
  | "Rose"
  | "Orange"
  | "Green"
  | "Blue"
  | "Yellow"
  | "Violet";

interface SubmissionStat {
  difficulty: Difficulty;
  count: number;
  submissions: number;
}

interface SubmissionStat {
  difficulty: "Easy" | "Medium" | "Hard";
  count: number;
  submissions: number;
}
interface LeetcodeStatsProps {
  stats: SubmissionStat[];
  totalQuestions: Record<"Easy" | "Medium" | "Hard", number>;
  totalAvailable: number;
  recentSubmissions: RecentSubmission[];
}

type Difficulty = "Easy" | "Medium" | "Hard";

interface SubmissionStat {
  difficulty: Difficulty;
  count: number;
  submissions: number;
}

interface RecentSubmission {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
  url: string;
}

interface LeetCodeResponse {
  data: {
    matchedUser: {
      submitStatsGlobal: {
        acSubmissionNum: {
          difficulty: string;
          count: number;
          submissions: number;
        }[];
      };
      problemsSolvedBeatsStats: {
        difficulty: string;
        percentage: number;
      }[];
    };
    allQuestionsCount: {
      difficulty: string;
      count: number;
    }[];
  };
}

interface RecentSubmissionsResponse {
  data: {
    recentSubmissionList: {
      id: string;
      title: string;
      titleSlug: string;
      timestamp: string;
      statusDisplay: string;
      lang: string;
      url: string;
    }[];
  };
}

type ThemeMode = "dark" | "light" | "system";

interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}

interface IProject {
  title: string;
  image: string;
  description: string;
  techstack: string[];
  github: string;
  preview: string;
}

interface ContactInfo {
  name: string;
  icon: React.ReactElement;
  href: string;
}
