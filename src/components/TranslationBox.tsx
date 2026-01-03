import { Card } from './ui/Card';
import { IconButton } from './ui/IconButton';
import { Copy, Volume2, Check } from 'lucide-react';
import { useState } from 'react';

interface TranslationBoxProps {
  type: 'input' | 'output';
  value: string;
  onChange?: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  languages: { code: string; name: string }[];
  placeholder?: string;
  onCopy: () => void;
  onSpeak: () => void;
  isLoading?: boolean;
}

export function TranslationBox({
  type,
  value,
  onChange,
  placeholder,
  onCopy,
  onSpeak,
  isLoading
}: TranslationBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={`flex flex-col h-full min-h-[280px] relative transition-all duration-500 input-glow ${isLoading ? 'opacity-80' : ''}`}>
      {/* Label */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground/30">
          {type === 'input' ? 'Source' : 'Translation'}
        </span>
        {type === 'output' && isLoading && (
          <span className="flex items-center gap-2 text-xs text-brand font-medium">
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            Translating...
          </span>
        )}
      </div>
      
      {/* Textarea */}
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={type === 'output'}
          className={`w-full h-full bg-transparent text-foreground text-xl font-normal outline-hidden resize-none placeholder:text-foreground/15 leading-relaxed transition-all duration-300 ${isLoading ? 'blur-sm' : ''}`}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        <div className="flex gap-2">
          <IconButton 
            icon={copied ? <Check size={16} className="text-success" /> : <Copy size={16} />} 
            label={copied ? "Copied!" : "Copy"} 
            onClick={handleCopy}
            disabled={!value}
            className="hover:bg-white/5 rounded-xl"
          />
          <IconButton 
            icon={<Volume2 size={16} />} 
            label="Listen" 
            onClick={onSpeak}
            disabled={!value}
            className="hover:bg-white/5 rounded-xl"
          />
        </div>
        <span className="text-[11px] text-foreground/20 font-medium tabular-nums">
          {value.length} chars
        </span>
      </div>
    </Card>
  );
}
