const reasons = [
  { title: 'Always Free', desc: 'No hidden fees. No subscriptions. Free forever.', icon: '🆓' },
  { title: 'Score on Certificate', desc: 'Your exact % score is shown — not just "completed".', icon: '📈' },
  { title: 'LinkedIn Shareable', desc: 'One click to share your certificate on LinkedIn.', icon: '🔗' },
  { title: 'Public Profile', desc: 'Your own profile link to share with employers.', icon: '👀' },
]

export default function WhyHorizonX() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h3 className="text-3xl font-black mb-3">Why HorizonX?</h3>
        <p className="text-gray-400">Built for students who want to stand out</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((item) => (
          <div key={item.title} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4 className="text-white font-bold mb-2">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}