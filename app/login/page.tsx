'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-[100dvh] w-full flex bg-[#0A0A0F] items-center justify-center p-6 selection:bg-[#6C63FF]/30">
      <div className="w-full max-w-sm">
        
        <div className="flex justify-center mb-8">
           <Logo />
        </div>

        <div className="vercel-card !p-8">
          <h2 className="text-xl font-bold tracking-tight text-[#F0F0FF] mb-2 text-center">
            Log in to HorizonX
          </h2>
          <p className="text-sm text-[#9090A8] text-center mb-8">
            Access your technical dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#F0F0FF] mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="developer@example.com"
                required
                className="vercel-input w-full text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F0F0FF] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="vercel-input w-full text-sm"
              />
            </div>

            {error && (
              <div className="bg-[#FF4D6A]/10 border border-[#FF4D6A]/20 text-[#FF4D6A] px-4 py-3 rounded-xl text-sm transition-all animate-fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 mt-2"
            >
              {loading ? 'Authenticating...' : 'Continue'}
            </button>
          </form>

          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-[#242430]" />
              </div>
              <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider">
                <span className="bg-[#111118] px-4 text-[#5A5A70]">
                  OR
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="btn-secondary w-full py-2.5 flex justify-center items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.4-4.6 5.8l6.2 5.2C40.8 35.4 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            <span className="text-sm font-semibold">Continue with Google</span>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-[#9090A8]">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#F0F0FF] hover:text-[#6C63FF] transition-colors font-medium">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}