const testimonials = [
  {
    name: 'Sarah Ahmed',
    role: 'Frontend Developer',
    quote: 'HorizonX helped me build a real portfolio in weeks. The structured tracks and hands-on tasks made all the difference.',
    color: '#6C63FF',
    stars: 5,
  },
  {
    name: 'Ali Raza',
    role: 'UI/UX Designer',
    quote: 'The verified technical profile I generated from HorizonX stood out on my LinkedIn. Recruiters actually noticed it!',
    color: '#00C896',
    stars: 5,
  },
  {
    name: 'Fatima Khan',
    role: 'Data Analyst',
    quote: 'I went from zero coding knowledge to submitting real projects. The task-based approach kept me motivated throughout.',
    color: '#00D4FF',
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFB340" className="shrink-0">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

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
          <div key={i} className="vercel-card flex flex-col justify-between h-full hover:border-[#3A3A50] transition-colors duration-300 relative overflow-hidden group">
            {/* Subtle top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(to right, ${t.color}, transparent)` }}
            />

            <div>
              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <p className="text-[#9090A8] leading-relaxed mb-8 text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-[#242430]">
              {/* Gradient avatar circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${t.color}cc, ${t.color}44)`, border: `1px solid ${t.color}40` }}
              >
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
