import { createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/homepage/Header";
import { Hero } from "~/components/homepage/Hero";
import { WhyChoose } from "~/components/homepage/WhyChoose";
import { TransactionCarousel } from "~/components/homepage/TransactionCarousel";
import { ListingsSalesMapTransition } from "~/components/homepage/ListingsSalesMapTransition";
import { ZillowReviews } from "~/components/homepage/ZillowReviews";
import { VideoHighlights } from "~/components/homepage/VideoHighlights";
import { Footer } from "~/components/homepage/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <WhyChoose />
      <TransactionCarousel />
      <ListingsSalesMapTransition />
      <ZillowReviews />
      <VideoHighlights />
      <Footer />
    </div>
  );
}
