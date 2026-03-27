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
  const icon = fieldIcons[field.name] ?? <BookOpen size={28} className="text-[#F0F0FF]" />

  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* Top nav */}
      <nav className="border-b border-[#242430] px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link
          href="/#tracks"
          className="flex items-center gap-2 text-sm font-medium text-[#9090A8] hover:text-[#F0F0FF] transition-colors"
        >
          <ArrowLeft size={16} />
          All Tracks
        </Link>
        <Link
          href="/register"
          className="btn-primary flex items-center gap-2 !px-5 !py-2 text-sm"
        >
          Start Learning <ArrowRight size={14} />
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-12">
          {/* Icon + level */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center border"
              style={{ background: `${color}15`, borderColor: `${color}30` }}
            >
              {icon}
            </div>
            <div>
              <span
                className="text-xs font-mono uppercase tracking-widest font-bold"
                style={{ color }}
              >
                {track.level} track
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-[#F0F0FF] tracking-tight mt-0.5">
                {field.name}
              </h1>
            </div>
          </div>

          <p className="text-[#9090A8] text-base leading-relaxed max-w-2xl">
            {track.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-[#9090A8]">
              <span className="font-mono font-bold text-[#F0F0FF]">{tasks?.length ?? 0}</span>
              hands-on tasks
            </div>
            <div className="flex items-center gap-2 text-sm text-[#9090A8]">
              <span className="font-mono font-bold text-[#F0F0FF]">{questionCount ?? 0}</span>
              quiz questions
            </div>
            <div className="flex items-center gap-2 text-sm text-[#9090A8]">
              <span className="font-mono font-bold text-[#00C896]">Free</span>
              forever
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-10 rounded-full"
          style={{ background: `linear-gradient(to right, ${color}50, transparent)` }}
        />

        {/* Task roadmap */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#F0F0FF] mb-6 tracking-tight">
            Track Roadmap
          </h2>

          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[23px] top-8 bottom-8 w-px"
              style={{ background: `linear-gradient(to bottom, ${color}60, transparent)` }}
            />

            <div className="space-y-4">
              {tasks?.map((task, index) => (
                <div key={task.id} className="flex gap-5 group">
                  {/* Step circle */}
                  <div
                    className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-mono text-sm font-bold border-2 z-10 transition-all duration-300"
                    style={{
                      background: `${color}15`,
                      borderColor: `${color}40`,
                      color,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Task card */}
                  <div className="flex-1 vercel-card !p-5 group-hover:border-[#3A3A50] transition-colors duration-200">
                    <h3 className="text-[#F0F0FF] font-semibold text-base mb-1 leading-snug">
                      {task.title}
                    </h3>
                    <p className="text-[#9090A8] text-sm leading-relaxed line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Final step — Quiz */}
              <div className="flex gap-5">
                <div
                  className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-2 z-10"
                  style={{ background: '#FFB34015', borderColor: '#FFB34040', color: '#FFB340' }}
                >
                  <CheckCircle2 size={20} />
                </div>
                <div className="flex-1 vercel-card !p-5 border-[#FFB340]/20">
                  <h3 className="text-[#FFB340] font-semibold text-base mb-1">
                    Final Quiz — {questionCount} Questions
                  </h3>
                  <p className="text-[#9090A8] text-sm leading-relaxed">
                    Complete all tasks first, then take the quiz to earn your verified skill badge. You need 50% or above to pass.
                  </p>
                </div>
              </div>

              {/* Locked — Badge */}
              <div className="flex gap-5 opacity-60">
                <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-2 border-[#242430] bg-[#1A1A24] z-10 text-[#5A5A70]">
                  <Lock size={18} />
                </div>
                <div className="flex-1 vercel-card !p-5 border-dashed">
                  <h3 className="text-[#5A5A70] font-semibold text-base mb-1">
                    Skill Badge Unlocked
                  </h3>
                  <p className="text-[#5A5A70] text-sm leading-relaxed">
                    Pass the quiz to earn your verified badge and add it to your public profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA block */}
        <div
          className="rounded-2xl border p-8 text-center"
          style={{ background: `${color}08`, borderColor: `${color}25` }}
        >
          <h3 className="text-2xl font-black text-[#F0F0FF] mb-3 tracking-tight">
            Ready to start?
          </h3>
          <p className="text-[#9090A8] mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Create a free account to begin this track, submit your tasks, and earn your verified skill badge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="btn-primary flex items-center gap-2 px-8 py-3 text-sm font-bold"
              style={{ boxShadow: `0 0 30px ${color}30` }}
            >
              Create Free Account <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="btn-secondary flex items-center gap-2 px-8 py-3 text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>

      </main>
    </div>
  )
}
