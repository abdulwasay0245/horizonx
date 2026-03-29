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
      <div className="mb-10 border-b border-[#D1D9E6] pb-6">
        <h2 className="text-3xl font-black text-[#2D3748] tracking-tight mb-2 drop-shadow-sm">Identity Directory</h2>
        <p className="text-[#718096] text-sm font-medium">Comprehensive index of platform candidates and root administrators.</p>
      </div>

      <div className="clay-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EAEFF5] border-b border-[#D1D9E6] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.02)]">
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Identity Profile</th>
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Access Tier</th>
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 text-center">Active Pipelines</th>
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 text-center">Verified Credentials</th>
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 text-right">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D1D9E6]">
              {profiles?.map((user) => (
                <tr key={user.id} className="hover:bg-[#EAEFF5] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F5F8FA] border-none shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7] flex items-center justify-center text-[#718096]">
                        <UserIcon size={20} className="drop-shadow-sm" />
                      </div>
                      <div>
                        <span className="text-[#2D3748] font-bold tracking-tight block mb-0.5">{user.name || 'Anonymous Entity'}</span>
                        <p className="text-[#718096] font-mono text-[10px] uppercase font-bold tracking-widest">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                      user.role === 'admin'
                        ? 'bg-[#FFF0F2] text-[#FF4D6A] shadow-[inset_1px_1px_3px_rgba(255,100,100,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]'
                        : 'bg-[#EAEFF5] text-[#A0AEC0] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)]'
                    }`}>
                      {user.role === 'admin' && <ShieldAlert size={14} className="drop-shadow-sm" />}
                      {user.role === 'admin' ? 'Root Access' : 'Candidate'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className="inline-block bg-[#EAF9FE] text-[#00D4FF] px-2.5 py-1 rounded-md shadow-[inset_1px_1px_3px_rgba(0,212,255,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] font-mono text-xs font-black">
                       {enrollmentCounts[user.id] || 0}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className="inline-block bg-[#EAFBF5] text-[#00C896] px-2.5 py-1 rounded-md shadow-[inset_1px_1px_3px_rgba(0,200,150,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] font-mono text-xs font-black">
                       {certCounts[user.id] || 0}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-[#A0AEC0] font-mono text-[11px] font-black uppercase tracking-widest text-right">
                    {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {(!profiles || profiles.length === 0) && (
            <div className="text-center py-16 text-[#A0AEC0] flex flex-col items-center bg-[#F5F8FA]">
              <div className="w-14 h-14 bg-[#EAEFF5] text-[#718096] rounded-2xl border-none flex items-center justify-center mb-4 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]">
                 <Users size={28} className="drop-shadow-sm" />
              </div>
              <p className="text-[15px] font-bold">No identity profiles found in the system registry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
