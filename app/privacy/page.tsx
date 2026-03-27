export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#6C63FF] font-mono text-xs uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-4xl font-black text-[#F0F0FF] tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-[#5A5A70] font-mono text-sm mb-12">Last updated: March 2026</p>

        <div className="space-y-10 text-[#9090A8] leading-relaxed">
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">1. Information We Collect</h2>
            <p>We collect your email address and name when you register. We also collect your track progress, task submissions, and quiz scores to power your skill profile.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">2. How We Use Your Information</h2>
            <p>Your information is used to operate your account, display your progress, generate your skill badges, and send important account emails. We do not sell your data.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">3. Data Storage</h2>
            <p>Your data is securely stored on Supabase infrastructure. We use industry-standard encryption and security practices.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">4. Public Profiles</h2>
            <p>Your skill badges and verification records may be publicly visible if you choose to share your profile link. You can control this from your profile settings.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">5. Third-Party Services</h2>
            <p>We use Google OAuth for sign-in and Supabase for data storage. Their respective privacy policies apply to your data as processed by them.</p>
          </section>
          <section>
            <h2 className="text-[#F0F0FF] font-bold text-xl mb-3">6. Contact</h2>
            <p>For privacy concerns, contact us at support@horizonx.dev</p>
          </section>
        </div>
      </div>
    </div>
  )
}
