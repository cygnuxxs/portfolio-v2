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

type ThemeMode = 'dark' | 'light' | 'system'
  
interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}

interface IProject {
  title : string;
  image : string;
  description : string;
  techstack : string[];
  github : string;
  preview : string;
}

interface ContactInfo {
  name : string;
  icon : React.ReactElement;
  href : string;
}