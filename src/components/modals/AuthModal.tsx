import React, { useState } from 'react';
import { X, LogIn, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { authService } from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        await authService.register(name || 'తెలుగు పాఠకుడు', email, password);
      } else {
        await authService.loginWithEmail(email, password);
      }
      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError('ప్రవేశంలో లోపం జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authService.loginWithGoogle();
      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#18181D] rounded-3xl border border-[#E8E1DA] dark:border-[#2E2D36] shadow-2xl overflow-hidden p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FAF7F2] dark:hover:bg-[#222229] text-[#6F6970] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#7A284B] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <span className="font-serif-telugu font-bold text-2xl">అ</span>
          </div>
          <h2 className="text-xl font-bold font-serif-telugu text-[#17151A] dark:text-[#F7F3EE]">
            {isRegister ? 'అక్షరలో ఖాతా తెరవండి' : 'అక్షరకి స్వాగతం'}
          </h2>
          <p className="text-xs text-[#6F6970] dark:text-[#AAA4AC] mt-1">
            తెలుగు కథలు, నవలలు చదివే అద్భుతమైన వేదిక
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 text-red-600 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
                మీ పేరు
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="ఉదా: రాఘవ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-sm text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
                />
                <UserIcon className="w-4 h-4 text-[#6F6970] absolute left-3.5 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
              ఈమెయిల్ అడ్రస్
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-sm text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
              />
              <Mail className="w-4 h-4 text-[#6F6970] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] mb-1">
              పాస్‌వర్డ్
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#222229] border border-[#E8E1DA] dark:border-[#2E2D36] text-sm text-[#17151A] dark:text-[#F7F3EE] focus:outline-none focus:ring-2 focus:ring-[#7A284B]"
              />
              <Lock className="w-4 h-4 text-[#6F6970] absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#7A284B] hover:bg-[#631F3C] dark:bg-[#D87591] dark:hover:bg-[#EA8DA7] text-white text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span>{loading ? 'వేచి ఉండండి...' : isRegister ? 'ఖాతా సృష్టించండి' : 'ప్రవేశించండి'}</span>
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8E1DA] dark:border-[#2E2D36]" />
          </div>
          <span className="relative px-3 bg-white dark:bg-[#18181D] text-xs text-[#6F6970] font-medium">
            లేదా
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 rounded-xl border border-[#E8E1DA] dark:border-[#2E2D36] bg-[#FAF7F2] dark:bg-[#222229] text-xs font-semibold text-[#17151A] dark:text-[#F7F3EE] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google తో కొనసాగండి</span>
        </button>

        <p className="text-center text-xs text-[#6F6970] dark:text-[#AAA4AC] mt-5">
          {isRegister ? 'ఇప్పటికే ఖాతా ఉందా?' : 'ఖాతా లేదా?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold text-[#7A284B] dark:text-[#D87591] hover:underline cursor-pointer"
          >
            {isRegister ? 'ప్రవేశించండి' : 'కొత్త ఖాతా సృష్టించండి'}
          </button>
        </p>
      </div>
    </div>
  );
};
