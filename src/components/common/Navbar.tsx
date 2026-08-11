import React, { useState } from 'react';
import { 
  Search, BookOpen, Feather, Bell, User as UserIcon, Sun, Moon, Plus, Bookmark, LogIn, Sparkles 
} from 'lucide-react';
import { User, NotificationItem } from '../../types';
import { NotificationDrawer } from '../modals/NotificationDrawer';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: User | null;
  onOpenWrite: () => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onOpenWrite,
  onOpenAuth,
  onOpenSearch,
  notifications,
  onMarkNotificationRead,
  darkMode,
  setDarkMode,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { id: 'home', label: 'హోమ్' },
    { id: 'stories', label: 'కథలు' },
    { id: 'novels', label: 'నవలలు' },
    { id: 'jokes', label: 'జోక్స్' },
    { id: 'categories', label: 'విభాగాలు' },
    { id: 'authors', label: 'రచయితలు' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 dark:bg-[#101014]/90 backdrop-blur-md border-b border-[#E8E1DA] dark:border-[#2E2D36] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#7A284B] dark:bg-[#D87591] text-white flex items-center justify-center font-serif-telugu font-bold text-2xl shadow-md group-hover:scale-105 transition-transform">
            అ
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold font-serif-telugu tracking-tight text-[#17151A] dark:text-[#F7F3EE] flex items-center gap-1">
              అక్షర <span className="text-xs font-sans text-[#7A284B] dark:text-[#D87591] font-semibold uppercase tracking-wider">Akshara</span>
            </h1>
            <p className="text-[10px] text-[#6F6970] dark:text-[#AAA4AC] font-medium tracking-wide">
              తెలుగు సాహితీ ప్రపంచం
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setCurrentTab(link.id)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold font-serif-telugu transition-all cursor-pointer ${
                currentTab === link.id
                  ? 'bg-[#7A284B] text-white dark:bg-[#D87591] shadow-sm'
                  : 'text-[#17151A] dark:text-[#F7F3EE] hover:bg-[#E8E1DA]/50 dark:hover:bg-[#2E2D36]/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Search, Library, Write CTA, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-[#E8E1DA]/50 dark:hover:bg-[#2E2D36]/50 text-[#17151A] dark:text-[#F7F3EE] transition-colors cursor-pointer"
            title="శోధించండి"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Library Button */}
          <button
            onClick={() => setCurrentTab('library')}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              currentTab === 'library'
                ? 'bg-[#7A284B] text-white dark:bg-[#D87591]'
                : 'hover:bg-[#E8E1DA]/50 dark:hover:bg-[#2E2D36]/50 text-[#17151A] dark:text-[#F7F3EE]'
            }`}
            title="లైబ్రరీ"
          >
            <Bookmark className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-[#E8E1DA]/50 dark:hover:bg-[#2E2D36]/50 text-[#17151A] dark:text-[#F7F3EE] transition-colors cursor-pointer"
            title={darkMode ? 'లైట్ మోడ్' : 'డార్క్ మోడ్'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications Drawer Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-[#E8E1DA]/50 dark:hover:bg-[#2E2D36]/50 text-[#17151A] dark:text-[#F7F3EE] transition-colors relative cursor-pointer"
              title="నోటిఫికేషన్లు"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#7A284B] dark:bg-[#D87591] ring-2 ring-white dark:ring-[#101014]" />
              )}
            </button>

            <NotificationDrawer
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              notifications={notifications}
              onMarkRead={onMarkNotificationRead}
            />
          </div>

          {/* Prominent Write CTA */}
          <button
            onClick={onOpenWrite}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7A284B] hover:bg-[#631F3C] dark:bg-[#D87591] dark:hover:bg-[#EA8DA7] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>కథ రాయండి</span>
          </button>

          {/* User Profile / Login */}
          {user ? (
            <button
              onClick={() => setCurrentTab('profile')}
              className={`flex items-center gap-2 p-1 rounded-full border transition-all cursor-pointer ${
                currentTab === 'profile'
                  ? 'ring-2 ring-[#7A284B] dark:ring-[#D87591]'
                  : 'border-[#E8E1DA] dark:border-[#2E2D36]'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#7A284B] text-[#7A284B] dark:border-[#D87591] dark:text-[#D87591] hover:bg-[#7A284B]/10 font-bold text-xs transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>ప్రవేశించు</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
