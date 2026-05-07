'use client';

import Link from 'next/link';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';
const ringColors = ['#B8CAFF', '#C8B4F2', '#DDD0FF', '#F0B8D8', '#FFD0EA'];

const planSections = [
  { color: '#5B8DEF', label: 'Your medical wishes — CPR, ventilators, feeding tubes, and more' },
  { color: '#7B70CF', label: 'Your healthcare proxy — who speaks for you when you cannot' },
  { color: '#9B5CAF', label: 'Your values — what matters most, your fears, your hopes' },
  { color: '#B45898', label: 'Letters to loved ones — to be shared when the time comes' },
  { color: '#C47090', label: 'Final arrangements — memorial wishes and practical guidance' },
  { color: '#5E9E7E', label: 'Legal checklist — signatures, witnesses, and distribution' },
];

export default function WelcomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Rings graphic */}
      <div className="flex items-center justify-center mb-14">
        <div className="relative w-44 h-44" style={{ animation: 'rings-breathe 9s ease-in-out infinite' }}>
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
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF, #FDE8EF)',
                border: '1.5px solid #C4D0F0',
                boxShadow: '0 0 32px rgba(91,141,239,0.14)',
              }}>
              <svg className="w-7 h-7" fill="none" stroke="url(#welcome-heart)" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="welcome-heart" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5B8DEF" />
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

      {/* Heading */}
      <p className="text-[10px] tracking-[0.55em] uppercase text-center mb-5 text-[#8070A8]">Welcome</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#1A1030] text-center leading-tight mb-6">
        Your plan is a gift<br />to those you love.
      </h1>
      <p className="text-[#4A3870] text-base leading-relaxed text-center mb-14 max-w-md mx-auto" style={{ opacity: 0.8 }}>
        Stillwater guides you through creating a Minnesota Health Care Directive — the legal document that captures your wishes and ensures your voice is heard when it matters most.
      </p>

      {/* What you'll create */}
      <div className="bg-white rounded-3xl p-8 mb-6" style={{ border: '1px solid #E0D8F5', boxShadow: '0 2px 12px rgba(90,62,138,0.06)' }}>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-6">What you'll create</h2>
        <div className="flex flex-col gap-3.5">
          {planSections.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
              <p className="text-sm text-[#4A3870] leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Time estimate */}
      <div className="rounded-2xl p-5 mb-6 flex gap-4 items-center"
        style={{ background: '#EDE8FF', border: '1px solid #C4B0E8' }}>
        <svg className="w-5 h-5 shrink-0 text-[#7C5CAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-[#4A3870]">
          Takes <strong className="font-medium">30–60 minutes</strong> to complete. Save anytime. Return whenever you're ready.
        </p>
      </div>

      {/* Privacy */}
      <div className="rounded-2xl p-5 mb-10 flex gap-4 items-start"
        style={{ background: '#EBF2FF', border: '1px solid #BDD0FF' }}>
        <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#5B8DEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-[#2A5090]">Private by design</p>
          <p className="text-xs text-[#3A6090] mt-0.5 leading-relaxed">Your plan is saved only on this device. Nothing is sent to any server. You control who sees it, and when.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4">
        <Link href="/plan"
          className="w-full text-center py-4 px-8 rounded-full text-white text-sm font-medium tracking-wide transition-all hover:-translate-y-0.5"
          style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.3)' }}>
          Begin my plan →
        </Link>
        <Link href="/plan" className="back-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan
        </Link>
      </div>

    </div>
  );
}
