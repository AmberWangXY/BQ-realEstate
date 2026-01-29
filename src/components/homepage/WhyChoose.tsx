import { Briefcase, Megaphone, Users, Hammer } from 'lucide-react';
import { useLanguageStore } from '~/store/languageStore';

export function WhyChoose() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      title: 'Why Choose Bill Qin?',
      boxes: [
        {
          icon: Briefcase,
          title: 'Professional Expertise',
          description: 'With an engineering background, licensed appraisal expertise, and a Class B contractor license, combined with over 20 years in Silicon Valley real estate, I provide deeper, more comprehensive support across every aspect of a property.',
          gradient: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          color: 'text-blue-600',
        },
        {
          icon: Megaphone,
          title: 'Maximum Exposure & Negotiation',
          description: 'On the selling side, I maximize exposure through professional photography, video, and multi-platform media distribution to achieve optimal pricing. On the buying side, years of negotiation experience help clients secure the best possible terms.',
          gradient: 'from-primary-gold to-yellow-600',
          bgColor: 'bg-yellow-50',
          color: 'text-primary-gold',
        },
        {
          icon: Users,
          title: 'Personalized, Trust-Based Service',
          description: 'I communicate honestly, identify real issues, and offer clear solutions to support decision-making. I never rush or pressure clients—the final choice is always made at their own pace and based on what truly fits their needs.',
          gradient: 'from-green-500 to-green-600',
          bgColor: 'bg-green-50',
          color: 'text-green-600',
        },
        {
          icon: Hammer,
          title: 'End-to-End Resources',
          description: 'With hands-on construction experience and licensing, I help clients evaluate land and renovation potential from the very beginning. From home search and transaction to design, construction, and final delivery, I provide end-to-end resources and support.',
          gradient: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          color: 'text-purple-600',
        },
      ],
      imageAlt: 'Bill Qin',
    },
    zh: {
      title: '为什么选择 Bill Qin？',
      boxes: [
        {
          icon: Briefcase,
          title: '专业度',
          description: '我具备工程师背景，同时持有估价师执照与建筑 Contractor B 执照，并深耕硅谷房地产市场二十年，能够在房产领域给予更多支持。',
          gradient: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          color: 'text-blue-600',
        },
        {
          icon: Megaphone,
          title: '顶级营销能力',
          description: '在卖房端，我通过专业级摄影团队并结合多平台媒体矩阵与营销团队，实现最大曝光与最优成交价格；在买房端，凭借多年谈判经验，持续为客户争取更好的价格。',
          gradient: 'from-primary-gold to-yellow-600',
          bgColor: 'bg-yellow-50',
          color: 'text-primary-gold',
        },
        {
          icon: Users,
          title: '个性化服务',
          description: '我会真诚并实事求是反映问题，提供解决方案帮助客户做判断。坚持不 push、不催促，最终交由客户做出最符合自身需求的选择。',
          gradient: 'from-green-500 to-green-600',
          bgColor: 'bg-green-50',
          color: 'text-green-600',
        },
        {
          icon: Hammer,
          title: '资源与支持',
          description: '凭借建筑执照及经验，我能在买房阶段就帮助客户判断地块潜力，避免错失机会。从找房、交易到设计施工和最终交房，我提供一站式资源与支持，让客户真正省心、放心。',
          gradient: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          color: 'text-purple-600',
        },
      ],
      imageAlt: 'Bill Qin',
    },
  };

  const boxes = content[language].boxes;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {content[language].title}
          </h2>
        </div>

        {/* Portrait Image - Centered at Top */}
        <div className="flex justify-center mb-16 animate-fade-in">
          <div className="relative max-w-md w-full mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg">
              <img
                src="/bq-realty-brick-wall.jpg"
                alt={content[language].imageAlt}
                className="w-full h-auto object-cover"
              />
              {/* Decorative overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-gold/10 rounded-full -z-10 blur-xl" />
          </div>
        </div>

        {/* Content Boxes - Stacked Vertically Below Image */}
        <div className="max-w-4xl mx-auto space-y-6">
          {boxes.map((box, index) => {
            const Icon = box.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${box.gradient} opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-500`} />

                {/* Icon and Title Row */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${box.gradient} group-hover:scale-110 transition-transform shadow-lg flex-shrink-0`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-navy group-hover:text-primary-gold transition-colors">
                    {box.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {box.description}
                </p>

                {/* Decorative Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${box.gradient} group-hover:w-full transition-all duration-500`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
