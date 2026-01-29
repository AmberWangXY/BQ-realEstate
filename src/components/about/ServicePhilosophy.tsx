import { useLanguageStore } from '~/store/languageStore';

export function ServicePhilosophy() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      sectionTitle: 'Service Philosophy',
      headline: 'Honest, Personalized Service — Never Pushy',
      body: "I don't rush clients or push decisions. My role is to provide facts, analysis, and clear options — so you can decide what's right for you. This approach builds long-term trust and lasting client relationships.",
    },
    zh: {
      sectionTitle: '服务理念',
      headline: '尊重客户节奏，用事实和分析帮助决策',
      body: '我相信，好的房地产服务不是催促，而是理解。我会如实反映房产的优点与问题，提供分析和解决方案，帮助客户看清全局。最终的决定权，永远在客户手中。 这种一对一、长期视角的服务方式，让很多客户在多次换房、升级资产时，依然选择继续合作。',
    },
  };

  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {content[language].sectionTitle}
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-bold text-primary-gold mb-6 leading-relaxed">
            {content[language].headline}
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-line">
            {content[language].body}
          </p>
        </div>
      </div>
    </section>
  );
}
