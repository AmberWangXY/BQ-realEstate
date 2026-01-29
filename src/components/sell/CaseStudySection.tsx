import { useLanguageStore } from '~/store/languageStore';
import { TrendingUp, Calendar, DollarSign, Hammer } from 'lucide-react';

export function CaseStudySection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: 'Before / After 对比 + 卖房案例',
      caseTitle: '三谷单户住宅焕新出售案例',
      description: '通过简单但精准的改造（重新粉刷墙面、更换灯具、优化庭院景观）和专业布置，这套房源在首个周末 Open House 后就收到了多份高质量报价，最终以高于预期的价格成交。',
      metrics: [
        {
          icon: DollarSign,
          label: '原本估值',
          value: '约 $1,350,000',
        },
        {
          icon: TrendingUp,
          label: '实际成交价',
          value: '$1,520,000',
        },
        {
          icon: Calendar,
          label: '上市天数',
          value: '7 天',
        },
        {
          icon: Hammer,
          label: '改造与布置预算',
          value: '约 $12,000',
        },
      ],
      addedValue: '增加的售价空间',
      addedValueAmount: '约 $80,000',
    },
    en: {
      title: 'Before / After + Case Study',
      caseTitle: 'Single-family home refresh in Tri-Valley',
      description: 'With targeted updates—new interior paint, updated lighting, refreshed landscaping—and professional staging, the home received multiple strong offers after the first open house and sold above expectations.',
      metrics: [
        {
          icon: DollarSign,
          label: 'Original estimate',
          value: 'around $1,350,000',
        },
        {
          icon: TrendingUp,
          label: 'Final sale price',
          value: '$1,520,000',
        },
        {
          icon: Calendar,
          label: 'Days on market',
          value: '7 days',
        },
        {
          icon: Hammer,
          label: 'Upgrade & staging budget',
          value: 'about $12,000',
        },
      ],
      addedValue: 'Added value',
      addedValueAmount: 'roughly $80,000 in sale price',
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {currentContent.title}
        </h2>

        <div className="max-w-5xl mx-auto">
          {/* Case Title */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary-gold mb-6">
              {currentContent.caseTitle}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currentContent.metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="bg-navy-light rounded-xl p-6 text-center hover:bg-navy-dark transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary-gold mx-auto mb-4" />
                  <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
                  <div className="text-xl font-bold text-white">{metric.value}</div>
                </div>
              );
            })}
          </div>

          {/* Added Value Highlight */}
          <div className="bg-gradient-to-r from-primary-gold/20 to-primary-gold/10 rounded-2xl p-8 border-2 border-primary-gold/30">
            <div className="text-center">
              <div className="text-lg text-gray-300 mb-2">
                {currentContent.addedValue}
              </div>
              <div className="text-4xl font-bold text-primary-gold">
                {currentContent.addedValueAmount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
