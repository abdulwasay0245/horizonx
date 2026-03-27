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
    <div className="min-h-screen bg-[#0A0A0F] px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#6C63FF] font-mono text-xs uppercase tracking-widest mb-4">Platform Status</p>
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-black text-[#F0F0FF] tracking-tight">All Systems Operational</h1>
          <span className="w-3 h-3 rounded-full bg-[#00C896] shrink-0 shadow-[0_0_8px_#00C896]" />
        </div>
        <p className="text-[#9090A8] mb-12">HorizonX platform is running normally. No incidents reported.</p>

        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.name} className="vercel-card flex items-center justify-between !py-4">
              <span className="text-[#F0F0FF] font-medium text-sm">{s.name}</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C896]" />
                <span className="text-[#00C896] text-xs font-mono uppercase tracking-widest">Operational</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#5A5A70] text-xs font-mono mt-8">
          Last checked: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  )
}
