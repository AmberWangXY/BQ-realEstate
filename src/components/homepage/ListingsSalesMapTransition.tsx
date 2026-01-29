import { useLanguageStore } from '~/store/languageStore';

export function ListingsSalesMapTransition() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      title: 'Listings & Sales Map',
      subtitle: "Explore Bill Qin's verified listings and transaction footprint",
    },
    zh: {
      title: '成交与挂牌分布地图',
      subtitle: '查看 Bill Qin 已验证的挂牌与成交足迹',
    },
  };

  return (
    <a
      href="https://www.zillow.com/profile/Bill-Qin"
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-full overflow-hidden group cursor-pointer"
    >
      {/* Background Image with Blur */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.35]"
          style={{
            backgroundImage: 'url(/listings-sales-map-transition.png)',
            filter: 'blur(8px)',
          }}
        />
        
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl">
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              {content[language].title}
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light">
              {content[language].subtitle}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
