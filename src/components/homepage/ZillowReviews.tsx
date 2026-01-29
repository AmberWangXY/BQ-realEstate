import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useLanguageStore } from '~/store/languageStore';

export function ZillowReviews() {
  const [currentReview, setCurrentReview] = useState(0);
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      title: 'What Clients Say About Bill Qin',
      subtitle: 'Real reviews from real clients on Zillow',
      perfectRating: 'Perfect Rating',
      verifiedReviews: 'Verified Reviews',
      viewOnZillow: 'View on Zillow',
      satisfactionRate: 'Client Satisfaction Rate',
      reviews: [
        {
          name: 'Daniel Su',
          location: 'Willow Glen, San Jose, CA',
          date: '11/17/2025',
          rating: 5,
          text: 'As a first-time homebuyer, I cannot ask for a better realtor than Bill Qin. He explained every step clearly, answered all my questions patiently, and never rushed me. The entire process was smooth, stress-free, and gave me full confidence in every decision.',
          avatar: '',
        },
        {
          name: 'Rachel Cui',
          location: 'Santa Clara, CA',
          date: '10/14/2025',
          rating: 5,
          text: 'Bill was professional and responsible throughout my entire home-buying process. He gave us great remodeling advice and helped us purchase a single-family home at a very reasonable price. I would definitely recommend him.',
          avatar: '',
        },
        {
          name: 'Tao Jiang',
          location: 'North Valley, San Jose, CA',
          date: '8/6/2025',
          rating: 5,
          text: 'Bill is professional and very responsive. When we ran into loan issues during closing, he handled everything on my behalf and negotiated in my best interest. The transaction closed successfully because of his support.',
          avatar: '',
        },
        {
          name: 'Xiangru Li',
          location: 'Waverly Park, Mountain View, CA',
          date: '4/4/2025',
          rating: 5,
          text: 'I had an excellent experience working with Bill as my buying agent. He was knowledgeable, attentive, and always quick to respond, while making sure I never felt rushed or pressured. I would highly recommend Bill to anyone buying a home.',
          avatar: '',
        },
        {
          name: 'Mutian Wang',
          location: 'North Valley, San Jose, CA',
          date: '3/6/2025',
          rating: 5,
          text: 'This was my second successful transaction with Bill, this time selling a property in San Jose. Bill and his team handled everything efficiently, from staging to closing, and completed the sale in under a month. The entire process was seamless and met my expectations.',
          avatar: '',
        },
      ],
    },
    zh: {
      title: '客户对 Bill Qin 的评价',
      subtitle: 'Zillow 上真实客户的真实评价',
      perfectRating: '完美评级',
      verifiedReviews: '认证评价',
      viewOnZillow: '在 Zillow 查看',
      satisfactionRate: '客户满意度',
      reviews: [
        {
          name: 'Daniel Su',
          location: 'Willow Glen, San Jose, CA',
          date: '11/17/2025',
          rating: 5,
          text: '作为首次购房者，我真的找不到比 Bill Qin 更合适的经纪人了。他耐心地讲解每一个流程，认真回答我的所有问题，从不催促我做决定。整个过程非常顺畅、安心，让我对每一步都很有信心。',
          avatar: '',
        },
        {
          name: 'Rachel Cui',
          location: 'Santa Clara, CA',
          date: '10/14/2025',
          rating: 5,
          text: '在整个购房过程中，Bill 一直都非常专业、负责。他给了我们很多实用的装修建议，并帮助我们以非常合理的价格买到了独栋住宅。我非常推荐他。',
          avatar: '',
        },
        {
          name: 'Tao Jiang',
          location: 'North Valley, San Jose, CA',
          date: '8/6/2025',
          rating: 5,
          text: 'Bill 非常专业，而且响应很快。在过户过程中遇到贷款问题时，他全程代表我处理并争取最大利益。最终交易能够顺利完成，离不开他的帮助。',
          avatar: '',
        },
        {
          name: 'Xiangru Li',
          location: 'Waverly Park, Mountain View, CA',
          date: '4/4/2025',
          rating: 5,
          text: '这次与 Bill 的购房合作体验非常好。他专业、细心、回复及时，并始终保持耐心，让我从未感到被催促或有压力。我非常推荐正在买房的人找 Bill。',
          avatar: '',
        },
        {
          name: 'Mutian Wang',
          location: 'North Valley, San Jose, CA',
          date: '3/6/2025',
          rating: 5,
          text: '这是我第二次与 Bill 成功完成房产交易，这次是出售圣何塞的房子。Bill 和他的团队效率极高，从布置到成交不到一个月就完成了。整个过程非常顺畅，结果也完全符合我的预期。',
          avatar: '',
        },
      ],
    },
  };

  const reviews = content[language].reviews;

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-white">
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

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Side - Zillow Badge */}
          <div className="lg:col-span-2 animate-scale-in">
            <div className="bg-white rounded-2xl p-8 shadow-soft-lg border border-gray-100 text-center">
              {/* Stars */}
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-12 h-12 text-primary-gold"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Rating Text */}
              <div className="text-5xl font-bold text-navy mb-2">5.0</div>
              <div className="text-xl text-gray-600 mb-6">{content[language].perfectRating}</div>

              {/* Zillow Logo */}
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold">
                  <span className="text-2xl">Z</span>
                  <span>Zillow</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-6">
                <div className="text-3xl font-bold text-primary-gold">100%</div>
                <div className="text-sm text-gray-600">{content[language].satisfactionRate}</div>
                <div className="text-2xl font-bold text-navy mt-4">60+</div>
                <div className="text-sm text-gray-600">{content[language].verifiedReviews}</div>
              </div>

              {/* View on Zillow Button */}
              <a
                href="https://www.zillow.com/profile/Bill-Qin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-navy hover:bg-navy-light text-primary-gold rounded-lg transition-colors font-semibold"
              >
                <span>{content[language].viewOnZillow}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Side - Reviews Carousel */}
          <div className="lg:col-span-3">
            <div className="relative">
              {/* Review Card */}
              <div className="bg-white rounded-2xl p-8 shadow-soft-lg border border-gray-100 min-h-[400px] flex flex-col animate-fade-in">
                {/* Profile */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-navy">
                    {reviews[currentReview].name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {reviews[currentReview].location} • {reviews[currentReview].date}
                  </p>
                </div>

                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-primary-gold"
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed flex-grow text-lg">
                  "{reviews[currentReview].text}"
                </p>

                {/* Navigation Dots */}
                <div className="flex items-center justify-center space-x-2 mt-6">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReview(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentReview
                          ? 'w-8 bg-primary-gold'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevReview}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-soft hover:shadow-soft-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-navy" />
              </button>
              <button
                onClick={nextReview}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-soft hover:shadow-soft-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-navy" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
