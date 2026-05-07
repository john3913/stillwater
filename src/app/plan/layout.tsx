'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const SECS = [
  { label: 'Wishes',       short: 'W', color: '#7C5CAF', href: '/plan/wishes',       desc: 'CPR, ventilators, pain care, organ donation' },
  { label: 'Proxy',        short: 'P', color: '#C47090', href: '/plan/proxy',         desc: 'Who speaks for you when you cannot' },
  { label: 'Values',       short: 'V', color: '#5E9E7E', href: '/plan/values',        desc: 'What matters most, fears, hopes' },
  { label: 'Letters',      short: 'L', color: '#C08858', href: '/plan/letters',       desc: 'Personal messages for loved ones' },
  { label: 'Arrangements', short: 'A', color: '#9B68D0', href: '/plan/arrangements',  desc: 'Funeral, burial, practical wishes' },
  { label: 'Documents',    short: 'D', color: '#3E8868', href: '/plan/documents',     desc: 'Legal signing & distribution' },
];

function ProfileSwitcher({
  profiles, activeId, activeProfileName, onSwitch, onNew,
}: {
  profiles: { id: string; displayName: string }[];
  activeId: string;
  activeProfileName: string;
  onSwitch: (id: string) => void;
  onNew: () => void;
}) {
  const [open, setOpen] = useState(false);
  const initials = (activeProfileName || 'M').slice(0, 2).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-all hover:bg-[#EDE8FF]"
        style={{ border: '1px solid #E0D8F5' }}>
        <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: GRAD }}>
          {initials}
        </span>
        <span className="text-[11px] font-medium text-[#4A3870] max-w-[80px] truncate hidden sm:block">
          {activeProfileName || 'My Plan'}
        </span>
        <svg className={`w-3 h-3 text-[#A090C0] transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[180px] rounded-2xl overflow-hidden"
            style={{ background: 'white', border: '1px solid #E0D8F5', boxShadow: '0 8px 32px rgba(90,62,138,0.14)' }}>
            <div className="px-3 py-2 border-b border-[#F0EBF8]">
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#C4B0E8] font-medium">Switch profile</p>
            </div>
            {profiles.map(p => (
              <button key={p.id}
                onClick={() => { onSwitch(p.id); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-[#F5F0FF] transition-colors">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                  style={{ background: p.id === activeId ? GRAD : 'rgba(155,92,175,0.3)' }}>
                  {(p.displayName || 'M').slice(0, 2).toUpperCase()}
                </span>
                <span className="text-xs text-[#2E1A60] truncate flex-1">{p.displayName || 'My Plan'}</span>
                {p.id === activeId && (
                  <svg className="w-3 h-3 text-[#7C5CAF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
            <div className="border-t border-[#F0EBF8]">
              <button onClick={() => { onNew(); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#F5F0FF] transition-colors">
                <span className="w-5 h-5 rounded-full border border-dashed border-[#C4B0E8] flex items-center justify-center text-[#A090C0] flex-shrink-0">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
                <span className="text-xs text-[#8070A8]">New profile</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  const {
    loaded, profiles, activeId, activeProfileName,
    switchProfile, createNewProfile,
    wishesCompletion, proxyCompletion, valuesCompletion,
    lettersCompletion, arrangementsCompletion, documentsCompletion,
  } = usePlan();

  const pcts = [
    wishesCompletion, proxyCompletion, valuesCompletion,
    lettersCompletion, arrangementsCompletion, documentsCompletion,
  ];

  const handleNewProfile = () => {
    const name = window.prompt('Name for new profile:', 'New Plan');
    if (name !== null) createNewProfile(name.trim() || 'New Plan');
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF]">

      {/* ── Subtle ambient wave background — fixed, very low opacity ── */}
      <div className="no-print fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg viewBox="0 0 200 100" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '45%',
            animation: 'wave-bwd 38s linear infinite', opacity: 0.042 }}>
          <path fill="#9B5CAF" d="M0,32 q25,-22 50,0 q25,22 50,0 q25,-22 50,0 q25,22 50,0 L200,100 L0,100 Z" />
        </svg>
        <svg viewBox="0 0 200 100" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '45%',
            animation: 'wave-fwd 26s linear infinite', opacity: 0.055 }}>
          <path fill="#5B8DEF" d="M0,58 q25,-16 50,0 q25,16 50,0 q25,-16 50,0 q25,16 50,0 L200,100 L0,100 Z" />
        </svg>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8FF]/92 backdrop-blur-xl border-b border-[#E0D8F5]">

        {/* Logo row */}
        <div className="max-w-6xl mx-auto px-6 py-[14px] flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2.5 group">
            <span
              className="font-[family-name:var(--font-cormorant)] text-2xl italic font-light tracking-[0.2em]"
              style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              stillwater
            </span>
            <span className="text-[10px] tracking-[0.32em] text-[#A090C0] uppercase transition-colors group-hover:text-[#8070A8]">
              care plan
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/plan"
              className="text-[11px] text-[#8070A8] hover:text-[#4A3870] tracking-[0.24em] uppercase transition-colors font-medium">
              Your Plan
            </Link>
            {loaded && profiles.length > 0 && (
              <ProfileSwitcher
                profiles={profiles}
                activeId={activeId}
                activeProfileName={activeProfileName}
                onSwitch={switchProfile}
                onNew={handleNewProfile}
              />
            )}
          </div>
        </div>

        {/* Stepper progress strip */}
        <div className="border-t border-[#EDE8FF]">
          <div className="max-w-6xl mx-auto px-5 py-3">
            <div className="flex items-center justify-between">
              {SECS.map((s, i) => {
                const pct = loaded ? pcts[i] : 0;
                const done = pct === 100;
                const started = pct > 0 && pct < 100;
                const next = i < SECS.length - 1;

                return (
                  <div key={s.href} className="flex items-center" style={{ flex: next ? 1 : 0 }}>
                    {/* Node */}
                    <Link href={s.href}
                      className="flex flex-col items-center gap-1 group relative shrink-0">

                      {/* Hover tooltip — desktop only */}
                      <div className="hidden sm:block absolute top-full mt-3 left-1/2 -translate-x-1/2 z-[200]
                        opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                        transition-all duration-200 pointer-events-none">
                        {/* Arrow */}
                        <div className="flex justify-center">
                          <div className="w-2.5 h-2.5 rotate-45 -mb-[6px] relative z-10"
                            style={{ background: 'white', border: '1px solid #E8E0F5', borderBottom: 'none', borderRight: 'none', boxShadow: '-1px -1px 3px rgba(90,62,138,0.05)' }} />
                        </div>
                        <div className="bg-white rounded-2xl px-4 py-3 min-w-[160px] max-w-[200px] text-left"
                          style={{ border: '1px solid #E8E0F5', boxShadow: '0 8px 32px rgba(90,62,138,0.14)' }}>
                          <p className="font-[family-name:var(--font-cormorant)] text-base font-medium text-[#1A1030] mb-0.5 leading-snug">{s.label}</p>
                          <p className="text-[10px] text-[#8070A8] leading-snug mb-2.5">{s.desc}</p>
                          <div className="h-1 rounded-full overflow-hidden mb-1.5" style={{ background: '#F0EBF8' }}>
                            <div className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%`, background: s.color }} />
                          </div>
                          <p className="text-[9px] font-medium"
                            style={{ color: pct === 100 ? '#3E8868' : pct > 0 ? s.color : '#C4B8D8' }}>
                            {pct === 100 ? '✓ Complete' : pct > 0 ? `${pct}% complete` : 'Not started'}
                          </p>
                        </div>
                      </div>

                      {/* Circle */}
                      <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          width: 24, height: 24, borderRadius: '50%',
                          background: done
                            ? `linear-gradient(135deg, ${s.color}, ${s.color}CC)`
                            : 'transparent',
                          border: done
                            ? 'none'
                            : started
                            ? `2px solid ${s.color}`
                            : '1.5px solid #D4CAE8',
                          boxShadow: done ? `0 2px 10px ${s.color}44` : 'none',
                        }}>
                        {/* Ripple for in-progress */}
                        {started && (
                          <div className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ border: `1.5px solid ${s.color}`, animation: 'pulse-ring 2.2s ease-out infinite' }} />
                        )}
                        {done ? (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : started ? (
                          <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4CAE8]" />
                        )}
                      </div>
                      {/* Label */}
                      <span className="text-[9px] font-medium leading-none transition-colors duration-300 hidden sm:block whitespace-nowrap"
                        style={{ color: done || started ? s.color : '#C4B8D8' }}>
                        {s.label}
                      </span>
                    </Link>

                    {/* Connector line */}
                    {next && (
                      <div className="flex-1 mx-1.5 h-px relative overflow-hidden" style={{ background: '#EDE8FF' }}>
                        <div className="absolute inset-y-0 left-0 transition-all duration-700"
                          style={{
                            width: done ? '100%' : started ? '50%' : '0%',
                            background: `linear-gradient(to right, ${s.color}, ${SECS[i+1].color}88)`,
                          }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Content — pt accounts for nav (52px) + strip (54px) + border (1px) ≈ 109px */}
      <div className="pt-[109px] relative z-10">{children}</div>
    </div>
  );
}
