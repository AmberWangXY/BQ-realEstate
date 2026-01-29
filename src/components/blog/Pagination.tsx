import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguageStore } from '~/store/languageStore';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
    },
    zh: {
      previous: '上一页',
      next: '下一页',
      page: '第',
      of: '页，共',
    },
  };

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-navy hover:bg-primary-gold hover:text-white shadow-soft hover:shadow-soft-lg'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{content[language].previous}</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-2">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-primary-gold text-white shadow-md'
                    : 'bg-white text-navy hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-navy hover:bg-primary-gold hover:text-white shadow-soft hover:shadow-soft-lg'
          }`}
        >
          <span>{content[language].next}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center mt-4 text-gray-600 text-sm">
        {language === 'en' 
          ? `${content[language].page} ${currentPage} ${content[language].of} ${totalPages}`
          : `${content[language].page} ${currentPage} ${content[language].of} ${totalPages} 页`
        }
      </div>
    </div>
  );
}
