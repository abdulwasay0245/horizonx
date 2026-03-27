import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-[#242430] bg-[#0A0A0F] px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col items-start gap-3">
          <Logo />
          <p className="text-[#5A5A70] text-sm max-w-xs">
            A skill verification platform that helps you prove what you know.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-start items-center gap-6 md:gap-8 text-[#9090A8] text-sm">
          <Link href="/protocol" className="hover:text-[#F0F0FF] transition-colors">Protocol</Link>
          <Link href="/terms" className="hover:text-[#F0F0FF] transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-[#F0F0FF] transition-colors">Privacy Policy</Link>
          <Link href="/status" className="hover:text-[#F0F0FF] transition-colors flex items-center gap-2">
            Status <span className="w-2 h-2 rounded-full bg-[#00C896]" />
          </Link>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#242430] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#5A5A70] font-mono text-[11px] uppercase tracking-widest text-center md:text-left">
          © {new Date().getFullYear()} HorizonX. All rights reserved.
        </p>
        <p className="text-[#5A5A70] font-mono text-[11px] uppercase tracking-widest flex items-center gap-1">
          Made with ❤️ by HorizonX
        </p>
      </div>
    </footer>
  )
}