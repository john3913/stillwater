'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

function ProgressRing({ pct, size = 64 }: { pct: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e7e5e4" strokeWidth={4} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#0f766e" strokeWidth={4}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  );
}

const sections = [
  {
    href: '/plan/wishes',
    title: 'Your Wishes',
    description: 'CPR, ventilators, feeding tubes, pain management, organ donation.',
    tag: 'Medical preferences',
    color: 'teal',
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: '/plan/proxy',
    title: 'Your Proxy',
    description: 'Name who will speak for you when you cannot.',
    tag: 'Healthcare proxy',
    color: 'amber',
    icon: (
      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: '/plan/values',
    title: 'Your Values',
    description: 'What matters most, your fears, your hopes, your beliefs.',
    tag: 'Personal values',
    color: 'sky',
    icon: (
      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    href: '/plan/letters',
    title: 'Letters to Loved Ones',
    description: 'Personal messages to be shared when the time comes.',
    tag: 'Legacy messages',
    color: 'rose',
    icon: (
      <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function PlanDashboard() {
  const {
    loaded,
    wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion, overallCompletion,
    plan,
  } = usePlan();

  const completions = [wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion];

  if (!loaded) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="text-xs tracking-[0.3em] text-teal-700 uppercase mb-3">Your plan</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-stone-800">
            {overallCompletion === 0
              ? 'Let\'s begin, gently.'
              : overallCompletion === 100
              ? 'Your plan is complete.'
              : 'Your plan is taking shape.'}
          </h1>
          <p className="text-stone-500 mt-3 text-sm leading-relaxed max-w-md">
            {overallCompletion === 0
              ? 'Take your time. There\'s no rush — and no wrong place to start.'
              : `You've completed ${overallCompletion}% of your plan. Every section you finish is a gift to those you love.`}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative">
            <ProgressRing pct={overallCompletion} size={80} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-stone-700">{overallCompletion}%</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-stone-400 tracking-wider uppercase">Overall</p>
            <p className="text-sm text-stone-600 mt-0.5">completion</p>
          </div>
        </div>
      </div>

      {/* Quick note if no proxy set */}
      {plan.proxy.primaryName === '' && wishesCompletion > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8 flex gap-4 items-start">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-amber-800 font-medium">Name a healthcare proxy</p>
            <p className="text-xs text-amber-700 mt-0.5">Your wishes need someone to carry them. Adding a proxy is the most important step you can take after completing your wishes.</p>
          </div>
        </div>
      )}

      {/* Section cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {sections.map((s, i) => {
          const pct = completions[i];
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group block bg-white border border-stone-100 rounded-3xl p-7 hover:border-stone-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center group-hover:bg-stone-100 transition-colors">
                  {s.icon}
                </div>
                <div className="flex items-center gap-2">
                  {pct === 100 && (
                    <span className="text-xs text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">Complete</span>
                  )}
                  {pct > 0 && pct < 100 && (
                    <span className="text-xs text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full">{pct}%</span>
                  )}
                  {pct === 0 && (
                    <span className="text-xs text-stone-400 bg-stone-50 px-2.5 py-1 rounded-full">Not started</span>
                  )}
                </div>
              </div>

              <p className="text-xs tracking-wider text-stone-400 uppercase mb-1.5">{s.tag}</p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-stone-800 mb-2">
                {s.title}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-5">{s.description}</p>

              {/* Progress bar */}
              <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="mt-4 text-xs text-teal-700 group-hover:text-teal-800 font-medium tracking-wide">
                {pct === 0 ? 'Begin →' : pct === 100 ? 'Review →' : 'Continue →'}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-16 text-center">
        <p className="text-stone-400 text-xs tracking-wider leading-relaxed max-w-sm mx-auto">
          Your plan is saved privately on this device. Share it with trusted people when you\'re ready.
        </p>
      </div>
    </div>
  );
}
