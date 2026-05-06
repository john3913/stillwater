import Link from 'next/link';
import EmailForm from './EmailForm';

// Blue → Lavender → Rose gradient system
const ringColors = ['#B8CAFF', '#C8B4F2', '#DDD0FF', '#F0B8D8', '#FFD0EA'];

const covers = [
  'Medical treatment preferences',
  'Healthcare proxy designation',
  'Personal values & care goals',
  'Mental health care preferences',
  'Artificial nutrition & hydration',
  'Organ & tissue donation',
  'Funeral & memorial wishes',
  'Guardian preference',
  'Letters to loved ones',
  'Where documents are kept',
];

const coverColors = [
  { bg: '#EBF2FF', border: '#BDD0FF' },
  { bg: '#EDE8FF', border: '#C4B0E8' },
  { bg: '#F0E8FF', border: '#D4B8E8' },
  { bg: '#F5EEFF', border: '#DDD0FF' },
  { bg: '#FDE8EF', border: '#F0BAD0' },
  { bg: '#FEF0E4', border: '#F0D0A8' },
  { bg: '#FFF0F8', border: '#F5C8DC' },
  { bg: '#E8F5EE', border: '#C0E8D0' },
  { bg: '#EBF2FF', border: '#BDD0FF' },
  { bg: '#EDE8FF', border: '#C4B0E8' },
];

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8FF]">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8FF]/85 backdrop-blur-lg border-b border-[#E0D8F5]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-cormorant)] text-2xl italic font-light tracking-[0.2em] bg-gradient-to-r from-[#5B8DEF] via-[#9B5CAF] to-[#C47090] bg-clip-text text-transparent">
              stillwater
            </span>
            <span className="text-[10px] tracking-[0.32em] text-[#A090C0] uppercase">care plan</span>
          </Link>
          <div className="flex items-center gap-8">
            <a href="#features" className="hidden md:block text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors tracking-wide">Features</a>
            <a href="#how" className="hidden md:block text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors tracking-wide">How it works</a>
            <Link href="/plan" className="btn-primary btn-sm">Begin your plan</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #EBF2FF 0%, #F0E8FF 35%, #FFE8F4 65%, #EDF8F5 100%)' }} />

        {/* Floating orbs */}
        <div className="absolute top-10 right-[-80px] w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none opacity-55"
          style={{ background: '#C0D4FF', animation: 'drift-1 22s ease-in-out infinite' }} />
        <div className="absolute bottom-[-40px] left-[-100px] w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none opacity-50"
          style={{ background: '#F5C0D8', animation: 'drift-2 28s ease-in-out infinite' }} />
        <div className="absolute top-1/3 left-1/3 w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none opacity-35"
          style={{ background: '#DDD0FF', animation: 'drift-3 19s ease-in-out infinite' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.55em] uppercase mb-8 font-medium text-[#8070A8]">End of life planning</p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-[5rem] font-light leading-[1.04] mb-8 bg-gradient-to-br from-[#4478E0] via-[#9050C0] to-[#C47090] bg-clip-text text-transparent">
              Plan with peace.<br />
              <em className="font-light">Leave with love.</em>
            </h1>
            <p className="text-[#4A3870] text-lg leading-relaxed mb-12 max-w-md" style={{ opacity: 0.75 }}>
              Stillwater helps you document your wishes, guide your loved ones,
              and leave a legacy of clarity — so those you love are never left wondering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/plan" className="btn-primary">Begin your plan →</Link>
              <a href="#how" className="btn-secondary">See how it works</a>
            </div>
            <p className="text-[10px] text-[#A090C0] mt-7 tracking-widest uppercase">Free · Private · No account needed</p>
          </div>

          {/* Concentric rings — blue → lavender → rose */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80" style={{ animation: 'rings-breathe 9s ease-in-out infinite' }}>
              {ringColors.map((color, i) => (
                <div key={i} className="absolute inset-0 rounded-full"
                  style={{
                    border: `${i === 0 ? 2 : 1.5}px solid ${color}`,
                    transform: `scale(${0.22 + i * 0.195}) rotate(${i * 4}deg)`,
                    opacity: 1 - i * 0.055,
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #EBF2FF 0%, #EDE8FF 50%, #FDE8EF 100%)',
                    border: '1.5px solid #C4D0F0',
                    boxShadow: '0 0 48px rgba(91,141,239,0.14), 0 4px 24px rgba(155,92,175,0.1)',
                  }}>
                  <svg className="w-10 h-10" fill="none" stroke="url(#hero-heart)" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="hero-heart" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#5B8DEF" />
                        <stop offset="50%" stopColor="#9B5CAF" />
                        <stop offset="100%" stopColor="#C47090" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#A090C0]">Scroll</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, #C4B0E8, transparent)' }} />
        </div>
      </section>

      {/* ── What Stillwater offers ── */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.55em] uppercase mb-5 font-medium text-[#8070A8]">What Stillwater offers</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#1A1030]">
              A complete plan for those you love
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Your Wishes',
                desc: 'Document your medical preferences, end-of-life care decisions, and final arrangements — all in one secure, private place.',
                bg: 'linear-gradient(135deg, #EBF2FF 0%, #EDE8FF 100%)',
                border: '#C4D0F0',
                iconBg: 'rgba(255,255,255,0.7)',
                iconColor: '#5B8DEF',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
              },
              {
                title: 'For Your People',
                desc: 'Name who speaks for you. Leave personal letters for those who matter most — to be read when they need you.',
                bg: 'linear-gradient(135deg, #F0E8FF 0%, #FDE8EF 100%)',
                border: '#D4B8E8',
                iconBg: 'rgba(255,255,255,0.7)',
                iconColor: '#9B5CAF',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
              },
              {
                title: 'Your Legacy',
                desc: 'Capture your values, beliefs, and what brings meaning — leave behind a record of who you truly were.',
                bg: 'linear-gradient(135deg, #FDE8EF 0%, #FFEEF6 100%)',
                border: '#F0BAD0',
                iconBg: 'rgba(255,255,255,0.7)',
                iconColor: '#C47090',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
              },
            ].map(f => (
              <div key={f.title} className="group rounded-3xl p-8 card-lift cursor-default"
                style={{ background: f.bg, border: `1px solid ${f.border}` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all"
                  style={{ background: f.iconBg, color: f.iconColor, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {f.icon}
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-3">{f.title}</h3>
                <p className="text-[#4A3870] leading-relaxed text-sm" style={{ opacity: 0.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What your plan covers ── */}
      <section className="py-24 bg-[#FAF8FF]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.55em] uppercase mb-5 font-medium text-[#7C5CAF]">Guided by Minnesota law</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
            Everything your plan can include
          </h2>
          <p className="text-[#4A3870] text-sm leading-relaxed mb-12 max-w-md mx-auto" style={{ opacity: 0.75 }}>
            A Minnesota Health Care Directive can legally document all of these. Stillwater guides you through each one.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {covers.map((label, i) => (
              <div key={label} className="rounded-2xl p-4 text-center card-lift cursor-default"
                style={{ background: coverColors[i].bg, border: `1px solid ${coverColors[i].border}` }}>
                <p className="text-xs text-[#4A3870] leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #EBF2FF 0%, #EDE8FF 35%, #F8E8FF 60%, #FFE8F4 85%, #EDF8F2 100%)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: '#B8D0FF' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-2 pointer-events-none"
          style={{ background: '#F5C0DC' }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="font-[family-name:var(--font-cormorant)] text-9xl font-light leading-none mb-4 select-none"
            style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: 0.35 }}>
            "
          </div>
          <p className="font-[family-name:var(--font-cormorant)] text-3xl md:text-[2.4rem] font-light italic text-[#3A2860] leading-relaxed mb-10">
            Planning for the end of life is not about dwelling in death — it is one of the deepest acts of love we can offer those we leave behind.
          </p>
          <div className="w-16 h-px mx-auto mb-6"
            style={{ background: 'linear-gradient(to right, #B8CAFF, #9B5CAF, #C47090)' }} />
          <p className="text-[9px] tracking-[0.5em] uppercase text-[#8070A8]">The Stillwater philosophy</p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.55em] uppercase mb-5 font-medium text-[#8070A8]">Simple by design</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#1A1030]">How Stillwater works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { num: '01', title: 'Answer gently', desc: 'We guide you through thoughtful questions at your own pace — no pressure, no jargon. Just space to reflect on what matters most.' },
              { num: '02', title: 'Share with care', desc: 'Generate a private link for your proxy, family, or doctor. They can read your wishes without needing an account or login.' },
              { num: '03', title: 'Update anytime', desc: 'Life changes. Your plan can too. Return whenever you\'re ready — to add, revise, or simply sit with what you\'ve already said.' },
            ].map(step => (
              <div key={step.num} className="flex flex-col gap-5">
                <span className="font-[family-name:var(--font-cormorant)] text-8xl font-light leading-none"
                  style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: 0.5 }}>
                  {step.num}
                </span>
                <div className="w-10 h-px" style={{ background: 'linear-gradient(to right, #B8CAFF, #C47090)' }} />
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030]">{step.title}</h3>
                <p className="text-[#4A3870] leading-relaxed text-sm" style={{ opacity: 0.8 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="py-14 border-y border-[#E0D8F5] bg-[#FAF8FF]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {[
              { label: 'Private & on-device', color: '#5B8DEF' },
              { label: 'Free to start', color: '#9B5CAF' },
              { label: 'Guided at your pace', color: '#C47090' },
              { label: 'Legally informed (MN)', color: '#5E9E7E' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm tracking-wide text-[#4A3870]">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="py-36 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #EBF2FF 0%, #EDE8FF 30%, #F2E0FF 55%, #FFE8F4 80%, #EDF8F2 100%)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: '#B8D0FF', animation: 'drift-1 26s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: '#F5C0DC', animation: 'drift-2 22s ease-in-out infinite' }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.55em] uppercase mb-6 font-medium text-[#7C5CAF]">Begin today</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light leading-tight mb-6"
            style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            For those you love.<br />
            <em>For your own peace of mind.</em>
          </h2>
          <p className="text-[#4A3870] text-lg leading-relaxed mb-12" style={{ opacity: 0.75 }}>
            Your plan takes less than an hour to start — and gives a lifetime of peace to carry.
          </p>
          <EmailForm />
          <div className="mt-8">
            <Link href="/plan" className="btn-primary mx-auto">Start your plan — it's free</Link>
          </div>
          <p className="text-[#A090C0] text-[10px] mt-6 tracking-widest uppercase">Private by design · No spam · No account needed</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-14 bg-[#F5F0FF]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-cormorant)] text-xl italic font-light tracking-[0.2em]"
              style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              stillwater
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#A090C0]">care plan</span>
          </Link>
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
