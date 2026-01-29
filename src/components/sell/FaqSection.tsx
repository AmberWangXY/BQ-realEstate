import React from 'react';
import { useLanguageStore } from '~/store/languageStore';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

export function FaqSection() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    zh: {
      title: '售房常见问题',
      faqs: [
        {
          question: '中介佣金大概是多少？',
          answer: '佣金通常以成交价的一定比例计算，具体会根据房屋价格、市场环境以及服务范围协商确定。我会在首次咨询时清晰告知所有费用构成，不设置任何隐藏收费。',
        },
        {
          question: '卖房需要交哪些税费和额外成本？',
          answer: '常见费用包括：过户相关费用、可能产生的资本利得税、必要的检测与维修费用、布置与清洁成本等。具体金额会根据您的持有时间、房屋类型与所在城市的规定而不同，我会根据您的情况提供估算说明，并建议您与会计师进一步确认。',
        },
        {
          question: '应该先买后卖，还是先卖后买？',
          answer: '这取决于您的资金安排、风险承受能力以及对过渡期的接受程度。我们可以一起评估不同方案（例如先卖后租、Bridge Loan 等），选择最适合您家庭节奏与财务状况的路径。',
        },
        {
          question: '房子需要全部翻新才能卖出好价格吗？',
          answer: '不一定。很多时候是"精准小改造 + 专业布置"就足够了。我会根据目标买家群体和周边竞品房源，告诉您哪些项目值得投入，哪些可以保持现状，避免不必要的支出。',
        },
      ],
    },
    en: {
      title: 'Seller FAQ',
      faqs: [
        {
          question: 'What is the typical agent commission?',
          answer: 'Commission is usually calculated as a percentage of the final sale price and may vary depending on price point, market conditions, and scope of service. I will always explain the fee structure clearly during our first meeting—no hidden charges.',
        },
        {
          question: 'What costs and taxes should I expect when selling?',
          answer: 'Common costs include escrow and title fees, possible repair or inspection costs, and any staging or cleaning expenses. You may also have capital gains tax depending on your situation. I can provide an estimate based on your property, and I recommend confirming details with your CPA.',
        },
        {
          question: 'Should I buy first or sell first?',
          answer: 'It depends on your finances, risk tolerance, and flexibility with temporary housing. We can walk through different strategies—such as selling first and renting back, or using bridge financing—to find the best path for you.',
        },
        {
          question: 'Do I need to fully remodel the home before selling?',
          answer: 'Not necessarily. Often, "smart light improvements + good staging" are enough. I\'ll help you prioritize where to spend and where to save, based on what today\'s buyers value and how competing listings look in your area.',
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-navy text-center mb-16">
          {currentContent.title}
        </h2>

        <div className="space-y-4">
          {currentContent.faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-cream rounded-xl overflow-hidden">
                  <Disclosure.Button className="flex justify-between items-center w-full px-6 py-5 text-left hover:bg-cream-dark transition-colors">
                    <span className="text-lg font-bold text-navy pr-8">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-navy flex-shrink-0 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-5 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
