import { useLanguageStore } from '~/store/languageStore';
import { AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

export function SuccessfulStoriesSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '成功案例',
      stories: [
        {
          location: 'Sunnyvale',
          homeType: '学区房（School District Home）',
          price: '$3.8M',
          image: '/modern-suburban-home.jpg',
          problem: {
            label: 'Problem｜问题',
            text: '不知道选哪个学区；买了房是否一定能上对应学校不确定；学区房竞争激烈，担心溢价是否合理、出价犹豫错失机会或情绪上头买贵。',
          },
          strategy: {
            label: 'Strategy｜策略',
            text: '教育顾问共同参与，根据孩子情况进行长期学业规划，并兼顾小学到高中的整体衔接。出价前验证学区资格，同时评估公校、私校与 Charter 等多种选择路径。通过 5–10 年增长与抗跌分析，拆解学区溢价，提前制定理性出价策略。',
          },
          result: {
            label: 'Result｜结果',
            text: '在正确的时间、正确的地点买到合适的房子；从情绪化抢学区房转为理性配置资产，出手更果断、成交率更高，买完更踏实。',
          },
        },
        {
          location: 'Mountain View',
          homeType: '独立屋（Single Family Home）',
          price: '$2.6M',
          image: '/suburban-house-blue-gray.jpg',
          problem: {
            label: 'Problem｜问题',
            text: '没有经验，不了解流程，担心漏掉重要细节，怕买错、怕损失。',
          },
          strategy: {
            label: 'Strategy｜策略',
            text: '先系统讲解购房流程，降低信息不对称。看房时分析房屋优缺点与潜在风险。做细致尽调并判断隐患。依托建筑经验评估房屋真实状况。结合市场与价格分析制定合理出价策略。',
          },
          result: {
            label: 'Result｜结果',
            text: '流程更顺畅、更省心；每一步更有把握；成交后也更安心、放心。',
          },
        },
        {
          location: 'San Jose',
          homeType: '独立屋（Single Family Home）',
          price: '$2.1M',
          image: '/modern-minimalist-living-room-1.jpg',
          problem: {
            label: 'Problem｜问题',
            text: '新装修的房子不好抢、成本高；担心表面翻新质量不可控、隐患看不见。',
          },
          strategy: {
            label: 'Strategy｜策略',
            text: '选择户型好、具备改造潜力的老房子。看房阶段同步评估装修方案与成本。仔细检查房屋状况，提前发现问题。过户期间启动设计，成交后快速施工。',
          },
          result: {
            label: 'Result｜结果',
            text: '比买精装修省下不少钱；装修成自己喜欢的风格；时间占用不多，团队承担大部分工作，居住更安心。',
          },
        },
      ],
    },
    en: {
      title: 'Successful Stories',
      stories: [
        {
          location: 'Sunnyvale',
          homeType: 'School District Home',
          price: '$3.8M',
          image: '/modern-suburban-home.jpg',
          problem: {
            label: 'Problem',
            text: 'Uncertain which school district to target and whether buying a home guarantees access to specific schools. Also worried about bidding wars, overpaying, and price justification.',
          },
          strategy: {
            label: 'Strategy',
            text: 'Work with an education consultant to plan long-term school alignment based on the child\'s needs. Verify school eligibility before offering while evaluating public, private, and charter options. Use 5–10 year growth and downside analysis to break down premiums and define rational offer strategies.',
          },
          result: {
            label: 'Result',
            text: 'Bought the right home in the right place at the right time. Shifted from emotional bidding to rational asset allocation, with stronger execution and greater peace of mind.',
          },
        },
        {
          location: 'Mountain View',
          homeType: 'Single Family Home',
          price: '$2.6M',
          image: '/suburban-house-blue-gray.jpg',
          problem: {
            label: 'Problem',
            text: 'No experience with the buying process and worried about missing critical details or making costly mistakes.',
          },
          strategy: {
            label: 'Strategy',
            text: 'Act as a guide and explain the end-to-end buying process. Analyze each property\'s pros and cons during showings. Perform detailed due diligence and evaluate hidden risks. Use construction expertise to assess real condition. Analyze pricing and market context to set an effective offer strategy.',
          },
          result: {
            label: 'Result',
            text: 'The process was smooth and efficient, with confidence at every step and peace of mind after closing.',
          },
        },
        {
          location: 'San Jose',
          homeType: 'Single Family Home',
          price: '$2.1M',
          image: '/modern-minimalist-living-room-1.jpg',
          problem: {
            label: 'Problem',
            text: 'Renovated homes were highly competitive and expensive, while renovation quality behind fresh finishes was uncertain.',
          },
          strategy: {
            label: 'Strategy',
            text: 'Target older homes with strong layouts and renovation potential. Estimate renovation costs during tours. Inspect thoroughly to identify issues early. Start design during escrow and move quickly after closing.',
          },
          result: {
            label: 'Result',
            text: 'Saved significantly compared to renovated homes, achieved the preferred style, and minimized time burden with most work handled by the team.',
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
