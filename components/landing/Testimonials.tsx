const testimonials = [
  {
    name: 'Sarah Ahmed',
    role: 'Frontend Developer',
    quote: 'HorizonX helped me build a real portfolio in weeks. The structured tracks and hands-on tasks made all the difference.',
  },
  {
    name: 'Ali Raza',
    role: 'UI/UX Designer',
    quote: 'The verified technical profile I generated from HorizonX stood out on my LinkedIn. Recruiters actually noticed it!',
  },
  {
    name: 'Fatima Khan',
    role: 'Data Analyst',
    quote: 'I went from zero coding knowledge to submitting real projects. The task-based approach kept me motivated throughout.',
  },
]

export default function Testimonials() {
  return (
    <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="mb-4">What People Are Saying</h2>
        <p className="text-[#9090A8] text-lg max-w-xl mx-auto">
          Hear from people who've already verified their skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="vercel-card flex flex-col justify-between h-full">
            <p className="text-[#9090A8] leading-relaxed mb-10">
              "{t.quote}"
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1A24] border border-[#242430] flex items-center justify-center font-bold text-[#F0F0FF]">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-[#F0F0FF] font-semibold text-sm">{t.name}</p>
                <p className="text-[#5A5A70] text-[11px] font-mono uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
