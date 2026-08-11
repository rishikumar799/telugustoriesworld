import React from 'react';
import { Search, Bell, User as UserIcon, Sun, Moon } from 'lucide-react';
import { User, NotificationItem } from '../../types';

interface MobileHeaderProps {
  user: User | null;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onSelectTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  user,
  onOpenSearch,
  onOpenAuth,
  onSelectTab,
  darkMode,
  setDarkMode,
}) => {
  return (
    <div className="md:hidden sticky top-0 z-40 w-full bg-[#FAF7F2]/95 dark:bg-[#101014]/95 backdrop-blur-md border-b border-[#E8E1DA] dark:border-[#2E2D36] px-4 h-14 flex items-center justify-between">
      <div 
        onClick={() => onSelectTab('home')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-xl bg-[#7A284B] dark:bg-[#D87591] text-white flex items-center justify-center font-serif-telugu font-bold text-xl shadow-sm">
          అ
        </div>
        <span className="font-serif-telugu font-bold text-lg text-[#17151A] dark:text-[#F7F3EE]">
          అక్షర
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#17151A] dark:text-[#F7F3EE] cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#17151A] dark:text-[#F7F3EE] cursor-pointer"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {user ? (
          <button
            onClick={() => onSelectTab('profile')}
            className="p-0.5 rounded-full border border-[#E8E1DA] dark:border-[#2E2D36] cursor-pointer"
          >
            <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-3 py-1 rounded-full bg-[#7A284B] text-white text-xs font-bold shadow-sm cursor-pointer"
          >
            ప్రవేశించు
          </button>
        )}
      </div>
    </div>
  );
};
