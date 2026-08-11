export type ReadingTheme = 'light' | 'sepia' | 'dark';

export type StoryCategory = 
  | 'ప్రేమ' // Love
  | 'కుటుంబం' // Family
  | 'స్నేహం' // Friendship
  | 'జీవితం' // Life
  | 'ప్రేరణ' // Inspirational
  | 'హాస్యం' // Humor
  | 'రహస్యం' // Mystery
  | 'థ్రిల్లర్' // Thriller
  | 'ఫాంటసీ' // Fantasy
  | 'చారిత్రక' // Historical
  | 'భయం' // Horror
  | 'పిల్లల కథలు' // Kids
  | 'ఆధ్యాత్మికం' // Spiritual
  | 'సామాజికం'; // Social

export interface Author {
  id: string;
  name: string;
  teluguName: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  teluguBio: string;
  followersCount: number;
  storiesCount: number;
  novelsCount: number;
  jokesCount: number;
  isVerified?: boolean;
  isFollowing?: boolean;
  joinedDate: string;
  location?: string;
}

export interface Story {
  id: string;
  title: string;
  teluguTitle: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  teluguExcerpt: string;
  content: string[]; // Paragraphs in Telugu
  authorId: string;
  author: Author;
  category: StoryCategory;
  tags: string[];
  rating: number;
  viewCount: number;
  likeCount: number;
  bookmarkCount: number;
  readingTimeMinutes: number;
  publishedAt: string;
  status: 'published' | 'draft' | 'archived';
  isLiked?: boolean;
  isBookmarked?: boolean;
  progressPercent?: number;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  teluguTitle: string;
  content: string[];
  readingTimeMinutes: number;
  publishedAt: string;
}

export interface Novel {
  id: string;
  title: string;
  teluguTitle: string;
  slug: string;
  coverImage: string;
  description: string;
  teluguDescription: string;
  authorId: string;
  author: Author;
  category: StoryCategory;
  tags: string[];
  status: 'ongoing' | 'completed';
  chaptersCount: number;
  chapters: Chapter[];
  rating: number;
  viewCount: number;
  likeCount: number;
  bookmarkCount: number;
  publishedAt: string;
  updatedAt: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Joke {
  id: string;
  content: string;
  category: string;
  authorId: string;
  author: Author;
  likeCount: number;
  shareCount: number;
  publishedAt: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  storyId: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  teluguName?: string;
  avatar: string;
  bio?: string;
  teluguBio?: string;
  role: 'reader' | 'author' | 'admin';
  followersCount: number;
  followingCount: number;
  savedStoriesCount: number;
  publishedCount: number;
  preferences: {
    theme: ReadingTheme;
    fontSize: number;
    fontFamily: 'serif' | 'sans';
    notifications: boolean;
  };
}

export interface ReadingHistoryItem {
  storyId: string;
  story: Story;
  lastReadChapterId?: string;
  progressPercent: number;
  lastReadAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'story' | 'follower' | 'like' | 'system';
  linkId?: string;
}

export interface CreatorStats {
  totalReads: number;
  totalLikes: number;
  totalFollowers: number;
  monthlyReadsTrend: { month: string; reads: number }[];
  topStories: { id: string; title: string; reads: number; likes: number }[];
}
