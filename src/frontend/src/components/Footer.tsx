import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'smart-grama');

  return (
    <footer className="bg-green text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">{t('contactInfo')}</h3>
            <p className="text-sm opacity-90">{t('panchayatOffice')}</p>
            <p className="text-sm opacity-90 mt-1">{t('address')}</p>
            <p className="text-sm opacity-90 mt-1">{t('phone')}: +91-1234567890</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">{t('quickLinks')}</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm opacity-90 hover:opacity-100">
                {t('aboutSmartGrama')}
              </Link>
              <Link to="/privacy" className="block text-sm opacity-90 hover:opacity-100">
                {t('privacyPolicy')}
              </Link>
              <Link to="/terms" className="block text-sm opacity-90 hover:opacity-100">
                {t('termsOfService')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">{t('disclaimer')}</h3>
            <p className="text-xs opacity-80">{t('disclaimerText')}</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 pt-6 text-center">
          <p className="text-sm opacity-90">
            © {currentYear} {t('smartGrama')}. {t('allRightsReserved')}.
          </p>
          <p className="text-sm opacity-90 mt-2 flex items-center justify-center gap-1">
            {t('builtWith')} <Heart size={14} className="text-red-400 fill-red-400" /> {t('using')}{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
