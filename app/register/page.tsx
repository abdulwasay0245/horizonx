'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleGoogleLogin() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'consent',
        },
      }
    })
  }
    
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Send welcome email (fire-and-forget)
    fetch('/api/email/welcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    }).catch(() => {})

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-[100dvh] w-full flex bg-[#EAEFF5] items-center justify-center p-6 text-center">
        <div className="clay-card max-w-sm w-full">
           <div className="w-16 h-16 bg-[#F5F8FA] rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#00C896] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),inset_-2px_-2px_5px_rgba(0,0,0,0.05),3px_3px_6px_#c8d0e7]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
           </div>
           <h2 className="text-2xl font-black tracking-tight text-[#2D3748] mb-2">Check your email</h2>
           <p className="text-sm text-[#4A5568] leading-relaxed mb-8 font-medium">
             A secure authentication link was forwarded to <br/>
             <span className="font-mono text-[#6C63FF] font-bold py-1 inline-block">{email}</span>
           </p>
           <Link href="/login" className="clay-btn-secondary w-full block text-[15px]">
             Return to login
           </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] w-full flex bg-[#EAEFF5] items-center justify-center p-6 selection:bg-[#6C63FF]/30">
      <div className="w-full max-w-sm">
        
        <div className="flex justify-center mb-8">
           <Logo />
        </div>

        <div className="clay-card !p-8">
          <h2 className="text-xl font-black tracking-tight text-[#2D3748] mb-2 text-center">
            Initialize Account
          </h2>
          <p className="text-sm text-[#718096] text-center mb-8 font-medium">
            Create your technical portfolio
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#4A5568] mb-2 uppercase tracking-wide">
                Identity Profile
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="First Last"
                required
                className="clay-input w-full text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#4A5568] mb-2 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="developer@example.com"
                required
                className="clay-input w-full text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A5568] mb-2 uppercase tracking-wide">
                Security Key
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
                minLength={6}
                className="clay-input w-full text-sm"
              />
            </div>

            {error && (
              <div className="bg-[#FF4D6A]/10 text-[#FF4D6A] px-4 py-3 rounded-2xl text-sm transition-all animate-fade-in font-bold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="clay-btn-primary w-full py-3.5 mt-4 text-[15px]"
            >
              {loading ? 'Initializing...' : 'Deploy Account'}
            </button>
          </form>

          <div className="mt-8 mb-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#D1D9E6]" />
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-[#EAEFF5] px-4 text-[#A0AEC0]">
                OR
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="clay-btn-secondary w-full py-3.5 flex justify-center items-center gap-3 text-[15px]"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" className="drop-shadow-sm">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.4-4.6 5.8l6.2 5.2C40.8 35.4 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-[#718096] font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-[#6C63FF] hover:text-[#7D75FF] transition-colors font-bold">
            Log in
          </Link>
        </p>

      </div>
    </div>
  )
}