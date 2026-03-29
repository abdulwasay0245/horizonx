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
    <aside className="w-64 bg-[#F5F8FA] border-r border-[#D1D9E6] min-h-[100dvh] flex flex-col relative z-40">
      <div className="p-6 border-b border-[#D1D9E6]">
        <Link href="/admin" className="flex items-center gap-3 mb-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#EAEFF5] flex items-center justify-center border-none shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7] text-[#6C63FF]">
            <TerminalSquare size={20} />
          </div>
          <span className="text-[#2D3748] font-black text-xl tracking-tight leading-none drop-shadow-sm">Horizon<span className="text-[#6C63FF]">X</span></span>
        </Link>
        <div className="inline-block px-2 py-1 rounded bg-[#FFF0F2] border border-[#FFCCD4] text-[#FF4D6A] text-[10px] font-black uppercase tracking-[0.2em] ml-13">
          Root Access
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        <p className="text-[#718096] text-[10px] font-bold uppercase tracking-widest pl-4 mb-4">Infrastructure</p>
        
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#EAEFF5] text-[#6C63FF] border-l-2 border-[#6C63FF] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05),inset_-1px_-1px_3px_rgba(255,255,255,1)] ml-2'
                  : 'text-[#4A5568] hover:text-[#6C63FF] hover:bg-[#EAEFF5] hover:ml-1 border-l-2 border-transparent'
              }`}
            >
              <div className={isActive ? 'text-[#6C63FF] drop-shadow-sm' : 'text-[#A0AEC0]'}>
                {link.icon}
              </div>
              <span className={isActive ? 'font-black drop-shadow-sm' : 'font-bold'}>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#D1D9E6] bg-[#EAEFF5]">
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-bold text-[#718096] hover:text-[#6C63FF] hover:bg-[#F5F8FA] transition-all shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05)]"
        >
          <LogOut size={16} /> Exit to Dashboard
        </Link>
      </div>
    </aside>
  )
}
