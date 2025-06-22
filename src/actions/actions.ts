'use server';

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
    next: { revalidate: 5 }, // optional ISR
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

export async function fetchRecentSubmissions(username: string, limit: number = 20): Promise<RecentSubmission[]> {
  const query = `
    query recentSubmissions($username: String!, $limit: Int!) {
      recentSubmissionList(username: $username, limit: $limit) {
        id
        title
        titleSlug
        timestamp
        statusDisplay
        lang
        url
      }
    }
  `;

  const variables = { username, limit };

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Cache for 1 minute since submissions change frequently
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recent submissions for ${username}`);
  }

  const json: RecentSubmissionsResponse = await response.json();

  return json.data?.recentSubmissionList ?? [];
}

export async function fetchLeetCodeData(username: string): Promise<{
  stats: SubmissionStat[];
  totalQuestions: Record<Difficulty, number>;
  totalAvailable: number;
  recentSubmissions: RecentSubmission[];
}> {
  try {
    const [statsData, recentSubmissions] = await Promise.all([
      fetchLeetCodeStats(username),
      fetchRecentSubmissions(username, 10)
    ]);

    return {
      ...statsData,
      recentSubmissions,
    };
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    throw error;
  }
}