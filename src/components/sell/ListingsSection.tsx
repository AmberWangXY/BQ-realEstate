import { useLanguageStore } from '~/store/languageStore';
import { Building2, TrendingUp } from 'lucide-react';

export function ListingsSection() {
  const language = useLanguageStore((state) => state.language);
  const path = window.location.pathname;
  const isSellPage = path.includes('/sell');


  const content = isSellPage ? {
    zh: {
      title: '当前在售房源 & 过往成交',
      description: '这里展示的是我目前代理的在售房源，以及近期已经成交的案例，您可以更直观地了解我所覆盖的区域、价格带和房源类型。',
      activeListingsTitle: '当前在售房源',
      soldListingsTitle: '过往成交案例',
    },
    en: {
      title: 'Current Listings & Past Sales',
      description: 'Here you can browse my active listings as well as recently sold properties to get a clearer sense of the neighborhoods, price ranges, and property types I work with.',
      activeListingsTitle: 'Active Listings',
      soldListingsTitle: 'Recently Sold',
    },
  } : {
    zh: {
      title: '成功帮助买家赢得理想之家',
      description:
        '探索我们在硅谷成功为买家拿下的优质房源。无论是在竞争激烈的多方竞价环境中，还是稀缺的非公开房源机会，我们都通过成熟的谈判策略、深入的市场数据分析以及全流程的交易支持，帮助客户成功购入真正合适的房产。',
      activeListingsTitle: '查看更多已验证的成功成交案例',
      soldListingsTitle: '看看客户对我们的真实评价',
    },
    en: {
      title: 'Proven Success in Helping Buyers Win Their Dream Homes',
      description:
        'Explore homes we have successfully secured for our buyers across Silicon Valley. From competitive multiple-offer situations to off-market opportunities, we help clients purchase the right property with strong negotiation strategies, deep market data, and full transaction support.',
      activeListingsTitle: 'View More Verified Transactions on Zillow',
      soldListingsTitle: 'See What Our Clients Say',
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
                {currentContent.activeListingsTitle}
              </h3>
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
                {currentContent.soldListingsTitle}
              </h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
