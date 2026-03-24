import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
      <Logo />
      <div className="flex items-center gap-3">
        <Link href="/login" className="text-gray-400 hover:text-white transition text-sm font-medium">
          Login
        </Link>
        <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition">
          Get Started
        </Link>
      </div>
    </nav>
  )
}