import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useLanguageStore } from '~/store/languageStore';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

export function Footer() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      logoAlt: 'Bill Qin Real Estate',
      bio: '',
      contactTitle: 'Contact Information',
      contactLabels: {
        phone: 'Phone',
        email: 'Email',
        wechat: 'WeChat',
        redNote: 'Red Note',
        wechatQr: 'WeChat',
      },
      quickLinksTitle: 'Quick Links',
      quickLinks: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Buy', href: '/buy' },
        { name: 'Sell', href: '/sell' },
        { name: 'Rent', href: '/rent' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { name: 'Accessibility Statement', href: '/accessibility' },
      ],
      copyright: 'Bill Qin Real Estate. All rights reserved.',
      equalHousing: 'Equal Housing Opportunity',
    },
    zh: {
      logoAlt: 'Bill Qin 房地产',
      bio: '',
      contactTitle: '联系方式',
      contactLabels: {
        phone: '电话',
        email: '邮箱',
        wechat: '微信',
        redNote: '小红书',
        wechatQr: '微信',
      },
      quickLinksTitle: '快速链接',
      quickLinks: [
        { name: '首页', href: '/' },
        { name: '关于', href: '/about' },
        { name: '购房', href: '/buy' },
        { name: '售房', href: '/sell' },
        { name: '租房', href: '/rent' },
        { name: '博客', href: '/blog' },
        { name: '联系我们', href: '/contact' },
        { name: '无障碍声明', href: '/accessibility' },
      ],
      copyright: 'Bill Qin 房地产。保留所有权利。',
      equalHousing: '公平住房机会',
    },
  };

  const quickLinks = content[language].quickLinks;

  return (
    <footer className="bg-navy text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Logo & Bio */}
          <div className="lg:col-span-2">
            <img
              src="/bq-realty-gold-logo-1.jpg"
              alt={content[language].logoAlt}
              className="h-12 w-[183.84px] mb-6"
            />
            <p className="text-gray-400 leading-relaxed mb-6">
              {content[language].bio}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/channel/UCA30EAgyGsYnWKmWq37KHDQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light hover:bg-primary-gold flex items-center justify-center transition-colors group"
              >
                <FaYoutube className="w-5 h-5 text-[#FF0000] group-hover:text-navy" />
              </a>
              <a
                href="https://www.instagram.com/billqinba/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light hover:bg-primary-gold flex items-center justify-center transition-colors group"
              >
                <FaInstagram className="w-5 h-5 text-gray-300 group-hover:text-navy" />
              </a>
              <a
                href="https://www.tiktok.com/@ibillqin6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light hover:bg-primary-gold flex items-center justify-center transition-colors group"
              >
                <FaTiktok className="w-5 h-5 text-gray-300 group-hover:text-navy" />
              </a>
            </div>
          </div>

          {/* Column 2 - Contact Info */}
          <div>
            <h3 className="text-primary-gold font-bold text-lg mb-6">{content[language].contactTitle}</h3>
            <div className="space-y-4">
              <a href="tel:+14088884888" className="flex items-start space-x-3 hover:text-primary-gold transition-colors group">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold">{content[language].contactLabels.phone}</div>
                  <div className="text-sm">+1-408-888-4888</div>
                </div>
              </a>
              <a href="mailto:billqin@bqrealtygroup.com" className="flex items-start space-x-3 hover:text-primary-gold transition-colors group">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold">{content[language].contactLabels.email}</div>
                  <div className="text-sm">billqin@bqrealtygroup.com</div>
                </div>
              </a>
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{content[language].contactLabels.wechat}</div>
                  <div className="text-sm">iBillQin</div>
                </div>
              </div>

              {/* QR Codes */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <div className="flex flex-col items-center">
                  <img
                    src="/red-dot-qr-code.png"
                    alt={content[language].contactLabels.redNote}
                    className="w-24 h-24 rounded-lg"
                  />
                  <div className="text-sm mt-2 text-center">{content[language].contactLabels.redNote}</div>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="/messaging-app-qr-code.png"
                    alt={content[language].contactLabels.wechatQr}
                    className="w-24 h-24 rounded-lg"
                  />
                  <div className="text-sm mt-2 text-center">{content[language].contactLabels.wechatQr}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h3 className="text-primary-gold font-bold text-lg mb-6">{content[language].quickLinksTitle}</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => {
                const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://');

                if (isExternal) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-primary-gold transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm hover:text-primary-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-light">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} {content[language].copyright}
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">DRE#: 01879849</span>
              <span className="text-gray-400">NMLS#321824</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-gray-400">{content[language].equalHousing}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
