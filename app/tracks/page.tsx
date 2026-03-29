import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutTemplate, Server, Paintbrush, BarChart, PenTool, Megaphone, BookOpen } from 'lucide-react'

// Map of field names to Lucide icons
const getFieldIcon = (name: string) => {
  if (!name) return <BookOpen size={24} className="text-[#6C63FF]" />
  if (name.includes('Frontend')) return <LayoutTemplate size={24} className="text-[#6C63FF]" />
  if (name.includes('Backend')) return <Server size={24} className="text-[#6C63FF]" />
  if (name.includes('Design')) return <Paintbrush size={24} className="text-[#6C63FF]" />
  if (name.includes('Data')) return <BarChart size={24} className="text-[#6C63FF]" />
  if (name.includes('Writing')) return <PenTool size={24} className="text-[#6C63FF]" />
  if (name.includes('Marketing')) return <Megaphone size={24} className="text-[#6C63FF]" />
  return <BookOpen size={24} className="text-[#6C63FF]" />
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
      <div className="mb-12 border-b border-[#D1D9E6] pb-8">
        <h2 className="text-3xl font-black text-[#2D3748] tracking-tight mb-2 drop-shadow-sm">All Tracks</h2>
        <p className="text-[#718096] text-sm font-medium">Pick a track and start learning at your own pace.</p>
      </div>

      {tracks && tracks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            const isEnrolled = enrolledTrackIds.includes(track.id)
            return (
              <div key={track.id} className="clay-card-interactive flex flex-col h-full transition-colors">
                <div className="w-14 h-14 bg-[#F5F8FA] rounded-2xl flex items-center justify-center mb-6 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05),2px_2px_6px_#c8d0e7]">
                  {getFieldIcon(track.fields?.name)}
                </div>
                
                <h4 className="text-[#2D3748] text-lg font-black tracking-tight mb-3 line-clamp-2">
                   {track.fields?.name}
                </h4>
                
                <div className="mb-4">
                  <span className={`badge-clay-primary`}>
                    {track.level}
                  </span>
                </div>
                
                <p className="text-[#4A5568] text-sm font-medium leading-relaxed mb-8 flex-1">
                   {track.description}
                </p>

                <div className="mt-auto pt-6 border-t border-[#D1D9E6]">
                   {isEnrolled ? (
                     <Link
                       href={`/tracks/${track.id}`}
                       className="clay-btn-primary w-full flex justify-center py-3 text-sm"
                     >
                       Continue Track
                     </Link>
                   ) : (
                     <Link
                       href={`/tracks/${track.id}`}
                       className="clay-btn-secondary w-full flex justify-center py-3 text-sm font-bold"
                     >
                       View Track
                     </Link>
                   )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="clay-card text-center !py-16 border-dashed !border-[#D1D9E6] !shadow-none bg-transparent flex flex-col items-center">
          <div className="w-16 h-16 bg-[#F5F8FA] rounded-3xl flex items-center justify-center mb-6 text-[#718096] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.02),3px_3px_6px_#c8d0e7]">
             <BookOpen size={28} />
          </div>
          <h4 className="text-[#2D3748] font-black mb-2 text-xl mt-4">No tracks available yet</h4>
          <p className="text-[#718096] text-sm font-medium mb-6 max-w-sm mx-auto">
            We're working on new tracks. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}