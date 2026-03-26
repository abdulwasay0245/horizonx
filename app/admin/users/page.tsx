import { createClient } from '@/lib/supabase/server'
import { Users, ShieldAlert, User as UserIcon } from 'lucide-react'

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, email, role, created_at')
    .order('created_at', { ascending: false })

  // Get enrollment counts per user
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('user_id')

  const { data: certificates } = await supabase
    .from('certificates')
    .select('user_id')

  const enrollmentCounts: Record<string, number> = {}
  enrollments?.forEach((e) => {
    enrollmentCounts[e.user_id] = (enrollmentCounts[e.user_id] || 0) + 1
  })

  const certCounts: Record<string, number> = {}
  certificates?.forEach((c) => {
    certCounts[c.user_id] = (certCounts[c.user_id] || 0) + 1
  })

  return (
    <div>
      <div className="mb-10 border-b border-[#242430] pb-6">
        <h2 className="text-3xl font-black text-[#F0F0FF] tracking-tight mb-2">Identity Directory</h2>
        <p className="text-[#9090A8] text-sm">Comprehensive index of platform candidates and root administrators.</p>
      </div>

      <div className="vercel-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0A0A0F] border-b border-[#242430]">
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Identity Profile</th>
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Access Tier</th>
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 text-center">Active Pipelines</th>
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 text-center">Verified Credentials</th>
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 text-right">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242430]">
              {profiles?.map((user) => (
                <tr key={user.id} className="hover:bg-[#1A1A24] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A24] border border-[#242430] flex items-center justify-center text-[#9090A8]">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <span className="text-[#F0F0FF] font-semibold tracking-tight block mb-0.5">{user.name || 'Anonymous Entity'}</span>
                        <p className="text-[#5A5A70] font-mono text-[10px] uppercase font-bold tracking-widest">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-widest border ${
                      user.role === 'admin'
                        ? 'bg-[#FF4D6A]/10 text-[#FF4D6A] border-[#FF4D6A]/20'
                        : 'bg-[#1A1A24] text-[#9090A8] border-[#242430]'
                    }`}>
                      {user.role === 'admin' && <ShieldAlert size={12} />}
                      {user.role === 'admin' ? 'Root Access' : 'Candidate'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className="inline-block bg-[#00D4FF]/5 text-[#00D4FF] px-2 py-1 rounded border border-[#00D4FF]/20 font-mono text-xs font-bold">
                       {enrollmentCounts[user.id] || 0}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className="inline-block bg-[#00C896]/5 text-[#00C896] px-2 py-1 rounded border border-[#00C896]/20 font-mono text-xs font-bold">
                       {certCounts[user.id] || 0}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-[#5A5A70] font-mono text-xs font-bold uppercase tracking-widest text-right">
                    {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {(!profiles || profiles.length === 0) && (
            <div className="text-center py-16 text-[#5A5A70] flex flex-col items-center">
              <div className="w-12 h-12 bg-[#1A1A24] text-[#5A5A70] border border-[#242430] rounded-xl flex items-center justify-center mb-4">
                 <Users size={24} />
              </div>
              <p className="text-sm">No identity profiles found in the system registry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
