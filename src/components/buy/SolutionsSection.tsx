import { useLanguageStore } from '~/store/languageStore';
import { TrendingUp, DollarSign, Home, Target } from 'lucide-react';

export function SolutionsSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      sectionTitle: '我们帮你解决什么问题？',
      painPointsTitle: '买房常见困扰',
      painPoints: [
        '不知道现在是不是买房好时机？',
        '手上现金不多，怎么安排首付和贷款？',
        '担心买到问题房、旧房、难转手的房子？',
        '多个 offer 竞争时，我会不会一直买不到？',
      ],
      solutionsTitle: '我们的解决方案',
      solutions: [
        {
          title: '市场数据 + 投资回报分析',
          description: '基于实时市场数据和历史趋势，为您提供专业的时机分析和投资回报预测，帮助您做出明智决策。',
        },
        {
          title: '联合贷款方案设计',
          description: '凭借丰富的贷款机构合作资源，为您量身定制最优贷款方案，最大化您的购买力和现金流。',
        },
        {
          title: '房屋结构和装修建议',
          description: '利用建筑和估价专业背景，为您深度评估房屋质量、潜在问题和改造潜力，避免买到问题房。',
        },
        {
          title: '策略性出价与专业谈判',
          description: '在竞争激烈的市场中，运用策略性出价技巧和专业谈判能力，帮助您成功获得心仪房产。',
        },
      ],
    },
    en: {
      sectionTitle: 'What Problems Do We Solve?',
      painPointsTitle: 'Common Buyer Concerns',
      painPoints: [
        'Unsure if it\'s the right time to buy?',
        'Limited cash on hand — how should you structure your down payment and loan?',
        'Worried about hidden issues, old homes, or poor resale value?',
        'Concerned about losing in multiple-offer competition?',
      ],
      solutionsTitle: 'Our Solutions',
      solutions: [
        {
          title: 'Market insights + investment return analysis',
          description: 'Leverage real-time data and historical trends to provide expert timing analysis and ROI projections for confident decision-making.',
        },
        {
          title: 'Customized loan strategy and lender coordination',
          description: 'Access our extensive lender network to design optimal financing solutions that maximize your buying power and cash flow.',
        },
        {
          title: 'Construction insight & renovation recommendations',
          description: 'Apply construction and appraisal expertise to thoroughly evaluate property quality, identify potential issues, and assess renovation potential.',
        },
        {
          title: 'Strategic offers & expert negotiation guidance',
          description: 'Navigate competitive markets with strategic offer tactics and professional negotiation skills to secure your ideal property.',
        },
      ],
    },
  };

  const solutionIcons = [TrendingUp, DollarSign, Home, Target];
  const gradients = [
    'from-blue-500 to-blue-600',
    'from-primary-gold to-yellow-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {content[language].sectionTitle}
          </h2>
        </div>

        {/* Pain Points */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
            {content[language].painPointsTitle}
          </h3>
          <div className="space-y-4">
            {content[language].painPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white rounded-lg p-4 shadow-soft animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
            {content[language].solutionsTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {content[language].solutions.map((solution, index) => {
              const Icon = solutionIcons[index];
              const gradient = gradients[index];
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-500`} />

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-primary-gold transition-colors">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Decorative Line */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
