import { useLanguageStore } from '~/store/languageStore';

export function IntroSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      text: '凭借房屋估价背景、建筑与结构经验，以及丰富的贷款合作资源，我为您提供从预算规划、看房、估价、装修建议到策略性出价与谈判的全流程支持，让买房更稳更安心。',
    },
    en: {
      text: 'With valuation expertise, construction knowledge, and strong lender partnerships, I guide you through every step — from budgeting and home tours to evaluation, renovation advice, and strategic negotiation — ensuring a smooth and confident buying experience.',
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            {content[language].text}
          </p>
        </div>
      </div>
    </section>
  );
}
