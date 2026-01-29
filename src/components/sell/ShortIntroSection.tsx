import { useLanguageStore } from '~/store/languageStore';

export function ShortIntroSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      intro: '作为专注湾区的房产经纪，我熟悉南湾、东湾和三谷地区的主要社区、市场趋势和买家偏好。基于估价背景、工程与建筑经验，以及中英文双语营销系统，我帮助屋主在合适的时间、以更理想的价格完成顺利且透明的售房流程。',
      tagline: '湾区华人房产经纪 · 熟悉南湾、东湾与三谷 · 过去 12 个月持续增长的成交表现',
    },
    en: {
      intro: 'As a Bay Area-focused realtor, I know the pricing trends and buyer preferences in key communities across the South Bay, East Bay, and Tri-Valley. With a background in valuation, construction insight, and a bilingual marketing system, I help homeowners sell at the right time, for the right price, with a smooth and transparent process.',
      tagline: 'Bay Area Chinese Realtor · Deep knowledge of South Bay, East Bay & Tri-Valley · Consistently growing sales volume in the past 12 months',
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {content[language].intro}
          </p>
          <p className="text-sm md:text-base text-primary-gold font-semibold">
            {content[language].tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
