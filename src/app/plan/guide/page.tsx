'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const sections = [
  {
    href: '/plan/wishes',
    title: 'Your Wishes',
    desc: 'CPR, ventilators, feeding tubes, organ donation.',
    color: '#7C5CAF', bg: '#EDE8FF', border: '#C4B0E8',
  },
  {
    href: '/plan/proxy',
    title: 'Your Proxy',
    desc: 'Name who speaks for you when you cannot.',
    color: '#C47090', bg: '#FDE8EF', border: '#F5C8D8',
  },
  {
    href: '/plan/values',
    title: 'Your Values',
    desc: 'What matters most, your fears, your hopes.',
    color: '#5E9E7E', bg: '#E8F5EE', border: '#B8DFC8',
  },
  {
    href: '/plan/letters',
    title: 'Letters to Loved Ones',
    desc: 'Personal messages to be shared when the time comes.',
    color: '#C08858', bg: '#FEF0E4', border: '#F0D0A8',
  },
  {
    href: '/plan/arrangements',
    title: 'Final Arrangements',
    desc: 'Burial, memorial wishes, and key document locations.',
    color: '#9B68D0', bg: '#F5F0FF', border: '#C4B0E8',
  },
  {
    href: '/plan/documents',
    title: 'Documents & Distribution',
    desc: 'Signing, witnesses, and who has a copy.',
    color: '#3E8868', bg: '#EDF7F3', border: '#B8DFC8',
  },
];

export default function GuidePage() {
  const {
    loaded,
    wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion,
    arrangementsCompletion, documentsCompletion, overallCompletion,
  } = usePlan();

  const completions = [wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion, arrangementsCompletion, documentsCompletion];

  if (!loaded) return null;

  const firstIncomplete = sections.findIndex((_, i) => completions[i] < 100);
  const nextHref = firstIncomplete >= 0 ? sections[firstIncomplete].href : '/plan/review';

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#5B8DEF] uppercase mb-4">Guided walkthrough</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
        Your plan at a glance
      </h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        All six sections in one place. Complete them in any order — or continue where you left off.
      </p>

      {/* Progress summary */}
      <div className="rounded-2xl px-6 py-4 mb-8 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF)', border: '1px solid #C4D0F0' }}>
        <div>
          <p className="text-xs tracking-widest uppercase text-[#6070A8] mb-0.5">Overall progress</p>
          <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030]">{overallCompletion}%</p>
        </div>
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'white', boxShadow: '0 2px 8px rgba(91,141,239,0.12)' }}>
          <svg className="w-7 h-7 text-[#9B5CAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      </div>

      {/* Section list */}
      <div className="flex flex-col gap-3 mb-10">
        {sections.map((s, i) => {
          const pct = completions[i];
          const isNext = i === firstIncomplete;
          return (
            <Link key={s.href} href={s.href}
              className="flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{
                background: isNext ? s.bg : 'white',
                border: `1px solid ${isNext ? s.border : '#E0D8F5'}`,
                boxShadow: isNext ? '0 4px 16px rgba(91,141,239,0.08)' : '0 1px 3px rgba(90,62,138,0.04)',
              }}>
              {/* Status dot */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: pct === 100 ? '#E8F5EE' : isNext ? s.bg : '#F5F0FF', border: `1.5px solid ${pct === 100 ? '#B8DFC8' : isNext ? s.border : '#E0D8F5'}` }}>
                {pct === 100 ? (
                  <svg className="w-4 h-4 text-[#3E8868]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-[10px] font-medium" style={{ color: pct > 0 ? s.color : '#C4B0E8' }}>
                    {pct > 0 ? `${pct}%` : '—'}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1030]">{s.title}</p>
                <p className="text-xs text-[#8070A8] mt-0.5 truncate">{s.desc}</p>
              </div>

              {isNext && (
                <span className="text-[10px] px-2.5 py-1 rounded-full font-medium shrink-0"
                  style={{ background: s.color, color: 'white' }}>
                  Continue
                </span>
              )}

              <svg className="w-4 h-4 text-[#C4B0E8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <Link href={nextHref}
        className="w-full block text-center py-4 rounded-2xl text-sm font-medium text-white transition-all hover:-translate-y-0.5"
        style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
        {overallCompletion === 100 ? 'Review your directive →' : 'Continue your plan →'}
      </Link>
    </div>
  );
}
