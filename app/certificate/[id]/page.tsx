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
    <div className="min-h-[100dvh] bg-[#0A0A0F] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#6C63FF]/10 text-[#6C63FF] rounded-xl flex items-center justify-center border border-[#6C63FF]/20 mx-auto mb-6">
             <FileCode size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#F0F0FF] tracking-tight mb-2">Technical Audit Record</h1>
          <p className="text-[#9090A8] text-sm font-medium font-mono">Empirical proof of execution verified by HorizonX infrastructure layer.</p>
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
        <div className="text-center mt-12 pt-8 border-t border-[#242430] max-w-lg mx-auto">
          <Link
            href="/dashboard"
            className="text-[#5A5A70] hover:text-[#F0F0FF] text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
