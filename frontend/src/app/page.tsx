import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { TrustBadges } from '@/components/landing/trust-badges'
import { HowItWorks } from '@/components/landing/how-it-works'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { Testimonials } from '@/components/landing/testimonials'
import { PricingSection } from '@/components/landing/pricing-section'
import { FAQSection } from '@/components/landing/faq-section'
import { CTASection } from '@/components/cta-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <TrustBadges />
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
