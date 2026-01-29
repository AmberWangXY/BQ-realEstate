import { useLanguageStore } from '~/store/languageStore';
import { Link } from '@tanstack/react-router';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function CtaSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      title: 'Want to see how I can help you?',
      buttonText: 'Contact Bill',
    },
    zh: {
      title: '想了解我如何帮助你？',
      buttonText: '联系 Bill',
    },
  };

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy to-navy-light rounded-3xl p-12 md:p-16 text-center shadow-soft-lg animate-fade-in">
          <MessageCircle className="w-16 h-16 text-primary-gold mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            {content[language].title}
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-primary-gold hover:bg-primary-gold-light text-navy font-bold text-lg rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 group"
          >
            <span>{content[language].buttonText}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
