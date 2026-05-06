'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { PlanData } from '@/lib/planTypes';
import { defaultPlan } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const WISH_LABELS: Record<string, Record<string, string>> = {
  cpr: { yes: 'Yes — attempt CPR', limited: 'For a limited trial, then reassess', no: 'Allow a natural death — do not attempt CPR' },
  ventilator: { yes: 'Yes — use a mechanical ventilator', limited: 'For a limited trial period', no: 'No mechanical ventilation — comfort care only' },
  dialysis: { yes: 'Yes — use dialysis', limited: 'For a limited trial', no: 'No dialysis — comfort care only' },
  feedingTube: { yes: 'Yes — use a feeding tube', limited: 'For a limited trial', no: 'No feeding tube — comfort care' },
  setting: { home: 'At home', hospice: 'In a hospice or palliative care facility', hospital: 'In a hospital', depends: 'Wherever is best — let proxy and care team decide' },
  painPriority: { comfort: 'Prioritize comfort above all else', balance: 'Balance comfort and available treatments', treatment: 'Pursue every available treatment' },
  organDonation: { yes: 'Yes — donate any organs or tissues', specific: 'Yes, with specific conditions (see notes)', no: 'No — prefer not to donate', registered: 'Already registered as a state donor' },
};

const WISH_TAGS: [string, string][] = [
  ['cpr', 'Resuscitation (CPR)'],
  ['ventilator', 'Breathing Support'],
  ['dialysis', 'Kidney Support'],
  ['feedingTube', 'Artificial Nutrition'],
  ['setting', 'Care Setting'],
  ['painPriority', 'Comfort Priority'],
  ['organDonation', 'Organ & Tissue Donation'],
];

const ARRANGEMENT_LABELS: Record<string, string> = {
  burial: 'Traditional burial',
  cremation: 'Cremation',
  'donate-science': 'Body donation to medical science',
  other: 'Other or undecided — see notes',
};

const SERVICE_LABELS: Record<string, string> = {
  religious: 'Religious service',
  celebration: 'Celebration of life',
  private: 'Private family gathering',
  graveside: 'Graveside ceremony only',
  none: 'No formal service',
};

const QUALITY_LABELS: Record<string, string> = {
  quality: 'Quality of life comes first',
  balance: 'A balance between quality and length of life',
  quantity: 'Length of life comes first',
};

const WHEN_LABELS: Record<string, string> = {
  death: 'To be read after passing',
  incapacity: 'If unable to communicate',
  anytime: 'Shareable anytime',
};

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="mb-3">
      <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">{label}</p>
      <p className="text-sm text-[#1A1030] leading-relaxed">{value}</p>
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-8 mb-6" style={{ border: '1px solid #E0D8F5' }}>
      <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid #E0D8F5' }}>
        <div className="w-1 h-6 rounded-full" style={{ background: color }} />
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function ViewPage() {
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const hash = window.location.hash.slice(1);
      if (!hash) { setError('No plan data found in this link.'); setLoading(false); return; }
      const bytes = Uint8Array.from(atob(hash), c => c.charCodeAt(0));
      const json = new TextDecoder().decode(bytes);
      const data = JSON.parse(json) as Partial<PlanData>;
      setPlan({ ...defaultPlan, ...data });
    } catch {
      setError('This link appears to be invalid or corrupted.');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full mx-auto mb-4 animate-spin"
            style={{ border: '2px solid #E0D8F5', borderTopColor: '#9B5CAF' }} />
          <p className="text-xs text-[#A090C0] tracking-wider">Loading plan…</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-[#FAF8FF] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#FDE8EF' }}>
          <svg className="w-8 h-8 text-[#C47090]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030] mb-3">Link not recognized</h2>
        <p className="text-[#8070A8] text-sm mb-8">{error}</p>
        <Link href="/" className="text-xs text-[#7C5CAF] hover:text-[#5A3E8A] transition-colors">← Go to Stillwater</Link>
      </div>
    );
  }

  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8FF]/85 backdrop-blur-lg border-b border-[#E0D8F5] no-print">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-cormorant)] text-xl italic font-light tracking-[0.2em]"
              style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              stillwater
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#A090C0]">care plan</span>
          </Link>
          <button onClick={() => window.print()}
            className="px-5 py-2 rounded-full text-xs font-medium text-white transition-all hover:-translate-y-0.5"
            style={{ background: GRAD, boxShadow: '0 3px 12px rgba(91,141,239,0.25)' }}>
            Print / Save PDF
          </button>
        </div>
      </nav>

      <div className="pt-16 max-w-4xl mx-auto px-6 py-10">

        {/* View-only notice */}
        <div className="rounded-2xl p-4 mb-8 flex gap-3 items-center no-print"
          style={{ background: '#EBF2FF', border: '1px solid #BDD0FF' }}>
          <svg className="w-4 h-4 text-[#5B8DEF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <p className="text-xs text-[#3A6090]">
            This is a <strong>view-only</strong> shared plan. It was shared privately and is not connected to any account.
          </p>
        </div>

        {/* Document header */}
        <div className="text-center py-10 rounded-3xl mb-8"
          style={{ background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF, #FDE8EF)', border: '1px solid rgba(155,92,175,0.14)' }}>
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#8070A8] mb-3">Minnesota Health Care Directive</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#1A1030] mb-2">Advance Care Plan</h1>
          <p className="text-xs text-[#8070A8]">Shared via Stillwater · {date}</p>
        </div>

        {/* Section I: Proxy */}
        <Section title="I · Healthcare Agent" color="#C47090">
          {plan.proxy.primaryName ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-3 font-medium">Primary Agent</p>
                <Row label="Name" value={plan.proxy.primaryName} />
                <Row label="Relationship" value={plan.proxy.primaryRelationship} />
                <Row label="Phone" value={plan.proxy.primaryPhone} />
                <Row label="Email" value={plan.proxy.primaryEmail} />
              </div>
              {plan.proxy.alternateName && (
                <div>
                  <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-3 font-medium">Alternate Agent</p>
                  <Row label="Name" value={plan.proxy.alternateName} />
                  <Row label="Relationship" value={plan.proxy.alternateRelationship} />
                  <Row label="Phone" value={plan.proxy.alternatePhone} />
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-[#C4B0E8] italic">No proxy named in this plan.</p>
          )}
          {plan.proxy.notes && (
            <div className="mt-5 p-4 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
              <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">Message to my proxy</p>
              <p className="text-sm text-[#4A3870] italic leading-relaxed">"{plan.proxy.notes}"</p>
            </div>
          )}
        </Section>

        {/* Section II: Medical Wishes */}
        <Section title="II · Medical Wishes" color="#7C5CAF">
          {WISH_TAGS.some(([k]) => (plan.wishes as Record<string, string>)[k]) ? (
            <div className="flex flex-col gap-3">
              {WISH_TAGS.map(([key, tag]) => {
                const val = (plan.wishes as Record<string, string>)[key];
                if (!val) return null;
                return (
                  <div key={key} className="flex gap-4 p-4 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#9B5CAF' }} />
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">{tag}</p>
                      <p className="text-sm text-[#1A1030]">{WISH_LABELS[key]?.[val] ?? val}</p>
                    </div>
                  </div>
                );
              })}
              {plan.wishes.additionalNotes && (
                <div className="mt-2 p-4 rounded-2xl" style={{ background: '#F5F0FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">Additional notes</p>
                  <p className="text-sm text-[#4A3870] leading-relaxed">{plan.wishes.additionalNotes}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-[#C4B0E8] italic">No medical wishes recorded in this plan.</p>
          )}
        </Section>

        {/* Section III: Values */}
        <Section title="III · Personal Values" color="#5E9E7E">
          {plan.values.whatMatters || plan.values.qualityVsQuantity ? (
            <div className="flex flex-col gap-5">
              {plan.values.whatMatters && (
                <div className="p-5 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">What matters most to me</p>
                  <p className="text-sm text-[#4A3870] italic leading-relaxed">"{plan.values.whatMatters}"</p>
                </div>
              )}
              {plan.values.qualityVsQuantity && <Row label="Quality vs. length of life" value={QUALITY_LABELS[plan.values.qualityVsQuantity] ?? ''} />}
              {plan.values.biggestFear && <Row label="What I fear most" value={plan.values.biggestFear} />}
              {plan.values.biggestHope && <Row label="What I hope for" value={plan.values.biggestHope} />}
              {plan.values.spiritualBeliefs && <Row label="Spiritual or religious beliefs" value={plan.values.spiritualBeliefs} />}
              {plan.values.importantRituals && <Row label="Cultural or family traditions" value={plan.values.importantRituals} />}
            </div>
          ) : (
            <p className="text-sm text-[#C4B0E8] italic">No values recorded in this plan.</p>
          )}
        </Section>

        {/* Section IV: Letters */}
        <Section title="IV · Letters to Loved Ones" color="#C08858">
          {plan.letters.length > 0 ? (
            <div className="flex flex-col gap-4">
              {plan.letters.map(l => (
                <div key={l.id} className="p-6 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-base font-medium text-[#1A1030] font-[family-name:var(--font-cormorant)]">{l.subject || 'Untitled letter'}</p>
                      <p className="text-xs text-[#8070A8]">To: {l.to}</p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full text-[#C08858] bg-[#FEF0E4] shrink-0 ml-4">
                      {WHEN_LABELS[l.deliverWhen]}
                    </span>
                  </div>
                  <p className="text-sm text-[#4A3870] leading-relaxed whitespace-pre-wrap">{l.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#C4B0E8] italic">No letters in this plan.</p>
          )}
        </Section>

        {/* Section V: Arrangements */}
        <Section title="V · Final Arrangements" color="#9B68D0">
          {plan.arrangements.afterPassing ? (
            <div className="flex flex-col gap-4">
              <Row label="After I pass" value={ARRANGEMENT_LABELS[plan.arrangements.afterPassing] ?? ''} />
              {plan.arrangements.afterPassingNotes && <Row label="Notes" value={plan.arrangements.afterPassingNotes} />}
              {plan.arrangements.serviceType && <Row label="Memorial service" value={SERVICE_LABELS[plan.arrangements.serviceType] ?? ''} />}
              {plan.arrangements.serviceNotes && <Row label="Service notes" value={plan.arrangements.serviceNotes} />}
              {plan.arrangements.music && <Row label="Music" value={plan.arrangements.music} />}
              {plan.arrangements.readings && <Row label="Readings or poems" value={plan.arrangements.readings} />}
              {plan.arrangements.finalResting && <Row label="Final resting place" value={plan.arrangements.finalResting} />}
              {(plan.arrangements.willLocation || plan.arrangements.attorney) && (
                <div className="mt-2 pt-4" style={{ borderTop: '1px solid #E0D8F5' }}>
                  <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-3">Practical matters</p>
                  {plan.arrangements.willLocation && <Row label="Will location" value={plan.arrangements.willLocation} />}
                  {plan.arrangements.insuranceLocation && <Row label="Insurance documents" value={plan.arrangements.insuranceLocation} />}
                  {plan.arrangements.attorney && <Row label="Attorney" value={plan.arrangements.attorney} />}
                  {plan.arrangements.financialAdvisor && <Row label="Financial advisor" value={plan.arrangements.financialAdvisor} />}
                  {plan.arrangements.guardianPreference && <Row label="Guardian preference" value={plan.arrangements.guardianPreference} />}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-[#C4B0E8] italic">No arrangements recorded in this plan.</p>
          )}
        </Section>

        {/* Footer */}
        <div className="mt-10 py-8 text-center" style={{ borderTop: '1px solid #E0D8F5' }}>
          <p className="text-xs text-[#A090C0] tracking-wider mb-4">
            This plan was prepared with Stillwater. To create your own, visit stillwatercare.vercel.app
          </p>
          <Link href="/"
            className="inline-flex items-center gap-2 text-xs text-[#7C5CAF] hover:text-[#5A3E8A] transition-colors">
            <span className="font-[family-name:var(--font-cormorant)] italic tracking-[0.15em]">stillwater</span>
            <span className="text-[9px] tracking-widest uppercase text-[#A090C0]">care plan</span>
          </Link>
        </div>

      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
