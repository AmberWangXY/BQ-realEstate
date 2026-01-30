import { useState } from 'react';
import { Home, TrendingUp, Lightbulb, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguageStore } from '~/store/languageStore';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '~/trpc/react';

export function VideoHighlights() {
  const [activeTab, setActiveTab] = useState<'buying' | 'selling' | 'tips'>('buying');
  const [currentIndex, setCurrentIndex] = useState(0);
  const language = useLanguageStore((state) => state.language);
  const trpc = useTRPC();

  // Fetch videos for the active category
  const videosQuery = useQuery(
    trpc.video.getByCategory.queryOptions({
      category: activeTab,
    })
  );

  const videos = videosQuery.data || [];

  // Determine how many videos to show at once based on screen size
  // We'll use 3 for desktop, but the actual responsive behavior is handled by CSS
  const videosPerPage = 3;
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Reset to first page when changing tabs
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const nextVideos = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevVideos = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentVideos = () => {
    const start = currentIndex * videosPerPage;
    return videos.slice(start, start + videosPerPage);
  };

  const content = {
    en: {
      title: 'Video Library & Resources',
      subtitle: 'Expert insights, market updates, and educational content to help you succeed',
      tabs: [
        { id: 'buying', label: 'Buying', icon: Home },
        { id: 'selling', label: 'Selling', icon: TrendingUp },
        { id: 'tips', label: 'Tips & Insights', icon: Lightbulb },
      ],
      moreVideos: 'More…',
      viewsSuffix: 'views',
      loading: 'Loading videos...',
      error: 'Failed to load videos',
      cta: [
        {
          title: 'For Buyers',
          subtitle: 'Find your dream home in Silicon Valley',
          action: 'Start Your Search',
          gradient: 'from-blue-500 to-blue-600',
          icon: Home,
        },
        {
          title: 'For Sellers',
          subtitle: 'Get top dollar for your property',
          action: 'Get Free Valuation',
          gradient: 'from-primary-gold to-yellow-600',
          icon: TrendingUp,
        },
      ],
    },
    zh: {
      title: '视频库与资源中心',
      subtitle: '专家见解、市场动态和教育内容，助您成功',
      tabs: [
        { id: 'buying', label: '购房', icon: Home },
        { id: 'selling', label: '售房', icon: TrendingUp },
        { id: 'tips', label: '技巧与见解', icon: Lightbulb },
      ],
      moreVideos: '更多视频',
      viewsSuffix: '观看',
      loading: '加载视频中...',
      error: '视频加载失败',
      cta: [
        {
          title: '购房者专区',
          subtitle: '在硅谷寻找您的梦想家园',
          action: '开始您的搜索',
          gradient: 'from-blue-500 to-blue-600',
          icon: Home,
        },
        {
          title: '售房者专区',
          subtitle: '为您的房产争取最高价',
          action: '获取免费估价',
          gradient: 'from-primary-gold to-yellow-600',
          icon: TrendingUp,
        },
      ],
    },
  };

  const tabs = content[language].tabs;
  const ctaButtons = content[language].cta;
  const currentVideos = getCurrentVideos();

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

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-gold text-navy shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          {/* More Videos Button */}
          <a
            href="https://www.youtube.com/@BillQinRealEstateTeam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-gold"
          >
            <span>{content[language].moreVideos}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Video Carousel */}
        {videosQuery.isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">{content[language].loading}</p>
          </div>
        ) : videosQuery.isError ? (
          <div className="text-center py-12">
            <p className="text-red-600">{content[language].error}</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No videos available</p>
          </div>
        ) : (
          <div className="relative mb-16">
            {/* Video Grid - Desktop shows 3, Mobile shows 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentVideos.map((video, index) => (
                <a
                  key={video.id}
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer animate-scale-in block"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 mb-4">
                    <img
                      src={video.coverImageUrl}
                      alt={language === 'en' ? video.titleEn : video.titleZh}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors" />

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-navy/80 backdrop-blur-sm rounded text-white text-xs font-semibold">
                      {video.duration}
                    </div>

                    {/* Views Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-navy text-xs font-semibold">
                      {video.views}
                    </div>
                  </div>

                  {/* Video Title */}
                  <h3 className="text-lg font-semibold text-navy group-hover:text-primary-gold transition-colors line-clamp-2">
                    {language === 'en' ? video.titleEn : video.titleZh}
                  </h3>
                </a>
              ))}
            </div>

            {/* Navigation Arrows - Only show if there are multiple pages */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevVideos}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-soft hover:shadow-soft-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-110 z-10"
                  aria-label="Previous videos"
                >
                  <ChevronLeft className="w-6 h-6 text-navy" />
                </button>
                <button
                  onClick={nextVideos}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-soft hover:shadow-soft-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-110 z-10"
                  aria-label="Next videos"
                >
                  <ChevronRight className="w-6 h-6 text-navy" />
                </button>
              </>
            )}

            {/* Pagination Dots - Only show if there are multiple pages */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-primary-gold'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
        {ctaButtons.map((cta, index) => {
          const Icon = cta.icon ?? (() => null); // 防止 Icon 为 undefined
          const isExternal = index === 0;

          if (isExternal) {
            const href =
              "https://www.youtube.com/playlist?list=PLI6t-yTPya-vz5u1gU2slimmW-2arA5IO";

            return (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden bg-gradient-to-br ${cta.gradient} text-white rounded-xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 block`}
              >
                <div className="relative z-10">
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{cta.title}</h3>
                  <p className="mb-4 text-blue-100">{cta.subtitle}</p>
                  <div className="flex items-center space-x-2 text-white font-semibold">
                    <span>{cta.action}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              </a>
            );
          }

          // 内链：直接写死 /contact，避免 TS 认为 href 可能是外链
          return (
            <Link
              key={index}
              to="/contact"
              className={`group relative overflow-hidden bg-gradient-to-br ${cta.gradient} text-white rounded-xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 block`}
            >
              <div className="relative z-10">
                <Icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{cta.title}</h3>
                <p className="mb-4 text-yellow-100">{cta.subtitle}</p>
                <div className="flex items-center space-x-2 text-white font-semibold">
                  <span>{cta.action}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            </Link>
          );
        })}

        </div>
      </div>
    </section>
  );
}
