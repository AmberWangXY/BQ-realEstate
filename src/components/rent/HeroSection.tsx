import { useLanguageStore } from '~/store/languageStore';

export function HeroSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '物业管理',
      subtitle: '认真负责、细致入微，让您的房地产投资真正"收得稳、睡得好"。',
    },
    en: {
      title: 'Property Management',
      subtitle: 'Responsible, meticulous, and trustworthy — so your investment stays secure and you truly sleep well at night.',
    },
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-minimalist-living-room.jpg"
          alt="Property Management"
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
