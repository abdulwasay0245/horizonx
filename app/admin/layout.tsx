import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_admin')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'admin' && !profile.is_admin)) redirect('/dashboard')

  return (
    <div className="flex bg-[#0A0A0F] min-h-[100dvh] text-[#F0F0FF]">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-auto h-[100dvh]">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
