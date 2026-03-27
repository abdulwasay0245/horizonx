import { LayoutTemplate, Server, Paintbrush, BarChart, PenTool, Megaphone, Terminal, Code2 } from 'lucide-react'

const fields = [
  { name: 'Frontend Architecture', desc: 'HTML, CSS, JavaScript, React interfaces', icon: <LayoutTemplate size={32} className="text-[#F0F0FF]" />, available: true },
  { name: 'Backend Systems', desc: 'Node.js, REST APIs, Databases', icon: <Server size={32} className="text-[#F0F0FF]" />, available: true },
  { name: 'Interface Design', desc: 'Figma grids, wireframes, prototypes', icon: <Paintbrush size={32} className="text-[#F0F0FF]" />, available: true },
  { name: 'Data Engineering', desc: 'SQL structures, Excel, Python scripting', icon: <BarChart size={32} className="text-[#F0F0FF]" />, available: true },
  { name: 'Technical Writing', desc: 'Documentation, Copywriting, SEO', icon: <PenTool size={32} className="text-[#F0F0FF]" />, available: true },
  { name: 'Growth Marketing', desc: 'Analytics, Ads, Distribution workflows', icon: <Megaphone size={32} className="text-[#F0F0FF]" />, available: true },
  { name: 'Programming with C++', desc: 'Write basic programs, functions, and simple logic in C++', icon: <Terminal size={32} className="text-[#F0F0FF]" />, available: true },
  { name: 'Programming with C++ (OOP)', desc: 'Learn object-oriented programming basics with C++ classes and objects', icon: <Code2 size={32} className="text-[#F0F0FF]" />, available: true },
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
             className={`vercel-card flex flex-col h-full ${!field.available ? 'opacity-50 grayscale' : ''}`}
           >
            <div className="mb-6">{field.icon}</div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-[#F0F0FF] font-semibold text-lg">{field.name}</h3>
              {field.available
                ? <span className="bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20 rounded-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">Live</span>
                : <span className="bg-[#1A1A24] text-[#5A5A70] border border-[#242430] rounded-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">Queue</span>
              }
            </div>
            <p className="text-[#9090A8] text-sm leading-relaxed mt-auto">{field.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}