import { createFileRoute } from '@tanstack/react-router';
import { Header } from '~/components/homepage/Header';
import { Footer } from '~/components/homepage/Footer';
import { HeroSection } from '~/components/rent/HeroSection';
import { ServicesSection } from '~/components/rent/ServicesSection';
import { CaseStudySection } from '~/components/rent/CaseStudySection';
import { ContactCta } from '~/components/rent/ContactCta';

export const Route = createFileRoute('/rent/')({
  component: RentPage,
});

function RentPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <CaseStudySection />
      <ContactCta />
      <Footer />
    </div>
  );
}
