import EmailForm from "./EmailForm";

const ringColors = ['#F0C8D8', '#DDD0FF', '#C0E8D0', '#FAD8B0', '#E8D0FF'];

const covers = [
  { label: 'Medical treatment preferences', icon: '◇' },
  { label: 'Healthcare proxy designation', icon: '◇' },
  { label: 'Personal values & care goals', icon: '◇' },
  { label: 'Mental health care preferences', icon: '◇' },
  { label: 'Artificial nutrition & hydration', icon: '◇' },
  { label: 'Organ & tissue donation', icon: '◇' },
  { label: 'Funeral & memorial wishes', icon: '◇' },
  { label: 'Guardian preference', icon: '◇' },
  { label: 'Letters to loved ones', icon: '◇' },
  { label: 'Where documents are kept', icon: '◇' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8FF]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8FF]/80 backdrop-blur-md border-b border-[#E0D8F5]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-[0.25em] text-[#4A3870]">
            stillwater
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors tracking-wide">Features</a>
            <a href="#how" className="text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors tracking-wide">How it works</a>
            <a href="/plan" className="bg-[#7C5CAF] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#5A3E8A] transition-colors tracking-wide">
              Begin your plan
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #F0E8FF 0%, #FAF5FF 35%, #FFE8F4 65%, #EAF5EE 100%)' }} />

        {/* Animated orbs */}
        <div className="absolute top-12 right-[-60px] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-70"
          style={{ background: '#DDD0FF', animation: 'drift-1 20s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-[-80px] w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none opacity-60"
          style={{ background: '#F5C8D8', animation: 'drift-2 25s ease-in-out infinite' }} />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ background: '#C0E8D0', animation: 'drift-3 18s ease-in-out infinite' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.35em] text-[#7C5CAF] uppercase mb-8 font-medium">End of life planning</p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-7xl font-light leading-[1.1] mb-8 bg-gradient-to-br from-[#6B4FA0] via-[#9B5090] to-[#C4607A] bg-clip-text text-transparent">
              Plan with peace.<br />
              <em className="font-light">Leave with love.</em>
            </h1>
            <p className="text-[#4A3870] text-lg leading-relaxed mb-12 max-w-md opacity-80">
              Stillwater helps you document your wishes, guide your loved ones,
              and leave a legacy of clarity — so those you love are never left wondering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/plan" className="inline-flex items-center justify-center bg-[#7C5CAF] text-white px-8 py-4 rounded-full text-sm hover:bg-[#5A3E8A] transition-colors tracking-wide shadow-sm">
                Begin your plan
              </a>
              <a href="#how" className="inline-flex items-center justify-center border border-[#C4B0E8] text-[#7C5CAF] px-8 py-4 rounded-full text-sm hover:border-[#9B80D0] hover:bg-[#F5F0FF] transition-colors tracking-wide">
                See how it works
              </a>
            </div>
            <p className="text-xs text-[#8070A8] mt-6 tracking-wide">Free to begin. Private by design.</p>
          </div>

          {/* Rainbow concentric rings */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80" style={{ animation: 'rings-breathe 8s ease-in-out infinite' }}>
              {ringColors.map((color, i) => (
                <div key={i} className="absolute inset-0 rounded-full"
                  style={{
                    border: `1.5px solid ${color}`,
                    transform: `scale(${0.2 + i * 0.2})`,
                    opacity: 0.9 - i * 0.08,
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #EDE8FF, #FDE8EF)', border: '1.5px solid #DDD0FF' }}>
                  <svg className="w-8 h-8" fill="none" stroke="url(#heart-grad)" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7C5CAF" />
                        <stop offset="100%" stopColor="#C47090" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8070A8]">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#C4B0E8] to-transparent" />
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.35em] text-[#7C5CAF] uppercase mb-5 font-medium">What Stillwater offers</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#1A1030]">
              A complete plan for those you love
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Your Wishes',
                desc: 'Document your medical preferences, end-of-life care decisions, and final arrangements — all in one secure, private place.',
                bg: 'bg-[#EDE8FF] group-hover:bg-[#DDD0FF]',
                icon: <svg className="w-6 h-6 text-[#7C5CAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
              },
              {
                title: 'For Your People',
                desc: 'Leave personal messages, practical guidance, and heartfelt letters for those who matter most — to be read when they need you.',
                bg: 'bg-[#FDE8EF] group-hover:bg-[#F5C8D8]',
                icon: <svg className="w-6 h-6 text-[#C47090]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
              },
              {
                title: 'Your Story',
                desc: 'Capture your memories, values, and the moments that define you. Leave a living legacy that tells the world who you truly were.',
                bg: 'bg-[#E8F5EE] group-hover:bg-[#C0E8D0]',
                icon: <svg className="w-6 h-6 text-[#5E9E7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
              },
            ].map(f => (
              <div key={f.title} className="group p-8 rounded-3xl border border-[#E0D8F5] hover:border-[#C4B0E8] hover:shadow-sm transition-all" style={{ boxShadow: 'none' }}>
                <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-6 transition-colors`}>{f.icon}</div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-3">{f.title}</h3>
                <p className="text-[#4A3870] leading-relaxed text-sm opacity-80">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What your plan covers ─── */}
      <section className="py-24 bg-[#FAF8FF]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.35em] text-[#7C5CAF] uppercase mb-5 font-medium">Guided by Minnesota law</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
            Everything your plan can include
          </h2>
          <p className="text-[#4A3870] text-sm leading-relaxed mb-12 max-w-md mx-auto opacity-80">
            A Minnesota Health Care Directive can legally document all of these — Stillwater guides you through each one.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {covers.map(c => (
              <div key={c.label} className="bg-white border border-[#E0D8F5] rounded-2xl p-4 text-center hover:border-[#C4B0E8] hover:bg-[#F7F4FF] transition-all">
                <p className="text-xs text-[#4A3870] leading-relaxed">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Philosophy ─── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #F5F0FF 0%, #FFF5FA 50%, #F0FFF8 100%)' }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-8xl font-light text-[#DDD0FF] leading-none mb-6 select-none">"</div>
          <p className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light italic text-[#4A3870] leading-relaxed mb-10">
            Planning for the end of life is not about dwelling in death — it is one of the deepest acts of love we can offer those we leave behind.
          </p>
          <div className="w-12 h-px mx-auto mb-6" style={{ background: 'linear-gradient(to right, #C4B0E8, #F5C8D8)' }} />
          <p className="text-[#8070A8] text-xs tracking-[0.3em] uppercase">The Stillwater philosophy</p>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.35em] text-[#7C5CAF] uppercase mb-5 font-medium">Simple by design</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#1A1030]">How Stillwater works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { num: '01', title: 'Answer gently', desc: 'We guide you through thoughtful questions at your own pace — no pressure, no jargon. Just space to reflect on what matters most.' },
              { num: '02', title: 'Share securely', desc: 'Invite family members or trusted people to access your plan on your terms, with full control over what they can see and when.' },
              { num: '03', title: 'Update anytime', desc: 'Life changes. Your plan can too. Return whenever you\'re ready to add, revise, or simply sit with what you\'ve already said.' },
            ].map(step => (
              <div key={step.num} className="flex flex-col gap-5">
                <span className="font-[family-name:var(--font-cormorant)] text-7xl font-light leading-none" style={{ color: '#DDD0FF' }}>{step.num}</span>
                <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, #C4B0E8, #F5C8D8)' }} />
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030]">{step.title}</h3>
                <p className="text-[#4A3870] leading-relaxed text-sm opacity-80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reassurance strip ─── */}
      <section className="py-14 border-y border-[#E0D8F5] bg-[#FAF8FF]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {[
              { label: 'Private & on-device', color: '#7C5CAF' },
              { label: 'Free to start', color: '#C47090' },
              { label: 'Guided at your pace', color: '#5E9E7E' },
              { label: 'Legally informed', color: '#C08858' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm tracking-wide text-[#4A3870]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="cta" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #EDE8FF 0%, #F8F0FF 40%, #FFE8F5 100%)' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: '#DDD0FF' }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: '#F5C8D8' }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.35em] text-[#7C5CAF] uppercase mb-6 font-medium">Begin today</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light leading-tight mb-6 bg-gradient-to-br from-[#4A3870] to-[#8B4070] bg-clip-text text-transparent">
            For those you love.<br />
            <em>For your own peace of mind.</em>
          </h2>
          <p className="text-[#4A3870] text-lg leading-relaxed mb-12 opacity-80">
            Your plan takes less than an hour to start — and gives a lifetime of peace to carry.
          </p>
          <EmailForm />
          <p className="text-[#8070A8] text-xs mt-5 tracking-wider">Free to start. Private by design. No spam, ever.</p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-14 bg-[#F5F0FF]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-[0.25em] text-[#7C5CAF]">stillwater</span>
          <p className="text-[#8070A8] text-xs tracking-wider">End of life planning, with grace and clarity.</p>
          <div className="flex gap-6 text-xs text-[#8070A8] tracking-wide">
            <a href="#" className="hover:text-[#4A3870] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#4A3870] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#4A3870] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
