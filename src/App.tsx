import { TranslationBox } from './components/TranslationBox';
import { Button } from './components/ui/Button';
import { Languages, ArrowDownUp, Sparkles } from 'lucide-react';
import { useTranslation } from './hooks';
import { copyToClipboard, speakText } from './utils';

export default function App() {
  const {
    sourceText,
    translatedText,
    sourceLang,
    targetLang,
    isLoading,
    error,
    languages,
    setSourceText,
    setSourceLang,
    setTargetLang,
    translate,
    swapLanguages,
  } = useTranslation();

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
  };

  const handleSpeak = (text: string, lang: string) => {
    speakText(text, lang);
  };

  return (
    <div className="min-h-screen bg-background text-foreground bg-mesh relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-16">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-premium rounded-2xl flex items-center justify-center glow animate-float shadow-2xl">
              <Languages className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Trans<span className="bg-linear-to-r from-brand to-accent bg-clip-text text-transparent">Late</span>
              </h1>
              <p className="text-xs text-foreground/40 font-medium">AI-Powered Translation</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 glass rounded-full">
            <Sparkles size={14} className="text-brand" />
            <span className="text-xs font-semibold text-foreground/60">Real-time Translation</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Language Selector Bar */}
          <div className="flex items-center justify-center gap-4 p-4 glass rounded-2xl">
            <div className="flex-1 text-center">
              <span className="text-lg font-bold text-foreground/90">
                {languages.find(l => l.code === sourceLang)?.name}
              </span>
            </div>
            <button
              onClick={swapLanguages}
              className="p-3 rounded-xl bg-gradient-premium text-white glow hover:scale-110 active:scale-95 transition-all duration-300"
              title="Swap Languages"
            >
              <ArrowDownUp size={20} />
            </button>
            <div className="flex-1 text-center">
              <span className="text-lg font-bold text-foreground/90">
                {languages.find(l => l.code === targetLang)?.name}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 glass rounded-xl border-red-500/50 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Translation Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TranslationBox
              type="input"
              value={sourceText}
              onChange={setSourceText}
              language={sourceLang}
              onLanguageChange={setSourceLang}
              languages={languages}
              placeholder="Enter text to translate..."
              onCopy={() => handleCopy(sourceText)}
              onSpeak={() => handleSpeak(sourceText, sourceLang)}
            />

            <TranslationBox
              type="output"
              value={translatedText}
              language={targetLang}
              onLanguageChange={setTargetLang}
              languages={languages}
              placeholder="Translation will appear here..."
              onCopy={() => handleCopy(translatedText)}
              onSpeak={() => handleSpeak(translatedText, targetLang)}
              isLoading={isLoading}
            />
          </div>

          {/* Translate Button */}
          <div className="flex justify-center pt-4">
            <Button
              variant="glossy"
              className="w-full md:w-auto md:min-w-[300px] h-16 text-lg font-bold tracking-wide rounded-2xl"
              onClick={translate}
              disabled={isLoading || !sourceText}
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Translating...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <Sparkles size={20} />
                  Translate Now
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <p className="text-sm text-foreground/30">
            Powered by <span className="text-brand font-semibold">MyMemory API</span> • Built with React & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}