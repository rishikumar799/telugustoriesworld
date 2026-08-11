import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Bookmark, Share2, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Story, ReadingTheme } from '../types';
import { ReaderToolbar } from '../components/reader/ReaderToolbar';
import { ReadingProgress } from '../components/reader/ReadingProgress';

interface StoryReaderViewProps {
  story: Story;
  onBack: () => void;
  onBookmarkToggle: (storyId: string) => void;
  onLikeToggle: (storyId: string) => void;
  onUpdateProgress: (storyId: string, percent: number) => void;
}

export const StoryReaderView: React.FC<StoryReaderViewProps> = ({
  story,
  onBack,
  onBookmarkToggle,
  onLikeToggle,
  onUpdateProgress,
}) => {
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [theme, setTheme] = useState<ReadingTheme>('light');
  const [progressPercent, setProgressPercent] = useState<number>(story.progressPercent || 0);

  // Comments state
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; name: string; text: string; time: string }>>([
    {
      id: 'c1',
      name: 'లక్ష్మీ ప్రసన్న',
      text: 'చాలా అద్భుతమైన కథ! ప్రతి పేరా చదువుతుంటే కళ్లముందు దృశ్యం మెదులుతోంది.',
      time: 'నిన్న',
    },
    {
      id: 'c2',
      name: 'సురేష్ వర్మ',
      text: 'ముగింపు ఎంతో ఆర్ద్రంగా ఉంది. రచయితకు నా హృదయపూర్వక అభినందనలు.',
      time: '3 రోజుల క్రితం',
    }
  ]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setProgressPercent(currentProgress);
        onUpdateProgress(story.id, currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [story.id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      {
        id: `c-${Date.now()}`,
        name: 'మీరు',
        text: commentText.trim(),
        time: 'ఇప్పుడే',
      },
      ...comments,
    ]);
    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.teluguTitle,
        text: story.teluguExcerpt,
      }).catch(() => {});
    }
  };

  // Dynamic theme wrapper styles
  const getThemeBgClass = () => {
    if (theme === 'dark') return 'bg-[#101014] text-[#F7F3EE]';
    if (theme === 'sepia') return 'bg-[#F5EFEB] text-[#2B231D]';
    return 'bg-[#FAF7F2] text-[#17151A]';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 -mx-4 -mt-4 px-4 pt-4 pb-20 ${getThemeBgClass()}`}>
      <ReadingProgress progressPercent={progressPercent} />

      {/* Reader Header Bar */}
      <header className="max-w-3xl mx-auto py-4 flex items-center justify-between border-b border-black/10 dark:border-white/10 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold hover:opacity-80 transition-opacity cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>వెనక్కి</span>
        </button>

        <div className="text-center min-w-0 px-4">
          <h2 className="text-sm font-bold font-serif-telugu truncate">
            {story.teluguTitle}
          </h2>
          <p className="text-[10px] opacity-70 font-sans truncate">
            {story.author.teluguName}
          </p>
        </div>

        <div className="text-xs font-bold opacity-70">
          {progressPercent}%
        </div>
      </header>

      {/* Floating Reader Toolbar */}
      <ReaderToolbar
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={theme}
        setTheme={setTheme}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        isBookmarked={!!story.isBookmarked}
        onToggleBookmark={() => onBookmarkToggle(story.id)}
        onShare={handleShare}
      />

      {/* Story Column Area */}
      <main className="max-w-2xl mx-auto my-8 px-2 sm:px-6">
        {/* Title & Category Banner */}
        <div className="text-center mb-10 pb-8 border-b border-black/10 dark:border-white/10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#7A284B] text-white mb-3 shadow-sm">
            {story.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-telugu leading-tight mb-4">
            {story.teluguTitle}
          </h1>

          <div className="flex items-center justify-center gap-3 text-xs opacity-80">
            <img src={story.author.avatar} alt={story.author.teluguName} className="w-7 h-7 rounded-full object-cover" />
            <span className="font-bold">{story.author.teluguName}</span>
            <span>•</span>
            <span>{story.readingTimeMinutes} నిమిషాల చదువు</span>
          </div>
        </div>

        {/* Story Text Paragraphs */}
        <article
          className={`reader-content transition-all ${
            fontFamily === 'serif' ? 'font-serif-telugu' : 'font-sans-telugu'
          }`}
          style={{ '--reader-font-size': `${fontSize}px` } as React.CSSProperties}
        >
          {story.content.map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed text-justify">
              {paragraph}
            </p>
          ))}
        </article>

        {/* End of Story Badge */}
        <div className="text-center py-12 my-8 border-t border-b border-black/10 dark:border-white/10 space-y-4">
          <CheckCircle className="w-10 h-10 mx-auto text-[#3E8065]" />
          <h3 className="text-xl font-bold font-serif-telugu">
            కథ ముగిసింది.
          </h3>
          <p className="text-xs opacity-70">
            ఈ కథ మీకు నచ్చినట్లయితే లైక్ చేయండి లేదా రచయితకు అభిప్రాయం పంపండి.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onLikeToggle(story.id)}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all cursor-pointer ${
                story.isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-black/10 dark:bg-white/10 hover:bg-black/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${story.isLiked ? 'fill-white' : ''}`} />
              <span>{story.isLiked ? 'లైక్ చేసారు' : 'లైక్ చేయండి'} ({story.likeCount})</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 text-sm font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>షేర్</span>
            </button>
          </div>
        </div>

        {/* Reader Comments Section */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2 text-lg font-bold font-serif-telugu">
            <MessageSquare className="w-5 h-5 text-[#7A284B]" />
            <h3>పాఠకుల అభిప్రాయాలు ({comments.length})</h3>
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder="మీ అభిప్రాయాన్ని ఇక్కడ రాయండి..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
            />
            <button
              type="submit"
              className="p-3 rounded-2xl bg-[#7A284B] text-white hover:bg-[#631F3C] cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-3">
            {comments.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{c.name}</span>
                  <span className="opacity-60 text-[10px]">{c.time}</span>
                </div>
                <p className="text-xs font-serif-telugu leading-relaxed opacity-90">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
