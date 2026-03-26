'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from '@/components/shared/Logo'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled 
          ? 'bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[#242430]' 
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href= "/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-[#9090A8] hover:text-[#6C63FF] text-sm font-medium transition-colors">
            Platform
          </Link>
          <Link href="#tracks" className="text-[#9090A8] hover:text-[#6C63FF] text-sm font-medium transition-colors">
            Curriculum
          </Link>
          <Link href="/login" className="text-[#9090A8] hover:text-[#F0F0FF] text-sm font-medium transition-colors ml-4">
            Sign In
          </Link>
          <Link href="/register" className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white rounded-xl px-5 py-2 text-sm font-semibold transition-colors">
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-[#F0F0FF]">
           <Menu size={24} />
        </button>
      </div>
    </nav>
  )
}