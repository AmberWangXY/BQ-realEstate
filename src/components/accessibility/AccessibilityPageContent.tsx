import { useLanguageStore } from '~/store/languageStore';

export function AccessibilityPageContent() {
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      pageTitle: 'Accessibility, Privacy & Terms',
      sections: {
        disclaimer: {
          title: 'Legal Disclaimer',
          content: [
            '© 2025 BQ Group Inc and Bill Jing Qin. All rights reserved.',
            'This website is intended for informational purposes only and does not create a broker-client or agency relationship.',
            'The information provided on this website is for general informational purposes only and does not constitute legal, financial, investment, or real estate advice.',
            'While we strive to keep information accurate and up to date, we make no guarantees regarding completeness, accuracy, or applicability to your individual circumstances.',
            'All real estate transactions involve risk. Past performance, examples, or case studies do not guarantee future results.',
            'Users should consult with appropriate professionals before making any real estate, financial, or legal decisions.',
            'By using this website, you acknowledge and agree that BQ Group Inc and Bill Jing Qin is not liable for any decisions made based on the information provided herein.',
          ],
        },
        privacy: {
          title: 'Privacy Policy',
          lastUpdated: 'Last Updated: 12/1/2025',
          sections: [
            {
              heading: '1. Information We Collect',
              content: 'When you visit our website or submit information through forms, we may collect the following categories of personal information:\n\n• Identification information (such as name, email address, phone number)\n• Online activity information (such as IP address, browser type, pages visited)\n• Communication information you voluntarily provide\n• Other information you submit through contact or inquiry forms\n\nWe do not intentionally collect any sensitive personal information unless you voluntarily provide it.',
            },
            {
              heading: '2. How We Use Your Information',
              content: 'We may use personal information for the following purposes:\n\n• To respond to inquiries or service requests\n• To provide real estate-related information or services\n• To improve website functionality and user experience\n• To comply with legal or regulatory obligations\n\nWe do not sell personal information.',
            },
            {
              heading: '3. Cookies and Tracking Technologies',
              content: 'This website may use cookies and similar technologies (including third-party analytics tools such as Google Analytics) to understand how users interact with the website.\n\nYou can disable cookies through your browser settings, but this may affect some website functionality.',
            },
            {
              heading: '4. Information Sharing',
              content: 'We do not sell your personal information. We only share it in the following circumstances:\n\n• With service providers who support website operations\n• With legal or regulatory authorities (as required by law)\n\nAll service providers are required to take measures to protect the security of your information.',
            },
            {
              heading: '5. California Resident Privacy Rights',
              content: 'If you are a California resident, you have the right to:\n\n• Request access to the personal information we have collected\n• Request deletion of your personal information\n• Request correction of inaccurate information\n• Limit the use of certain personal information\n\nRelated requests can be submitted via the email address below.',
            },
            {
              heading: '6. Data Security',
              content: 'We take reasonable administrative and technical measures to protect personal information, but no method of internet transmission can guarantee 100% security.',
            },
            {
              heading: '7. Third-Party Links',
              content: 'This website may contain links to third-party websites. We are not responsible for their privacy policies or practices.',
            },
            {
              heading: '8. Contact Information',
              content: 'Email: BillQin@bqrealtygroup.com\nCompany Name: BQ Group Inc\nAddress: 1631 N 1st Street Suite 100, San Jose CA 95112',
            },
          ],
        },
        accessibility: {
          title: 'Accessibility Statement',
          content: [
            'BQ Group Inc / Bill Jing Qin is committed to ensuring digital accessibility for people with disabilities.',
            'We aim to conform to WCAG 2.1 Level AA standards and continually improve accessibility.',
            'Our website supports screen readers, keyboard navigation, readable color contrast, and text alternatives for non-text content.',
            'Accessibility is an ongoing effort.',
            'If you experience any difficulty accessing content, please contact us and we will make reasonable efforts to assist.',
          ],
        },
        terms: {
          title: 'Terms of Use',
          lastUpdated: 'Last Updated: 12/1/2025',
          sections: [
            {
              heading: '1. Acceptance of Terms',
              content: 'By accessing or using this website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use this website.',
            },
            {
              heading: '2. Use of Website',
              content: 'This website is provided for informational purposes only. You may use this website for lawful purposes only and in accordance with these Terms. You agree not to:\n\n• Use the website in any way that violates any applicable federal, state, local, or international law or regulation\n• Engage in any conduct that restricts or inhibits anyone\'s use or enjoyment of the website\n• Use any robot, spider, or other automatic device to access the website\n• Attempt to gain unauthorized access to any portion of the website',
            },
            {
              heading: '3. Intellectual Property',
              content: 'All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of BQ Group Inc / Bill Jing Qin or its content suppliers and is protected by United States and international copyright laws.\n\nYou may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content without express written permission.',
            },
            {
              heading: '4. No Professional Relationship',
              content: 'The information provided on this website does not create a broker-client, agent-client, or any professional relationship. Viewing this website or contacting us through this website does not establish a business relationship.\n\nAny real estate services would require a separate written agreement.',
            },
            {
              heading: '5. Disclaimer of Warranties',
              content: 'This website and all information, content, materials, and services included on or otherwise made available to you through this website are provided on an "as is" and "as available" basis.\n\nBQ Group Inc / Bill Jing Qin makes no representations or warranties of any kind, express or implied, as to the operation of the website or the information, content, materials, or services included on or otherwise made available through the website.\n\nWe do not warrant that the website will be uninterrupted or error-free, and we will not be liable for any interruptions or errors.',
            },
            {
              heading: '6. Limitation of Liability',
              content: 'To the fullest extent permitted by applicable law, BQ Group Inc / Bill Jing Qin shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of, or inability to use, this website.\n\nThis includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.',
            },
            {
              heading: '7. External Links',
              content: 'This website may contain links to third-party websites or services that are not owned or controlled by BQ Group Inc / Bill Jing Qin.\n\nWe have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any such content, goods, or services.',
            },
            {
              heading: '8. Indemnification',
              content: 'You agree to indemnify, defend, and hold harmless BQ Group Inc / Bill Jing Qin and its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt arising from:\n\n• Your use of and access to the website\n• Your violation of any term of these Terms of Use\n• Your violation of any third-party right, including any copyright, property, or privacy right',
            },
            {
              heading: '9. Changes to Terms',
              content: 'We reserve the right to modify or replace these Terms of Use at any time. The most current version will always be posted on this page with the "Last Updated" date.\n\nYour continued use of the website after any changes constitutes acceptance of the new Terms of Use.',
            },
            {
              heading: '10. Governing Law',
              content: 'These Terms of Use shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.\n\nAny legal action or proceeding arising under these Terms shall be brought exclusively in the courts located in Santa Clara County, California.',
            },
            {
              heading: '11. Severability',
              content: 'If any provision of these Terms of Use is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall remain in full force and effect.',
            },
            {
              heading: '12. Contact Information',
              content: 'If you have any questions about these Terms of Use, please contact us at:\n\nEmail: BillQin@bqrealtygroup.com\nCompany Name: BQ Group Inc\nAddress: 1631 N 1st Street Suite 100, San Jose CA 95112',
            },
          ],
        },
      },
    },
    zh: {
      pageTitle: '无障碍声明、隐私政策与使用条款',
      sections: {
        disclaimer: {
          title: '法律免责声明',
          content: [
            '© 2025 BQ Group Inc 与秦由棕（Bill Jing Qin）版权所有。',
            '本网站仅用于信息展示，不构成任何经纪、代理或客户关系。',
            '网站所提供的信息仅供一般参考，不构成法律、财务、投资或房地产建议。',
            '我们尽力确保信息的准确性与及时性，但不对其完整性、准确性或对您个人情况的适用性作出任何保证。',
            '所有房地产交易均存在风险，过往业绩、示例或案例不代表未来结果。',
            '在作出任何房地产、财务或法律决策前，用户应咨询相关专业人士。',
            '使用本网站即表示您理解并同意，BQ Group Inc 与秦由棕（Bill Jing Qin）不对基于本网站信息所作出的任何决定承担责任。',
          ],
        },
        privacy: {
          title: '隐私政策',
          lastUpdated: '最近更新：2025年12月1日',
          sections: [
            {
              heading: '1. 我们收集的信息',
              content: '当您访问我们的网站或通过表单提交信息时，我们可能会收集以下类别的个人信息：\n\n• 身份识别信息（如姓名、电子邮箱、电话号码）\n• 网络活动信息（如 IP 地址、浏览器类型、访问页面）\n• 您自愿提供的沟通信息\n• 您通过联系或咨询表单提交的其他信息\n\n除非您主动提供，我们不会有意收集任何敏感个人信息。',
            },
            {
              heading: '2. 信息的使用方式',
              content: '我们可能将个人信息用于以下目的：\n\n• 回复咨询或服务请求\n• 提供与房地产相关的信息或服务\n• 改善网站功能与用户体验\n• 遵守法律或监管义务\n\n我们不会出售个人信息。',
            },
            {
              heading: '3. Cookie 与追踪技术',
              content: '本网站可能使用 Cookie 及类似技术（包括第三方分析工具，如 Google Analytics）来了解用户如何使用网站。\n\n您可以通过浏览器设置禁用 Cookie，但这可能会影响部分网站功能。',
            },
            {
              heading: '4. 信息共享',
              content: '我们不会出售您的个人信息。仅在以下情况下共享：\n\n• 为网站运营提供支持的服务提供商\n• 法律或监管机构（依法要求）\n\n所有服务提供方均需采取措施保护您的信息安全。',
            },
            {
              heading: '5. 加州居民隐私权',
              content: '若您为加州居民，您有权：\n\n• 请求访问我们收集的个人信息\n• 请求删除您的个人信息\n• 请求更正不准确的信息\n• 限制某些个人信息的使用\n\n相关请求可通过下方邮箱提交。',
            },
            {
              heading: '6. 数据安全',
              content: '我们采取合理的管理与技术措施保护个人信息，但任何网络传输方式均无法保证 100% 安全。',
            },
            {
              heading: '7. 第三方链接',
              content: '本网站可能包含第三方网站链接，我们不对其隐私政策或做法负责。',
            },
            {
              heading: '8. 联系方式',
              content: 'Email: BillQin@bqrealtygroup.com\nCompany Name: BQ Group Inc\nAddress: 1631 N 1st Street Suite 100, San Jose CA 95112',
            },
          ],
        },
        accessibility: {
          title: '无障碍声明',
          content: [
            'BQ Group Inc 与秦由棕（Bill Jing Qin）致力于为残障人士提供无障碍的数字访问体验。',
            '我们以符合 WCAG 2.1 AA 级标准为目标，并持续改进网站的可访问性。',
            '本网站支持屏幕阅读器、键盘导航、清晰的颜色对比度，以及为非文本内容提供替代文本。',
            '无障碍改进是一项持续进行的工作。',
            '如果您在访问本网站内容时遇到任何困难，请与我们联系，我们将尽合理努力为您提供协助。',
          ],
        },
        terms: {
          title: '使用条款',
          lastUpdated: '最近更新：2025年12月1日',
          sections: [
            {
              heading: '1. 条款接受',
              content: '访问或使用本网站即表示您同意受本使用条款及所有适用法律法规的约束。如果您不同意本条款的任何部分，则不得使用本网站。',
            },
            {
              heading: '2. 网站使用',
              content: '本网站仅供信息参考之用。您只能出于合法目的并按照本条款使用本网站。您同意不得：\n\n• 以任何违反联邦、州、地方或国际法律法规的方式使用本网站\n• 从事任何限制或阻碍他人使用或享受网站的行为\n• 使用任何机器人、爬虫或其他自动设备访问网站\n• 试图未经授权访问网站的任何部分',
            },
            {
              heading: '3. 知识产权',
              content: '本网站上的所有内容，包括但不限于文本、图形、徽标、图像和软件，均为 BQ Group Inc / 秦由棕（Bill Jing Qin）或其内容供应商的财产，受美国和国际版权法保护。\n\n未经明确书面许可，您不得复制、分发、修改、创建衍生作品、公开展示或利用任何内容。',
            },
            {
              heading: '4. 无专业关系',
              content: '本网站提供的信息不构成经纪-客户、代理-客户或任何专业关系。查看本网站或通过本网站与我们联系不会建立业务关系。\n\n任何房地产服务均需单独的书面协议。',
            },
            {
              heading: '5. 免责声明',
              content: '本网站及通过本网站提供的所有信息、内容、材料和服务均按"原样"和"可用"基础提供。\n\nBQ Group Inc / 秦由棕（Bill Jing Qin）对网站的运营或通过网站提供的信息、内容、材料或服务不作任何明示或暗示的陈述或保证。\n\n我们不保证网站将不间断或无错误，也不对任何中断或错误承担责任。',
            },
            {
              heading: '6. 责任限制',
              content: '在适用法律允许的最大范围内，BQ Group Inc / 秦由棕（Bill Jing Qin）不对因您使用或无法使用本网站而产生的任何直接、间接、附带、特殊、后果性或惩罚性损害承担责任。\n\n这包括但不限于利润损失、商誉损失、使用损失、数据损失或其他无形损失。',
            },
            {
              heading: '7. 外部链接',
              content: '本网站可能包含指向非 BQ Group Inc / 秦由棕（Bill Jing Qin）拥有或控制的第三方网站或服务的链接。\n\n我们对任何第三方网站或服务的内容、隐私政策或做法不承担控制权或责任。您承认并同意，我们不对您使用任何此类内容、商品或服务造成的任何损害或损失负责。',
            },
            {
              heading: '8. 赔偿',
              content: '您同意赔偿、辩护并使 BQ Group Inc / 秦由棕（Bill Jing Qin）及其高级职员、董事、员工和代理免受因以下原因产生的任何索赔、损害、义务、损失、责任、成本或债务的损害：\n\n• 您对网站的使用和访问\n• 您违反本使用条款的任何条款\n• 您侵犯任何第三方权利，包括任何版权、财产权或隐私权',
            },
            {
              heading: '9. 条款变更',
              content: '我们保留随时修改或替换本使用条款的权利。最新版本将始终发布在本页面上，并标注"最近更新"日期。\n\n在任何更改后继续使用网站即表示接受新的使用条款。',
            },
            {
              heading: '10. 适用法律',
              content: '本使用条款应受加利福尼亚州法律管辖并按其解释，不考虑其法律冲突条款。\n\n因本条款产生的任何法律诉讼或程序应专属于位于加利福尼亚州圣克拉拉县的法院。',
            },
            {
              heading: '11. 可分割性',
              content: '如果本使用条款的任何条款被认定为无效或不可执行，则该条款将被删除，其余条款将继续完全有效。',
            },
            {
              heading: '12. 联系信息',
              content: '如果您对本使用条款有任何疑问，请通过以下方式联系我们：\n\nEmail: BillQin@bqrealtygroup.com\nCompany Name: BQ Group Inc\nAddress: 1631 N 1st Street Suite 100, San Jose CA 95112',
            },
          ],
        },
      },
    },
  };

  const currentContent = content[language];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy to-navy-light text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentContent.pageTitle}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section A: Legal Disclaimer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-navy mb-6 border-b-2 border-primary-gold pb-2">
            {currentContent.sections.disclaimer.title}
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {currentContent.sections.disclaimer.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Section B: Privacy Policy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-navy mb-2 border-b-2 border-primary-gold pb-2">
            {currentContent.sections.privacy.title}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{currentContent.sections.privacy.lastUpdated}</p>
          <div className="space-y-8">
            {currentContent.sections.privacy.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-navy mb-3">{section.heading}</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section C: Accessibility Statement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-navy mb-6 border-b-2 border-primary-gold pb-2">
            {currentContent.sections.accessibility.title}
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {currentContent.sections.accessibility.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Section D: Terms of Use */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-navy mb-2 border-b-2 border-primary-gold pb-2">
            {currentContent.sections.terms.title}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{currentContent.sections.terms.lastUpdated}</p>
          <div className="space-y-8">
            {currentContent.sections.terms.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-navy mb-3">{section.heading}</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
