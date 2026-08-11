import { Story, Novel, ReadingHistoryItem } from '../types';
import { MOCK_STORIES, MOCK_NOVELS, MOCK_READING_HISTORY } from './mockData';

class LibraryService {
  private savedStories: Story[] = [MOCK_STORIES[0], MOCK_STORIES[1]];
  private savedNovels: Novel[] = [MOCK_NOVELS[0]];
  private readingHistory: ReadingHistoryItem[] = [...MOCK_READING_HISTORY];

  public async getSavedStories(): Promise<Story[]> {
    await new Promise(res => setTimeout(res, 200));
    return this.savedStories;
  }

  public async getSavedNovels(): Promise<Novel[]> {
    await new Promise(res => setTimeout(res, 200));
    return this.savedNovels;
  }

  public async getReadingHistory(): Promise<ReadingHistoryItem[]> {
    await new Promise(res => setTimeout(res, 200));
    return this.readingHistory;
  }

  public async updateProgress(storyId: string, progressPercent: number): Promise<void> {
    const existing = this.readingHistory.find(item => item.storyId === storyId);
    if (existing) {
      existing.progressPercent = progressPercent;
      existing.lastReadAt = new Date().toISOString();
    } else {
      const story = MOCK_STORIES.find(s => s.id === storyId);
      if (story) {
        this.readingHistory.unshift({
          storyId,
          story,
          progressPercent,
          lastReadAt: new Date().toISOString(),
        });
      }
    }
  }

  public async toggleSave(story: Story): Promise<boolean> {
    const index = this.savedStories.findIndex(s => s.id === story.id);
    if (index >= 0) {
      this.savedStories.splice(index, 1);
      return false;
    } else {
      this.savedStories.push({ ...story, isBookmarked: true });
      return true;
    }
  }
}

export const libraryService = new LibraryService();
