const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your free account in 30 seconds', icon: '👤' },
  { step: '02', title: 'Pick a Track', desc: 'Choose your field and difficulty level', icon: '🎯' },
  { step: '03', title: 'Complete Tasks', desc: 'Work on real-world practice tasks', icon: '⚡' },
  { step: '04', title: 'Take the Test', desc: '20 MCQ questions to prove your knowledge', icon: '📝' },
  { step: '05', title: 'Get Certified', desc: 'Earn a certificate with your score %', icon: '🏆' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h3 className="text-3xl font-black mb-3">How It Works</h3>
        <p className="text-gray-400">Five simple steps to prove your skills</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((item) => (
          <div key={item.step} className="bg-gray-900 rounded-2xl p-6 text-center border border-gray-800">
            <div className="text-3xl mb-3">{item.icon}</div>
            <div className="text-blue-500 text-xs font-bold mb-2">{item.step}</div>
            <h4 className="text-white font-bold mb-2">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}