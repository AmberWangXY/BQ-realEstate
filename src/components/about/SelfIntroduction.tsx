import { useLanguageStore } from '~/store/languageStore';

export function SelfIntroduction() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '简介',
      text: 'Bill 秦，湾区资深地产经纪人，拥有超过 20 年房产投资、交易与项目管理经验。他擅长用数据、逻辑与人情味，帮助客户做出最稳健、最安心的房地产决策。从自住到投资，从买卖到出租，他提供一站式、透明且以客户为中心的服务体验。',
    },
    en: {
      title: 'Introduction',
      text: 'Bill Qin is a seasoned Bay Area real estate broker with 20+ years of experience in investment, transactions, and project management. He combines data insight, strategic thinking, and genuine care to help clients make confident, well-informed real estate decisions. Whether buying, selling, or investing, Bill offers a transparent, comprehensive, and client-first service experience.',
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center">
            {content[language].title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            {content[language].text}
          </p>
        </div>
      </div>
    </section>
  );
}
