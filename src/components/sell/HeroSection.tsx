import { useLanguageStore } from '~/store/languageStore';

export function HeroSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '售房服务',
      subtitle: '精准定价、专业布置、多平台营销，帮助您在理想时间内获得更优回报。',
    },
    en: {
      title: 'Sell with Confidence',
      subtitle: 'Accurate pricing, professional staging, and multi-channel marketing to help you achieve the best return within your ideal timeline.',
    },
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-minimalist-living-room.jpg"
          alt="Sell with Bill"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            {content[language].title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-slide-up">
            {content[language].subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
