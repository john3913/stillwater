'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { VaultData } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const SECTIONS: {
  title: string;
  color: string;
  fields: { key: keyof VaultData; label: string; hint?: string }[];
}[] = [
  {
    title: 'Legal documents',
    color: '#7C5CAF',
    fields: [
      { key: 'willLocation', label: 'Will / last testament', hint: 'Where is the original document kept?' },
      { key: 'trustLocation', label: 'Trust documents', hint: 'Location of trust agreement, if any' },
    ],
  },
  {
    title: 'Financial accounts',
    color: '#5B8DEF',
    fields: [
      { key: 'bankInstitutions', label: 'Bank institutions & account types', hint: 'Names of banks / credit unions (no account numbers needed here)' },
      { key: 'retirementAccounts', label: 'Retirement accounts', hint: 'e.g. 401(k) at Fidelity, IRA at Vanguard — institution names + where statements are' },
      { key: 'lifeInsurance', label: 'Life insurance', hint: 'Carrier name, policy location, beneficiary' },
      { key: 'healthInsurance', label: 'Health insurance info location', hint: 'Where to find policy card, EOBs, and claims info' },
    ],
  },
  {
    title: 'Property',
    color: '#C08858',
    fields: [
      { key: 'realEstate', label: 'Real estate deeds', hint: 'Where are original deeds or mortgage documents?' },
      { key: 'vehicles', label: 'Vehicle titles', hint: 'Location of car, boat, or other vehicle titles' },
    ],
  },
  {
    title: 'Digital & secure access',
    color: '#C47090',
    fields: [
      { key: 'digitalPasswords', label: 'Password manager / digital access', hint: 'Where are passwords stored? Who has access to the master?' },
      { key: 'safeLocation', label: 'Safe or lockbox location', hint: 'Where is the safe? Who knows the combination?' },
      { key: 'safeCombo', label: 'Safe combination / key location', hint: 'Optional — or note who to contact' },
    ],
  },
  {
    title: 'Tax & other records',
    color: '#3E8868',
    fields: [
      { key: 'taxReturns', label: 'Tax returns location', hint: 'Where are prior years\' returns kept?' },
      { key: 'otherNotes', label: 'Other important notes', hint: 'Anything else loved ones need to know about finding important documents' },
    ],
  },
];

function VaultField({ label, hint, value, onChange }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#4A3870] mb-1">{label}</label>
      {hint && <p className="text-[10px] text-[#C4B0E8] mb-1.5 leading-relaxed">{hint}</p>}
      <textarea rows={2} value={value} onChange={e => onChange(e.target.value)}
        placeholder="Write here…"
        className="w-full rounded-xl px-4 py-2.5 text-sm placeholder:text-[#D0C4E8] focus:outline-none resize-none"
        style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
        onFocus={e => (e.target.style.borderColor = '#A090D8')}
        onBlur={e => (e.target.style.borderColor = '#E0D8F5')} />
    </div>
  );
}

export default function VaultPage() {
  const { plan, loaded, saveVault } = usePlan();
  const [form, setForm] = useState<VaultData>(plan.vault);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded) setForm(plan.vault);
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key: keyof VaultData) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));

  const handleSave = () => {
    saveVault(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const hasAny = Object.values(form).some(v => typeof v === 'string' && !!v);

  if (!loaded) return null;

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-12 no-print">
        <div className="mb-10">
          <Link href="/plan" className="back-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Your plan
          </Link>
        </div>

        <p className="text-xs tracking-[0.3em] text-[#C08858] uppercase mb-4">Health & estate</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Document vault
        </h1>
        <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-lg opacity-80">
          A private record of where everything important is kept. This becomes a map for your loved ones — print it and store it with your directive.
        </p>

        <div className="flex flex-col gap-6 mb-10">
          {SECTIONS.map(section => (
            <div key={section.title} className="bg-white rounded-3xl p-7"
              style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: section.color }} />
                <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: section.color }}>
                  {section.title}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {section.fields.map(f => (
                  <VaultField key={f.key} label={f.label} hint={f.hint}
                    value={form[f.key] as string} onChange={set(f.key)} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={handleSave}
            className="flex-1 py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
            {saved ? '✓ Saved' : 'Save vault'}
          </button>
          {hasAny && (
            <button onClick={() => window.print()}
              className="px-6 py-4 rounded-2xl text-sm font-medium text-[#C08858] transition-all hover:-translate-y-0.5"
              style={{ border: '1.5px solid #F0D0A8', background: 'white' }}>
              Print
            </button>
          )}
        </div>
      </div>

      {/* Print view */}
      <div className="vault-print">
        <div style={{ padding: '0.6in 0.8in', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1A1030' }}>
          <div style={{ borderBottom: '2px solid #F0D0A8', paddingBottom: 16, marginBottom: 28 }}>
            <p style={{ fontSize: '7pt', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C08858', margin: '0 0 4px 0' }}>Document Vault — Confidential</p>
            <p style={{ fontSize: '26pt', fontWeight: 400, margin: '0 0 4px 0', lineHeight: 1.1 }}>
              {plan.name ? `${plan.name}'s documents` : 'In case of my death'}
            </p>
            <p style={{ fontSize: '8pt', color: '#8070A8', margin: 0 }}>Keep this document with your healthcare directive in a secure location.</p>
          </div>

          {SECTIONS.map(section => {
            const hasContent = section.fields.some(f => form[f.key]);
            if (!hasContent) return null;
            return (
              <div key={section.title} style={{ marginBottom: 24, breakInside: 'avoid' }}>
                <p style={{ fontSize: '7pt', letterSpacing: '0.25em', textTransform: 'uppercase', color: section.color, margin: '0 0 10px 0', fontWeight: 600 }}>
                  {section.title}
                </p>
                {section.fields.filter(f => form[f.key]).map(f => (
                  <div key={f.key} style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: '7pt', color: '#8070A8', margin: '0 0 2px 0' }}>{f.label}</p>
                    <p style={{ fontSize: '10pt', color: '#1A1030', margin: 0, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                      {form[f.key] as string}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}

          <div style={{ marginTop: 40, borderTop: '1px solid #E0D8F5', paddingTop: 10 }}>
            <p style={{ fontSize: '6pt', color: '#C4B0E8', margin: 0 }}>stillwatercare.vercel.app · Private document</p>
          </div>
        </div>
      </div>

      <style>{`
        .vault-print { display: none; }
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white !important; }
          .vault-print { display: block !important; }
        }
      `}</style>
    </>
  );
}
