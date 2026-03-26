import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import Fields from '@/components/landing/Fields'
import WhyHorizonX from '@/components/landing/WhyHorizonX'
import Testimonials from '@/components/landing/Testimonials'
import Stats from '@/components/landing/Stats'
import CTABanner from '@/components/landing/CTAbanner'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <hr className="border-[#242430] my-0" />
      <HowItWorks />
      <hr className="border-[#242430] my-0" />
      <Fields />
      <hr className="border-[#242430] my-0" />
      <WhyHorizonX />
      <hr className="border-[#242430] my-0" />
      <Stats />
      <hr className="border-[#242430] my-0" />
      <Testimonials />
      <hr className="border-[#242430] my-0" />
      <CTABanner />
      <Footer />
    </main>
  )
}