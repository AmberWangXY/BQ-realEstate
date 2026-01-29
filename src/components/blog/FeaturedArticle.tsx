import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
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

interface FeaturedArticleProps {
  post: BlogPost;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      featured: 'Featured Article',
      readMore: 'Read More',
    },
    zh: {
      featured: '精选文章',
      readMore: '阅读全文',
    },
  };

  const title = language === 'en' ? post.titleEn : post.titleZh;
  const excerpt = language === 'en' ? post.excerptEn : post.excerptZh;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-4">
        <span className="inline-block px-4 py-1 bg-primary-gold text-white text-sm font-bold rounded-full">
          {content[language].featured}
        </span>
      </div>
      
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group block bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative h-64 md:h-full overflow-hidden">
            <img
              src={post.thumbnailUrl || '/professional-office-scene.jpg'}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 group-hover:text-primary-gold transition-colors">
              {title}
            </h2>
            <p className="text-gray-600 text-lg mb-6 line-clamp-3">
              {excerpt}
            </p>
            <div className="flex items-center text-primary-gold font-semibold group-hover:translate-x-2 transition-transform">
              <span>{content[language].readMore}</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
