import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-[#D1D9E6] bg-[#EAEFF5] px-6 py-12 relative z-10 w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col items-start gap-3">
          <Logo />
          <p className="text-[#4A5568] text-sm max-w-xs font-medium">
            A beautiful, skill verification platform that helps you prove what you know.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-start items-center gap-6 md:gap-8 text-[#4A5568] text-sm font-bold">
          <Link href="/terms" className="hover:text-[#6C63FF] transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-[#6C63FF] transition-colors">Privacy Policy</Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#F5F8FA] rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]">
            Status <span className="w-2 h-2 rounded-full bg-[#00C896] shadow-[0_0_6px_#00C896]" />
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#D1D9E6] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#718096] font-mono text-[11px] uppercase tracking-widest font-bold text-center md:text-left">
          © {new Date().getFullYear()} HorizonX. All rights reserved.
        </p>
        <p className="text-[#718096] font-mono text-[11px] uppercase tracking-widest font-bold flex items-center gap-1">
          Crafted with ☁️ by HorizonX
        </p>
      </div>
    </footer>
  )
}