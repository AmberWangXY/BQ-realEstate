import { useLanguageStore } from '~/store/languageStore';
import { MessageCircle, Home, Paintbrush, Megaphone, Handshake, FileText } from 'lucide-react';

export function ProcessSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '卖房流程',
      steps: [
        {
          icon: MessageCircle,
          title: '免费咨询与目标沟通',
          description: '了解您的时间规划（何时想卖、是否需要先买后卖）、财务目标（期望净收益）以及房屋目前状况。',
        },
        {
          icon: Home,
          title: '房屋评估与定价建议',
          description: '实地勘察房屋情况，结合最近成交对比与市场趋势，给出一个合理的定价区间与不同策略选项（快速成交 vs. 争取溢价）。',
        },
        {
          icon: Paintbrush,
          title: '改造 / 布置方案与执行',
          description: '根据预算提供改造和 Home Staging 建议，可以对接可靠的装修团队、清洁公司、园艺师等，帮助房子以最佳状态亮相市场。',
        },
        {
          icon: Megaphone,
          title: '上市与营销推广',
          description: '安排专业摄影、视频、3D/虚拟看房，发布至 MLS 与主要线上平台，并通过 Open House、私人看房以及中英文社交媒体引流。',
        },
        {
          icon: Handshake,
          title: '收到 Offer 与谈判',
          description: '对所有报价进行逐条分析（价格、条件、贷款情况、Contingency 等），并根据您的底线与目标，制定谈判策略，帮您选出最合适的一份。',
        },
        {
          icon: FileText,
          title: '签约、过户与售后服务',
          description: '协调验房、贷款、文件签署与过户流程，确保时间节点顺利推进。交易完成后，如您有再次购房或置换计划，我也会持续提供建议与协助。',
        },
      ],
    },
    en: {
      title: 'Selling Process',
      steps: [
        {
          icon: MessageCircle,
          title: 'Free consultation & goal setting',
          description: 'We discuss your timing (when you\'d like to sell, whether you need to buy and sell at the same time), your financial goals, and the current condition of your home.',
        },
        {
          icon: Home,
          title: 'Home evaluation & pricing strategy',
          description: 'I walk through the property, review comparable sales and market trends, then recommend a pricing range and strategy—whether you want a fast, clean sale or to push for a premium.',
        },
        {
          icon: Paintbrush,
          title: 'Upgrade & staging plan',
          description: 'Based on your budget, I propose a targeted upgrade and staging plan and connect you with trusted contractors, cleaners, landscapers, and stagers to present your home at its best.',
        },
        {
          icon: Megaphone,
          title: 'Listing & marketing',
          description: 'We schedule professional photography, video, and possibly 3D/virtual tours, then launch your home on MLS and key platforms, supported by open houses, private showings, and bilingual online promotion.',
        },
        {
          icon: Handshake,
          title: 'Offers & negotiation',
          description: 'When offers come in, I break down the details—price, contingencies, loan type, closing timeline—and guide you through counteroffers and negotiation to reach the best overall outcome.',
        },
        {
          icon: FileText,
          title: 'Closing & post-sale support',
          description: 'I coordinate inspections, appraisals, loan and escrow milestones, and document signing to ensure a smooth closing. After the sale, I\'m still available to help with your next purchase or transition.',
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-navy text-center mb-16">
          {currentContent.title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary-gold flex items-center justify-center shadow-lg">
                  <span className="text-navy font-bold text-xl">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center mb-6 mt-4">
                  <Icon className="w-7 h-7 text-navy" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-navy mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
