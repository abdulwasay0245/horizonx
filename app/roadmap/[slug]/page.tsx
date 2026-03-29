import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Lock,
  LayoutTemplate, Server, Paintbrush, BarChart,
  PenTool, Megaphone, Terminal, Code2, BookOpen
} from 'lucide-react'

// Map slugs → exact field names in the DB
const slugToFieldName: Record<string, string> = {
  'frontend-architecture':    'Frontend Architecture',
  'backend-systems':          'Backend Systems',
  'interface-design':         'Interface Design',
  'data-engineering':         'Data Engineering',
  'technical-writing':        'Technical Writing',
  'growth-marketing':         'Growth Marketing',
  'programming-with-cpp':     'Programming with C++',
  'programming-with-cpp-oop': 'Programming with C++ (OOP)',
}

const fieldIcons: Record<string, React.ReactNode> = {
  'Frontend Architecture':        <LayoutTemplate size={28} className="text-[#6C63FF]" />,
  'Backend Systems':              <Server size={28} className="text-[#00D4FF]" />,
  'Interface Design':             <Paintbrush size={28} className="text-[#FFB340]" />,
  'Data Engineering':             <BarChart size={28} className="text-[#00C896]" />,
  'Technical Writing':            <PenTool size={28} className="text-[#FF4D6A]" />,
  'Growth Marketing':             <Megaphone size={28} className="text-[#A78BFA]" />,
  'Programming with C++':         <Terminal size={28} className="text-[#6C63FF]" />,
  'Programming with C++ (OOP)':   <Code2 size={28} className="text-[#00D4FF]" />,
}

const fieldColors: Record<string, string> = {
  'Frontend Architecture':        '#6C63FF',
  'Backend Systems':              '#00D4FF',
  'Interface Design':             '#FFB340',
  'Data Engineering':             '#00C896',
  'Technical Writing':            '#FF4D6A',
  'Growth Marketing':             '#A78BFA',
  'Programming with C++':         '#6C63FF',
  'Programming with C++ (OOP)':   '#00D4FF',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fieldName = slugToFieldName[slug]
  return {
    title: fieldName ? `${fieldName} Roadmap — HorizonX` : 'Roadmap — HorizonX',
    description: `See the full learning roadmap for ${fieldName ?? 'this track'} on HorizonX.`,
  }
}

export default async function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fieldName = slugToFieldName[slug]
  if (!fieldName) notFound()

  const supabase = await createClient()

  // Fetch field
  const { data: field } = await supabase
    .from('fields')
    .select('id, name')
    .eq('name', fieldName)
    .single()

  if (!field) notFound()

  // Fetch track (no auth check — public read)
  const { data: track } = await supabase
    .from('tracks')
    .select('id, level, description')
    .eq('field_id', field.id)
    .eq('is_active', true)
    .single()

  if (!track) notFound()

  // Fetch tasks (titles only — no submission content)
  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, title, description, order_number')
    .eq('track_id', track.id)
    .order('order_number', { ascending: true })

  // Fetch question count
  const { count: questionCount } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('track_id', track.id)

  const color = fieldColors[field.name] ?? '#6C63FF'
  const icon = fieldIcons[field.name] ?? <BookOpen size={28} className="text-[#6C63FF]" />

  return (
    <div className="min-h-screen bg-[#EAEFF5]">

      {/* Top nav */}
      <nav className="border-b border-[#D1D9E6] px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link
          href="/#tracks"
          className="flex items-center gap-2 text-[13px] font-black text-[#718096] hover:text-[#2D3748] transition-colors"
        >
          <ArrowLeft size={16} />
          All Tracks
        </Link>
        <Link
          href="/register"
          className="clay-btn-primary flex items-center gap-2 !px-5 !py-2.5 text-[13px] font-black"
        >
          Start Learning <ArrowRight size={16} />
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-14">
          {/* Icon + level */}
          <div className="flex items-center gap-5 mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center border-none shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),3px_3px_8px_#c8d0e7]"
              style={{ background: '#F5F8FA' }}
            >
              {icon}
            </div>
            <div>
              <span
                className="text-[11px] font-mono uppercase tracking-[0.2em] font-black drop-shadow-sm"
                style={{ color }}
              >
                {track.level} track
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-[#2D3748] tracking-tight mt-1 drop-shadow-sm">
                {field.name}
              </h1>
            </div>
          </div>

          <p className="text-[#718096] text-[17px] font-medium leading-relaxed max-w-2xl">
            {track.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex items-center gap-2.5 text-[15px] text-[#A0AEC0] font-bold">
              <span className="font-mono font-black text-[#2D3748] text-xl drop-shadow-sm">{tasks?.length ?? 0}</span>
              hands-on tasks
            </div>
            <div className="flex items-center gap-2.5 text-[15px] text-[#A0AEC0] font-bold">
              <span className="font-mono font-black text-[#2D3748] text-xl drop-shadow-sm">{questionCount ?? 0}</span>
              quiz questions
            </div>
            <div className="flex items-center gap-2.5 text-[15px] text-[#A0AEC0] font-bold">
              <span className="font-mono font-black text-[#00C896] text-xl drop-shadow-sm">Free</span>
              forever
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-1 mb-14 rounded-full"
          style={{ background: `linear-gradient(to right, ${color}50, transparent)` }}
        />

        {/* Task roadmap */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-[#2D3748] mb-8 tracking-tight drop-shadow-sm">
            Track Roadmap
          </h2>

          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[27px] top-8 bottom-8 w-1"
              style={{ background: `linear-gradient(to bottom, ${color}60, transparent)` }}
            />

            <div className="space-y-6">
              {tasks?.map((task, index) => (
                <div key={task.id} className="flex gap-6 group">
                  {/* Step circle */}
                  <div
                    className="w-14 h-14 shrink-0 rounded-[1.2rem] flex items-center justify-center font-mono text-[15px] font-black border-none z-10 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7] transition-all duration-300"
                    style={{
                      background: '#F5F8FA',
                      color,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Task card */}
                  <div className="flex-1 clay-card !p-6 hover:shadow-[4px_4px_12px_#c8d0e7,inset_-2px_-2px_4px_rgba(255,255,255,0.9)] transition-all duration-300 transform group-hover:-translate-y-0.5">
                    <h3 className="text-[#2D3748] font-black text-lg mb-2 leading-snug drop-shadow-sm">
                      {task.title}
                    </h3>
                    <p className="text-[#718096] text-[15px] font-medium leading-relaxed line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Final step — Quiz */}
              <div className="flex gap-6">
                <div
                  className="w-14 h-14 shrink-0 rounded-[1.2rem] flex items-center justify-center border-none z-10 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]"
                  style={{ background: '#FFF8EB', color: '#FFB340' }}
                >
                  <CheckCircle2 size={24} className="drop-shadow-sm" />
                </div>
                <div className="flex-1 clay-card !p-6 border border-[#FFF8EB]">
                  <h3 className="text-[#FFB340] font-black text-lg mb-2 drop-shadow-sm">
                    Final Quiz — {questionCount} Questions
                  </h3>
                  <p className="text-[#A0AEC0] text-[15px] font-bold leading-relaxed">
                    Complete all tasks first, then take the quiz to earn your verified skill badge. You need 50% or above to pass.
                  </p>
                </div>
              </div>

              {/* Locked — Badge */}
              <div className="flex gap-6 opacity-80">
                <div className="w-14 h-14 shrink-0 rounded-[1.2rem] flex items-center justify-center border-none bg-[#EAEFF5] z-10 text-[#A0AEC0] shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]">
                  <Lock size={22} className="drop-shadow-sm" />
                </div>
                <div className="flex-1 clay-card border-dashed border-2 border-[#D1D9E6] !p-6 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-2px_-2px_5px_rgba(0,0,0,0.03)]">
                  <h3 className="text-[#A0AEC0] font-black text-lg mb-2 drop-shadow-sm">
                    Skill Badge Unlocked
                  </h3>
                  <p className="text-[#A0AEC0] text-[15px] font-bold leading-relaxed">
                    Pass the quiz to earn your verified badge and add it to your public profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA block */}
        <div
          className="clay-card p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: color }}></div>
          <h3 className="text-3xl font-black text-[#2D3748] mb-4 tracking-tight drop-shadow-sm relative z-10">
            Ready to start?
          </h3>
          <p className="text-[#718096] mb-8 max-w-md mx-auto text-[15px] font-medium leading-relaxed relative z-10">
            Create a free account to begin this track, submit your tasks, and earn your verified skill badge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/register"
              className="clay-btn-primary flex items-center gap-2 px-8 py-3.5 text-[15px] font-black"
            >
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="clay-btn-secondary flex items-center gap-2 px-10 py-3.5 text-[15px] font-black bg-[#F5F8FA]"
            >
              Sign In
            </Link>
          </div>
        </div>

      </main>
    </div>
  )
}
