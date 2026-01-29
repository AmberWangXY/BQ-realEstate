import { useLanguageStore } from '~/store/languageStore';
import { Home, Hammer, DollarSign, Calendar, MessageCircle, TrendingUp } from 'lucide-react';

export function CaseStudySection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '案例故事',
      subtitle: '真实案例 + 前后对比 + 租金提升',
      caseTitle: '中国文案',
      sections: {
        original: {
          title: '原始情况',
          icon: Home,
          items: [
            '房屋空置已 2 个月',
            '室内老旧、灯光昏暗',
            '租金预估 $2,900/月',
          ],
        },
        improvements: {
          title: '改造动作',
          icon: Hammer,
          items: [
            '重新粉刷墙面',
            '更换 LED 灯具',
            '优化家具摆设',
            '安排深度清洁',
            '使用专业摄影重新上线房源',
          ],
        },
        outcome: {
          title: '租金变化',
          icon: DollarSign,
          description: '更新后以 $3,300/月 成功出租',
          highlight: '租金提升约 $400/月',
        },
        speed: {
          title: '上市时间 / 成交速度',
          icon: Calendar,
          description: '上线 5 天收到 3 组租客申请',
        },
      },
      testimonial: {
        title: '房东评价',
        icon: MessageCircle,
        quote: '"感谢 Bill，让我完全不用操心，一切都被打理得非常专业。租金比预期高，还租得很快！"',
      },
      roi: {
        label: '投资回报',
        value: '$400/月 × 12 = $4,800/年',
        note: '改造投入约 $2,000，不到 6 个月即可回本',
      },
    },
    en: {
      title: 'Case Study',
      subtitle: 'Before / After + Rental Increase',
      caseTitle: 'English Version',
      sections: {
        original: {
          title: 'Original condition',
          icon: Home,
          items: [
            'Property had been vacant for 2 months',
            'Interior looked dated and lighting was dim',
            'Expected rental value: $2,900/month',
          ],
        },
        improvements: {
          title: 'Your improvements',
          icon: Hammer,
          items: [
            'Repainted interior walls',
            'Updated LED lighting',
            'Rearranged and refreshed staging',
            'Scheduled deep cleaning',
            'Relisted with professional photography',
          ],
        },
        outcome: {
          title: 'Rental outcome',
          icon: DollarSign,
          description: 'Successfully rented for $3,300/month',
          highlight: 'an increase of $400/month',
        },
        speed: {
          title: 'Days-on-market / leasing speed',
          icon: Calendar,
          description: 'Received 3 qualified applications within 5 days',
        },
      },
      testimonial: {
        title: 'Landlord testimonial',
        icon: MessageCircle,
        quote: '"Bill handled everything professionally and efficiently. I didn\'t need to worry about anything — and the final rental price was higher than I expected!"',
      },
      roi: {
        label: 'Return on Investment',
        value: '$400/month × 12 = $4,800/year',
        note: 'With roughly $2,000 in upgrades, payback in under 6 months',
      },
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-300">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Case Study Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Original Condition */}
            <div className="bg-navy-light rounded-2xl p-8 border border-navy-dark">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Home className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {currentContent.sections.original.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {currentContent.sections.original.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-400 mt-1">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-navy-light rounded-2xl p-8 border border-navy-dark">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center">
                  <Hammer className="w-6 h-6 text-primary-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {currentContent.sections.improvements.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {currentContent.sections.improvements.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-primary-gold mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Outcome Metrics */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Rental Outcome */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl p-8 border-2 border-green-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">
                  {currentContent.sections.outcome.title}
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                {currentContent.sections.outcome.description}
              </p>
              <div className="text-2xl font-bold text-green-400">
                {currentContent.sections.outcome.highlight}
              </div>
            </div>

            {/* Speed */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-8 border-2 border-blue-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-white">
                  {currentContent.sections.speed.title}
                </h3>
              </div>
              <p className="text-gray-300 text-lg">
                {currentContent.sections.speed.description}
              </p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-primary-gold/20 to-primary-gold/10 rounded-2xl p-8 border-2 border-primary-gold/30 mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <MessageCircle className="w-8 h-8 text-primary-gold" />
              <h3 className="text-2xl font-bold text-white">
                {currentContent.testimonial.title}
              </h3>
            </div>
            <p className="text-xl text-gray-200 italic leading-relaxed">
              {currentContent.testimonial.quote}
            </p>
          </div>

          {/* ROI Summary */}
          <div className="bg-navy-light rounded-2xl p-8 border-2 border-primary-gold/50 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <TrendingUp className="w-10 h-10 text-primary-gold" />
              <h3 className="text-2xl font-bold text-primary-gold">
                {currentContent.roi.label}
              </h3>
            </div>
            <div className="text-3xl font-bold text-white mb-3">
              {currentContent.roi.value}
            </div>
            <p className="text-gray-300 text-lg">
              {currentContent.roi.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
