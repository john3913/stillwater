'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

export default function SharePage() {
  const { plan, loaded } = usePlan();
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    try {
      const json = JSON.stringify(plan);
      const bytes = new TextEncoder().encode(json);
      const encoded = btoa(String.fromCharCode(...new Uint8Array(bytes)));
      setShareUrl(`${window.location.origin}/view#${encoded}`);
    } catch {
      /* ignore */
    }
    setGenerating(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!loaded) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors">← Your plan</Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#5B8DEF] uppercase mb-4">Private sharing</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
        Share with family
      </h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md" style={{ opacity: 0.8 }}>
        Generate a private link to share a read-only snapshot of your plan with your proxy, family members, or care providers. No account needed to view it.
      </p>

      {/* Privacy warning */}
      <div className="rounded-2xl p-5 mb-8 flex gap-4 items-start"
        style={{ background: 'linear-gradient(135deg, #FFF8EE, #FEF0E4)', border: '1px solid #F0D0A8' }}>
        <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#C08858]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-[#7A4820]">This link contains your full plan</p>
          <p className="text-xs text-[#A06030] mt-1 leading-relaxed">
            Anyone with this link can read everything in your plan. Only share it with people you trust —
            your proxy, family members, or care providers.
          </p>
        </div>
      </div>

      {/* What's included */}
      <div className="bg-white rounded-3xl p-7 mb-8" style={{ border: '1px solid #E0D8F5' }}>
        <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-4 font-medium">What's included in the link</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Your medical wishes', color: '#7C5CAF' },
            { label: 'Your healthcare proxy', color: '#C47090' },
            { label: 'Your personal values', color: '#5E9E7E' },
            { label: 'Letters to loved ones', color: '#C08858' },
            { label: 'Final arrangements', color: '#9B68D0' },
            { label: 'Legal checklist', color: '#3E8868' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
              <p className="text-xs text-[#4A3870]">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#A090C0] mt-4 pt-4 leading-relaxed" style={{ borderTop: '1px solid #E0D8F5' }}>
          The link is a snapshot of your plan as it exists right now. Generate a new link after making changes.
        </p>
      </div>

      {/* Generate / show link */}
      {!shareUrl ? (
        <button onClick={generate} disabled={generating}
          className="w-full py-4 rounded-2xl text-sm font-medium text-white transition-all hover:-translate-y-0.5 active:translate-y-0"
          style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
          {generating ? 'Generating…' : 'Generate share link'}
        </button>
      ) : (
        <div className="bg-white rounded-3xl p-7" style={{ border: '1px solid #E0D8F5' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#E8F5EE' }}>
              <svg className="w-3 h-3 text-[#3E8868]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#1A1030]">Your link is ready</p>
          </div>

          <div className="flex gap-3 mb-4">
            <input readOnly value={shareUrl}
              className="flex-1 rounded-xl px-4 py-3 text-xs text-[#4A3870] focus:outline-none truncate"
              style={{ background: '#F5F0FF', border: '1px solid #E0D8F5' }}
              onClick={e => (e.target as HTMLInputElement).select()}
            />
            <button onClick={copy}
              className="px-5 py-3 rounded-xl text-xs font-medium text-white transition-all shrink-0 hover:-translate-y-0.5"
              style={copied
                ? { background: '#5E9E7E', boxShadow: '0 2px 8px rgba(94,158,126,0.3)' }
                : { background: GRAD, boxShadow: '0 2px 8px rgba(91,141,239,0.25)' }}>
              {copied ? '✓ Copied' : 'Copy link'}
            </button>
          </div>

          <button onClick={generate}
            className="text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors w-full text-center pt-2">
            Regenerate link
          </button>
        </div>
      )}

      {/* Also review */}
      <div className="mt-8 flex items-center gap-3 p-5 rounded-2xl" style={{ background: '#F5F0FF', border: '1px solid #E0D8F5' }}>
        <svg className="w-5 h-5 text-[#7C5CAF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-[#4A3870]">Want to review your directive before sharing?</p>
        </div>
        <Link href="/plan/review" className="text-xs text-[#7C5CAF] hover:text-[#5A3E8A] transition-colors font-medium shrink-0">
          Review →
        </Link>
      </div>
    </div>
  );
}
