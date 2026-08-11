import { Story, StoryCategory } from '../types';
import { MOCK_STORIES } from './mockData';

class StoryService {
  private stories: Story[] = [...MOCK_STORIES];

  public async getTrendingStories(): Promise<Story[]> {
    await new Promise(res => setTimeout(res, 200));
    return [...this.stories].sort((a, b) => b.viewCount - a.viewCount);
  }

  public async getPopularStoriesThisWeek(): Promise<Story[]> {
    await new Promise(res => setTimeout(res, 200));
    return [...this.stories].sort((a, b) => b.likeCount - a.likeCount);
  }

  public async getNewReleases(): Promise<Story[]> {
    await new Promise(res => setTimeout(res, 200));
    return [...this.stories].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  public async getStoriesByCategory(category: StoryCategory): Promise<Story[]> {
    await new Promise(res => setTimeout(res, 200));
    return this.stories.filter(s => s.category === category);
  }

  public async getStoryById(id: string): Promise<Story | undefined> {
    await new Promise(res => setTimeout(res, 200));
    return this.stories.find(s => s.id === id);
  }

  public async toggleLike(storyId: string): Promise<boolean> {
    const story = this.stories.find(s => s.id === storyId);
    if (story) {
      story.isLiked = !story.isLiked;
      story.likeCount += story.isLiked ? 1 : -1;
      return story.isLiked;
    }
    return false;
  }

  public async toggleBookmark(storyId: string): Promise<boolean> {
    const story = this.stories.find(s => s.id === storyId);
    if (story) {
      story.isBookmarked = !story.isBookmarked;
      story.bookmarkCount += story.isBookmarked ? 1 : -1;
      return story.isBookmarked;
    }
    return false;
  }

  public async searchStories(query: string, category?: string): Promise<Story[]> {
    await new Promise(res => setTimeout(res, 200));
    const q = query.toLowerCase().trim();
    return this.stories.filter(s => {
      const matchesCategory = !category || s.category === category;
      const matchesQuery = !q || 
        s.title.toLowerCase().includes(q) || 
        s.teluguTitle.includes(q) || 
        s.author.name.toLowerCase().includes(q) ||
        s.author.teluguName.includes(q) ||
        s.tags.some(t => t.includes(q));
      return matchesCategory && matchesQuery;
    });
  }

  public async createStory(newStory: Partial<Story>): Promise<Story> {
    await new Promise(res => setTimeout(res, 400));
    const created: Story = {
      id: `story-${Date.now()}`,
      title: newStory.title || 'Untitled',
      teluguTitle: newStory.teluguTitle || newStory.title || 'శీర్షిక లేని కథ',
      slug: (newStory.title || 'story').toLowerCase().replace(/\s+/g, '-'),
      coverImage: newStory.coverImage || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800',
      excerpt: newStory.excerpt || 'New Telugu Story',
      teluguExcerpt: newStory.teluguExcerpt || newStory.excerpt || 'కొత్త తెలుగు కథ',
      content: newStory.content || ['కథలోని కంటెంట్ ఇక్కడ ప్రారంభమవుతుంది...'],
      authorId: newStory.authorId || 'auth-1',
      author: newStory.author || MOCK_STORIES[0].author,
      category: newStory.category || 'జీవితం',
      tags: newStory.tags || ['కథ'],
      rating: 5.0,
      viewCount: 1,
      likeCount: 0,
      bookmarkCount: 0,
      readingTimeMinutes: Math.ceil((newStory.content?.join(' ').length || 100) / 300),
      publishedAt: new Date().toISOString().split('T')[0],
      status: newStory.status || 'published',
    };
    this.stories.unshift(created);
    return created;
  }
}

export const storyService = new StoryService();
