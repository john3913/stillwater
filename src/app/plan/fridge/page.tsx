'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { PlanData } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

function codeStatus(cpr: string, vent: string): { label: string; color: string; bg: string } {
  if (cpr === 'no' && vent === 'no') return { label: 'DNR / DNI — No resuscitation', color: '#C47090', bg: '#FDE8EF' };
  if (cpr === 'no') return { label: 'DNR — No CPR', color: '#C08858', bg: '#FEF0E4' };
  if (vent === 'no') return { label: 'DNI — No intubation', color: '#9B68D0', bg: '#F0EBFF' };
  if (cpr === 'yes' && vent === 'yes') return { label: 'Full code — All interventions', color: '#3E8868', bg: '#E8F5EE' };
  return { label: 'Modified code — See directive', color: '#5B8DEF', bg: '#EBF2FF' };
}

function FridgeSheet({ plan }: { plan: PlanData }) {
  const cs = codeStatus(plan.wishes.cpr, plan.wishes.ventilator);
  const hasProxy = !!plan.proxy.primaryName;

  return (
    <div style={{ background: 'white', width: '100%', height: '100%', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header band */}
      <div style={{ background: 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)', padding: '14px 24px', flexShrink: 0 }}>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '8pt', letterSpacing: '0.28em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>
          Minnesota Health Care Directive — Emergency Reference
        </p>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Name */}
        <div>
          <p style={{ fontSize: '7pt', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 4px 0' }}>Name of patient</p>
          <p style={{ fontSize: '28pt', fontWeight: 700, color: '#1A1030', margin: 0, lineHeight: 1, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {plan.name || '(Name not entered)'}
          </p>
          {(plan.principalDOB || plan.principalAddress) && (
            <p style={{ fontSize: '8pt', color: '#6A5890', margin: '4px 0 0 0', lineHeight: 1.5 }}>
              {plan.principalDOB && `DOB: ${plan.principalDOB}`}
              {plan.principalDOB && plan.principalAddress && '  ·  '}
              {plan.principalAddress && plan.principalAddress.slice(0, 60)}
            </p>
          )}
        </div>

        {/* Code status — most critical */}
        <div style={{ borderRadius: 10, padding: '14px 18px', background: cs.bg, border: `2px solid ${cs.color}22` }}>
          <p style={{ fontSize: '7pt', letterSpacing: '0.25em', textTransform: 'uppercase', color: cs.color, margin: '0 0 4px 0', fontWeight: 700, opacity: 0.7 }}>Code status</p>
          <p style={{ fontSize: '16pt', fontWeight: 700, color: cs.color, margin: 0, lineHeight: 1.2 }}>
            {cs.label}
          </p>
          {plan.wishes.painPriority && (
            <p style={{ fontSize: '8pt', color: '#4A3870', margin: '6px 0 0 0', opacity: 0.8 }}>
              Pain priority: {plan.wishes.painPriority === 'comfort' ? 'Comfort first — minimize pain even if it shortens life'
                : plan.wishes.painPriority === 'treatment' ? 'Treat fully — prioritize life extension'
                : 'Balanced approach'}
            </p>
          )}
        </div>

        {/* Two-column: proxy + document location */}
        <div style={{ display: 'flex', gap: 16 }}>

          {/* Healthcare proxy */}
          <div style={{ flex: 1, borderRadius: 10, border: '1.5px solid #E0D8F5', padding: '12px 16px' }}>
            <p style={{ fontSize: '7pt', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 8px 0', fontWeight: 600 }}>Healthcare proxy</p>
            {hasProxy ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{ fontSize: '13pt', fontWeight: 700, color: '#1A1030', margin: 0, lineHeight: 1 }}>
                  {plan.proxy.primaryName}
                </p>
                {plan.proxy.primaryRelationship && (
                  <p style={{ fontSize: '8pt', color: '#6A5890', margin: 0 }}>{plan.proxy.primaryRelationship}</p>
                )}
                {plan.proxy.primaryPhone && (
                  <p style={{ fontSize: '14pt', fontWeight: 700, color: '#5B8DEF', margin: 0, lineHeight: 1 }}>
                    {plan.proxy.primaryPhone}
                  </p>
                )}
                {plan.proxy.alternateName && (
                  <div style={{ borderTop: '1px solid #E0D8F5', paddingTop: 6, marginTop: 2 }}>
                    <p style={{ fontSize: '7pt', color: '#A090C0', margin: '0 0 2px 0' }}>Alternate</p>
                    <p style={{ fontSize: '10pt', fontWeight: 600, color: '#4A3870', margin: 0 }}>{plan.proxy.alternateName}</p>
                    {plan.proxy.alternatePhone && (
                      <p style={{ fontSize: '9pt', color: '#5B8DEF', margin: 0 }}>{plan.proxy.alternatePhone}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontSize: '9pt', color: '#C4B0E8', fontStyle: 'italic', margin: 0 }}>No proxy named yet</p>
            )}
          </div>

          {/* Document location */}
          <div style={{ flex: 1, borderRadius: 10, border: '1.5px solid #E0D8F5', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <p style={{ fontSize: '7pt', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 4px 0', fontWeight: 600 }}>Full directive located at</p>
              <p style={{ fontSize: '9pt', color: '#1A1030', margin: 0, lineHeight: 1.5 }}>
                {plan.documents.storageLocation || '(Location not documented)'}
              </p>
            </div>
            {plan.documents.digitalBackup && (
              <div>
                <p style={{ fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 3px 0' }}>Digital backup</p>
                <p style={{ fontSize: '8pt', color: '#4A3870', margin: 0, lineHeight: 1.4 }}>{plan.documents.digitalBackup.slice(0, 60)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional wishes summary */}
        {(plan.wishes.organDonation || plan.wishes.setting) && (
          <div style={{ borderTop: '1px solid #E0D8F5', paddingTop: 12, display: 'flex', gap: 20 }}>
            {plan.wishes.organDonation && (
              <div>
                <p style={{ fontSize: '6.5pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 2px 0' }}>Organ donation</p>
                <p style={{ fontSize: '8.5pt', color: '#4A3870', margin: 0 }}>
                  {plan.wishes.organDonation === 'yes' ? 'Yes — all organs/tissues'
                    : plan.wishes.organDonation === 'no' ? 'No donation'
                    : plan.wishes.organDonation === 'registered' ? 'Registered donor (MN)'
                    : 'Specific organs only — see directive'}
                </p>
              </div>
            )}
            {plan.wishes.setting && (
              <div>
                <p style={{ fontSize: '6.5pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 2px 0' }}>Preferred care setting</p>
                <p style={{ fontSize: '8.5pt', color: '#4A3870', margin: 0 }}>
                  {plan.wishes.setting === 'home' ? 'Home'
                    : plan.wishes.setting === 'hospice' ? 'Hospice'
                    : plan.wishes.setting === 'hospital' ? 'Hospital'
                    : 'No strong preference'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #F0EBF8', paddingTop: 10 }}>
          <p style={{ fontSize: '6pt', color: '#C4B0E8', margin: 0, letterSpacing: '0.08em' }}>stillwatercare.vercel.app</p>
          <p style={{ fontSize: '6pt', color: '#C4B0E8', margin: 0, letterSpacing: '0.06em' }}>A complete directive is on file — ask the healthcare proxy or the named location above.</p>
        </div>
      </div>
    </div>
  );
}

export default function FridgePage() {
  const { plan, loaded } = usePlan();

  if (!loaded) return null;

  const hasContent = plan.name || plan.proxy.primaryName || plan.wishes.cpr;

  return (
    <>
      {/* ── Screen view ── */}
      <div className="max-w-4xl mx-auto px-6 py-12 no-print">
        <div className="mb-10">
          <Link href="/plan" className="back-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Your plan
          </Link>
        </div>

        <p className="text-xs tracking-[0.3em] text-[#3E8868] uppercase mb-4">Emergency reference</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Fridge emergency sheet
        </h1>
        <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
          A full-page (8.5×11) printable for your refrigerator, door, or bedside. First responders are trained to look here. Large text, clear hierarchy, everything they need.
        </p>

        {!hasContent && (
          <div className="rounded-2xl p-5 mb-8 flex gap-3 items-start" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
            <svg className="w-4 h-4 text-[#C08858] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-xs text-[#7A4820] leading-relaxed">
              Add your name, healthcare proxy, and medical wishes to make this sheet useful. Start with{' '}
              <Link href="/plan/wishes" className="underline">Your Wishes</Link> and <Link href="/plan/proxy" className="underline">Your Proxy</Link>.
            </p>
          </div>
        )}

        {/* Preview */}
        <div className="mb-8">
          <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-3">Preview</p>
          <div style={{ width: '100%', aspectRatio: '8.5 / 11', border: '1px solid #E0D8F5', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(90,62,138,0.1)', maxWidth: 560 }}>
            <FridgeSheet plan={plan} />
          </div>
          <p className="text-[10px] text-[#C4B0E8] mt-2">Prints at 8.5 × 11 inches (US Letter)</p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-3xl p-7 mb-6" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-4 font-medium">How to use</p>
          <div className="flex flex-col gap-3">
            {[
              'Click "Print sheet" — the full-page version will appear.',
              'In your print dialog: Paper = Letter, Margins = None or Minimum.',
              'Post it on your refrigerator or inside your front door.',
              'EMS and first responders are trained to check the fridge. Hospitals appreciate it too.',
              'Update and reprint whenever your plan changes.',
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#C4B0E8] text-xs shrink-0">{i + 1}.</span>
                <p className="text-xs text-[#4A3870] leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => window.print()}
          className="w-full py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
          Print sheet
        </button>
      </div>

      {/* ── Print-only full page ── */}
      <div className="fridge-print-page">
        <FridgeSheet plan={plan} />
      </div>

      <style>{`
        .fridge-print-page { display: none; }

        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white !important; margin: 0; }

          .fridge-print-page {
            display: block !important;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
          }
        }
      `}</style>
    </>
  );
}
