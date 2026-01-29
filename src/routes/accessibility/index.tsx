import { createFileRoute } from '@tanstack/react-router';
import { Header } from '~/components/homepage/Header';
import { Footer } from '~/components/homepage/Footer';
import { AccessibilityPageContent } from '~/components/accessibility/AccessibilityPageContent';

export const Route = createFileRoute('/accessibility/')({
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AccessibilityPageContent />
      <Footer />
    </div>
  );
}
