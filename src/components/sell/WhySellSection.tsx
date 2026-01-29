import { useLanguageStore } from '~/store/languageStore';
import { DollarSign, Hammer, Megaphone, Gavel } from 'lucide-react';

export function WhySellSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '为什么找 Bill 卖房？',
      features: [
        {
          icon: DollarSign,
          title: '定价策略专业、透明',
          description: '我拥有估价背景，并长期跟踪本地成交数据，会用真实案例和数据模型为您制定定价区间，既不过低"贱卖"，也不过高导致在市场上挂太久。',
        },
        {
          icon: Hammer,
          title: '改造 & 布置更懂"投入产出比"',
          description: '凭借建筑和工程相关经验，我知道哪些地方简单改造就能显著提升买家印象，例如油漆、灯光、地板、小范围更新厨房或卫浴，帮助您用有限预算换取更高成交价。',
        },
        {
          icon: Megaphone,
          title: '多平台立体营销',
          description: '我会为您的房源安排专业摄影与视频，并通过中英文多平台投放（例如 MLS、Zillow、Redfin、YouTube、小红书、微信朋友圈与社群等），精准覆盖目标买家群体。',
        },
        {
          icon: Gavel,
          title: '多年实战谈判经验',
          description: '从开放参观反馈到多方 offer 对比，我会为您分析每一个报价的条款与风险，用策略性谈判帮助您获得更优价格与更稳妥的交易条件。',
        },
      ],
    },
    en: {
      title: 'Why Sell with Bill?',
      features: [
        {
          icon: DollarSign,
          title: 'Data-driven pricing strategy',
          description: 'With valuation training and up-to-date local sales data, I build a realistic pricing range for your home—high enough to protect your equity, but grounded enough to attract serious buyers and avoid sitting on the market too long.',
        },
        {
          icon: Hammer,
          title: 'Smart upgrades & staging',
          description: 'Thanks to my construction and engineering experience, I know which upgrades actually move the needle—fresh paint, lighting, flooring, light kitchen or bath refreshes—so you invest where it truly improves buyer perception and return.',
        },
        {
          icon: Megaphone,
          title: 'Bilingual, multi-platform marketing',
          description: 'Your home will be showcased with professional photos and video, then promoted across major listing platforms (MLS, Zillow, Redfin) as well as Chinese and English social channels such as YouTube, Xiaohongshu, and WeChat, reaching both local and overseas buyers.',
        },
        {
          icon: Gavel,
          title: 'Experienced negotiation',
          description: 'From open house feedback to comparing multiple offers, I help you understand every term—price, contingencies, financing strength—and use strategic negotiation to secure better price and safer conditions for your sale.',
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-navy text-center mb-16">
          {currentContent.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {currentContent.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-cream rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-primary-gold flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
