import { useLanguageStore } from '~/store/languageStore';
import { Heart, MapPin, Users } from 'lucide-react';

export function Storyline() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      sectionTitle: 'My Journey',
      whyRealEstate: {
        title: 'Why Real Estate?',
        text: "I stepped into real estate after witnessing how many families struggled to make life-changing decisions without transparent, trustworthy guidance. I wanted to be the person who stands beside clients—not just as an agent, but as a long-term strategic real estate advisor who truly has their best interests at heart.",
      },
      bayAreaJourney: {
        title: 'My Bay Area Journey',
        text: "After years in the Bay Area, I have experienced the region's tech-driven transformation and guided countless families through buying, selling, and investing. These experiences taught me that: A home is more than an asset—it's a lifestyle, a future plan, and a continuation of a family's story. Every client's needs are unique and deserve carefully tailored solutions.",
      },
      clientStories: {
        title: 'Representative Client Stories',
        story1: 'Helped a young first-time buyer couple secure their ideal school-district home under budget, while also planning their long-term investment strategy.',
        story2: 'Guided an investor through portfolio restructuring and exchange, increasing overall ROI by more than 20% through data-driven analysis and project management.',
      },
    },
    zh: {
      sectionTitle: '我的故事',
      whyRealEstate: {
        title: '为什么开始做地产？',
        text: '我最初进入房地产行业，是因为亲眼看到许多家庭在做重大人生决策时缺乏可靠的、透明的专业建议。我希望成为那个"站在你身边、真正为你着想"的人——不只是中介，而是您房产决策的专业顾问。',
      },
      bayAreaJourney: {
        title: '在湾区的成长经历',
        text: '在湾区生活多年，我亲历了科技时代的变革，也深度参与过无数家庭的置业与投资过程。这些经历让我更懂得：房子不仅是资产，也是生活方式、未来规划与家庭故事的延续。每位客户的需求都是独特的，值得被认真倾听与设计解决方案。',
      },
      clientStories: {
        title: '代表性客户故事',
        story1: '帮助一对首次购房的年轻夫妇，以远低于预算的价格买到心仪学区房，并协助他们规划长期资产布局。',
        story2: '协助一位投资者完成多处房产整合与换购，通过市场分析与项目管理，将整体投资回报率提升超过 20%。',
      },
    },
  };

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {content[language].sectionTitle}
          </h2>
        </div>

        {/* Story Cards */}
        <div className="space-y-12">
          {/* Why Real Estate */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 animate-slide-up">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 p-4 bg-primary-gold/10 rounded-xl">
                <Heart className="w-8 h-8 text-primary-gold" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  {content[language].whyRealEstate.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content[language].whyRealEstate.text}
                </p>
              </div>
            </div>
          </div>

          {/* Bay Area Journey */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 p-4 bg-blue-50 rounded-xl">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                  {content[language].bayAreaJourney.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content[language].bayAreaJourney.text}
                </p>
              </div>
            </div>
          </div>

          {/* Client Stories */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 p-4 bg-green-50 rounded-xl">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                  {content[language].clientStories.title}
                </h3>
                <div className="space-y-6">
                  <div className="pl-6 border-l-4 border-primary-gold">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {content[language].clientStories.story1}
                    </p>
                  </div>
                  <div className="pl-6 border-l-4 border-primary-gold">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {content[language].clientStories.story2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
