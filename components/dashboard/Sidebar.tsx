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
  { href: '/dashboard/certificates', label: 'My Badges', icon: <ShieldCheck size={18} /> },
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
    <aside className="w-64 bg-[#F5F8FA] border-r border-[#D1D9E6] min-h-[100dvh] flex flex-col relative z-40">
      <div className="p-6 border-b border-[#D1D9E6]">
        <Logo />
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#EAEFF5] text-[#6C63FF] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.02),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]'
                  : 'text-[#4A5568] hover:text-[#2D3748] hover:bg-[#EAEFF5] border-transparent'
              }`}
            >
              <div className={isActive ? 'text-[#6C63FF]' : 'text-[#718096]'}>
                 {link.icon}
              </div>
              <span className={isActive ? 'font-bold' : 'font-medium'}>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#D1D9E6]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-[#FF4D6A] hover:bg-[#FF4D6A]/10 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  )
}