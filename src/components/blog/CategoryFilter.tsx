import { useLanguageStore } from '~/store/languageStore';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const language = useLanguageStore((state) => state.language);

  const categories = {
    en: [
      { id: null, name: 'All Articles' },
      { id: 'buying-tips', name: 'Buying Tips' },
      { id: 'selling-strategies', name: 'Selling Strategies' },
      { id: 'market-insights', name: 'Market Insights' },
      { id: 'investment-guide', name: 'Investment Guide' },
      { id: 'property-management', name: 'Property Management' },
      { id: 'financing-loans', name: 'Successful Story' },
    ],
    zh: [
      { id: null, name: '全部文章' },
      { id: 'buying-tips', name: '购房技巧' },
      { id: 'selling-strategies', name: '售房策略' },
      { id: 'market-insights', name: '市场洞察' },
      { id: 'investment-guide', name: '投资指南' },
      { id: 'property-management', name: '物业管理' },
      { id: 'financing-loans', name: '成功故事' },
    ],
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories[language].map((category) => (
            <button
              key={category.id || 'all'}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-gold text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
