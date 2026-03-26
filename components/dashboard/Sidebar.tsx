'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/shared/Logo'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Home, Compass, Inbox, ShieldCheck, User, LogOut } from 'lucide-react'

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
  { href: '/tracks', label: 'Browse Tracks', icon: <Compass size={18} /> },
  { href: '/dashboard/submissions', label: 'My Submissions', icon: <Inbox size={18} /> },
  { href: '/dashboard/certificates', label: 'Verification Matrix', icon: <ShieldCheck size={18} /> },
  { href: '/dashboard/profile', label: 'My Profile', icon: <User size={18} /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-[#0D0D14] border-r border-[#242430] min-h-[100dvh] flex flex-col relative z-40">
      <div className="p-6 border-b border-[#242430]">
        <Logo />
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] border-l-2 border-[#6C63FF]'
                  : 'text-[#9090A8] hover:text-[#F0F0FF] hover:bg-[#1A1A24] border-l-2 border-transparent'
              }`}
            >
              <div className={isActive ? 'text-[#6C63FF]' : 'text-[#5A5A70]'}>
                 {link.icon}
              </div>
              <span className={isActive ? 'font-semibold' : 'font-medium'}>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#242430]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#FF4D6A] hover:bg-[#FF4D6A]/10 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  )
}