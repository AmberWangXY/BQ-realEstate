import { MapPin, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '~/store/languageStore';

export function TransactionMap() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      title: 'Map',
      subtitle: 'Real results from real clients across the Bay Area',
      mapStats: {
        transactions: 'Transactions',
        cities: 'Cities Covered',
        volume: 'Total Volume',
      },
      labels: {
        problem: 'Problem',
        strategy: 'Strategy',
        result: 'Result',
      },
      caseStudies: [
        {
          location: 'Palo Alto',
          type: 'Single Family Home',
          problem: 'Client needed to sell quickly due to job relocation, market was slow',
          strategy: 'Staged home professionally, targeted marketing to tech executives, flexible showing schedule',
          result: 'Sold 15% above asking price in 10 days with multiple offers',
          price: '$3.2M',
        },
        {
          location: 'San Jose',
          type: 'Multi-Family',
          problem: 'Complex property with tenant issues and deferred maintenance',
          strategy: 'Negotiated tenant agreements, coordinated repairs, positioned for value-add investor',
          result: 'Closed deal with creative financing, client achieved 20% equity gain',
          price: '$2.5M',
        },
      ],
      imageAlt: 'Bay Area Map',
    },
    zh: {
      title: '地图',
      subtitle: '湾区真实客户的真实成交案例',
      mapStats: {
        transactions: '交易量',
        cities: '覆盖城市',
        volume: '总交易额',
      },
      labels: {
        problem: '难题',
        strategy: '策略',
        result: '结果',
      },
      caseStudies: [
        {
          location: 'Palo Alto',
          type: '独栋住宅',
          problem: '客户因工作调动需要快速出售，但当时市场低迷',
          strategy: '专业布置房源，面向科技高管精准营销，灵活安排看房时间',
          result: '10天内以高于要价 15% 的价格成交，获得多个 Offer',
          price: '$3.2M',
        },
        {
          location: 'San Jose',
          type: '多户住宅',
          problem: '复杂的房产，存在租户问题和延期维护',
          strategy: '协商租户协议，协调维修，定位为增值型投资房',
          result: '通过创新融资完成交易，客户实现 20% 股权增值',
          price: '$2.5M',
        },
      ],
      imageAlt: '湾区地图',
    },
  };

  const caseStudies = content[language].caseStudies;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Left Side - Map Image */}
          <div className="relative animate-scale-in flex-1 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-soft-lg border border-gray-100">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img
                  src="/homepage-map-update.jpg"
                  alt={content[language].imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Case Stories */}
          <div className="space-y-6 flex-1">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-1">
                      {study.location}
                    </h3>
                    <p className="text-sm text-gray-500">{study.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-gold">
                      {study.price}
                    </div>
                  </div>
                </div>

                {/* Problem */}
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-red-600">P</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{content[language].labels.problem}</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">{study.problem}</p>
                </div>

                {/* Strategy */}
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{content[language].labels.strategy}</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">{study.strategy}</p>
                </div>

                {/* Result */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{content[language].labels.result}</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8 font-medium">{study.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
