import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutTemplate, Server, Paintbrush, BarChart, PenTool, Megaphone, BookOpen } from 'lucide-react'

// Map of field names to Lucide icons
const getFieldIcon = (name: string) => {
  if (!name) return <BookOpen size={24} className="text-[#F0F0FF]" />
  if (name.includes('Frontend')) return <LayoutTemplate size={24} className="text-[#F0F0FF]" />
  if (name.includes('Backend')) return <Server size={24} className="text-[#F0F0FF]" />
  if (name.includes('Design')) return <Paintbrush size={24} className="text-[#F0F0FF]" />
  if (name.includes('Data')) return <BarChart size={24} className="text-[#F0F0FF]" />
  if (name.includes('Writing')) return <PenTool size={24} className="text-[#F0F0FF]" />
  if (name.includes('Marketing')) return <Megaphone size={24} className="text-[#F0F0FF]" />
  return <BookOpen size={24} className="text-[#F0F0FF]" />
}

export default async function TracksPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, fields(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('track_id')
    .eq('user_id', user.id)

  const enrolledTrackIds = enrollments?.map(e => e.track_id) || []

  return (
    <div className="max-w-6xl mx-auto py-8 lg:py-12 px-6">
      <div className="mb-12 border-b border-[#242430] pb-8">
        <h2 className="text-3xl font-black text-[#F0F0FF] tracking-tight mb-2">Curriculum Repository</h2>
        <p className="text-[#9090A8] text-sm">Select a domain and initialize a module to start building verifiable skills.</p>
      </div>

      {tracks && tracks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            const isEnrolled = enrolledTrackIds.includes(track.id)
            return (
              <div key={track.id} className="vercel-card flex flex-col h-full hover:border-[#6C63FF]/50 transition-colors">
                <div className="w-12 h-12 bg-[#1A1A24] rounded-xl flex items-center justify-center mb-6 border border-[#242430]">
                  {getFieldIcon(track.fields?.name)}
                </div>
                
                <h4 className="text-[#F0F0FF] text-lg font-semibold tracking-tight mb-3">
                   {track.fields?.name}
                </h4>
                
                <div className="mb-4">
                  <span className={`badge-${track.level.toLowerCase()}`}>
                    {track.level}
                  </span>
                </div>
                
                <p className="text-[#9090A8] text-sm leading-relaxed mb-8 flex-1">
                   {track.description}
                </p>

                <div className="mt-auto pt-6 border-t border-[#242430]">
                   {isEnrolled ? (
                     <Link
                       href={`/tracks/${track.id}`}
                       className="btn-primary w-full flex justify-center py-2 text-sm"
                     >
                       Resume Protocol
                     </Link>
                   ) : (
                     <Link
                       href={`/tracks/${track.id}`}
                       className="btn-secondary w-full flex justify-center py-2 text-sm text-[#F0F0FF] font-semibold"
                     >
                       Examine Spec
                     </Link>
                   )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="vercel-card text-center !py-16 border-dashed bg-transparent shadow-none flex flex-col items-center">
          <div className="w-12 h-12 bg-[#1A1A24] border border-[#242430] rounded-xl flex items-center justify-center mb-6 text-[#5A5A70]">
             <BookOpen size={24} />
          </div>
          <h4 className="text-[#F0F0FF] font-semibold mb-2">No domains discovered</h4>
          <p className="text-[#5A5A70] text-sm mb-6 max-w-sm mx-auto">
            Check back later. Our principal engineers are currently crafting premium execution matrices.
          </p>
        </div>
      )}
    </div>
  )
}