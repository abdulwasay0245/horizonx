import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const levelColor: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-yellow-500/20 text-yellow-400',
  advanced: 'bg-red-500/20 text-red-400',
}

const fieldIcons: Record<string, string> = {
  'Frontend Development': '🖥️',
  'Backend Development': '⚙️',
  'UI/UX Design': '🎨',
  'Data Analysis': '📊',
  'Content Writing': '✍️',
  'Digital Marketing': '📣',
}

export default async function TracksPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get all active tracks with field info
  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, fields(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  // Get user's enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('track_id')
    .eq('user_id', user.id)

  const enrolledTrackIds = enrollments?.map(e => e.track_id) || []

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white">Browse Tracks</h2>
        <p className="text-gray-400 mt-1">Choose a field and level to get started</p>
      </div>

      {/* Tracks Grid */}
      {tracks && tracks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            const isEnrolled = enrolledTrackIds.includes(track.id)
            return (
              <div key={track.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/40 transition">
                <div className="text-3xl mb-3">
                  {fieldIcons[track.fields?.name] || '📚'}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-white font-bold">{track.fields?.name}</h4>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${levelColor[track.level]}`}>
                  {track.level}
                </span>
                <p className="text-gray-400 text-sm mt-3 mb-6">{track.description}</p>

                {isEnrolled ? (
                  <Link
                    href={`/tracks/${track.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-center block"
                  >
                    Continue →
                  </Link>
                ) : (
                  <Link
                    href={`/tracks/${track.id}`}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition text-center block"
                  >
                    View Track
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">📚</div>
          <h4 className="text-white font-bold mb-2">No tracks available yet</h4>
          <p className="text-gray-400 text-sm">Check back soon — we're adding more tracks!</p>
        </div>
      )}
    </div>
  )
}