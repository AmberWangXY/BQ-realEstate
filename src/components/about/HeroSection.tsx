import { useLanguageStore } from '~/store/languageStore';

export function HeroSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '秦由棕',
      subtitle: '湾区资深地产经纪人，拥有超过 20 年房产投资、交易与项目管理经验。',
    },
    en: {
      title: 'Bill Qin',
      subtitle: 'A seasoned Bay Area real estate broker with 20+ years of experience in investment, transactions, and project management.',
    },
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/formal-speech-floral-podium.jpg"
          alt="Bill Qin"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-20 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          {content[language].title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-slide-up">
          {content[language].subtitle}
        </p>
      </div>
    </section>
  );
}
