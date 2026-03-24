import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-6 text-gray-400 text-sm">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>
        <p className="text-gray-600 text-sm">© 2026 HorizonX. All rights reserved.</p>
      </div>
    </footer>
  )
}