import { Joke } from '../types';
import { MOCK_JOKES, MOCK_AUTHORS } from './mockData';

class JokeService {
  private jokes: Joke[] = [...MOCK_JOKES];

  public async getJokes(category?: string): Promise<Joke[]> {
    await new Promise(res => setTimeout(res, 150));
    if (category && category !== 'అన్నీ') {
      return this.jokes.filter(j => j.category === category);
    }
    return [...this.jokes].sort((a, b) => b.likeCount - a.likeCount);
  }

  public async toggleLike(jokeId: string): Promise<boolean> {
    const joke = this.jokes.find(j => j.id === jokeId);
    if (joke) {
      joke.isLiked = !joke.isLiked;
      joke.likeCount += joke.isLiked ? 1 : -1;
      return joke.isLiked;
    }
    return false;
  }

  public async publishJoke(content: string, category: string): Promise<Joke> {
    await new Promise(res => setTimeout(res, 300));
    const newJoke: Joke = {
      id: `joke-${Date.now()}`,
      content,
      category,
      authorId: MOCK_AUTHORS[2].id,
      author: MOCK_AUTHORS[2],
      likeCount: 1,
      shareCount: 0,
      publishedAt: new Date().toISOString().split('T')[0],
      isLiked: true,
    };
    this.jokes.unshift(newJoke);
    return newJoke;
  }
}

export const jokeService = new JokeService();
