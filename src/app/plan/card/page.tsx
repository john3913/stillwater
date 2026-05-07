'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { usePlan } from '@/hooks/usePlan';
import type { PlanData } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const CPR_SHORT: Record<string, string> = {
  yes: 'CPR: Yes', no: 'CPR: No (DNR)', limited: 'CPR: Limited trial',
};
const VENT_SHORT: Record<string, string> = {
  yes: 'Vent: Yes', no: 'Vent: No', limited: 'Vent: Limited trial',
};
const PAIN_SHORT: Record<string, string> = {
  comfort: 'Comfort-first', balance: 'Balanced care', treatment: 'Treat fully',
};

function qrText(plan: PlanData): string {
  return [
    'HEALTH CARE DIRECTIVE',
    plan.name || null,
    plan.proxy.primaryName
      ? `PROXY: ${plan.proxy.primaryName}${plan.proxy.primaryPhone ? ` · ${plan.proxy.primaryPhone}` : ''}`
      : null,
    plan.wishes.cpr === 'no' ? 'DNR / No CPR' : plan.wishes.cpr === 'yes' ? 'Full code (CPR)' : plan.wishes.cpr === 'limited' ? 'CPR — limited trial' : null,
    plan.documents.storageLocation ? `Doc: ${plan.documents.storageLocation.slice(0, 45)}` : null,
    'stillwatercare.vercel.app',
  ].filter(Boolean).join('\n');
}

function WalletCard({ plan, qrDataUrl }: { plan: PlanData; qrDataUrl: string }) {
  const proxyName = plan.proxy.primaryName || null;
  const proxyPhone = plan.proxy.primaryPhone || null;
  const proxyRel = plan.proxy.primaryRelationship || null;

  const wishes = [
    plan.wishes.cpr && CPR_SHORT[plan.wishes.cpr],
    plan.wishes.ventilator && VENT_SHORT[plan.wishes.ventilator],
    plan.wishes.painPriority && PAIN_SHORT[plan.wishes.painPriority],
  ].filter(Boolean) as string[];

  return (
    <div style={{ background: 'white', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      {/* Gradient header */}
      <div style={{ background: GRAD, padding: '5px 12px', flexShrink: 0 }}>
        <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '5.5pt', letterSpacing: '0.24em', textTransform: 'uppercase', margin: 0, fontWeight: 600 }}>
          Minnesota Health Care Directive
        </p>
      </div>

      {/* Body — 2 columns */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

        {/* Left: content */}
        <div style={{ flex: 1, padding: '7px 10px 6px', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <p style={{ fontSize: '13pt', fontWeight: 700, color: '#1A1030', margin: 0, lineHeight: 1.1, fontFamily: 'Georgia, "Times New Roman", serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {plan.name || '(Your name)'}
          </p>

          {/* Proxy */}
          <div style={{ borderTop: '0.5px solid #E0D8F5', paddingTop: 4 }}>
            {proxyName ? (
              <div>
                <p style={{ fontSize: '5pt', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#A090C0', margin: '0 0 1.5px 0' }}>Healthcare Proxy</p>
                <p style={{ fontSize: '7pt', color: '#1A1030', margin: 0, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {proxyName}{proxyRel ? ` (${proxyRel})` : ''}
                  {proxyPhone && <span style={{ color: '#5B8DEF' }}> · {proxyPhone}</span>}
                </p>
              </div>
            ) : (
              <p style={{ fontSize: '6.5pt', color: '#C4B0E8', fontStyle: 'italic', margin: 0 }}>No proxy named yet</p>
            )}
          </div>

          {/* Wishes */}
          {wishes.length > 0 && (
            <div style={{ borderTop: '0.5px solid #E0D8F5', paddingTop: 4, flex: 1 }}>
              <p style={{ fontSize: '5pt', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#A090C0', margin: '0 0 2px 0' }}>My Wishes</p>
              {wishes.map((w, i) => (
                <p key={i} style={{ fontSize: '6.5pt', color: '#1A1030', margin: '0 0 1px 0', lineHeight: 1.3 }}>· {w}</p>
              ))}
            </div>
          )}

          {/* Location + URL */}
          <div style={{ borderTop: '0.5px solid #E0D8F5', paddingTop: 4, marginTop: 'auto' }}>
            {plan.documents.storageLocation && (
              <p style={{ fontSize: '5.5pt', color: '#4A3870', margin: '0 0 1px 0', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#A090C0', textTransform: 'uppercase', fontSize: '5pt', letterSpacing: '0.1em' }}>Doc: </span>
                {plan.documents.storageLocation.slice(0, 50)}{plan.documents.storageLocation.length > 50 ? '…' : ''}
              </p>
            )}
            <p style={{ fontSize: '5pt', color: '#C4B0E8', margin: 0, letterSpacing: '0.05em' }}>stillwatercare.vercel.app</p>
          </div>
        </div>

        {/* Right: QR code */}
        <div style={{ width: 72, flexShrink: 0, borderLeft: '0.5px solid #E0D8F5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6px 5px', gap: 4, background: '#FAFAFF' }}>
          {qrDataUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="QR code — scan for emergency info" width={58} height={58} style={{ imageRendering: 'pixelated', display: 'block' }} />
              <p style={{ fontSize: '4.5pt', textAlign: 'center', color: '#A090C0', letterSpacing: '0.06em', lineHeight: 1.3, margin: 0 }}>
                SCAN FOR<br />FULL INFO
              </p>
            </>
          ) : (
            <div style={{ width: 58, height: 58, background: '#F0EBF8', borderRadius: 4 }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CardPage() {
  const { plan, loaded } = usePlan();
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (!loaded) return;
    QRCode.toDataURL(qrText(plan), {
      errorCorrectionLevel: 'L',
      margin: 1,
      width: 174,
      color: { dark: '#1A1030', light: '#FAFAFF' },
    }).then(setQrDataUrl).catch(() => {});
  }, [loaded, plan]);

  if (!loaded) return null;

  const missing = [
    !plan.name && 'your name (add it on your plan dashboard)',
    !plan.proxy.primaryName && 'your healthcare proxy',
    !plan.wishes.cpr && 'your CPR preference',
  ].filter(Boolean) as string[];

  return (
    <>
      {/* ── Screen view ── */}
      <div className="max-w-4xl mx-auto px-6 py-12 no-print">
        <div className="mb-10">
          <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
        </div>

        <p className="text-xs tracking-[0.3em] text-[#5B8DEF] uppercase mb-4">Emergency card</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Wallet summary card
        </h1>
        <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
          A printable credit-card-sized card. The QR code encodes your key wishes and proxy contact so first responders get critical info instantly — even without internet.
        </p>

        {/* Preview */}
        <div className="mb-8">
          <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-3">Preview</p>
          <div style={{ width: 280, height: 160, border: '1px solid #E0D8F5', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 20px rgba(90,62,138,0.1)' }}>
            <WalletCard plan={plan} qrDataUrl={qrDataUrl} />
          </div>
          <p className="text-[10px] text-[#C4B0E8] mt-2">Actual card size: 3½ × 2 inches (credit card)</p>
        </div>

        {/* Missing data warning */}
        {missing.length > 0 && (
          <div className="rounded-2xl p-4 mb-6 flex gap-3 items-start" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
            <svg className="w-4 h-4 text-[#C08858] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-xs text-[#7A4820] leading-relaxed">
              <strong>Card is missing:</strong> {missing.join(', ')}. Complete those sections to make the card more useful.
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-3xl p-7 mb-6" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-4 font-medium">How to print</p>
          <div className="flex flex-col gap-3">
            {[
              'Click "Print card" — two cards appear side by side with cut guides.',
              'In your print dialog: Paper = Letter, Margins = None (or Minimum).',
              'Print, cut along the dotted lines.',
              'Keep one in your wallet. Give the other to your healthcare proxy.',
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
          Print card
        </button>
      </div>

      {/* ── Print-only: 2 cards with cut guides ── */}
      <div className="print-cards-page">
        <p className="print-label">Cut along dotted lines · Keep one · Give one to your proxy</p>
        <div className="print-cards-row">
          <div className="print-card-cut">
            <WalletCard plan={plan} qrDataUrl={qrDataUrl} />
          </div>
          <div className="print-card-cut">
            <WalletCard plan={plan} qrDataUrl={qrDataUrl} />
          </div>
        </div>
      </div>

      <style>{`
        .print-cards-page { display: none; }

        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white !important; margin: 0; }

          .print-cards-page {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            padding: 0.6in 0.5in 0;
          }

          .print-label {
            font-size: 7pt;
            color: #999;
            letter-spacing: 0.06em;
            text-align: center;
            margin-bottom: 0.3in;
          }

          .print-cards-row {
            display: flex;
            gap: 0.35in;
          }

          .print-card-cut {
            width: 3.5in;
            height: 2in;
            border: 1.5px dashed #C4B0E8;
            overflow: hidden;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
}
