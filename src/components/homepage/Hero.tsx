import { Play, Home, TrendingUp, Key, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useLanguageStore } from '~/store/languageStore';

export function Hero() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      heading: 'Silicon Valley Real Estate Expert –',
      name: 'Bill Qin',
      subtitle: '20+ Years of Bay Area Experience • Adding Value for Every Client',
      stats: {
        transactions: 'Transactions',
        licenses: 'Sales Volume',
        reviews: 'Nationwide',
      },
      cta: {
        buy: 'I Want to Buy',
        sell: 'I Want to Sell',
        management: 'Property Management',
        consult: 'Consult Bill Now',
      },
      imageAlt: 'Beautiful California home with family',
    },
    zh: {
      heading: '湾区专业房地产中介 –',
      name: 'Bill Qin',
      subtitle: '20余年湾区经验 • 为每位客户增值',
      stats: {
        transactions: '成交记录',
        licenses: '成交总额',
        reviews: '全美房产经纪',
      },
      cta: {
        buy: '我想买房',
        sell: '我想卖房',
        management: '委托管理',
        consult: '立即咨询 Bill',
      },
      imageAlt: '美丽的加州家庭住宅',
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/child-dog-home-scene.jpg"
          alt={content[language].imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-20">
        {/* Text Content */}
        <div className="text-white space-y-8 animate-slide-up text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
            {content[language].heading}{' '}
            <span className="text-primary-gold">{content[language].name}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            {content[language].subtitle}
          </p>

          {/* Trust Badges */}
          <div className="hidden sm:flex gap-4 py-6">
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20" style={{ width: '19vw' }}>
              <div className="text-3xl font-bold text-primary-gold">300+</div>
              <div className="text-sm text-gray-300 mt-1">{content[language].stats.transactions}</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20" style={{ width: '19vw' }}>
              <div className="text-3xl font-bold text-primary-gold">$480M</div>
              <div className="text-sm text-gray-300 mt-1">{content[language].stats.licenses}</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20" style={{ width: '19vw' }}>
              <div className="text-3xl font-bold text-primary-gold">{language === 'en' ? 'TOP 1%' : '前 1%'}</div>
              <div className="text-sm text-gray-300 mt-1">{content[language].stats.reviews}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/buy"
              className="group flex items-center space-x-2 px-8 py-4 bg-primary-gold hover:bg-primary-gold-light text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>{content[language].cta.buy}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/sell"
              className="group flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 transition-all duration-200 hover:border-primary-gold"
            >
              <TrendingUp className="w-5 h-5" />
              <span>{content[language].cta.sell}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/rent"
              className="group flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 transition-all duration-200 hover:border-primary-gold"
            >
              <Key className="w-5 h-5" />
              <span>{content[language].cta.management}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group flex items-center space-x-2 px-8 py-4 bg-primary-gold hover:bg-primary-gold-light text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <span>{content[language].cta.consult}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
