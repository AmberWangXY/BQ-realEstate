import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTRPC } from "~/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { Header } from "~/components/homepage/Header";
import { Footer } from "~/components/homepage/Footer";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useLanguageStore } from "~/store/languageStore";

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
});

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  inquiryType: z.enum(["buy", "sell", "rent", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function ContactPage() {
  const trpc = useTRPC();
  const [isSuccess, setIsSuccess] = useState(false);
  const language = useLanguageStore((state) => state.language);

  const content = {
    en: {
      hero: {
        title: "Let's Start a Conversation",
        subtitle: "Whether you're buying, selling, or managing property in Silicon Valley, Bill Qin is here to help you achieve your real estate goals.",
      },
      contactInfo: {
        title: "Contact Information",
        phone: {
          label: "Phone",
          value: "+1-408-888-4888",
        },
        email: {
          label: "Email",
          value: "billqin@bqrealtygroup.com",
        },
        qrCodes: {
          redNote: "Red Note",
          wechat: "WeChat",
        },
      },
      form: {
        title: "Send Us a Message",
        fields: {
          name: {
            label: "Full Name *",
            placeholder: "John Smith",
          },
          email: {
            label: "Email Address *",
            placeholder: "john@example.com",
          },
          phone: {
            label: "Phone Number",
            placeholder: "+1 (408) 888-4888",
          },
          inquiryType: {
            label: "I'm Interested In *",
            options: {
              buy: "Buying a Property",
              sell: "Selling a Property",
              rent: "Property Management / Rental",
              other: "General Inquiry",
            },
          },
          message: {
            label: "Message *",
            placeholder: "Tell us about your real estate needs...",
          },
        },
        button: {
          send: "Send Message",
          sending: "Sending...",
        },
        error: "Failed to send message. Please try again or contact us directly.",
      },
      success: {
        title: "Thank You!",
        message: "Your message has been received. Bill Qin will get back to you within 24 hours.",
        button: "Send Another Message",
      },
    },
    zh: {
      hero: {
        title: "联系Bill",
        subtitle: "无论您是购房、售房，还是需要物业管理服务，我都将协助您在硅谷实现您的房地产目标。",
      },
      contactInfo: {
        title: "联系信息",
        phone: {
          label: "电话",
          value: "+1-408-888-4888",
        },
        email: {
          label: "邮箱",
          value: "billqin@bqrealtygroup.com",
        },
        qrCodes: {
          redNote: "小红书",
          wechat: "微信",
        },
      },
      form: {
        title: "给我们留言",
        fields: {
          name: {
            label: "姓名 *",
            placeholder: "张三",
          },
          email: {
            label: "邮箱地址 *",
            placeholder: "zhangsan@example.com",
          },
          phone: {
            label: "电话号码",
            placeholder: "+1 (408) 888-4888",
          },
          inquiryType: {
            label: "您感兴趣的服务 *",
            options: {
              buy: "购房服务",
              sell: "售房服务",
              rent: "物业管理服务",
              other: "其他咨询",
            },
          },
          message: {
            label: "留言内容 *",
            placeholder: "请简单描述您的需求……",
          },
        },
        button: {
          send: "发送信息",
          sending: "发送中...",
        },
        error: "发送失败，请重试或直接联系我们。",
      },
      success: {
        title: "感谢您的留言！",
        message: "我们已收到您的信息，Bill Qin 将在24小时内回复您。",
        button: "发送新留言",
      },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      inquiryType: "buy",
    },
  });

  const submitMutation = useMutation(
    trpc.contact.submit.mutationOptions({
      onSuccess: () => {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      },
    })
  );

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-navy to-navy-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            {content[language].hero.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up">
            {content[language].hero.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-soft">
                <h2 className="text-2xl font-bold text-navy mb-6">
                  {content[language].contactInfo.title}
                </h2>
                
                <div className="space-y-6">
                  <a
                    href="tel:+14088884888"
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-gold transition-colors">
                      <Phone className="w-6 h-6 text-blue-600 group-hover:text-navy" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy mb-1">{content[language].contactInfo.phone.label}</div>
                      <div className="text-gray-600 group-hover:text-primary-gold transition-colors">
                        {content[language].contactInfo.phone.value}
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:billqin@bqrealtygroup.com"
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-gold transition-colors">
                      <Mail className="w-6 h-6 text-green-600 group-hover:text-navy" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy mb-1">{content[language].contactInfo.email.label}</div>
                      <div className="text-gray-600 group-hover:text-primary-gold transition-colors">
                        {content[language].contactInfo.email.value}
                      </div>
                    </div>
                  </a>

                  {/* QR Codes */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <div className="flex flex-col items-center">
                        <img 
                          src="/red-dot-qr-code.png" 
                          alt={content[language].contactInfo.qrCodes.redNote}
                          className="w-24 h-24 rounded-lg"
                        />
                        <div className="text-sm mt-2 text-center text-gray-600 font-medium">
                          {content[language].contactInfo.qrCodes.redNote}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <img 
                          src="/messaging-app-qr-code.png" 
                          alt={content[language].contactInfo.qrCodes.wechat}
                          className="w-24 h-24 rounded-lg"
                        />
                        <div className="text-sm mt-2 text-center text-gray-600 font-medium">
                          {content[language].contactInfo.qrCodes.wechat}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-soft">
                {isSuccess ? (
                  <div className="text-center py-12 animate-scale-in">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-navy mb-4">
                      {content[language].success.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                      {content[language].success.message}
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-8 py-3 bg-primary-gold hover:bg-primary-gold-light text-navy font-semibold rounded-lg transition-colors"
                    >
                      {content[language].success.button}
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-navy mb-6">
                      {content[language].form.title}
                    </h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          {content[language].form.fields.name.label}
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-colors"
                          placeholder={content[language].form.fields.name.placeholder}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            {content[language].form.fields.email.label}
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-colors"
                            placeholder={content[language].form.fields.email.placeholder}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            {content[language].form.fields.phone.label}
                          </label>
                          <input
                            {...register("phone")}
                            type="tel"
                            id="phone"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-colors"
                            placeholder={content[language].form.fields.phone.placeholder}
                          />
                        </div>
                      </div>

                      {/* Inquiry Type */}
                      <div>
                        <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-700 mb-2">
                          {content[language].form.fields.inquiryType.label}
                        </label>
                        <select
                          {...register("inquiryType")}
                          id="inquiryType"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-colors"
                        >
                          <option value="buy">{content[language].form.fields.inquiryType.options.buy}</option>
                          <option value="sell">{content[language].form.fields.inquiryType.options.sell}</option>
                          <option value="rent">{content[language].form.fields.inquiryType.options.rent}</option>
                          <option value="other">{content[language].form.fields.inquiryType.options.other}</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          {content[language].form.fields.message.label}
                        </label>
                        <textarea
                          {...register("message")}
                          id="message"
                          rows={6}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-colors resize-none"
                          placeholder={content[language].form.fields.message.placeholder}
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-primary-gold hover:bg-primary-gold-light disabled:bg-gray-300 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                            <span>{content[language].form.button.sending}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>{content[language].form.button.send}</span>
                          </>
                        )}
                      </button>

                      {submitMutation.isError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600">
                            {content[language].form.error}
                          </p>
                        </div>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
