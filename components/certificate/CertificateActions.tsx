'use client'

import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import CertificateCard from './CertificateCard'
import { Download, Loader2 } from 'lucide-react'

interface CertificateActionsProps {
  userName: string
  trackName: string
  fieldName: string
  score: number
  issuedAt: string
  certificateId: string
}

export default function CertificateActions({
  userName,
  trackName,
  fieldName,
  score,
  issuedAt,
  certificateId,
}: CertificateActionsProps) {
  const certRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  async function handleDownloadPDF() {
    if (!certRef.current || downloading) return
    setDownloading(true)

    try {
      const imgData = await toPng(certRef.current, {
        cacheBust: true,
        backgroundColor: '#0A0A0F',
        pixelRatio: 2
      })

      const pdf = new jsPDF('landscape', 'px', [certRef.current.offsetWidth, certRef.current.offsetHeight])
      pdf.addImage(imgData, 'PNG', 0, 0, certRef.current.offsetWidth, certRef.current.offsetHeight)
      pdf.save(`HorizonX-Audit-Record-${fieldName.replace(/\s+/g, '-')}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setDownloading(false)
    }
  }



  return (
    <div className="w-full">
      {/* Certificate visual container */}
      <div className="flex justify-center mb-12 overflow-x-auto pb-8 pt-4">
        <CertificateCard
          ref={certRef}
          userName={userName}
          trackName={trackName}
          fieldName={fieldName}
          score={score}
          issuedAt={issuedAt}
        />
      </div>

      {/* Primary Action Suite */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="btn-secondary w-full sm:w-1/2 flex items-center justify-center gap-2 py-4 text-sm"
        >
          {downloading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Extracting Vector...
            </>
          ) : (
             <>
               <Download size={16} /> Download Verification (PDF)
             </>
          )}
        </button>


      </div>
    </div>
  )
}
