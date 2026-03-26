import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Search, Library, ArrowRight } from 'lucide-react'

export default async function AdminTracksPage() {
  const supabase = await createClient()

  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, fields(*)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-[#242430] pb-6">
        <div>
          <h2 className="text-3xl font-black text-[#F0F0FF] tracking-tight mb-2">Track Configurations</h2>
          <p className="text-[#9090A8] text-sm">Curate and oversee active learning curriculums.</p>
        </div>
        <Link
          href="/admin/tracks/new"
          className="btn-primary !px-6 flex items-center gap-2"
        >
          <Plus size={16} /> Define New Track
        </Link>
      </div>

      <div className="vercel-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0A0A0F] border-b border-[#242430]">
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Field / Curriculum</th>
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Difficulty Vector</th>
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Status</th>
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Initialization Date</th>
                <th className="text-[#5A5A70] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242430]">
              {tracks?.map((track) => (
                <tr key={track.id} className="hover:bg-[#1A1A24] transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-[#F0F0FF] font-semibold tracking-tight">{track.fields?.name || 'Unknown Protocol'}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`badge-${track.level?.toLowerCase() || 'beginner'}`}>
                      {track.level} Spec
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border ${
                      track.is_active
                        ? 'bg-[#00C896]/10 text-[#00C896] border-[#00C896]/20'
                        : 'bg-[#FF4D6A]/10 text-[#FF4D6A] border-[#FF4D6A]/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${track.is_active ? 'bg-[#00C896]' : 'bg-[#FF4D6A]'}`} />
                      {track.is_active ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[#5A5A70] font-mono text-xs font-bold uppercase tracking-widest">
                    {new Date(track.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link
                      href={`/tracks/${track.id}`}
                      className="btn-secondary !px-4 !py-1.5 text-[10px] font-mono tracking-widest uppercase inline-flex items-center gap-2 group-hover:border-[#6C63FF]/30 group-hover:text-[#F0F0FF]"
                    >
                      Inspect <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {(!tracks || tracks.length === 0) && (
            <div className="text-center py-16 text-[#5A5A70] flex flex-col items-center">
              <div className="w-12 h-12 bg-[#1A1A24] text-[#5A5A70] border border-[#242430] rounded-xl flex items-center justify-center mb-4">
                 <Library size={24} />
              </div>
              <p className="text-sm">No track schemas identified in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
