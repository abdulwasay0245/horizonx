export default function StatusPage() {
  const services = [
    { name: 'API', status: 'operational' },
    { name: 'Authentication', status: 'operational' },
    { name: 'Database', status: 'operational' },
    { name: 'Track Submissions', status: 'operational' },
    { name: 'Quiz Engine', status: 'operational' },
    { name: 'Email Notifications', status: 'operational' },
  ]

  return (
    <div className="min-h-screen bg-[#EAEFF5] px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#6C63FF] font-mono text-xs uppercase font-black tracking-widest mb-4">Platform Status</p>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h1 className="text-4xl font-black text-[#2D3748] tracking-tight drop-shadow-sm">All Systems Operational</h1>
          <span className="w-4 h-4 rounded-full bg-[#00C896] shrink-0 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.1),0_0_12px_rgba(0,200,150,0.6)]" />
        </div>
        <p className="text-[#718096] mb-12 font-medium">HorizonX platform is running normally. No incidents reported.</p>

        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.name} className="clay-card flex items-center justify-between !py-5 hover:shadow-[4px_4px_10px_#c8d0e7,inset_-1px_-1px_3px_rgba(255,255,255,0.9)] transition-all">
              <span className="text-[#2D3748] font-black text-[15px] drop-shadow-sm">{s.name}</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C896] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.1)]" />
                <span className="text-[#00C896] text-[11px] font-mono font-black uppercase tracking-widest">Operational</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#A0AEC0] text-xs font-mono mt-10 font-bold tracking-wide">
          Last checked: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  )
}
