import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-3xl mx-auto bg-blue-600 rounded-3xl p-12 text-center">
        <h3 className="text-4xl font-black mb-4">Ready to prove your skills?</h3>
        <p className="text-blue-100 mb-8 text-lg">
          Join thousands of students building their portfolio with HorizonX.
        </p>
        <Link
          href="/register"
          className="bg-white text-blue-600 font-black px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition inline-block"
        >
          Get Started Free →
        </Link>
      </div>
    </section>
  )
}