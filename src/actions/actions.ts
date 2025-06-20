'use server';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface SubmissionStat {
  difficulty: Difficulty;
  count: number;
  submissions: number;
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

export async function fetchLeetCodeStats(username: string): Promise<{
  stats: SubmissionStat[];
  totalQuestions: Record<Difficulty, number>;
  totalAvailable: number;
}> {
  const query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
  `;

  const variables = { username };

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // optional ISR
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch LeetCode data for ${username}`);
  }

  const json: LeetCodeResponse = await response.json();

  const rawStats = json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
  const allQuestions = json.data?.allQuestionsCount ?? [];

  // Process user stats
  const filtered: SubmissionStat[] = rawStats
    .filter((s) => ['Easy', 'Medium', 'Hard'].includes(s.difficulty))
    .sort((a, b) => {
      const order: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };
      return order[a.difficulty as Difficulty] - order[b.difficulty as Difficulty];
    }) as SubmissionStat[];

  // Process total questions available
  const totalQuestions: Record<Difficulty, number> = {
    Easy: 0,
    Medium: 0,
    Hard: 0,
  };

  allQuestions
    .filter((q) => ['Easy', 'Medium', 'Hard'].includes(q.difficulty))
    .forEach((q) => {
      totalQuestions[q.difficulty as Difficulty] = q.count;
    });

  const totalAvailable = Object.values(totalQuestions).reduce((sum, count) => sum + count, 0);

  return {
    stats: filtered,
    totalQuestions,
    totalAvailable,
  };
}