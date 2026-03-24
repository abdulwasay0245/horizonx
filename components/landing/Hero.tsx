import Link from 'next/link'

export default function Hero() {
  return (
    <section className="text-center px-6 py-24 max-w-4xl mx-auto">
      <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
        100% Free — No Credit Card Required
      </div>
      <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6">
        Real Tasks.{' '}
        <span className="text-blue-500">Real Skills.</span>
        <br />
        Proof of Your Ability.
      </h2>
      <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
        Complete real-world tasks, take a skill test, and earn a certificate
        with your score — shareable directly on LinkedIn.
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition">
          Start for Free →
        </Link>
        <Link href="#how-it-works" className="text-gray-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-gray-800 hover:border-gray-600 transition">
          See How It Works
        </Link>
      </div>
    </section>
  )
}