'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

function ProgressRing({ pct, size = 100 }: { pct: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B8DEF" />
          <stop offset="50%" stopColor="#9B5CAF" />
          <stop offset="100%" stopColor="#C47090" />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(155,92,175,0.1)" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="url(#ring-grad)" strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={pct === 0 ? circ : offset}
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
    href: '/plan/proxy', title: 'Your Proxy', tag: 'Healthcare agent',
    description: 'Name who speaks for you when you cannot. Must be 18+, cannot be your provider.',
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

  const completions = [wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion, arrangementsCompletion, documentsCompletion];

  if (!loaded) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">

      {/* ── Hero header card ── */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 mb-10"
        style={{
          background: 'linear-gradient(135deg, #EBF2FF 0%, #EDE8FF 45%, #FDE8F4 100%)',
          border: '1px solid rgba(155,92,175,0.14)',
          boxShadow: '0 4px 28px rgba(91,141,239,0.08), 0 1px 4px rgba(90,62,138,0.06)',
        }}>
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #B8D0FF, transparent 70%)' }} />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F5C0DC, transparent 70%)' }} />

        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-lg">
            <p className="text-[10px] tracking-[0.45em] uppercase mb-3 text-[#8070A8]">Your plan</p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[#1A1030] leading-tight">
              {overallCompletion === 0 ? "Let's begin, gently."
                : overallCompletion === 100 ? 'Your plan is complete.'
                : 'Your plan is taking shape.'}
            </h1>
            <p className="text-[#4A3870] mt-3 text-sm leading-relaxed" style={{ opacity: 0.75 }}>
              {overallCompletion === 0
                ? "Take your time. There's no rush — and no wrong place to start."
                : `You've completed ${overallCompletion}% of your plan. Every section you finish is a gift to those you love.`}
            </p>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <div className="relative">
              <ProgressRing pct={overallCompletion} size={100} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-medium text-[#4A3870]">{overallCompletion}%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#A090C0] tracking-widest uppercase">Overall</p>
              <p className="text-sm text-[#4A3870] mt-0.5 font-medium">completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Nudge banners ── */}
      {wishesCompletion === 100 && documentsCompletion < 100 && (
        <Link href="/plan/documents"
          className="flex gap-4 items-center rounded-2xl p-4 mb-5 transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #FFF8EE, #FEF0E4)', border: '1px solid #F0D0A8', boxShadow: '0 2px 12px rgba(192,136,88,0.08)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#FEE8C0' }}>
            <svg className="w-4 h-4 text-[#C08858]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#7A4820]">Make it legally valid</p>
            <p className="text-xs text-[#A06030] mt-0.5">Under Minnesota law, your directive must be signed and witnessed to be enforceable.</p>
          </div>
          <svg className="w-4 h-4 text-[#C08858] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      {plan.proxy.primaryName === '' && wishesCompletion > 0 && (
        <Link href="/plan/proxy"
          className="flex gap-4 items-center rounded-2xl p-4 mb-5 transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #FFF0F5, #FDE8EF)', border: '1px solid #F5C8D8', boxShadow: '0 2px 12px rgba(196,112,144,0.08)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#FFCCD8' }}>
            <svg className="w-4 h-4 text-[#C47090]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#8B3060]">Name a healthcare proxy</p>
            <p className="text-xs text-[#B05070] mt-0.5">Your wishes need someone to carry them — it's the most important role in your plan.</p>
          </div>
          <svg className="w-4 h-4 text-[#C47090] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      {/* ── Section grid ── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((s, i) => {
          const pct = completions[i];
          return (
            <Link key={s.href} href={s.href}
              className="group relative block bg-white rounded-2xl pl-6 pr-6 pt-6 pb-5 card-lift"
              style={{
                border: '1px solid #E0D8F5',
                boxShadow: '0 1px 3px rgba(90,62,138,0.05)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#C4B0E8';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(90,62,138,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E0D8F5';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(90,62,138,0.05)';
              }}
            >
              {/* Left gradient accent */}
              <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full"
                style={{ background: `linear-gradient(to bottom, ${s.barFrom}, ${s.barTo})` }} />

              {/* Icon + status */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: s.iconBg, color: s.iconColor }}>
                  {s.icon}
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide"
                  style={pct === 100
                    ? { background: '#E8F5EE', color: '#3E8868' }
                    : pct > 0
                    ? { background: s.iconBg, color: s.iconColor }
                    : { background: '#F5F0FF', color: '#A090C0' }}>
                  {pct === 100 ? '✓ Complete' : pct > 0 ? `${pct}%` : 'Not started'}
                </span>
              </div>

              {/* Text */}
              <p className="text-[10px] tracking-widest uppercase mb-1.5 text-[#A090C0]">{s.tag}</p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#1A1030] mb-2 group-hover:text-[#2E1A60] transition-colors">
                {s.title}
              </h2>
              <p className="text-[#4A3870] text-xs leading-relaxed mb-5" style={{ opacity: 0.72 }}>{s.description}</p>

              {/* Progress bar */}
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F0EBF8' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: `linear-gradient(to right, ${s.barFrom}, ${s.barTo})` }} />
              </div>

              {/* Footer */}
              <div className="mt-3.5 flex items-center justify-between">
                <span className="text-xs font-medium tracking-wide transition-colors" style={{ color: s.iconColor }}>
                  {pct === 0 ? 'Begin' : pct === 100 ? 'Review' : 'Continue'}
                </span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: s.iconColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Tools ── */}
      <div className="mt-12 pt-10" style={{ borderTop: '1px solid #E0D8F5' }}>
        <p className="text-[10px] tracking-[0.45em] uppercase text-[#A090C0] mb-5">Tools</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              href: '/plan/review',
              iconBg: '#EDE8FF', iconColor: '#7C5CAF',
              label: 'Review your directive',
              sub: 'Read and print a formatted copy',
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
            },
            {
              href: '/plan/share',
              iconBg: '#FDE8EF', iconColor: '#C47090',
              label: 'Share with family',
              sub: 'Create a private, read-only link',
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
            },
            {
              href: '/plan/welcome',
              iconBg: '#EBF2FF', iconColor: '#5B8DEF',
              label: 'About this plan',
              sub: 'How Stillwater works',
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            },
          ].map(t => (
            <Link key={t.href} href={t.href}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 card-lift"
              style={{ border: '1px solid #E0D8F5', boxShadow: '0 1px 3px rgba(90,62,138,0.04)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C4B0E8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E0D8F5'; }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: t.iconBg, color: t.iconColor }}>
                {t.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1030]">{t.label}</p>
                <p className="text-xs text-[#8070A8] mt-0.5">{t.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[#A090C0] text-xs tracking-wider leading-relaxed max-w-sm mx-auto">
          Your plan is saved privately on this device. Nothing is uploaded to any server.
        </p>
      </div>
    </div>
  );
}
