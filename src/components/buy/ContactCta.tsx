import { useLanguageStore } from '~/store/languageStore';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export function ContactCta() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      message: '想进一步了解如何买房？欢迎随时联系我。',
      buttonText: '联系 Bill',
    },
    en: {
      message: 'Want to learn more about buying with me? I\'m here to help.',
      buttonText: 'Contact Bill',
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-soft-lg p-12 border border-gray-100">
            <p className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed">
              {content[language].message}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg bg-primary-gold hover:bg-primary-gold-light text-navy font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <span>{content[language].buttonText}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
