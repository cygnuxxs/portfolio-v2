'use server';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

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
    };
  };
}

export async function fetchLeetCodeStats(username: string): Promise<SubmissionStat[]> {
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

  const filtered: SubmissionStat[] = rawStats
    .filter((s) => ['Easy', 'Medium', 'Hard'].includes(s.difficulty))
    .sort((a, b) => {
      const order: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };
      return order[a.difficulty as Difficulty] - order[b.difficulty as Difficulty];
    }) as SubmissionStat[];

  return filtered;
}
