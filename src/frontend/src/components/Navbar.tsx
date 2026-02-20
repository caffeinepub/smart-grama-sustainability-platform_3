import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { useUserRole } from '../hooks/useUserRole';

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { isAdmin } = useUserRole();

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/report-issue', label: t('reportIssue') },
    { path: '/tree', label: t('tree') },
    { path: '/water', label: t('water') },
    { path: '/solar', label: t('solar') },
    { path: '/schemes', label: t('schemes') },
    { path: '/my-requests', label: t('myRequests') },
  ];

  if (isAdmin) {
    navLinks.push({ path: '/admin', label: t('adminDashboard') });
  }

  return (
    <nav className="bg-green text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium ${
                  currentPath === link.path
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <LanguageToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
