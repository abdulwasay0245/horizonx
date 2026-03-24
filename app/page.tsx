import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import Fields from '@/components/landing/Fields'
import WhyHorizonX from '@/components/landing/WhyHorizonX'
import CTABanner from '@/components/landing/CTAbanner'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="bg-gray-950 min-h-screen text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Fields />
      <WhyHorizonX />
      <CTABanner />
      <Footer />
    </main>
  )
}