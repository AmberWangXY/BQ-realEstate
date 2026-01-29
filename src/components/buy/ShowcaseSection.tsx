import { useLanguageStore } from '~/store/languageStore';
import { Home, Calendar, DollarSign, MapPin } from 'lucide-react';

export function ShowcaseSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '近期成交案例',
      subtitle: '真实案例，专业服务',
      cases: [
        {
          imageUrl: 'https://photos.zillowstatic.com/fp/598b01c638ddf8d72d04b80fb44f951c-cc_ft_768.webp',
          address: '3948 Mosher Dr, San Jose',
          homeType: '3房 3卫',
          soldPrice: '$1.3M',
          soldDate: '2025年11月',
          tags: ['联排别墅', '首购'],
          zillowLink: 'https://www.zillow.com/homedetails/3948-Mosher-Dr-San-Jose-CA-95135/59683712_zpid/',
        },
        {
          imageUrl: 'https://photos.zillowstatic.com/fp/9780e24c13e9dc49d0250605a22235cd-cc_ft_768.webp',
          address: '672 Carolina Ave, Sunnyvale',
          homeType: '3房 1卫',
          soldPrice: '$2.1M',
          soldDate: '2025年5月',
          tags: ['独立屋', '多次出价'],
          zillowLink: 'https://www.zillow.com/homedetails/3948-Mosher-Dr-San-Jose-CA-95135/59683712_zpid/',
        },
        {
          imageUrl: 'https://photos.zillowstatic.com/fp/0b9984fa4b71a02ac2fd81fb9ccec5c8-cc_ft_768.webp',
          address: '2541 Sun Mor Ave, Mountain View',
          homeType: '5房 3卫',
          soldPrice: '$3.98M',
          soldDate: '2025年4月',
          tags: ['豪宅', '独立屋'],
          zillowLink: 'https://www.zillow.com/homedetails/2541-Sun-Mor-Ave-Mountain-View-CA-94040/19535806_zpid/',
        },
      ],
    },
    en: {
      title: 'Recent Buyer Closings',
      subtitle: 'Real success stories from satisfied clients',
      cases: [
        {
          imageUrl: 'https://photos.zillowstatic.com/fp/598b01c638ddf8d72d04b80fb44f951c-cc_ft_768.webp',
          address: '3948 Mosher Dr, San Jose',
          homeType: '3 Bed, 3 Bath',
          soldPrice: '$1.3M',
          soldDate: 'Nov 2025',
          tags: ['Townhouse', 'First-Time Buyer'],
          zillowLink: 'https://www.zillow.com/homedetails/3948-Mosher-Dr-San-Jose-CA-95135/59683712_zpid/',
        },
        {
          imageUrl: 'https://photos.zillowstatic.com/fp/9780e24c13e9dc49d0250605a22235cd-cc_ft_768.webp',
          address: '672 Carolina Ave, Sunnyvale',
          homeType: '3 Bed, 1 Bath',
          soldPrice: '$2.1M',
          soldDate: 'May 2025',
          tags: ['Single Family Residence', 'Multiple Offers'],
          zillowLink: 'https://www.zillow.com/homedetails/3948-Mosher-Dr-San-Jose-CA-95135/59683712_zpid/',
        },
        {
          imageUrl: 'https://photos.zillowstatic.com/fp/0b9984fa4b71a02ac2fd81fb9ccec5c8-cc_ft_768.webp',
          address: '2541 Sun Mor Ave, Mountain View',
          homeType: '5 Bed, 3 Bath',
          soldPrice: '$3.98M',
          soldDate: 'Apr 2025',
          tags: ['Luxury Home', 'Single Family Residence'],
          zillowLink: 'https://www.zillow.com/homedetails/2541-Sun-Mor-Ave-Mountain-View-CA-94040/19535806_zpid/',
        },
      ],
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content[language].cases.map((caseItem, index) => (
            <a
              key={index}
              href={caseItem.zillowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden animate-slide-up block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-navy to-navy-light">
                <img
                  src={caseItem.imageUrl}
                  alt={caseItem.address}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute top-4 right-4 bg-primary-gold text-navy px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {caseItem.soldPrice}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Address */}
                <div className="flex items-start space-x-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary-gold flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-navy">
                    {caseItem.address}
                  </h3>
                </div>

                {/* Home Type */}
                <div className="flex items-center space-x-2 mb-2 text-gray-600">
                  <Home className="w-4 h-4" />
                  <span className="text-sm">{caseItem.homeType}</span>
                </div>

                {/* Sold Date */}
                <div className="flex items-center space-x-2 mb-4 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{caseItem.soldDate}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {caseItem.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-cream text-navy text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
