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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-[#D1D9E6] pb-6">
        <div>
          <h2 className="text-3xl font-black text-[#2D3748] tracking-tight mb-2 drop-shadow-sm">Track Configurations</h2>
          <p className="text-[#718096] text-sm font-medium">Curate and oversee active learning curriculums.</p>
        </div>
        <Link
          href="/admin/tracks/new"
          className="clay-btn-primary py-3 px-6 flex items-center gap-2 text-[13px] font-black"
        >
          <Plus size={18} /> Define New Track
        </Link>
      </div>

      <div className="clay-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EAEFF5] border-b border-[#D1D9E6] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.02)]">
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Field / Curriculum</th>
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Difficulty Vector</th>
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Status</th>
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4">Initialization Date</th>
                <th className="text-[#718096] font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D1D9E6]">
              {tracks?.map((track) => (
                <tr key={track.id} className="hover:bg-[#EAEFF5] transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-[#2D3748] font-bold tracking-tight">{track.fields?.name || 'Unknown Protocol'}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`badge-${track.level?.toLowerCase() || 'beginner'} shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)] px-3 py-1 font-bold`}>
                      {track.level} Spec
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-black px-2.5 py-1.5 rounded-lg uppercase tracking-wider ${
                      track.is_active
                        ? 'bg-[#EAFBF5] text-[#00C896] shadow-[inset_1px_1px_3px_rgba(0,200,150,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]'
                        : 'bg-[#FFF0F2] text-[#FF4D6A] shadow-[inset_1px_1px_3px_rgba(255,100,100,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]'
                    }`}>
                      <div className={`w-2 h-2 rounded-full shadow-inner ${track.is_active ? 'bg-[#00C896]' : 'bg-[#FF4D6A]'}`} />
                      {track.is_active ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[#A0AEC0] font-mono text-[11px] font-black uppercase tracking-widest">
                    {new Date(track.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link
                      href={`/tracks/${track.id}`}
                      className="clay-btn-secondary py-2 px-4 text-[10px] font-mono tracking-widest uppercase inline-flex items-center gap-2 font-black"
                    >
                      Inspect <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {(!tracks || tracks.length === 0) && (
            <div className="text-center py-16 text-[#A0AEC0] flex flex-col items-center bg-[#F5F8FA]">
              <div className="w-14 h-14 bg-[#EAEFF5] text-[#718096] rounded-2xl flex items-center justify-center mb-4 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.05),2px_2px_4px_#c8d0e7]">
                 <Library size={28} className="drop-shadow-sm" />
              </div>
              <p className="text-[15px] font-bold">No track schemas identified in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
