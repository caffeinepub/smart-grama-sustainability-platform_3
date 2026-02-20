import { useLanguage } from '../contexts/LanguageContext';
import LoginButton from './LoginButton';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-saffron text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/assets/generated/india-emblem.dim_200x200.png"
            alt="India Emblem"
            className="h-12 w-12 md:h-16 md:w-16 object-contain"
          />
          <div>
            <h1 className="text-xl md:text-3xl font-bold">{t('smartGrama')}</h1>
            <p className="text-xs md:text-sm opacity-90">{t('tagline')}</p>
          </div>
        </div>
        <LoginButton />
      </div>
    </header>
  );
}
