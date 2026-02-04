import { createFileRoute } from '@tanstack/react-router';
import { Header } from '~/components/homepage/Header';
import { Footer } from '~/components/homepage/Footer';
import { HeroSection } from '~/components/buy/HeroSection';
import { IntroSection } from '~/components/buy/IntroSection';
import { SolutionsSection } from '~/components/buy/SolutionsSection';
import { SuccessfulStoriesSection } from '~/components/buy/SuccessfulStoriesSection';
import { ShowcaseSection } from '~/components/buy/ShowcaseSection';
import { ListingsSection } from '~/components/sell/ListingsSection';
import { ContactCta } from '~/components/buy/ContactCta';

export const Route = createFileRoute('/buy/')({
  component: BuyPage,
});

function BuyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <IntroSection />
      <SolutionsSection />
      <SuccessfulStoriesSection />
      <ShowcaseSection />
      <ListingsSection />
      <ContactCta />
      <Footer />
    </div>
  );
}
