import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
      className="text-white hover:bg-white/10"
    >
      {language === 'en' ? 'తెలుగు' : 'English'}
    </Button>
  );
}
