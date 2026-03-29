import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CertificateActions from '@/components/certificate/CertificateActions'
import { FileCode, ArrowLeft } from 'lucide-react'

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: certificate } = await supabase
    .from('certificates')
    .select('*, profiles(*), tracks(*, fields(*))')
    .eq('id', id)
    .single()

  if (!certificate) redirect('/dashboard')

  const userName = certificate.profiles?.name || 'Student'
  const fieldName = certificate.tracks?.fields?.name || 'Unknown Field'
  const trackName = `${fieldName} — ${certificate.tracks?.level || ''}`

  return (
    <div className="min-h-[100dvh] bg-[#EAEFF5] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-[#EAEFF5] text-[#6C63FF] rounded-2xl flex items-center justify-center border-none shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7] mx-auto mb-8">
             <FileCode size={40} className="drop-shadow-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#2D3748] tracking-tight mb-4 drop-shadow-sm">Technical Audit Record</h1>
          <p className="text-[#718096] text-[15px] font-bold font-mono">Empirical proof of execution verified by HorizonX infrastructure layer.</p>
        </div>

        <CertificateActions
          userName={userName}
          trackName={trackName}
          fieldName={fieldName}
          score={certificate.score}
          issuedAt={certificate.issued_at}
          certificateId={id}
        />

        {/* Back link */}
        <div className="text-center mt-16 pt-10 border-t border-[#D1D9E6] max-w-lg mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-3 text-[#A0AEC0] hover:text-[#2D3748] text-[15px] font-black transition-colors bg-[#F5F8FA] px-6 py-3 rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.02),2px_2px_5px_#c8d0e7]"
          >
            <ArrowLeft size={18} /> Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
