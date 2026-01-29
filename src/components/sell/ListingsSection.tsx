import { useLanguageStore } from '~/store/languageStore';
import { Building2, TrendingUp } from 'lucide-react';

export function ListingsSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '当前在售房源 & 过往成交',
      description: '这里展示的是我目前代理的在售房源，以及近期已经成交的案例，您可以更直观地了解我所覆盖的区域、价格带和房源类型。',
    },
    en: {
      title: 'Current Listings & Past Sales',
      description: 'Here you can browse my active listings as well as recently sold properties to get a clearer sense of the neighborhoods, price ranges, and property types I work with.',
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {currentContent.description}
          </p>
        </div>

        {/* Placeholder Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <a
            href="https://www.zillow.com/profile/Bill-Qin"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-gradient-to-br from-cream to-white rounded-2xl p-12 text-center border-2 border-gray-200 hover:border-primary-gold transition-colors cursor-pointer">
              <Building2 className="w-16 h-16 text-primary-gold mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-navy mb-4">
                {language === 'zh' ? '当前在售' : 'Active Listings'}
              </h3>
              <p className="text-gray-600">
                {language === 'zh' 
                  ? '查看我目前代理的在售房源'
                  : 'Browse my current active listings'}
              </p>
            </div>
          </a>

          <a
            href="https://www.zillow.com/profile/Bill-Qin"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-gradient-to-br from-cream to-white rounded-2xl p-12 text-center border-2 border-gray-200 hover:border-primary-gold transition-colors cursor-pointer">
              <TrendingUp className="w-16 h-16 text-primary-gold mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-navy mb-4">
                {language === 'zh' ? '过往成交' : 'Recently Sold'}
              </h3>
              <p className="text-gray-600">
                {language === 'zh' 
                  ? '查看近期已经成交的案例'
                  : 'View recently sold properties'}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
