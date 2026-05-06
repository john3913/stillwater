'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

function ProgressRing({ pct, size = 80 }: { pct: number; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const id = `grad-ring`;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9B68D0" />
          <stop offset="100%" stopColor="#C47090" />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EDE8FF" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={`url(#${id})`} strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" className="transition-all duration-700"
      />
    </svg>
  );
}

const sections = [
  {
    href: '/plan/wishes', title: 'Your Wishes', tag: 'Medical preferences',
    description: 'CPR, ventilators, feeding tubes, pain management, organ donation.',
    iconBg: '#EDE8FF', iconColor: '#7C5CAF', barFrom: '#9B68D0', barTo: '#C47090',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  {
    href: '/plan/proxy', title: 'Your Proxy', tag: 'Healthcare proxy',
    description: 'Name who will speak for you when you cannot. Must be 18+, cannot be your provider.',
    iconBg: '#FDE8EF', iconColor: '#C47090', barFrom: '#C47090', barTo: '#E0A070',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    href: '/plan/values', title: 'Your Values', tag: 'Personal values',
    description: 'What matters most, your fears, your hopes, your spiritual beliefs.',
    iconBg: '#E8F5EE', iconColor: '#5E9E7E', barFrom: '#7AAE8E', barTo: '#9B68D0',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  },
  {
    href: '/plan/letters', title: 'Letters to Loved Ones', tag: 'Legacy messages',
    description: 'Personal messages to be shared when the time comes — or anytime.',
    iconBg: '#FEF0E4', iconColor: '#C08858', barFrom: '#E0A070', barTo: '#C47090',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    href: '/plan/arrangements', title: 'Final Arrangements', tag: 'Funeral & practical',
    description: 'Burial or cremation, memorial wishes, location of your will and key documents.',
    iconBg: '#F5F0FF', iconColor: '#9B68D0', barFrom: '#C4B0E8', barTo: '#9B68D0',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  },
  {
    href: '/plan/documents', title: 'Documents & Distribution', tag: 'Legal validity',
    description: 'Ensure your directive is properly signed, witnessed, and in the right hands.',
    iconBg: '#EDF7F3', iconColor: '#3E8868', barFrom: '#7AAE8E', barTo: '#5E9E7E',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
  },
];

export default function PlanDashboard() {
  const {
    loaded, plan,
    wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion,
    arrangementsCompletion, documentsCompletion, overallCompletion,
  } = usePlan();

  const completions = [
    wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion,
    arrangementsCompletion, documentsCompletion,
  ];

  if (!loaded) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
        <div>
          <p className="text-xs tracking-[0.3em] text-[#7C5CAF] uppercase mb-3">Your plan</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#1A1030]">
            {overallCompletion === 0 ? "Let's begin, gently."
              : overallCompletion === 100 ? 'Your plan is complete.'
              : 'Your plan is taking shape.'}
          </h1>
          <p className="text-[#4A3870] mt-3 text-sm leading-relaxed max-w-md opacity-80">
            {overallCompletion === 0
              ? "Take your time. There's no rush — and no wrong place to start."
              : `You've completed ${overallCompletion}% of your plan. Every section you finish is a gift to those you love.`}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative">
            <ProgressRing pct={overallCompletion} size={80} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-[#4A3870]">{overallCompletion}%</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#8070A8] tracking-wider uppercase">Overall</p>
            <p className="text-sm text-[#4A3870] mt-0.5">completion</p>
          </div>
        </div>
      </div>

      {/* Legal validity nudge */}
      {wishesCompletion === 100 && documentsCompletion < 100 && (
        <div className="rounded-2xl p-5 mb-8 flex gap-4 items-start border" style={{ background: '#FEF0E4', borderColor: '#FAD8B0' }}>
          <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#C08858]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-[#7A4820]">Make it legally valid</p>
            <p className="text-xs text-[#A06030] mt-0.5">Under Minnesota law, your directive must be signed and witnessed by a notary or two people to be enforceable. Complete the Documents section to check your status.</p>
          </div>
        </div>
      )}

      {/* Proxy nudge */}
      {plan.proxy.primaryName === '' && wishesCompletion > 0 && (
        <div className="rounded-2xl p-5 mb-8 flex gap-4 items-start border" style={{ background: '#FDE8EF', borderColor: '#F5C8D8' }}>
          <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#C47090]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-[#8B3060]">Name a healthcare proxy</p>
            <p className="text-xs text-[#B05070] mt-0.5">Your wishes need someone to carry them. Your proxy will make decisions when you cannot — it's the most important person in your plan.</p>
          </div>
        </div>
      )}

      {/* Section cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {sections.map((s, i) => {
          const pct = completions[i];
          return (
            <Link key={s.href} href={s.href}
              className="group block bg-white rounded-3xl p-7 hover:shadow-sm transition-all"
              style={{ border: '1px solid #E0D8F5' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C4B0E8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E0D8F5'; }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: s.iconBg, color: s.iconColor }}>
                  {s.icon}
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full"
                  style={pct === 100
                    ? { background: '#E8F5EE', color: '#3E8868' }
                    : pct > 0
                    ? { background: '#EDE8FF', color: '#7C5CAF' }
                    : { background: '#F5F0FF', color: '#8070A8' }}>
                  {pct === 100 ? 'Complete' : pct > 0 ? `${pct}%` : 'Not started'}
                </span>
              </div>
              <p className="text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">{s.tag}</p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">{s.title}</h2>
              <p className="text-[#4A3870] text-sm leading-relaxed mb-5 opacity-80">{s.description}</p>
              <div className="h-1 bg-[#F0EBF8] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: `linear-gradient(to right, ${s.barFrom}, ${s.barTo})` }}
                />
              </div>
              <div className="mt-4 text-xs font-medium tracking-wide transition-colors" style={{ color: s.iconColor }}>
                {pct === 0 ? 'Begin →' : pct === 100 ? 'Review →' : 'Continue →'}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <p className="text-[#8070A8] text-xs tracking-wider leading-relaxed max-w-sm mx-auto">
          Your plan is saved privately on this device. Share it with trusted people when you're ready.
        </p>
      </div>
    </div>
  );
}
