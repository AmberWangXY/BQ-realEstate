import { useLanguageStore } from '~/store/languageStore';
import { AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

export function SuccessfulStoriesSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '成功案例',
      stories: [
        {
          location: 'San Jose',
          homeType: '独立屋（Single Family Home）',
          price: '$1.68M',
          image: '/modern-suburban-home.png',
          problem: {
            label: 'Problem｜问题',
            text: '业主原本居住在 Cambrian 区，计划升级到更好的学区房，但担心卖房后时间衔接不上，错过新房机会。',
          },
          strategy: {
            label: 'Strategy｜策略',
            text: 'Bill 通过精准定价与轻度改造建议，帮助房屋在上市前提升吸引力；同时提前规划"先卖后买 + 租回"的换房节奏，确保时间线可控。',
          },
          result: {
            label: 'Result｜结果',
            text: '房源在 10 天内收到多个报价，以高于市场预期的价格成交，为业主顺利升级学区房创造了充足预算与时间窗口。',
          },
        },
        {
          location: 'Milpitas',
          homeType: '独立屋（Single Family Home）',
          price: '$1.95M',
          image: '/modern-suburban-house.jpg',
          problem: {
            label: 'Problem｜问题',
            text: '业主希望卖掉现有住房，换到学区更稳定、生活环境更成熟的区域，但担心房屋状况会影响成交速度与价格。',
          },
          strategy: {
            label: 'Strategy｜策略',
            text: 'Bill 从建筑和结构角度出发，帮助业主判断哪些地方值得优化、哪些无需过度投入，并通过专业摄影与多平台曝光扩大买家覆盖面。',
          },
          result: {
            label: 'Result｜结果',
            text: '房屋快速成交，价格达到业主目标区间，帮助家庭在不增加额外压力的情况下顺利完成换房升级。',
          },
        },
        {
          location: 'Saratoga',
          homeType: '高端独立屋（Luxury Single Family Home）',
          price: '$5.2M',
          image: '/modern-minimalist-living-room.jpg', // Placeholder - should be replaced with California home
          problem: {
            label: 'Problem｜问题',
            text: '业主计划升级资产，但市场环境复杂，希望在合适的时间点、以理性策略出售，而不是盲目追高或降价。',
          },
          strategy: {
            label: 'Strategy｜策略',
            text: 'Bill 基于估价师视角与大量成交数据，制定精准定价区间，并结合高端买家偏好的营销方式，重点触达高净值人群。',
          },
          result: {
            label: 'Result｜结果',
            text: '房屋在理想时间窗口内成功成交，帮助业主完成资产升级，并为下一阶段投资提供更优结构。',
          },
        },
      ],
    },
    en: {
      title: 'Successful Stories',
      stories: [
        {
          location: 'San Jose',
          homeType: 'Single Family Home',
          price: '$1.68M',
          image: '/modern-suburban-home.png',
          problem: {
            label: 'Problem',
            text: 'The homeowners planned to move up to a better school district but were concerned about timing—selling too late could mean missing their next home.',
          },
          strategy: {
            label: 'Strategy',
            text: 'Bill advised on strategic pricing and light pre-market improvements to enhance buyer appeal, while designing a sell-first-with-rent-back strategy to align both transactions smoothly.',
          },
          result: {
            label: 'Result',
            text: 'The home received multiple offers within 10 days and sold above market expectations, giving the family a clear path to upgrade into a stronger school district.',
          },
        },
        {
          location: 'Milpitas',
          homeType: 'Single Family Home',
          price: '$1.95M',
          image: '/modern-suburban-house.jpg',
          problem: {
            label: 'Problem',
            text: 'The sellers wanted to move into a more established school district but worried that their home\'s condition might limit buyer interest or pricing.',
          },
          strategy: {
            label: 'Strategy',
            text: 'Leveraging his construction background, Bill guided cost-effective improvements and avoided unnecessary upgrades, while launching a strong marketing campaign across multiple platforms.',
          },
          result: {
            label: 'Result',
            text: 'The property sold quickly at the desired price range, allowing the family to transition smoothly into their next home without added stress.',
          },
        },
        {
          location: 'Saratoga',
          homeType: 'Luxury Single Family Home',
          price: '$5.2M',
          image: '/modern-minimalist-living-room.jpg', // Placeholder - should be replaced with California home
          problem: {
            label: 'Problem',
            text: 'The homeowner aimed to upgrade assets but needed a rational, data-driven approach to navigate a complex high-end market.',
          },
          strategy: {
            label: 'Strategy',
            text: 'Using valuation expertise and local transaction data, Bill established a precise pricing strategy and executed targeted marketing to reach qualified high-net-worth buyers.',
          },
          result: {
            label: 'Result',
            text: 'The home sold within the desired timeframe, enabling a smooth asset upgrade and stronger positioning for the client\'s next investment stage.',
          },
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-navy text-center mb-16">
          {currentContent.title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300"
            >
              {/* House Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={story.image}
                  alt={`${story.location} - ${story.homeType}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Location & Home Type */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-navy mb-1">
                    {story.location}
                  </h3>
                  <p className="text-gray-600 text-sm">{story.homeType}</p>
                </div>

                {/* Sold Price */}
                <div className="mb-6">
                  <p className="text-2xl font-bold text-primary-gold">
                    {story.price}
                  </p>
                </div>

                {/* Problem */}
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-1">
                        {story.problem.label}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {story.problem.text}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Strategy */}
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-1">
                        {story.strategy.label}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {story.strategy.text}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-1">
                        {story.result.label}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {story.result.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
