export interface TrendingTopic {
  category: string;
  topic: string;
  postsCount: number;
}

export type TrendingData = TrendingTopic[];

const MockTrend: TrendingData = [
  {
    category: "Trending in South Korea",
    topic: "큐브 삭제",
    postsCount: 1579,
  },
  {
    category: "Trending in South Korea",
    topic: "전과 2범",
    postsCount: 4875,
  },
  {
    category: "Trending in South Korea",
    topic: "#GOTCHA",
    postsCount: 4202,
  },
  {
    category: "Trending in South Korea",
    topic: "광주 부산",
    postsCount: 68100,
  },
  {
    category: "Trending in South Korea",
    topic: "솔로지옥",
    postsCount: 12400,
  },
  {
    category: "Trending in South Korea",
    topic: "브라이언",
    postsCount: 9128,
  },
  {
    category: "Trending in South Korea",
    topic: "우리집 고양이",
    postsCount: 2349,
  },
  {
    category: "Trending in South Korea",
    topic: "라인ck",
    postsCount: 7898,
  },
];

export { MockTrend };
