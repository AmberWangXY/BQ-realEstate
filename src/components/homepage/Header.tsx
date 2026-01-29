import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useLanguageStore } from '~/store/languageStore';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      navLinks: [
        { name: 'Home', href: '/' },
        { name: 'Buy', href: '/buy' },
        { name: 'Sell', href: '/sell' },
        { name: 'Rent', href: '/rent' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ],
      resources: 'Resources',
      resourcesLinks: [
        { name: 'Videos', href: 'https://www.youtube.com/channel/UCA30EAgyGsYnWKmWq37KHDQ' },
        { name: 'Blogs', href: '/blog' },
        { name: 'Successful Stories', href: 'https://www.zillow.com/profile/Bill-Qin' },
        { name: 'Client Reviews', href: 'https://www.zillow.com/profile/Bill-Qin#reviews' },
      ],
      logoAlt: 'Bill Qin Real Estate',
    },
    zh: {
      navLinks: [
        { name: '首页', href: '/' },
        { name: '购房', href: '/buy' },
        { name: '售房', href: '/sell' },
        { name: '租房', href: '/rent' },
        { name: '关于', href: '/about' },
        { name: '联系', href: '/contact' },
      ],
      resources: '资源中心',
      resourcesLinks: [
        { name: '视频', href: 'https://www.youtube.com/channel/UCA30EAgyGsYnWKmWq37KHDQ' },
        { name: '博客', href: '/blog' },
        { name: '成功案例', href: 'https://www.zillow.com/profile/Bill-Qin' },
        { name: '客户评价', href: 'https://www.zillow.com/profile/Bill-Qin#reviews' },
      ],
      logoAlt: 'Bill Qin 房地产',
    },
  };

  const navLinks = content[language].navLinks;
  const resourcesLinks = content[language].resourcesLinks;

  // Click outside to close Resources dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    }

    if (resourcesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [resourcesOpen]);

  // Keyboard accessibility - close on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setResourcesOpen(false);
      }
    }

    if (resourcesOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [resourcesOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg transition-all duration-300">
      {/* Main header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
            <img
              src="/bill-qin-logo.png"
              alt={content[language].logoAlt}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-primary-gold hover:text-primary-gold-light transition-colors duration-200 text-sm font-bold whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Resources Button */}
            <div ref={resourcesRef} className="relative">
              <button 
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center space-x-1 text-primary-gold hover:text-primary-gold-light transition-colors duration-200 text-sm font-bold whitespace-nowrap"
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                <span>{content[language].resources}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu - Positioned absolutely under the button */}
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-navy border border-navy-light rounded-lg shadow-xl py-2 z-50">
                  {resourcesLinks.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    
                    if (isExternal) {
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-primary-gold hover:bg-navy-light transition-colors duration-200 text-sm font-bold"
                          onClick={() => setResourcesOpen(false)}
                        >
                          {link.name}
                        </a>
                      );
                    }
                    
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-2 text-primary-gold hover:bg-navy-light transition-colors duration-200 text-sm font-bold"
                        onClick={() => setResourcesOpen(false)}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Phone Button */}
            <a
              href="tel:+14088884888"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-navy-light hover:bg-navy-dark text-primary-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+1-408-888-4888</span>
            </a>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-300 hover:text-primary-gold transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? '中文' : 'EN'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-primary-gold hover:bg-navy-light transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-light border-t border-navy-dark animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-4 py-2 rounded-lg text-primary-gold hover:bg-navy transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Resources Dropdown */}
            <div>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-primary-gold hover:bg-navy transition-colors font-bold"
              >
                <span>{content[language].resources}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileResourcesOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {resourcesLinks.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    
                    if (isExternal) {
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 rounded-lg text-primary-gold hover:bg-navy transition-colors text-sm font-bold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </a>
                      );
                    }
                    
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-2 rounded-lg text-primary-gold hover:bg-navy transition-colors text-sm font-bold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-navy-dark space-y-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? '中文' : 'EN'}</span>
              </button>
              <a
                href="tel:+14088884888"
                className="flex items-center space-x-2 px-4 py-2 text-primary-gold"
              >
                <Phone className="w-4 h-4" />
                <span>+1-408-888-4888</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
