'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Library, Users, HelpCircle, LogOut, TerminalSquare } from 'lucide-react'

const links = [
  { href: '/admin', label: 'Telemetry', icon: <BarChart2 size={18} /> },
  { href: '/admin/tracks', label: 'Configurations', icon: <Library size={18} /> },
  { href: '/admin/users', label: 'Identity Profiles', icon: <Users size={18} /> },
  { href: '/admin/questions', label: 'Question Bank', icon: <HelpCircle size={18} /> },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0D0D14] border-r border-[#242430] min-h-[100dvh] flex flex-col relative z-40">
      <div className="p-6 border-b border-[#242430]">
        <Link href="/admin" className="flex items-center gap-3 mb-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center border border-[#6C63FF]/20 text-[#6C63FF]">
            <TerminalSquare size={18} />
          </div>
          <span className="text-[#F0F0FF] font-black text-xl tracking-tight">HorizonX</span>
        </Link>
        <div className="inline-block px-2 py-1 rounded bg-[#FF4D6A]/5 border border-[#FF4D6A]/20 text-[#FF4D6A] text-[10px] font-bold uppercase tracking-[0.2em] ml-11">
          Root Access
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        <p className="text-[#5A5A70] text-[10px] font-bold uppercase tracking-widest pl-4 mb-4">Infrastructure</p>
        
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

      <div className="p-4 border-t border-[#242430] bg-[#0A0A0F]">
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#5A5A70] hover:text-[#F0F0FF] hover:bg-[#1A1A24] transition-colors"
        >
          <LogOut size={16} /> Exit to Dashboard
        </Link>
      </div>
    </aside>
  )
}
