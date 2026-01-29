import { Home, Award, Calendar, Star } from 'lucide-react';
import { useLanguageStore } from '~/store/languageStore';

export function Stats() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      title: 'Proven Track Record',
      subtitle: 'Numbers that speak to experience, expertise, and client satisfaction',
      stats: [
        {
          icon: Home,
          number: '150+',
          label: 'Homes Sold',
          sublabel: '',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        },
        {
          icon: Award,
          number: '4',
          label: 'Professional Licenses',
          sublabel: '',
          color: 'text-primary-gold',
          bgColor: 'bg-yellow-50',
        },
        {
          icon: Calendar,
          number: '$25M',
          label: 'Sales Volume',
          sublabel: '',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        },
        {
          icon: Star,
          number: '100%',
          label: 'Zillow 5-Star Rating',
          sublabel: '',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
        },
      ],
      imageAlt: 'Bill Qin',
    },
    zh: {
      title: '实力业绩证明',
      subtitle: '用数据证明经验、专业与客户满意度',
      stats: [
        {
          icon: Home,
          number: '150+',
          label: '房屋成交量',
          sublabel: '',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        },
        {
          icon: Award,
          number: '4',
          label: '专业执照',
          sublabel: '',
          color: 'text-primary-gold',
          bgColor: 'bg-yellow-50',
        },
        {
          icon: Calendar,
          number: '$25M',
          label: '成交总额',
          sublabel: '',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        },
        {
          icon: Star,
          number: '100%',
          label: 'Zillow 五星评级',
          sublabel: '',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
        },
      ],
      imageAlt: 'Bill Qin',
    },
  };

  const stats = content[language].stats;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Two-Column Layout: Portrait + Stats */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Portrait */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg">
              <img
                src="/portrait-stats-cards-layout.jpg"
                alt={content[language].imageAlt}
                className="w-full h-auto object-cover"
              />
              {/* Decorative overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-gold/10 rounded-full -z-10 blur-xl" />
          </div>

          {/* Right Side - Stats Cards Stacked */}
          <div className="space-y-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-x-2 border border-gray-100 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-6">
                    {/* Icon */}
                    <div className={`flex-shrink-0 inline-flex p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${stat.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      {/* Number */}
                      <div className="text-4xl font-bold text-navy mb-1">
                        {stat.number}
                      </div>

                      {/* Label */}
                      <div className="text-base font-semibold text-gray-800">
                        {stat.label}
                      </div>

                      {/* Sublabel (if exists) */}
                      {stat.sublabel && (
                        <div className="text-sm text-gray-500 mt-0.5">
                          {stat.sublabel}
                        </div>
                      )}
                    </div>

                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary-gold/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
