import { createFileRoute } from '@tanstack/react-router';
import { Header } from '~/components/homepage/Header';
import { Footer } from '~/components/homepage/Footer';
import { HeroSection } from '~/components/sell/HeroSection';
import { ShortIntroSection } from '~/components/sell/ShortIntroSection';
import { WhySellSection } from '~/components/sell/WhySellSection';
import { SuccessfulStoriesSection } from '~/components/sell/SuccessfulStoriesSection';
import { ProcessSection } from '~/components/sell/ProcessSection';
import { ListingsSection } from '~/components/sell/ListingsSection';
import { ContactCta } from '~/components/sell/ContactCta';
import { FaqSection } from '~/components/sell/FaqSection';

export const Route = createFileRoute('/sell/')({
  component: SellPage,
});

function SellPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ShortIntroSection />
      <WhySellSection />
      <SuccessfulStoriesSection />
      <ProcessSection />
      <ListingsSection />
      <ContactCta />
      <FaqSection />
      <Footer />
    </div>
  );
}
