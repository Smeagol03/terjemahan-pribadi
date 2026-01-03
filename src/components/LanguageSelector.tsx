import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  languages: { code: string; name: string }[];
}

export function LanguageSelector({ value, onChange, languages }: LanguageSelectorProps) {
  return (
    <div className="relative inline-block group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent text-foreground font-semibold pr-8 py-1 focus:outline-hidden cursor-pointer hover:text-brand transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-background text-foreground">
            {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/50 group-hover:text-brand transition-colors">
        <ChevronDown size={16} />
      </div>
    </div>
  );
}
