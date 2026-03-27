export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#6C63FF] font-mono text-xs uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-4xl font-black text-[#F0F0FF] tracking-tight mb-4">Terms of Service</h1>
        <p className="text-[#5A5A70] font-mono text-sm mb-12">Last updated: March 2026</p>

        <div className="space-y-10 text-[#9090A8] leading-relaxed">
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using HorizonX, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">2. Use of the Platform</h2>
            <p>HorizonX is a free skill verification platform. You may use it to complete learning tracks, submit tasks, take quizzes, and earn skill badges. You agree not to misuse the platform, share answers, or attempt to game verification results.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">3. Account Responsibility</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">4. Intellectual Property</h2>
            <p>All content, tracks, tasks, and designs on HorizonX are the property of HorizonX. You may not reproduce or redistribute them without permission.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">5. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms at any time without notice.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">6. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the platform after changes means you accept the updated terms.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
