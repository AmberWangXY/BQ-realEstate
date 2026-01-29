import { createFileRoute } from '@tanstack/react-router';
import { Header } from '~/components/homepage/Header';
import { Footer } from '~/components/homepage/Footer';
import { HeroSection } from '~/components/about/HeroSection';
import { Storyline } from '~/components/about/Storyline';
import { Credentials } from '~/components/about/Credentials';
import { ServicePhilosophy } from '~/components/about/ServicePhilosophy';
import { CtaSection } from '~/components/about/CtaSection';

export const Route = createFileRoute('/about/')({
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Credentials />
      <Storyline />
      <ServicePhilosophy />
      <CtaSection />
      <Footer />
    </div>
  );
}
