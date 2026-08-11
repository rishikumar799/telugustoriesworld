import React, { useState } from 'react';
import { X, Feather, BookOpen, Laugh, Image as ImageIcon, Send, Save, Sparkles } from 'lucide-react';
import { StoryCategory } from '../../types';
import { storyService } from '../../services/storyService';
import { jokeService } from '../../services/jokeService';
import { novelService } from '../../services/novelService';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishSuccess: () => void;
}

export const WriteModal: React.FC<WriteModalProps> = ({
  isOpen,
  onClose,
  onPublishSuccess,
}) => {
  const [contentType, setContentType] = useState<'story' | 'novel' | 'joke'>('story');
  
  // Story state
  const [title, setTitle] = useState('');
  const [teluguTitle, setTeluguTitle] = useState('');
  const [category, setCategory] = useState<StoryCategory>('జీవితం');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('తెలుగు,కథ');
  
  // Joke state
  const [jokeText, setJokeText] = useState('');
  const [jokeCategory, setJokeCategory] = useState('హాస్యం');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      if (contentType === 'story') {
        const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
        await storyService.createStory({
          title: title || 'My Story',
          teluguTitle: teluguTitle || title || 'నా కొత్త కథ',
          category,
          coverImage: coverImage || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800',
          excerpt: paragraphs[0]?.slice(0, 100) || 'కథ వివరణ',
          teluguExcerpt: paragraphs[0]?.slice(0, 100) || 'కథ వివరణ',
          content: paragraphs.length > 0 ? paragraphs : [content],
          tags: tags.split(',').map(t => t.trim()),
          status: 'published',
        });
      } else if (contentType === 'novel') {
        await novelService.createNovel({
          title: title || 'My Novel',
          teluguTitle: teluguTitle || title || 'నా కొత్త నవల',
          category,
          coverImage: coverImage || 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800',
          description: content.slice(0, 150),
          teluguDescription: content.slice(0, 150),
        });
      } else if (contentType === 'joke') {
        await jokeService.publishJoke(jokeText, jokeCategory);
      }

      setSuccessMsg('విజయవంతంగా ప్రచురించబడింది! 🎉');
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg('');
        onPublishSuccess();
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#18181D] rounded-3xl border border-[#E8E1DA] dark:border-[#2E2D36] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E8E1DA] dark:border-[#2E2D36] bg-[#FAF7F2] dark:bg-[#222229]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#7A284B] dark:bg-[#D87591] text-white">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif-telugu text-[#17151A] dark:text-[#F7F3EE]">
                మీ సృష్టిని ప్రచురించండి
              </h2>
              <p className="text-xs text-[#6F6970] dark:text-[#AAA4AC]">
                తెలుగు పాఠకులతో మీ ఆలోచనలు, కథలను పంచుకోండి
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#6F6970] dark:text-[#AAA4AC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Type Selector */}
        <div className="flex p-2 gap-2 border-b border-[#E8E1DA] dark:border-[#2E2D36] bg-white dark:bg-[#18181D]">
          <button
            onClick={() => setContentType('story')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
              contentType === 'story'
                ? 'bg-[#7A284B] text-white shadow-md'
                : 'text-[#6F6970] hover:bg-[#FAF7F2] dark:hover:bg-[#222229]'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>కథ రాయండి</span>
          </button>

          <button
            onClick={() => setContentType('novel')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
              contentType === 'novel'
                ? 'bg-[#7A284B] text-white shadow-md'
                : 'text-[#6F6970] hover:bg-[#FAF7F2] dark:hover:bg-[#222229]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>నవల సృష్టించండి</span>
          </button>

          <button
            onClick={() => setContentType('joke')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
              contentType === 'joke'
                ? 'bg-[#7A284B] text-white shadow-md'
                : 'text-[#6F6970] hover:bg-[#FAF7F2] dark:hover:bg-[#222229]'
            }`}
          >
            <Laugh className="w-4 h-4" />
            <span>జోక్ / చిన్న రచన</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePublish} className="flex-1 overflow-y-auto p-6 space-y-5">
          {successMsg && (
            <div className="p-4 rounded-2xl bg-[#3E8065]/10 text-[#3E8065] border border-[#3E8065]/30 text-center font-bold text-sm">
              {successMsg}
            </div>
          )}

          {contentType !== 'joke' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
                    తెలుగు శీర్షిక (Title)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ఉదా: నిన్నటి వాన"
                    value={teluguTitle}
                    onChange={(e) => setTeluguTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-sm text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
                    వర్గం (Category)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as StoryCategory)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-sm text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
                  >
                    <option value="ప్రేమ">ప్రేమ</option>
                    <option value="కుటుంబం">కుటుంబం</option>
                    <option value="స్నేహం">స్నేహం</option>
                    <option value="జీవితం">జీవితం</option>
                    <option value="ప్రేరణ">ప్రేరణ</option>
                    <option value="హాస్యం">హాస్యం</option>
                    <option value="రహస్యం">రహస్యం</option>
                    <option value="థ్రిల్లర్">థ్రిల్లర్</option>
                    <option value="ఫాంటసీ">ఫాంటసీ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
                  కవర్ చిత్రం URL (Cover Image URL)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-sm text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
                  />
                  <ImageIcon className="w-4 h-4 text-[#6F6970] absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
                  కథ / నవల కంటెంట్ (తెలుగులో)
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="ఇక్కడ మీ కథను తెలుగులో వివరంగా రాయండి. పేరాగ్రాఫ్‌ల మధ్య ఖాళీ ఇవ్వడం మర్చిపోకండి..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-base font-serif-telugu text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
                  ట్యాగ్‌లు (కామాతో వేరు చేయండి)
                </label>
                <input
                  type="text"
                  placeholder="ఉదా: ప్రేమ, జ్ఞాపకాలు, వర్షం"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-sm text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
                  విభాగం (Category)
                </label>
                <select
                  value={jokeCategory}
                  onChange={(e) => setJokeCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-sm text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
                >
                  <option value="హాస్యం">హాస్యం</option>
                  <option value="ఆఫీస్">ఆఫీస్</option>
                  <option value="కుటుంబం">కుటుంబం</option>
                  <option value="స్నేహం">స్నేహం</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
                  జోక్ / సరదా కబురు
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="ఇక్కడ మీ సరదా జోక్ లేదా చిన్న కబురు రాయండి..."
                  value={jokeText}
                  onChange={(e) => setJokeText(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-base font-sans-telugu text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B] leading-relaxed"
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E1DA] dark:border-[#2E2D36]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#6F6970] dark:text-[#AAA4AC] hover:bg-[#FAF7F2] dark:hover:bg-[#222229] transition-colors cursor-pointer"
            >
              రద్దు చేయి
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7A284B] hover:bg-[#631F3C] dark:bg-[#D87591] dark:hover:bg-[#EA8DA7] text-white text-sm font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'ప్రచురిస్తోంది...' : 'ప్రచురించండి'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
