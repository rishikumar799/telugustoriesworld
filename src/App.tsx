import React, { useState, useEffect } from 'react';
import { Story, Novel, Author, Chapter, StoryCategory, User, NotificationItem, ReadingHistoryItem, CreatorStats, Joke } from './types';
import { MOCK_CATEGORIES } from './services/mockData';
import { authService } from './services/authService';
import { storyService } from './services/storyService';
import { novelService } from './services/novelService';
import { jokeService } from './services/jokeService';
import { authorService } from './services/authorService';
import { libraryService } from './services/libraryService';
import { userService } from './services/userService';

// Global Layout Components
import { Navbar } from './components/common/Navbar';
import { MobileHeader } from './components/common/MobileHeader';
import { BottomNavigation } from './components/common/BottomNavigation';
import { Footer } from './components/common/Footer';

// Modals
import { WriteModal } from './components/editor/WriteModal';
import { AuthModal } from './components/modals/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { StoriesView } from './views/StoriesView';
import { StoryDetailView } from './views/StoryDetailView';
import { StoryReaderView } from './views/StoryReaderView';
import { NovelsView } from './views/NovelsView';
import { NovelDetailView } from './views/NovelDetailView';
import { JokesView } from './views/JokesView';
import { CategoriesView } from './views/CategoriesView';
import { AuthorsView } from './views/AuthorsView';
import { AuthorDetailView } from './views/AuthorDetailView';
import { LibraryView } from './views/LibraryView';
import { SearchView } from './views/SearchView';
import { CreatorDashboardView } from './views/CreatorDashboardView';
import { ProfileView } from './views/ProfileView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Selected state for detailed routing
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<StoryCategory | null>(null);

  // Modals state
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Data state from service layer
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [trendingStories, setTrendingStories] = useState<Story[]>([]);
  const [popularStories, setPopularStories] = useState<Story[]>([]);
  const [newReleases, setNewReleases] = useState<Story[]>([]);
  const [novels, setNovels] = useState<Novel[]>([]);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [savedStories, setSavedStories] = useState<Story[]>([]);
  const [savedNovels, setSavedNovels] = useState<Novel[]>([]);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [creatorStats, setCreatorStats] = useState<CreatorStats | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Subscribe to Auth changes
  useEffect(() => {
    const unsubscribe = authService.subscribe((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Fetch initial data from services
  const loadData = async () => {
    const trending = await storyService.getTrendingStories();
    const popular = await storyService.getPopularStoriesThisWeek();
    const releases = await storyService.getNewReleases();
    const allNovels = await novelService.getFeaturedNovels();
    const allJokes = await jokeService.getJokes();
    const allAuthors = await authorService.getAuthors();
    const savedSt = await libraryService.getSavedStories();
    const savedNov = await libraryService.getSavedNovels();
    const history = await libraryService.getReadingHistory();
    const notifs = await userService.getNotifications();
    const stats = await userService.getCreatorStats();

    setTrendingStories(trending);
    setPopularStories(popular);
    setNewReleases(releases);
    setNovels(allNovels);
    setJokes(allJokes);
    setAuthors(allAuthors);
    setSavedStories(savedSt);
    setSavedNovels(savedNov);
    setReadingHistory(history);
    setNotifications(notifs);
    setCreatorStats(stats);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Navigation handlers
  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentTab('story-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartReading = (story: Story) => {
    setSelectedStory(story);
    setCurrentTab('story-reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNovel = (novel: Novel) => {
    setSelectedNovel(novel);
    setCurrentTab('novel-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAuthor = (author: Author) => {
    setSelectedAuthor(author);
    setCurrentTab('author-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catName: StoryCategory) => {
    setSelectedCategoryFilter(catName);
    setCurrentTab('stories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interactions
  const handleBookmarkToggle = async (storyId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    await storyService.toggleBookmark(storyId);
    await loadData();
  };

  const handleLikeToggle = async (storyId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    await storyService.toggleLike(storyId);
    await loadData();
  };

  const handleJokeLikeToggle = async (jokeId: string) => {
    await jokeService.toggleLike(jokeId);
    const updatedJokes = await jokeService.getJokes();
    setJokes(updatedJokes);
  };

  const handleFollowAuthorToggle = async (authorId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    await authorService.toggleFollow(authorId);
    const updatedAuthors = await authorService.getAuthors();
    setAuthors(updatedAuthors);
  };

  const handleUpdateProgress = async (storyId: string, percent: number) => {
    await libraryService.updateProgress(storyId, percent);
    const history = await libraryService.getReadingHistory();
    setReadingHistory(history);
  };

  const handleMarkNotificationRead = async (id: string) => {
    await userService.markNotificationAsRead(id);
    const notifs = await userService.getNotifications();
    setNotifications(notifs);
  };

  // Render view router
  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeView
            trendingStories={trendingStories}
            popularStories={popularStories}
            newReleases={newReleases}
            featuredNovels={novels}
            featuredAuthors={authors}
            jokes={jokes}
            categories={MOCK_CATEGORIES}
            readingHistory={readingHistory}
            onSelectStory={handleSelectStory}
            onSelectNovel={handleSelectNovel}
            onSelectAuthor={handleSelectAuthor}
            onSelectCategory={handleSelectCategory}
            onSelectTab={setCurrentTab}
            onOpenWrite={() => setIsWriteOpen(true)}
            onBookmarkToggle={handleBookmarkToggle}
            onLikeToggle={handleLikeToggle}
            onFollowToggle={handleFollowAuthorToggle}
          />
        );

      case 'stories':
        return (
          <StoriesView
            stories={trendingStories}
            categories={MOCK_CATEGORIES}
            onSelectStory={handleSelectStory}
            onBookmarkToggle={handleBookmarkToggle}
            onLikeToggle={handleLikeToggle}
            selectedCategory={selectedCategoryFilter}
            onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
          />
        );

      case 'story-detail':
        return selectedStory ? (
          <StoryDetailView
            story={selectedStory}
            relatedStories={trendingStories.filter(s => s.id !== selectedStory.id && s.category === selectedStory.category)}
            onStartReading={handleStartReading}
            onSelectAuthor={handleSelectAuthor}
            onSelectStory={handleSelectStory}
            onBack={() => setCurrentTab('stories')}
            onBookmarkToggle={handleBookmarkToggle}
            onLikeToggle={handleLikeToggle}
            onFollowAuthorToggle={handleFollowAuthorToggle}
          />
        ) : (
          <HomeView
            trendingStories={trendingStories}
            popularStories={popularStories}
            newReleases={newReleases}
            featuredNovels={novels}
            featuredAuthors={authors}
            jokes={jokes}
            categories={MOCK_CATEGORIES}
            readingHistory={readingHistory}
            onSelectStory={handleSelectStory}
            onSelectNovel={handleSelectNovel}
            onSelectAuthor={handleSelectAuthor}
            onSelectCategory={handleSelectCategory}
            onSelectTab={setCurrentTab}
            onOpenWrite={() => setIsWriteOpen(true)}
            onBookmarkToggle={handleBookmarkToggle}
            onLikeToggle={handleLikeToggle}
            onFollowToggle={handleFollowAuthorToggle}
          />
        );

      case 'story-reader':
        return selectedStory ? (
          <StoryReaderView
            story={selectedStory}
            onBack={() => setCurrentTab('story-detail')}
            onBookmarkToggle={handleBookmarkToggle}
            onLikeToggle={handleLikeToggle}
            onUpdateProgress={handleUpdateProgress}
          />
        ) : null;

      case 'novels':
        return (
          <NovelsView
            novels={novels}
            onSelectNovel={handleSelectNovel}
            onBookmarkToggle={handleBookmarkToggle}
          />
        );

      case 'novel-detail':
        return selectedNovel ? (
          <NovelDetailView
            novel={selectedNovel}
            onBack={() => setCurrentTab('novels')}
            onSelectChapter={(n, chap) => {
              // Convert novel chapter to story style for reader
              const chapterAsStory: Story = {
                id: chap.id,
                title: chap.title,
                teluguTitle: `${n.teluguTitle} - ${chap.teluguTitle}`,
                slug: n.slug,
                coverImage: n.coverImage,
                excerpt: n.teluguDescription,
                teluguExcerpt: n.teluguDescription,
                content: chap.content,
                authorId: n.authorId,
                author: n.author,
                category: n.category,
                tags: n.tags,
                rating: n.rating,
                viewCount: n.viewCount,
                likeCount: n.likeCount,
                bookmarkCount: n.bookmarkCount,
                readingTimeMinutes: chap.readingTimeMinutes,
                publishedAt: chap.publishedAt,
                status: 'published',
              };
              handleStartReading(chapterAsStory);
            }}
            onBookmarkToggle={handleBookmarkToggle}
          />
        ) : null;

      case 'jokes':
        return (
          <JokesView
            jokes={jokes}
            onOpenWrite={() => setIsWriteOpen(true)}
            onLikeToggle={handleJokeLikeToggle}
          />
        );

      case 'categories':
        return (
          <CategoriesView
            categories={MOCK_CATEGORIES}
            onSelectCategory={handleSelectCategory}
          />
        );

      case 'authors':
        return (
          <AuthorsView
            authors={authors}
            onSelectAuthor={handleSelectAuthor}
            onFollowToggle={handleFollowAuthorToggle}
          />
        );

      case 'author-detail':
        return selectedAuthor ? (
          <AuthorDetailView
            author={selectedAuthor}
            authorStories={trendingStories.filter(s => s.authorId === selectedAuthor.id)}
            authorNovels={novels.filter(n => n.authorId === selectedAuthor.id)}
            onBack={() => setCurrentTab('authors')}
            onSelectStory={handleSelectStory}
            onSelectNovel={handleSelectNovel}
            onFollowToggle={handleFollowAuthorToggle}
          />
        ) : null;

      case 'library':
        return (
          <LibraryView
            savedStories={savedStories}
            savedNovels={savedNovels}
            readingHistory={readingHistory}
            onSelectStory={handleSelectStory}
            onSelectNovel={handleSelectNovel}
            onSelectTab={setCurrentTab}
            onBookmarkToggle={handleBookmarkToggle}
          />
        );

      case 'search':
        return (
          <SearchView
            stories={trendingStories}
            novels={novels}
            jokes={jokes}
            authors={authors}
            onSelectStory={handleSelectStory}
            onSelectNovel={handleSelectNovel}
            onSelectAuthor={handleSelectAuthor}
          />
        );

      case 'dashboard':
        return creatorStats ? (
          <CreatorDashboardView
            stats={creatorStats}
            myStories={trendingStories.slice(0, 3)}
            onOpenWrite={() => setIsWriteOpen(true)}
            onSelectStory={handleSelectStory}
          />
        ) : null;

      case 'profile':
        return (
          <ProfileView
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onSelectTab={setCurrentTab}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );

      default:
        return (
          <HomeView
            trendingStories={trendingStories}
            popularStories={popularStories}
            newReleases={newReleases}
            featuredNovels={novels}
            featuredAuthors={authors}
            jokes={jokes}
            categories={MOCK_CATEGORIES}
            readingHistory={readingHistory}
            onSelectStory={handleSelectStory}
            onSelectNovel={handleSelectNovel}
            onSelectAuthor={handleSelectAuthor}
            onSelectCategory={handleSelectCategory}
            onSelectTab={setCurrentTab}
            onOpenWrite={() => setIsWriteOpen(true)}
            onBookmarkToggle={handleBookmarkToggle}
            onLikeToggle={handleLikeToggle}
            onFollowToggle={handleFollowAuthorToggle}
          />
        );
    }
  };

  const isReaderView = currentTab === 'story-reader';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#101014] text-[#17151A] dark:text-[#F7F3EE] transition-colors">
      {/* Hide header/footer in full reader view */}
      {!isReaderView && (
        <>
          <Navbar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            user={user}
            onOpenWrite={() => setIsWriteOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenSearch={() => setCurrentTab('search')}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <MobileHeader
            user={user}
            onOpenSearch={() => setCurrentTab('search')}
            onOpenAuth={() => setIsAuthOpen(true)}
            onSelectTab={setCurrentTab}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </>
      )}

      {/* Main Container */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 ${isReaderView ? 'py-0' : 'py-6 sm:py-8'}`}>
        {renderCurrentView()}
      </main>

      {!isReaderView && (
        <>
          <Footer
            onSelectTab={setCurrentTab}
            onOpenWrite={() => setIsWriteOpen(true)}
          />

          <BottomNavigation
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onOpenWrite={() => setIsWriteOpen(true)}
          />
        </>
      )}

      {/* Write/Publish Modal */}
      <WriteModal
        isOpen={isWriteOpen}
        onClose={() => setIsWriteOpen(false)}
        onPublishSuccess={() => {
          loadData();
          setCurrentTab('stories');
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          loadData();
        }}
      />
    </div>
  );
}
