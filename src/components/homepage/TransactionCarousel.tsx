import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '~/store/languageStore';

export function TransactionCarousel() {
  const language = useLanguageStore((state) => state.language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size for conditional styling
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Check on mount
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const content = {
    en: {
      title: 'Transaction Success Stories',
      subtitle: 'Real results from real clients across the Bay Area',
      labels: {
        problem: 'Problem',
        strategy: 'Strategy',
        result: 'Result',
      },
      stories: [
        {
          link: 'https://www.zillow.com/homedetails/8149-Park-Villa-Cir-Cupertino-CA-95014/19632736_zpid/',
          location: '8149 Park Villa Cir, Cupertino',
          storyType: 'First-Time Homebuyer · Location Selection',
          problem: 'Unfamiliar with the area and unsure where to buy or what was affordable. Long independent search yielded no suitable options.',
          strategy: 'Assessed available funds and secured pre-approval. Clarified home needs, researched target areas, and conducted in-person tours to identify the best location.',
          result: 'Found the right home in 2 months. Avoided wasted time and eliminated the steep learning curve on neighborhoods.',
        },
        {
          link: 'https://www.zillow.com/homedetails/634-Fairmont-Ave-Mountain-View-CA-94041/19515052_zpid/',
          location: '634 Fairmont Ave, Mountain View',
          storyType: 'Buying Story · No-Experience Buyer',
          problem: 'No buying experience and worried about missing critical details or making costly mistakes.',
          strategy: 'Guided through the entire process with clear explanations. Analyzed properties during showings, performed thorough due diligence, and leveraged construction expertise to assess condition and risks.',
          result: 'Smooth, efficient process with confidence at every step. Buyer remained at ease after closing.',
        },
        {
          link: 'https://www.zillow.com/homedetails/1984-Kobara-Ln-San-Jose-CA-95124/19671501_zpid/',
          location: '1984 Kobara Ln, San Jose',
          storyType: 'Buying + Renovation · Choose an Unrenovated Home to Control Risk',
          problem: 'Renovated homes were too competitive and expensive. Loved layouts but not renovation styles, and worried about hidden quality issues.',
          strategy: 'Targeted older homes with strong layouts and renovation potential. Discussed renovation plans during tours, inspected carefully, and started design during escrow for quick execution post-closing.',
          result: 'Saved significantly vs. buying renovated, got preferred style, minimal time burden, and lived with peace of mind.',
        },
        {
          link: 'https://www.zillow.com/homedetails/1639-Mariani-Dr-Sunnyvale-CA-94087/19615927_zpid/',
          location: '1639 Mariani Dr, Sunnyvale',
          storyType: 'School District Home · Buy at the Right Time, with the Right Validation',
          problem: 'Uncertain which school district to target and whether home purchase guaranteed school access. Worried about bidding wars and overpaying.',
          strategy: 'Worked with education consultant for long-term planning. Verified school eligibility before offering. Provided price growth and downside analysis, broke down premium drivers, and pre-defined offer scenarios.',
          result: 'Bought the right home at the right time. Shifted from emotional bidding to rational decision-making with higher close rate and peace of mind.',
        },
        {
          link: 'https://www.zillow.com/homedetails/1842-Rosswood-Dr-San-Jose-CA-95124/19675701_zpid/',
          location: '1842 Rosswood Dr, San Jose',
          storyType: 'Selling Story · Choosing the Best Listing Timing',
          problem: 'Uncertain whether to keep renting or sell, and unsure about optimal listing timing.',
          strategy: 'Clarified selling goals and timeline. Analyzed market trends and seasonality to select the best listing window.',
          result: 'Listed at the right time and achieved a higher sale price.',
        },
        {
          link: 'https://www.zillow.com/homedetails/340-Carlyn-Ave-Campbell-CA-95008/19609634_zpid/',
          location: '340 Carlyn Ave, Campbell',
          storyType: 'Selling Story · Whether to Renovate Before Listing',
          problem: 'Older unrenovated homes trigger heavy negotiation, lower offers, and slower decisions. Many buyers want move-in-ready homes.',
          strategy: 'Selected highest-ROI renovation items with market-proven design. Optimized for maximum buyer appeal. Team handled end-to-end: planning, supervision, budgeting, and closing prep.',
          result: 'Faster offers with stronger prices. Fewer repair negotiations. Renovation became a pricing tool, not just a cost.',
        },
      ],
    },
    zh: {
      title: '成功交易案例',
      subtitle: '湾区真实客户的真实成交案例',
      labels: {
        problem: '难题',
        strategy: '策略',
        result: '结果',
      },
      stories: [
        {
          link: 'https://www.zillow.com/homedetails/8149-Park-Villa-Cir-Cupertino-CA-95014/19632736_zpid/',
          location: '8149 Park Villa Cir, Cupertino',
          storyType: '首次购房 · 选址决策',
          problem: '对地区不熟悉,不知道该买哪里、预算能买什么。自己看了很久没找到合适选择。',
          strategy: '评估可用资金并完成预批准。明确需求,研究目标区域,实地看房确认最佳地点。',
          result: '2个月内买到合适房子。节省大量时间,无需从零摸索地区信息。',
        },
        {
          link: 'https://www.zillow.com/homedetails/634-Fairmont-Ave-Mountain-View-CA-94041/19515052_zpid/',
          location: '634 Fairmont Ave, Mountain View',
          storyType: '买房故事 · 零经验客户',
          problem: '没有经验,担心漏掉重要细节或犯错导致损失。',
          strategy: '系统讲解购房流程。看房时分析优缺点,做细致尽调,依托建筑经验判断真实状况与风险。',
          result: '流程顺畅高效,每步都有把握。成交后安心放心。',
        },
        {
          link: 'https://www.zillow.com/homedetails/1984-Kobara-Ln-San-Jose-CA-95124/19671501_zpid/',
          location: '1984 Kobara Ln, San Jose',
          storyType: '买房 + 装修 · 选未翻新的房子降低风险',
          problem: '新装修房子竞争激烈且贵。喜欢户型但不喜欢装修风格,担心表面翻新隐藏质量问题。',
          strategy: '选择户型好、有改造潜力的老房子。看房时讨论装修方案,仔细检查,过户期间启动设计并快速施工。',
          result: '比买精装修省钱,装成喜欢的风格,时间占用少,居住更安心。',
        },
        {
          link: 'https://www.zillow.com/homedetails/1639-Mariani-Dr-Sunnyvale-CA-94087/19615927_zpid/',
          location: '1639 Mariani Dr, Sunnyvale',
          storyType: '学区房 · 验证学区与理性出价',
          problem: '不确定选哪个学区,买房是否能上对应学校。担心竞争激烈,溢价不合理或出价失误。',
          strategy: '教育顾问参与长期规划。出价前验证学区资格。提供增长与抗跌分析,拆解溢价构成,预设出价策略。',
          result: '在正确时间地点买到合适房子。从情绪化抢房转为理性配置,成交率更高更踏实。',
        },
        {
          link: 'https://www.zillow.com/homedetails/1842-Rosswood-Dr-San-Jose-CA-95124/19675701_zpid/',
          location: '1842 Rosswood Dr, San Jose',
          storyType: '卖房故事 · 上市时间选择',
          problem: '不确定该继续出租还是卖,也不知道最佳上市时间。',
          strategy: '明确卖房目标与时间表。结合市场趋势选择最佳上市窗口。',
          result: '在更好的时间上市,卖出更高价格。',
        },
        {
          link: 'https://www.zillow.com/homedetails/340-Carlyn-Ave-Campbell-CA-95008/19609634_zpid/',
          location: '340 Carlyn Ave, Campbell',
          storyType: '卖房故事 · 出售前是否装修',
          problem: '老旧房子不装修会被大幅议价、出价慢、要求多。很多买家想拎包入住。',
          strategy: '选择ROI最高的装修项目,用市场审美判断。优化买家群体吸引力。团队全程负责设计、监管、结算到交房。',
          result: '出价更快价格更高。减少维修谈判。装修成为定价工具而非成本。',
        },
      ],
    },
  };

  const stories = content[language].stories;
  const totalCards = stories.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 hidden lg:block"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 hidden lg:block"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6 text-navy" />
          </button>

          {/* Carousel Viewport with Gradient Edges */}
          <div className="relative w-11/12 mx-auto lg:mx-16 lg:w-auto overflow-x-scroll snap-x snap-mandatory lg:overflow-hidden pb-4 lg:pb-0">
            {/* Left Gradient Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none hidden lg:block" />
            
            {/* Right Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none hidden lg:block" />

            {/* Cards Container */}
            <div className="flex items-center justify-start lg:justify-center gap-4 lg:gap-0">
              <div className="relative flex lg:block lg:w-full lg:max-w-2xl h-[600px] items-center">
                {stories.map((story, index) => {
                  const offset = index - currentIndex;
                  const isCenter = offset === 0;
                  const isNeighbor = Math.abs(offset) === 1;
                  const isVisible = Math.abs(offset) <= 1;

                  return (
                    <a
                      key={index}
                      href={story.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative lg:absolute flex-shrink-0 snap-center transition-all duration-500 ease-in-out cursor-pointer"
                      style={isDesktop ? {
                        transform: `translateX(${offset * 60}%) scale(${isCenter ? 1 : 0.85})`,
                        opacity: isCenter ? 1 : isNeighbor ? 0.5 : 0,
                        zIndex: isCenter ? 10 : isNeighbor ? 5 : 0,
                        pointerEvents: isVisible ? 'auto' : 'none',
                      } : {}}
                    >
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 w-[85vw] lg:w-[500px]">
                        {/* Location Header */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-navy mb-1">
                            {story.location}
                          </h3>
                          <p className="text-sm text-gray-500">{story.storyType}</p>
                        </div>

                        {/* Problem */}
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-red-600">P</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                              {content[language].labels.problem}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 ml-8 line-clamp-3">
                            {story.problem}
                          </p>
                        </div>

                        {/* Strategy */}
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <TrendingUp className="w-3 h-3 text-blue-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                              {content[language].labels.strategy}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 ml-8 line-clamp-4">
                            {story.strategy}
                          </p>
                        </div>

                        {/* Result */}
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                              {content[language].labels.result}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 ml-8 font-medium line-clamp-3">
                            {story.result}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mt-0 hidden lg:flex">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-gold w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
