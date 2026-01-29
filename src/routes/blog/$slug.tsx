import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import Markdown from 'markdown-to-jsx';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Header } from '~/components/homepage/Header';
import { Footer } from '~/components/homepage/Footer';
import { useTRPC } from '~/trpc/react';
import { useLanguageStore } from '~/store/languageStore';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const trpc = useTRPC();
  const language = useLanguageStore((state) => state.language);

  const postQuery = useQuery(
    trpc.blog.getPostBySlug.queryOptions({
      slug,
    })
  );

  const content = {
    en: {
      backToBlog: 'Back to Blog',
      loading: 'Loading article...',
      notFound: 'Article not found',
    },
    zh: {
      backToBlog: '返回博客',
      loading: '加载文章中...',
      notFound: '未找到文章',
    },
  };

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

  if (postQuery.isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">{content[language].loading}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (postQuery.isError || !postQuery.data) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <p className="text-xl text-gray-600">{content[language].notFound}</p>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 mt-8 text-primary-gold hover:text-primary-gold-dark font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{content[language].backToBlog}</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const post = postQuery.data;
  const title = language === 'en' ? post.titleEn : post.titleZh;
  const articleContent = language === 'en' ? post.contentEn : post.contentZh;
  const categoryName = categoryNames[language][post.category as keyof typeof categoryNames.en] || post.category;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={post.headerImage || post.thumbnailUrl || '/professional-office-scene.jpg'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 mb-8 text-white hover:text-primary-gold font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{content[language].backToBlog}</span>
        </Link>

        {/* Article Card */}
        <article className="bg-white rounded-2xl shadow-soft-lg p-8 md:p-12">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center px-4 py-1 bg-primary-gold text-white text-sm font-bold rounded-full">
              <Tag className="w-4 h-4 mr-2" />
              {categoryName}
            </span>
            <span className="inline-flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.publishDate)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-8">
            {title}
          </h1>

          {/* Article Content with Markdown */}
          <div className="prose prose-lg max-w-none prose-headings:text-navy prose-headings:font-bold prose-a:text-primary-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-ul:list-disc prose-ol:list-decimal">
            <Markdown>{articleContent}</Markdown>
          </div>
        </article>

        {/* Bottom Navigation */}
        <div className="mt-12 mb-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-gold text-white font-semibold rounded-lg hover:bg-primary-gold-dark transition-colors shadow-soft hover:shadow-soft-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{content[language].backToBlog}</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
