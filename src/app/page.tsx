import Link from 'next/link';
import EmailForm from './EmailForm';


const coverItems: { label: string; bg: string; border: string; iconColor: string; iconPath: string }[] = [
  { label: 'Medical treatment preferences',  bg: '#EBF2FF', border: '#BDD0FF', iconColor: '#5B8DEF', iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { label: 'Healthcare proxy designation',   bg: '#EDE8FF', border: '#C4B0E8', iconColor: '#7C5CAF', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { label: 'Personal values & care goals',   bg: '#F0E8FF', border: '#D4B8E8', iconColor: '#9B5CAF', iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { label: 'Mental health care preferences', bg: '#F5EEFF', border: '#DDD0FF', iconColor: '#A070C8', iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { label: 'Artificial nutrition & hydration',bg: '#FDE8EF', border: '#F0BAD0', iconColor: '#C47090', iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { label: 'Organ & tissue donation',         bg: '#FEF0E4', border: '#F0D0A8', iconColor: '#C08858', iconPath: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
  { label: 'Funeral & memorial wishes',       bg: '#FFF0F8', border: '#F5C8DC', iconColor: '#C47090', iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { label: 'Guardian preference',             bg: '#E8F5EE', border: '#C0E8D0', iconColor: '#5E9E7E', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { label: 'Letters to loved ones',           bg: '#EBF2FF', border: '#BDD0FF', iconColor: '#5B8DEF', iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Where documents are kept',        bg: '#EDE8FF', border: '#C4B0E8', iconColor: '#7C5CAF', iconPath: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
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
        <div className="absolute top-10 right-[-80px] w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none opacity-45"
          style={{ background: '#C0D4FF', animation: 'drift-1 22s ease-in-out infinite' }} />
        <div className="absolute bottom-[200px] left-[-100px] w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ background: '#F5C0D8', animation: 'drift-2 28s ease-in-out infinite' }} />
        <div className="absolute top-1/3 left-1/3 w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none opacity-28"
          style={{ background: '#DDD0FF', animation: 'drift-3 19s ease-in-out infinite' }} />

        {/* Centered content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-32 text-center">
          <p className="text-[10px] tracking-[0.55em] uppercase mb-8 font-medium text-[#8070A8]">Planning ahead, with love</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-[5.5rem] font-light leading-[1.04] mb-8 bg-gradient-to-br from-[#4478E0] via-[#9050C0] to-[#C47090] bg-clip-text text-transparent">
            Plan with peace.<br />
            <em className="font-light">Leave with love.</em>
          </h1>
          <p className="text-[#4A3870] text-lg leading-relaxed mb-12 max-w-xl mx-auto" style={{ opacity: 0.75 }}>
            Stillwater helps you document your wishes, guide your loved ones,
            and leave a legacy of clarity — so those you love are never left wondering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plan" className="btn-primary">Begin your plan →</Link>
            <a href="#how" className="btn-secondary">See how it works</a>
          </div>
          <p className="text-[10px] text-[#A090C0] mt-7 tracking-widest uppercase">Free · Private · No account needed</p>
        </div>

        {/* Full-width water waves */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 280 }}>
          {/* Wave 1 — sage, deepest, slowest */}
          <svg viewBox="0 0 200 100" preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '100%',
              animation: 'wave-fwd 32s linear infinite', opacity: 0.13 }}>
            <path fill="#7AB8A0"
              d="M0,28 q25,-22 50,0 q25,22 50,0 q25,-22 50,0 q25,22 50,0 L200,100 L0,100 Z" />
          </svg>
          {/* Wave 2 — violet */}
          <svg viewBox="0 0 200 100" preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '100%',
              animation: 'wave-bwd 24s linear infinite', opacity: 0.17 }}>
            <path fill="#9B5CAF"
              d="M0,44 q25,-19 50,0 q25,19 50,0 q25,-19 50,0 q25,19 50,0 L200,100 L0,100 Z" />
          </svg>
          {/* Wave 3 — blush */}
          <svg viewBox="0 0 200 100" preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '100%',
              animation: 'wave-fwd 18s linear infinite', opacity: 0.21 }}>
            <path fill="#C47090"
              d="M0,60 q25,-15 50,0 q25,15 50,0 q25,-15 50,0 q25,15 50,0 L200,100 L0,100 Z" />
          </svg>
          {/* Wave 4 — blue, front, fastest */}
          <svg viewBox="0 0 200 100" preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '100%',
              animation: 'wave-bwd 14s linear infinite', opacity: 0.30 }}>
            <path fill="#5B8DEF"
              d="M0,74 q25,-11 50,0 q25,11 50,0 q25,-11 50,0 q25,11 50,0 L200,100 L0,100 Z" />
          </svg>
          {/* Soft gradient fade at top of wave area */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(250,248,255,0.0) 0%, rgba(250,248,255,0.0) 50%, rgba(255,255,255,0.12) 100%)' }} />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(160,144,192,0.7)' }}>Scroll</span>
          <div className="w-px h-7" style={{ background: 'linear-gradient(to bottom, rgba(196,176,232,0.6), transparent)' }} />
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
      <section className="py-28 bg-[#FAF8FF]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.55em] uppercase mb-5 font-medium text-[#7C5CAF]">Guided by Minnesota law</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
            Everything your plan can include
          </h2>
          <p className="text-[#4A3870] text-sm leading-relaxed mb-14 max-w-md mx-auto" style={{ opacity: 0.75 }}>
            A Minnesota Health Care Directive can legally document all of these. Stillwater guides you through each one.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {coverItems.map(item => (
              <div key={item.label} className="rounded-2xl p-6 text-center card-lift cursor-default flex flex-col items-center gap-4"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.72)', color: item.iconColor, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.iconPath} />
                  </svg>
                </div>
                <p className="text-xs font-medium text-[#4A3870] leading-snug">{item.label}</p>
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
      <section className="py-16 border-y border-[#E0D8F5]"
        style={{ background: 'linear-gradient(135deg, #FAF8FF 0%, #F5F0FF 50%, #FAF8FF 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: 'Private & on-device',
                desc: 'Your data never leaves this device',
                color: '#5B8DEF', bg: '#EBF2FF', border: '#C0D4FF',
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
              },
              {
                label: 'Free to start',
                desc: 'No credit card or account needed',
                color: '#9B5CAF', bg: '#EDE8FF', border: '#C8B8F0',
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
              },
              {
                label: 'Guided at your pace',
                desc: 'Return anytime, no pressure at all',
                color: '#C47090', bg: '#FDE8EF', border: '#F0BAD0',
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              },
              {
                label: 'Legally informed (MN)',
                desc: 'Aligned with Minnesota law',
                color: '#5E9E7E', bg: '#E8F5EE', border: '#B8DFC8',
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
              },
            ].map(item => (
              <div key={item.label} className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.75)', color: item.color, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1030] leading-snug">{item.label}</p>
                  <p className="text-[11px] leading-relaxed mt-1" style={{ color: item.color, opacity: 0.8 }}>{item.desc}</p>
                </div>
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
          <p className="text-[#8070A8] text-xs tracking-wider">Planning ahead, with love and clarity.</p>
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
