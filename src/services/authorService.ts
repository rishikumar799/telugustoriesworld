import { Author } from '../types';
import { MOCK_AUTHORS } from './mockData';

class AuthorService {
  private authors: Author[] = [...MOCK_AUTHORS];

  public async getAuthors(): Promise<Author[]> {
    await new Promise(res => setTimeout(res, 200));
    return this.authors;
  }

  public async getFeaturedAuthors(): Promise<Author[]> {
    await new Promise(res => setTimeout(res, 200));
    return [...this.authors].sort((a, b) => b.followersCount - a.followersCount);
  }

  public async getAuthorById(id: string): Promise<Author | undefined> {
    await new Promise(res => setTimeout(res, 200));
    return this.authors.find(a => a.id === id);
  }

  public async toggleFollow(authorId: string): Promise<boolean> {
    const author = this.authors.find(a => a.id === authorId);
    if (author) {
      author.isFollowing = !author.isFollowing;
      author.followersCount += author.isFollowing ? 1 : -1;
      return author.isFollowing;
    }
    return false;
  }
}

export const authorService = new AuthorService();
