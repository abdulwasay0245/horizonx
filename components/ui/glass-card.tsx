import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'glowing' | 'interactive'
}

export function GlassCard({ children, className, variant = 'default', ...props }: GlassCardProps) {
  const baseClasses = "bg-card backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-3xl p-8"
  
  const variants = {
    default: "shadow-glass dark:shadow-glass-dark",
    glowing: "shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)] border-indigo-500/30",
    interactive: "shadow-glass dark:shadow-glass-dark hover:shadow-glass-hover hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-indigo-400/50"
  }

  return (
    <div 
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {/* Optional inner subtle glow strictly for visual premium feel */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-inset ring-white/20 dark:ring-white/5" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
