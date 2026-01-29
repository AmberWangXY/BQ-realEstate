import { useLanguageStore } from '~/store/languageStore';

export function Sidebar() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      popular: {
        title: 'Popular Posts',
      },
    },
    zh: {
      popular: {
        title: '热门文章',
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Popular Posts section can be implemented here in the future if needed */}
      {/* For now, this sidebar is intentionally minimal */}
    </div>
  );
}
