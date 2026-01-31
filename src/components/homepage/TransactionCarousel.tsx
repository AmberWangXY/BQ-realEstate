import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '~/store/languageStore';

export function TransactionCarousel() {
  const language = useLanguageStore((state) => state.language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Mobile scroll container ref (so dots/arrow can also scroll if you want later)
  const mobileRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const content = {
    en: {
      title: 'Transaction Success Stories',
      subtitle: 'Real results from real clients across the Bay Area',
      labels: { problem: 'Problem', strategy: 'Strategy', result: 'Result' },
      stories: [
        {
          link: 'https://www.zillow.com/homedetails/8149-Park-Villa-Cir-Cupertino-CA-95014/19632736_zpid/',
          location: '8149 Park Villa Cir, Cupertino',
          storyType: 'First-Time Homebuyer · Location Selection',
          problem: 'Unfamiliar with the area and unsure where to buy within budget.',
          strategy: 'Clarified budget and needs, researched target areas, and conducted focused home tours.',
          result: 'Found the right home in 2 months with clear direction and confidence.',
        },
        {
          link: 'https://www.zillow.com/homedetails/634-Fairmont-Ave-Mountain-View-CA-94041/19515052_zpid/',
          location: '634 Fairmont Ave, Mountain View',
          storyType: 'Buying Story · No-Experience Buyer',
          problem: 'No buying experience and concerned about making costly mistakes.',
          strategy: 'Provided step-by-step guidance, in-depth property analysis, and full due diligence support.',
          result: 'Completed the purchase smoothly with confidence throughout the process.',
        },
        {
          link: 'https://www.zillow.com/homedetails/1984-Kobara-Ln-San-Jose-CA-95124/19671501_zpid/',
          location: '1984 Kobara Ln, San Jose',
          storyType: 'Buying + Renovation · Risk-Controlled Strategy',
          problem: 'Renovated homes were expensive and competitive, with quality concerns.',
          strategy: 'Targeted strong-layout older homes and planned renovations early to control risk.',
          result: 'Saved on purchase price and achieved a preferred style with peace of mind.',
        },
        {
          link: 'https://www.zillow.com/homedetails/1639-Mariani-Dr-Sunnyvale-CA-94087/19615927_zpid/',
          location: '1639 Mariani Dr, Sunnyvale',
          storyType: 'School District Home · Rational Decision-Making',
          problem: 'Uncertain about school districts and worried about overpaying in competition.',
          strategy: 'Verified school eligibility, analyzed pricing logic, and defined offer strategies in advance.',
          result: 'Secured the right home with rational pricing and reduced emotional pressure.',
        },
        {
          link: 'https://www.zillow.com/homedetails/1842-Rosswood-Dr-San-Jose-CA-95124/19675701_zpid/',
          location: '1842 Rosswood Dr, San Jose',
          storyType: 'Selling Story · Timing Strategy',
          problem: 'Unsure whether to sell or rent, and unclear on the best listing timing.',
          strategy: 'Analyzed goals and market trends to identify the optimal listing window.',
          result: 'Listed at the right time and achieved a stronger sale outcome.',
        },
        {
          link: 'https://www.zillow.com/homedetails/340-Carlyn-Ave-Campbell-CA-95008/19609634_zpid/',
          location: '340 Carlyn Ave, Campbell',
          storyType: 'Selling Story · Renovation Decision',
          problem: 'Unrenovated homes faced heavy negotiation and weaker buyer interest.',
          strategy: 'Focused on high-ROI upgrades and optimized presentation for market appeal.',
          result: 'Received faster offers with improved pricing and fewer negotiations.',
        },
      ],
    },
    zh: {
      title: '成功交易案例',
      subtitle: '湾区真实客户的真实成交案例',
      labels: { problem: '难题', strategy: '策略', result: '结果' },
      stories: [
        {
          link: 'https://www.zillow.com/homedetails/8149-Park-Villa-Cir-Cupertino-CA-95014/19632736_zpid/',
          location: '8149 Park Villa Cir, Cupertino',
          storyType: '首次购房 · 选址决策',
          problem: '对地区不熟悉，不清楚预算范围内该买哪里。',
          strategy: '明确预算与需求，研究目标区域，并高效安排看房。',
          result: '两个月内买到合适房子，方向清晰、决策安心。',
        },
        {
          link: 'https://www.zillow.com/homedetails/634-Fairmont-Ave-Mountain-View-CA-94041/19515052_zpid/',
          location: '634 Fairmont Ave, Mountain View',
          storyType: '买房故事 · 零经验客户',
          problem: '缺乏购房经验，担心犯错造成损失。',
          strategy: '系统讲解流程，看房时深入分析，并完成完整尽调。',
          result: '购房过程顺畅高效，全程心里有底。',
        },
        {
          link: 'https://www.zillow.com/homedetails/1984-Kobara-Ln-San-Jose-CA-95124/19671501_zpid/',
          location: '1984 Kobara Ln, San Jose',
          storyType: '买房 + 装修 · 风险控制策略',
          problem: '精装修房子价格高、竞争大，质量存在隐患。',
          strategy: '选择户型优质老房，并提前规划装修以控制风险。',
          result: '节省购房成本，装修成理想风格，居住更安心。',
        },
        {
          link: 'https://www.zillow.com/homedetails/1639-Mariani-Dr-Sunnyvale-CA-94087/19615927_zpid/',
          location: '1639 Mariani Dr, Sunnyvale',
          storyType: '学区房 · 理性决策',
          problem: '学区选择不明确，担心竞争激烈导致溢价。',
          strategy: '提前验证学区资格，拆解价格逻辑并制定出价策略。',
          result: '理性出价买到合适房子，决策压力显著降低。',
        },
        {
          link: 'https://www.zillow.com/homedetails/1842-Rosswood-Dr-San-Jose-CA-95124/19675701_zpid/',
          location: '1842 Rosswood Dr, San Jose',
          storyType: '卖房故事 · 上市时机',
          problem: '不确定是卖房还是继续出租，也不清楚上市时点。',
          strategy: '结合目标与市场趋势，选择最佳上市窗口。',
          result: '在合适时间出售，成交结果明显更优。',
        },
        {
          link: 'https://www.zillow.com/homedetails/340-Carlyn-Ave-Campbell-CA-95008/19609634_zpid/',
          location: '340 Carlyn Ave, Campbell',
          storyType: '卖房故事 · 装修决策',
          problem: '老房子不装修容易被压价，成交节奏慢。',
          strategy: '聚焦高回报装修项目，提升整体市场吸引力。',
          result: '出价更快、价格更好，谈判显著减少。',
        },
      ],
    },
  };

  const stories = content[language].stories;
  const total = stories.length;

  const handlePrev = () => setCurrentIndex((p) => (p === 0 ? total - 1 : p - 1));
  const handleNext = () => setCurrentIndex((p) => (p === total - 1 ? 0 : p + 1));

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Desktop */}
        {isDesktop ? (
          <div className="relative">
            {/* Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6 text-navy" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6 text-navy" />
            </button>

            {/* Viewport */}
            <div className="relative mx-auto max-w-4xl overflow-hidden">
              {/* fades */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

              {/* Center Slot */}
              <div className="flex justify-center py-2">
                <div className="relative h-[600px] w-[500px] flex-none">
                  {stories.map((story, index) => {
                    const offset = index - currentIndex;

                    // handle loop neighbor properly (optional)
                    const leftNeighbor = currentIndex === 0 ? total - 1 : currentIndex - 1;
                    const rightNeighbor = currentIndex === total - 1 ? 0 : currentIndex + 1;

                    const isCenter = index === currentIndex;
                    const isLeft = index === leftNeighbor;
                    const isRight = index === rightNeighbor;

                    const isVisible = isCenter || isLeft || isRight;

                    let translate = 0;
                    if (isLeft) translate = -60;
                    if (isRight) translate = 60;

                    const scale = isCenter ? 1 : 0.85;
                    const opacity = isCenter ? 1 : 0.5;
                    const zIndex = isCenter ? 10 : 5;

                    return (
                      <a
                        key={index}
                        href={story.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute left-0 top-0 transition-all duration-500 ease-in-out"
                        style={{
                          transform: `translateX(${translate}%) scale(${scale})`,
                          opacity: isVisible ? opacity : 0,
                          zIndex: isVisible ? zIndex : 0,
                          pointerEvents: isVisible ? 'auto' : 'none',
                        }}
                      >
                        <Card story={story} labels={content[language].labels} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-4">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary-gold w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Mobile */
          <div className="w-11/12 mx-auto overflow-x-auto snap-x snap-mandatory pb-4">
            <div ref={mobileRowRef} className="flex items-stretch justify-start gap-4">
              {stories.map((story, index) => (
                <a
                  key={index}
                  href={story.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 snap-center"
                >
                  <div className="w-[85vw]">
                    <Card story={story} labels={content[language].labels} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Card extracted so both Desktop/Mobile reuse the same UI */
function Card({
  story,
  labels,
}: {
  story: {
    link: string;
    location: string;
    storyType: string;
    problem: string;
    strategy: string;
    result: string;
  };
  labels: { problem: string; strategy: string; result: string };
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 w-[85vw] lg:w-[500px]">
      {/* Location Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-navy mb-1">{story.location}</h3>
        <p className="text-sm text-gray-500">{story.storyType}</p>
      </div>

      {/* Problem */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-red-600">P</span>
          </div>
          <span className="text-sm font-semibold text-gray-700">{labels.problem}</span>
        </div>
        <p className="text-sm text-gray-600 ml-8 line-clamp-3">{story.problem}</p>
      </div>

      {/* Strategy */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-3 h-3 text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-gray-700">{labels.strategy}</span>
        </div>
        <p className="text-sm text-gray-600 ml-8 line-clamp-4">{story.strategy}</p>
      </div>

      {/* Result */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-3 h-3 text-green-600" />
          </div>
          <span className="text-sm font-semibold text-gray-700">{labels.result}</span>
        </div>
        <p className="text-sm text-gray-600 ml-8 font-medium line-clamp-3">{story.result}</p>
      </div>
    </div>
  );
}
