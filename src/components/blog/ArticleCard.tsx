import { Link } from '@tanstack/react-router';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '~/store/languageStore';

interface BlogPost {
  id: number;
  slug: string;
  titleEn: string;
  titleZh: string;
  excerptEn: string;
  excerptZh: string;
  thumbnailUrl: string | null;
  category: string;
  publishDate: Date;
}

interface ArticleCardProps {
  post: BlogPost;
}

export function ArticleCard({ post }: ArticleCardProps) {
  const language = useLanguageStore((state) => state.language);

  const categoryNames = {
    en: {
      'buying-tips': 'Buying Tips',
      'selling-strategies': 'Selling Strategies',
      'market-insights': 'Market Insights',
      'investment-guide': 'Investment Guide',
      'property-management': 'Property Management',
      'financing-loans': 'Successful Story',
    },
    zh: {
      'buying-tips': '购房技巧',
      'selling-strategies': '售房策略',
      'market-insights': '市场洞察',
      'investment-guide': '投资指南',
      'property-management': '物业管理',
      'financing-loans': '成功故事',
    },
  };

  const content = {
    en: {
      readMore: 'Read More',
    },
    zh: {
      readMore: '阅读全文',
    },
  };

  const title = language === 'en' ? post.titleEn : post.titleZh;
  const excerpt = language === 'en' ? post.excerptEn : post.excerptZh;
  const categoryName = categoryNames[language][post.category as keyof typeof categoryNames.en] || post.category;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.thumbnailUrl || '/professional-office-scene.jpg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-primary-gold text-white text-xs font-bold rounded-full">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(post.publishDate)}</span>
        </div>

        <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-primary-gold transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        <div className="flex items-center text-primary-gold font-semibold group-hover:translate-x-2 transition-transform mt-auto">
          <span>{content[language].readMore}</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
