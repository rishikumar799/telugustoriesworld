import { Novel, Chapter } from '../types';
import { MOCK_NOVELS } from './mockData';

class NovelService {
  private novels: Novel[] = [...MOCK_NOVELS];

  public async getFeaturedNovels(): Promise<Novel[]> {
    await new Promise(res => setTimeout(res, 200));
    return [...this.novels].sort((a, b) => b.viewCount - a.viewCount);
  }

  public async getNovelById(id: string): Promise<Novel | undefined> {
    await new Promise(res => setTimeout(res, 200));
    return this.novels.find(n => n.id === id);
  }

  public async getChapter(novelId: string, chapterId: string): Promise<{ novel: Novel; chapter: Chapter } | undefined> {
    await new Promise(res => setTimeout(res, 200));
    const novel = this.novels.find(n => n.id === novelId);
    if (!novel) return undefined;
    const chapter = novel.chapters.find(c => c.id === chapterId);
    if (!chapter) return undefined;
    return { novel, chapter };
  }

  public async toggleBookmark(novelId: string): Promise<boolean> {
    const novel = this.novels.find(n => n.id === novelId);
    if (novel) {
      novel.isBookmarked = !novel.isBookmarked;
      return novel.isBookmarked;
    }
    return false;
  }

  public async createNovel(newNovel: Partial<Novel>): Promise<Novel> {
    await new Promise(res => setTimeout(res, 400));
    const created: Novel = {
      id: `novel-${Date.now()}`,
      title: newNovel.title || 'Untitled Novel',
      teluguTitle: newNovel.teluguTitle || newNovel.title || 'శీర్షిక లేని నవల',
      slug: (newNovel.title || 'novel').toLowerCase().replace(/\s+/g, '-'),
      coverImage: newNovel.coverImage || 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800',
      description: newNovel.description || 'New Telugu Novel',
      teluguDescription: newNovel.teluguDescription || newNovel.description || 'కొత్త తెలుగు నవల',
      authorId: newNovel.authorId || 'auth-1',
      author: newNovel.author || MOCK_NOVELS[0].author,
      category: newNovel.category || 'కుటుంబం',
      tags: newNovel.tags || ['నవల'],
      status: newNovel.status || 'ongoing',
      chaptersCount: 1,
      chapters: newNovel.chapters || [
        {
          id: `chap-${Date.now()}`,
          chapterNumber: 1,
          title: 'Chapter 1',
          teluguTitle: '1వ అధ్యాయం',
          content: ['మొదటి అధ్యాయం ఇక్కడ ప్రారంభమవుతుంది...'],
          readingTimeMinutes: 5,
          publishedAt: new Date().toISOString().split('T')[0],
        }
      ],
      rating: 5.0,
      viewCount: 1,
      likeCount: 0,
      bookmarkCount: 0,
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.novels.unshift(created);
    return created;
  }
}

export const novelService = new NovelService();
