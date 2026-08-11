import { User } from '../types';
import { MOCK_USER } from './mockData';

class AuthService {
  private currentUser: User | null = MOCK_USER;
  private listeners: ((user: User | null) => void)[] = [];

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public subscribe(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.currentUser));
  }

  public async loginWithEmail(email: string, _pass: string): Promise<User> {
    await new Promise(res => setTimeout(res, 500));
    this.currentUser = {
      ...MOCK_USER,
      email,
    };
    this.notify();
    return this.currentUser;
  }

  public async register(name: string, email: string, _pass: string): Promise<User> {
    await new Promise(res => setTimeout(res, 500));
    this.currentUser = {
      ...MOCK_USER,
      name,
      email,
    };
    this.notify();
    return this.currentUser;
  }

  public async loginWithGoogle(): Promise<User> {
    await new Promise(res => setTimeout(res, 500));
    this.currentUser = MOCK_USER;
    this.notify();
    return this.currentUser;
  }

  public async logout(): Promise<void> {
    await new Promise(res => setTimeout(res, 300));
    this.currentUser = null;
    this.notify();
  }

  public async updateProfile(data: Partial<User>): Promise<User> {
    await new Promise(res => setTimeout(res, 400));
    if (!this.currentUser) throw new Error('Not logged in');
    this.currentUser = { ...this.currentUser, ...data };
    this.notify();
    return this.currentUser;
  }
}

export const authService = new AuthService();
