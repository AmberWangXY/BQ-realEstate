import { useLanguageStore } from '~/store/languageStore';
import { Award, FileText, Briefcase, TrendingUp, Trophy, Newspaper, Users } from 'lucide-react';

export function Credentials() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      sectionTitle: 'Professional Expertise',
      licenses: [
        {
          icon: Award,
          title: 'Engineering Background',
          description: 'Strong at breaking down complex problems and making decisions based on logic and data.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        },
        {
          icon: FileText,
          title: 'Licensed Appraiser',
          description: 'Accurately assess true property value to avoid overpaying or underselling.',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        },
        {
          icon: Briefcase,
          title: 'Class B Contractor License',
          description: 'Able to evaluate structure, renovation potential, and construction risks.',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
        },
        {
          icon: TrendingUp,
          title: 'Extensive Hands-On Experience',
          description: 'Judgment built from real transactions—not theoretical assumptions.',
          color: 'text-primary-gold',
          bgColor: 'bg-yellow-50',
        },
      ],
      achievementsTitle: 'Awards & Recognition',
      achievements: [
        {
          icon: Trophy,
          text: 'Multiple Top Producer awards',
        },
        {
          icon: Newspaper,
          text: 'Featured in local media interviews and columns',
        },
        {
          icon: Users,
          text: 'Invited speaker for community and corporate real estate workshops',
        },
      ],
    },
    zh: {
      sectionTitle: '专业度',
      licenses: [
        {
          icon: Award,
          title: '工程师背景',
          description: '善于拆解复杂问题，用逻辑和数据做判断。',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        },
        {
          icon: FileText,
          title: '房屋估价师执照',
          description: '准确判断真实价值，避免高买或低卖。',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        },
        {
          icon: Briefcase,
          title: '建筑 Contractor 执照',
          description: '看得懂结构、改造潜力和风险。',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
        },
        {
          icon: TrendingUp,
          title: '长期实战经验',
          description: '大量真实成交积累的判断力，而非纸上谈兵。',
          color: 'text-primary-gold',
          bgColor: 'bg-yellow-50',
        },
      ],
      achievementsTitle: '成就',
      achievements: [
        {
          icon: Trophy,
          text: '多次获年度 Top Producer 奖项',
        },
        {
          icon: Newspaper,
          text: '多家本地媒体采访与专栏分享',
        },
        {
          icon: Users,
          text: '受邀在社区及企业举办房地产讲座',
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
            {content[language].sectionTitle}
          </h2>
        </div>

        {/* Licenses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content[language].licenses.map((license, index) => {
            const Icon = license.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-4 rounded-xl ${license.bgColor} mb-4`}>
                  <Icon className={`w-8 h-8 ${license.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-navy leading-tight mb-2">
                  {license.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {license.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="bg-cream rounded-2xl p-8 md:p-12 animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
            {content[language].achievementsTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {content[language].achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-primary-gold/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary-gold" />
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-2">
                    {achievement.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
