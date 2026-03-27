import Link from 'next/link'
import { LayoutTemplate, Server, Paintbrush, BarChart, PenTool, Megaphone, Terminal, Code2, ArrowRight } from 'lucide-react'

const fields = [
  { name: 'Frontend Architecture', desc: 'HTML, CSS, JavaScript, React interfaces', icon: <LayoutTemplate size={32} className="text-[#6C63FF]" />, available: true },
  { name: 'Backend Systems', desc: 'Node.js, REST APIs, Databases', icon: <Server size={32} className="text-[#00D4FF]" />, available: true },
  { name: 'Interface Design', desc: 'Figma grids, wireframes, prototypes', icon: <Paintbrush size={32} className="text-[#FFB340]" />, available: true },
  { name: 'Data Engineering', desc: 'SQL structures, Excel, Python scripting', icon: <BarChart size={32} className="text-[#00C896]" />, available: true },
  { name: 'Technical Writing', desc: 'Documentation, Copywriting, SEO', icon: <PenTool size={32} className="text-[#FF4D6A]" />, available: true },
  { name: 'Growth Marketing', desc: 'Analytics, Ads, Distribution workflows', icon: <Megaphone size={32} className="text-[#A78BFA]" />, available: true },
  { name: 'Programming with C++', desc: 'Write basic programs, functions, and simple logic in C++', icon: <Terminal size={32} className="text-[#6C63FF]" />, available: true },
  { name: 'Programming with C++ (OOP)', desc: 'Learn object-oriented programming basics with C++ classes and objects', icon: <Code2 size={32} className="text-[#00D4FF]" />, available: true },
]

export default function Fields() {
  return (
    <section id="tracks" className="px-6 py-24 md:py-32 max-w-6xl mx-auto bg-[#0A0A0F]">
      <div className="text-center mb-16">
        <h2 className="mb-4">What You Can Learn</h2>
        <p className="text-[#9090A8] text-lg max-w-xl mx-auto">
          Choose a track and start building real skills today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`vercel-card group flex flex-col h-full hover:border-[#6C63FF]/50 hover:-translate-y-1 transition-all duration-300 ${!field.available ? 'opacity-50 grayscale' : ''}`}
          >
            {/* Icon */}
            <div className="mb-6 w-14 h-14 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center group-hover:border-[#6C63FF]/40 transition-colors duration-300">
              {field.icon}
            </div>

            {/* Title + badge */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-[#F0F0FF] font-semibold text-lg">{field.name}</h3>
              {field.available
                ? <span className="bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20 rounded-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">Live</span>
                : <span className="bg-[#1A1A24] text-[#5A5A70] border border-[#242430] rounded-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">Coming Soon</span>
              }
            </div>

            {/* Description */}
            <p className="text-[#9090A8] text-sm leading-relaxed mb-6 flex-1">{field.desc}</p>

            {/* CTA */}
            {field.available && (
              <Link
                href="/register"
                className="mt-auto flex items-center gap-2 text-sm font-semibold text-[#6C63FF] hover:text-[#F0F0FF] transition-colors group/link"
              >
                Start this track
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}