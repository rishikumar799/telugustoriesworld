import React, { useState } from 'react';
import { 
  Eye, Heart, Users, Feather, TrendingUp, Plus, Edit, Trash2, CheckCircle, Clock 
} from 'lucide-react';
import { CreatorStats, Story } from '../types';

interface CreatorDashboardViewProps {
  stats: CreatorStats;
  myStories: Story[];
  onOpenWrite: () => void;
  onSelectStory: (story: Story) => void;
}

export const CreatorDashboardView: React.FC<CreatorDashboardViewProps> = ({
  stats,
  myStories,
  onOpenWrite,
  onSelectStory,
}) => {
  const [activeTab, setActiveTab] = useState<'published' | 'drafts'>('published');

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A284B]/10 text-[#7A284B] dark:text-[#D87591] text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>క్రియేటర్ డాష్‌బోర్డ్</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-telugu text-[#17151A] dark:text-[#F7F3EE] mb-1">
            రచయిత విశ్లేషణ & రచనలు
          </h1>
          <p className="text-sm text-[#6F6970] dark:text-[#AAA4AC] font-serif-telugu">
            మీ రచనల పాఠకుల గణాంకాలు మరియు కంటెంట్ నిర్వహణ
          </p>
        </div>

        <button
          onClick={onOpenWrite}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A284B] hover:bg-[#631F3C] dark:bg-[#D87591] text-white text-sm font-bold shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>కొత్త రచన ప్రారంభించండి</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#18181D] border border-[#E8E1DA] dark:border-[#2E2D36] shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-[#7A284B]/10 text-[#7A284B] dark:text-[#D87591]">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#6F6970] dark:text-[#AAA4AC] font-semibold uppercase">మొత్తం చదువులు</p>
            <p className="text-2xl sm:text-3xl font-bold font-serif-telugu text-[#17151A] dark:text-[#F7F3EE] mt-0.5">
              {stats.totalReads.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#18181D] border border-[#E8E1DA] dark:border-[#2E2D36] shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-red-500/10 text-red-500">
            <Heart className="w-6 h-6 fill-red-500" />
          </div>
          <div>
            <p className="text-xs text-[#6F6970] dark:text-[#AAA4AC] font-semibold uppercase">మొత్తం లైక్‌లు</p>
            <p className="text-2xl sm:text-3xl font-bold font-serif-telugu text-[#17151A] dark:text-[#F7F3EE] mt-0.5">
              {stats.totalLikes.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#18181D] border border-[#E8E1DA] dark:border-[#2E2D36] shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-[#D99A3D]/10 text-[#D99A3D]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#6F6970] dark:text-[#AAA4AC] font-semibold uppercase">అనుచరులు (Followers)</p>
            <p className="text-2xl sm:text-3xl font-bold font-serif-telugu text-[#17151A] dark:text-[#F7F3EE] mt-0.5">
              {stats.totalFollowers.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Reads Trend Visualization */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#18181D] border border-[#E8E1DA] dark:border-[#2E2D36] shadow-sm space-y-4">
        <h3 className="text-lg font-bold font-serif-telugu text-[#17151A] dark:text-[#F7F3EE]">
          మాసాల వారీగా పాఠకుల వృద్ధి (Monthly Growth)
        </h3>

        <div className="flex items-end gap-3 h-40 pt-6">
          {stats.monthlyReadsTrend.map((item, idx) => {
            const max = Math.max(...stats.monthlyReadsTrend.map(m => m.reads));
            const heightPercent = Math.round((item.reads / max) * 100);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-[#6F6970] dark:text-[#AAA4AC] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.reads}
                </span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-[#7A284B] to-[#D87591] transition-all duration-500 group-hover:brightness-110"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs font-serif-telugu text-[#6F6970] dark:text-[#AAA4AC]">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Published Stories & Management */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b border-[#E8E1DA] dark:border-[#2E2D36] pb-3">
          <button
            onClick={() => setActiveTab('published')}
            className={`text-base font-bold font-serif-telugu transition-colors cursor-pointer pb-1 border-b-2 ${
              activeTab === 'published'
                ? 'border-[#7A284B] text-[#7A284B] dark:border-[#D87591] dark:text-[#D87591]'
                : 'border-transparent text-[#6F6970]'
            }`}
          >
            ప్రచురించిన కథలు ({myStories.length})
          </button>
        </div>

        <div className="space-y-3">
          {myStories.map(story => (
            <div
              key={story.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#18181D] border border-[#E8E1DA] dark:border-[#2E2D36] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={story.coverImage}
                  alt={story.teluguTitle}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3E8065]/10 text-[#3E8065]">
                      ప్రచురించబడింది
                    </span>
                    <span className="text-xs text-[#6F6970]">{story.publishedAt}</span>
                  </div>
                  <h4
                    onClick={() => onSelectStory(story)}
                    className="font-bold font-serif-telugu text-base text-[#17151A] dark:text-[#F7F3EE] hover:text-[#7A284B] transition-colors cursor-pointer"
                  >
                    {story.teluguTitle}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-[#6F6970] mt-1">
                    <span><Eye className="w-3.5 h-3.5 inline mr-1" />{story.viewCount} చదువులు</span>
                    <span><Heart className="w-3.5 h-3.5 inline mr-1" />{story.likeCount} లైక్‌లు</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => onSelectStory(story)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FAF7F2] dark:bg-[#222229] hover:bg-[#7A284B] hover:text-white transition-colors cursor-pointer"
                >
                  పరిశీలించు
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
