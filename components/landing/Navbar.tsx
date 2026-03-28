'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from '@/components/shared/Logo'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#EAEFF5]/80 backdrop-blur-md border-b border-[#D1D9E6] shadow-sm py-2' 
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-[#4A5568] hover:text-[#6C63FF] text-sm font-bold transition-colors">
              Platform
            </Link>
            <Link href="#tracks" className="text-[#4A5568] hover:text-[#6C63FF] text-sm font-bold transition-colors">
              Curriculum
            </Link>
            <Link href="/login" className="text-[#4A5568] hover:text-[#2D3748] text-sm font-bold transition-colors ml-4">
              Sign In
            </Link>
            <Link href="/register" className="clay-btn-primary !px-5 !py-2 !rounded-xl text-sm">
              Get Started
            </Link>
          </div>

          <button 
            className="md:hidden text-[#2D3748] p-2 bg-[#EAEFF5] rounded-xl shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.05),3px_3px_6px_#c8d0e7] hover:shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7] transition-all"
            onClick={() => setIsMobileMenuOpen(true)}
          >
             <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#EAEFF5] flex flex-col p-6 animate-in slide-in-from-right-full duration-300">
          <div className="flex justify-between items-center mb-12">
            <Logo />
            <button 
              className="text-[#2D3748] p-2 bg-[#EAEFF5] rounded-xl shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.05),3px_3px_6px_#c8d0e7]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[#2D3748] clay-card !p-4">
              Platform
            </Link>
            <Link href="#tracks" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[#2D3748] clay-card !p-4">
              Curriculum
            </Link>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[#2D3748] clay-card !p-4">
              Sign In
            </Link>
            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="clay-btn-primary text-center mt-4">
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </>
  )
}