import React from 'react';
import { Heart, Feather, BookOpen, Sparkles, Shield, Mail } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenWrite: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenWrite }) => {
  return (
    <footer className="w-full bg-[#15131A] text-[#FAF7F2] border-t border-[#2E2D36] pt-16 pb-24 md:pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2E2D36]">
          {/* Col 1: Brand & Quote */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#7A284B] text-white flex items-center justify-center font-serif-telugu font-bold text-2xl shadow-md">
                అ
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif-telugu tracking-tight text-white">
                  అక్షర <span className="text-xs font-sans text-[#D87591] font-semibold uppercase">Akshara</span>
                </h3>
                <p className="text-xs text-[#AAA4AC]">తెలుగు రీడింగ్ & రైటింగ్ వేదిక</p>
              </div>
            </div>

            <p className="text-sm font-serif-telugu text-[#AAA4AC] leading-relaxed max-w-md">
              "అక్షరం అమరత్వం... ప్రతి తెలుగు కథ వెనుక ఒక హృదయ స్పందన ఉంటుంది. పాఠకులకు అమృతతుల్యమైన సాహిత్యాన్ని అందించడమే మా లక్ష్యం."
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenWrite}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A284B] hover:bg-[#631F3C] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Feather className="w-4 h-4" />
                <span>రచయితగా ఉచితంగా చేరండి</span>
              </button>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif-telugu text-white uppercase tracking-wider">
              వేదిక (Platform)
            </h4>
            <ul className="space-y-2 text-xs font-sans-telugu text-[#AAA4AC]">
              <li><button onClick={() => onSelectTab('home')} className="hover:text-white transition-colors cursor-pointer">హోమ్ పేజీ</button></li>
              <li><button onClick={() => onSelectTab('stories')} className="hover:text-white transition-colors cursor-pointer">కథల ప్రపంచం</button></li>
              <li><button onClick={() => onSelectTab('novels')} className="hover:text-white transition-colors cursor-pointer">ధారావాహిక నవలలు</button></li>
              <li><button onClick={() => onSelectTab('jokes')} className="hover:text-white transition-colors cursor-pointer">హాస్యం & జోక్స్</button></li>
              <li><button onClick={() => onSelectTab('categories')} className="hover:text-white transition-colors cursor-pointer">కథా విభాగాలు</button></li>
            </ul>
          </div>

          {/* Col 3: Creators */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif-telugu text-white uppercase tracking-wider">
              రచయితల సేవలు
            </h4>
            <ul className="space-y-2 text-xs font-sans-telugu text-[#AAA4AC]">
              <li><button onClick={onOpenWrite} className="hover:text-white transition-colors cursor-pointer">కథ ప్రచురించండి</button></li>
              <li><button onClick={() => onSelectTab('dashboard')} className="hover:text-white transition-colors cursor-pointer">క్రియేటర్ డాష్‌బోర్డ్</button></li>
              <li><button onClick={() => onSelectTab('authors')} className="hover:text-white transition-colors cursor-pointer">రచయితల జాబితా</button></li>
              <li><a href="#guidelines" className="hover:text-white transition-colors">ప్రచురణ నిబంధనలు</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif-telugu text-white uppercase tracking-wider">
              మా గురించి
            </h4>
            <ul className="space-y-2 text-xs font-sans-telugu text-[#AAA4AC]">
              <li><a href="#about" className="hover:text-white transition-colors">మా కథనం</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">గోప్యతా విధానం</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">సేవా నియమాలు</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">సంప్రదించండి</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#AAA4AC] gap-4">
          <p>© {new Date().getFullYear()} అక్షర (Akshara) తెలుగు ప్లాట్‌ఫారమ్. సర్వ హక్కులూ ప్రత్యేకించబడ్డాయి.</p>
          <div className="flex items-center gap-1 text-[#AAA4AC]">
            <span>తెలుగు భాష మరియు సాహిత్యం కోసం</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" />
            <span>తో తయారు చేయబడింది</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
