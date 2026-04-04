import { Navbar } from "@/modules/landing/navbar";
import { HeroSection } from "@/modules/landing/hero-section";
import { FeaturesSection } from "@/modules/landing/features-section";
import { TestimonialsSection } from "@/modules/landing/testimonials-section";
import { CTASection } from "@/modules/landing/cta-section";
import { Footer } from "@/modules/landing/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}