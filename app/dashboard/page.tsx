import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import StatsCard from '@/components/dashboard/StatsCard'
import TrackCard from '@/components/dashboard/TrackCard'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get logged in user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get enrollments with track + field info
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, tracks(*, fields(*))')
    .eq('user_id', user.id)

  // Get total submissions
  const { count: submissionCount } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // Get certificates
  const { data: certificates, count: certCount } = await supabase
    .from('certificates')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)

  // Calculate average score
  const avgScore = certificates && certificates.length > 0
    ? Math.round(certificates.reduce((sum, c) => sum + c.score, 0) / certificates.length)
    : 0

  // Calculate progress per enrollment
  const enrollmentsWithProgress = await Promise.all(
    (enrollments || []).map(async (enrollment) => {
      const { count: totalTasks } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('track_id', enrollment.track_id)

      const { count: completedTasks } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .in('task_id', await supabase
          .from('tasks')
          .select('id')
          .eq('track_id', enrollment.track_id)
          .then(r => r.data?.map(t => t.id) || [])
        )

      const progress = totalTasks
        ? Math.round(((completedTasks || 0) / totalTasks) * 100)
        : 0

      return { ...enrollment, progress, totalTasks: totalTasks || 0, completedTasks: completedTasks || 0 }
    })
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white">
          Welcome back, {profile?.name?.split(' ')[0]} 👋
        </h2>
        <p className="text-gray-400 mt-1">Here's your progress so far</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard label="Tracks Enrolled" value={enrollments?.length || 0} icon="📚" color="blue" />
        <StatsCard label="Tasks Submitted" value={submissionCount || 0} icon="📤" color="purple" />
        <StatsCard label="Certificates Earned" value={certCount || 0} icon="🏆" color="yellow" />
        <StatsCard label="Average Score" value={avgScore ? `${avgScore}%` : 'N/A'} icon="📈" color="green" />
      </div>

      {/* Active Tracks */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4">My Active Tracks</h3>
        {enrollmentsWithProgress.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="text-white font-bold mb-2">No tracks yet</h4>
            <p className="text-gray-400 text-sm mb-4">Start your first track to begin building your skills</p>
            <Link
              href="/tracks"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition inline-block"
            >
              Browse Tracks →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollmentsWithProgress.map((e) => (
              <TrackCard
                key={e.id}
                id={e.track_id}
                field={e.tracks?.fields?.name || ''}
                level={e.tracks?.level || ''}
                progress={e.progress}
                totalTasks={e.totalTasks}
                completedTasks={e.completedTasks}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Certificates */}
      {certificates && certificates.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Recent Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.slice(0, 3).map((cert) => (
              <div key={cert.id} className="bg-gray-900 border border-yellow-500/20 rounded-2xl p-6">
                <div className="text-3xl mb-3">🏆</div>
                <div className="text-yellow-400 font-black text-2xl mb-1">{cert.score}%</div>
                <p className="text-gray-400 text-sm">
                  {new Date(cert.issued_at).toLocaleDateString()}
                </p>
                <Link
                  href={`/certificate/${cert.id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-3 inline-block transition"
                >
                  View Certificate →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}