import { createClient } from '@/lib/supabase/server'
import AdminStatsCard from '@/components/admin/AdminStatsCard'
import { Users, Library, CheckSquare, Settings2, Target, Hash } from 'lucide-react'

export default async function AdminPage() {
  const supabase = await createClient()

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: totalTracks } = await supabase
    .from('tracks')
    .select('*', { count: 'exact', head: true })

  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })

  const { count: totalSubmissions } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true })

  const { count: totalCertificates } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true })

  const { count: totalAttempts } = await supabase
    .from('test_attempts')
    .select('*', { count: 'exact', head: true })

  const { count: passedAttempts } = await supabase
    .from('test_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('passed', true)

  const passRate = totalAttempts
    ? Math.round(((passedAttempts || 0) / totalAttempts) * 100)
    : 0

  return (
    <div>
      <div className="mb-10 border-b border-[#D1D9E6] pb-6">
        <h2 className="text-3xl font-black text-[#2D3748] tracking-tight mb-2 drop-shadow-sm">Platform Telemetry</h2>
        <p className="text-[#718096] text-sm font-medium">Real-time engagement metrics and infrastructure health.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AdminStatsCard label="Identity Profiles" value={totalUsers || 0} icon={<Users size={20} />} color="blue" />
        <AdminStatsCard label="Active Configurations" value={totalTracks || 0} icon={<Library size={20} />} color="green" />
        <AdminStatsCard label="Pipeline Enrollments" value={totalEnrollments || 0} icon={<Target size={20} />} color="purple" />
        <AdminStatsCard label="Verified Payloads" value={totalSubmissions || 0} icon={<CheckSquare size={20} />} color="yellow" />
        <AdminStatsCard label="Issued Signatures" value={totalCertificates || 0} icon={<Hash size={20} />} color="yellow" />
        <AdminStatsCard label="Execution Attempts" value={totalAttempts || 0} icon={<Settings2 size={20} />} color="blue" />
        <AdminStatsCard label="Validation Metric" value={`${passRate}%`} icon={<Target size={20} />} color="green" />
      </div>
    </div>
  )
}
