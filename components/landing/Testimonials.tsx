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
    <div className="flex items-center gap-1 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFB340" className="shrink-0 drop-shadow-sm">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
      <div className="text-center mb-16 lg:mb-20">
        <h2 className="mb-4 text-4xl lg:text-5xl text-[#2D3748]">What People Are Saying</h2>
        <p className="text-[#4A5568] text-lg max-w-xl mx-auto font-medium">
          Hear from people who've already verified their skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="clay-card flex flex-col justify-between h-full group hover:-translate-y-2 transition-transform duration-300">

            <div>
              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <p className="text-[#4A5568] leading-relaxed mb-8 text-[15px] font-medium italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 pt-6 border-t border-[#D1D9E6]">
              {/* Gradient avatar circle (Clay styled) */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0"
                style={{ 
                  background: t.color,
                  boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.2), inset 2px 2px 6px rgba(255,255,255,0.4), 4px 4px 8px ${t.color}66`
                }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-[#2D3748] font-black text-base leading-tight mb-1">{t.name}</p>
                <p className="text-[#718096] text-[10px] font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
