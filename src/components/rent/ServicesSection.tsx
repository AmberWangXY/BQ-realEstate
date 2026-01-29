import { useLanguageStore } from '~/store/languageStore';
import { TrendingUp, Hammer, Camera, UserCheck, FileText, Settings } from 'lucide-react';

export function ServicesSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '核心服务列表',
      services: [
        {
          icon: TrendingUp,
          title: '租金评估 & 市场分析',
          description: '基于当前市场数据和区域趋势，为您的物业提供精准的租金定价建议，确保收益最大化。',
        },
        {
          icon: Hammer,
          title: '出租前改造 / 布置建议',
          description: '提供专业的房屋改造和布置方案，通过小投入提升房屋吸引力，加快出租速度。',
        },
        {
          icon: Camera,
          title: '专业摄影 & 广告发布',
          description: '安排高质量摄影服务，并在主流租房平台和社交媒体上精准投放广告，吸引优质租客。',
        },
        {
          icon: UserCheck,
          title: '租客筛选与背景调查',
          description: '严格的租客筛选流程，包括信用检查、收入验证和租赁历史调查，确保可靠的租客质量。',
        },
        {
          icon: FileText,
          title: '合同签署 & 入住交接',
          description: '处理所有法律文件和合同细节，协调入住检查和钥匙交接，确保流程顺畅无忧。',
        },
        {
          icon: Settings,
          title: '日常维护与续租管理',
          description: '提供持续的物业维护协调、租金收取、问题处理和续租谈判等全方位管理服务。',
        },
      ],
    },
    en: {
      title: 'Core Services',
      services: [
        {
          icon: TrendingUp,
          title: 'Rental valuation & market analysis',
          description: 'Leverage current market data and regional trends to provide accurate rental pricing recommendations that maximize your return.',
        },
        {
          icon: Hammer,
          title: 'Pre-rental upgrades / staging recommendations',
          description: 'Offer professional renovation and staging plans to enhance property appeal with smart investments that speed up leasing.',
        },
        {
          icon: Camera,
          title: 'Professional photography & listing distribution',
          description: 'Arrange high-quality photography and strategically promote your property across major rental platforms and social media to attract quality tenants.',
        },
        {
          icon: UserCheck,
          title: 'Tenant screening and background checks',
          description: 'Rigorous tenant vetting process including credit checks, income verification, and rental history review to ensure reliable tenant quality.',
        },
        {
          icon: FileText,
          title: 'Lease signing & move-in coordination',
          description: 'Handle all legal documents and contract details, coordinate move-in inspections and key handoff for a smooth, worry-free process.',
        },
        {
          icon: Settings,
          title: 'Ongoing maintenance & renewal management',
          description: 'Provide comprehensive management including property maintenance coordination, rent collection, issue resolution, and lease renewal negotiations.',
        },
      ],
    },
  };

  const gradients = [
    'from-blue-500 to-blue-600',
    'from-primary-gold to-yellow-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-navy text-center mb-16">
          {content[language].title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content[language].services.map((service, index) => {
            const Icon = service.icon;
            const gradient = gradients[index];
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-500`} />

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-primary-gold transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
