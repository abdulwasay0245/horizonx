import Link from 'next/link'
import { LayoutTemplate, Server, Paintbrush, BarChart, PenTool, Megaphone, Terminal, Code2, ArrowRight, Map } from 'lucide-react'

const fields = [
  { name: 'Frontend Architecture', slug: 'frontend-architecture', desc: 'HTML, CSS, JavaScript, React interfaces', icon: <LayoutTemplate size={32} className="text-[#6C63FF]" />, available: true },
  { name: 'Backend Systems', slug: 'backend-systems', desc: 'Node.js, REST APIs, Databases', icon: <Server size={32} className="text-[#00D4FF]" />, available: true },
  { name: 'Interface Design', slug: 'interface-design', desc: 'Figma grids, wireframes, prototypes', icon: <Paintbrush size={32} className="text-[#FFB340]" />, available: true },
  { name: 'Data Engineering', slug: 'data-engineering', desc: 'SQL structures, Excel, Python scripting', icon: <BarChart size={32} className="text-[#00C896]" />, available: true },
  { name: 'Technical Writing', slug: 'technical-writing', desc: 'Documentation, Copywriting, SEO', icon: <PenTool size={32} className="text-[#FF4D6A]" />, available: true },
  { name: 'Growth Marketing', slug: 'growth-marketing', desc: 'Analytics, Ads, Distribution workflows', icon: <Megaphone size={32} className="text-[#A78BFA]" />, available: true },
  { name: 'Programming with C++', slug: 'programming-with-cpp', desc: 'Write basic programs, functions, and simple logic in C++', icon: <Terminal size={32} className="text-[#6C63FF]" />, available: true },
  { name: 'Programming with C++ (OOP)', slug: 'programming-with-cpp-oop', desc: 'Learn object-oriented programming basics with C++ classes and objects', icon: <Code2 size={32} className="text-[#00D4FF]" />, available: true },
]

export default function Fields() {
  return (
    <section id="tracks" className="px-6 py-24 md:py-32 w-full mx-auto relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="mb-4 text-4xl lg:text-5xl text-[#2D3748]">What You Can Learn</h2>
          <p className="text-[#4A5568] text-lg max-w-xl mx-auto font-medium">
            Choose a track and start building real skills today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`clay-card-interactive flex flex-col h-full group ${!field.available ? 'opacity-60 grayscale' : ''}`}
            >
              {/* Icon */}
              <div className="mb-6 w-16 h-16 bg-[#F5F8FA] rounded-3xl flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.05),3px_3px_6px_#c8d0e7] transition-all duration-300 group-hover:scale-110">
                {field.icon}
              </div>

              {/* Title + badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-[#2D3748] font-black text-xl leading-tight">{field.name}</h3>
                {field.available
                  ? <span className="badge-clay-success text-[10px]">Live</span>
                  : <span className="badge-clay-neutral text-[10px]">Coming Soon</span>
                }
              </div>

              {/* Description */}
              <p className="text-[#4A5568] text-base leading-relaxed mb-8 flex-1 font-medium">{field.desc}</p>

              {/* CTAs */}
              {field.available && (
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#D1D9E6]">
                  {/* Roadmap — public, no login */}
                  <Link
                    href={`/roadmap/${field.slug}`}
                    className="flex items-center gap-1.5 text-sm font-bold text-[#718096] hover:text-[#2D3748] transition-colors group/map"
                  >
                    <Map size={16} />
                    View Roadmap
                  </Link>

                  {/* Start — requires login */}
                  <Link
                    href="/register"
                    className="flex items-center gap-1.5 text-sm font-black text-[#6C63FF] hover:text-[#7D75FF] transition-colors group/link p-2 bg-[#F5F8FA] rounded-xl shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]"
                  >
                    Start Track
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}