import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative min-h-[100dvh] bg-slate-50 dark:bg-slate-950 overflow-hidden text-foreground selection:bg-indigo-500/30">
      <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 xl:p-16 overflow-y-auto overflow-x-hidden relative scroll-smooth">
        <div className="max-w-6xl mx-auto h-full">
           {children}
        </div>
      </main>
    </div>
  )
}