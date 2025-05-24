import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import FeaturedTrainers from "@/components/featured-trainers"
import CategoriesSection from "@/components/categories-section"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <FeaturedTrainers />
      <CategoriesSection />
      <Testimonials />
      <CTASection />
    </main>
  )
}
