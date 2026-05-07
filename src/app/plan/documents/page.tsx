'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { DocumentsData, DistributionEntry } from '@/lib/planTypes';

const P = '#7C5CAF';

function Toggle({ checked, onChange, label, description }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; description: string;
}) {
  return (
    <button onClick={() => onChange(!checked)}
      className="flex items-start gap-4 w-full text-left p-4 rounded-2xl transition-all"
      style={{ background: checked ? '#F5F0FF' : 'white', border: `1px solid ${checked ? '#C4B0E8' : '#E0D8F5'}` }}>
      <div className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
        style={{ background: checked ? P : 'white', border: `2px solid ${checked ? P : '#C4B0E8'}` }}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>}
      </div>
      <div>
        <p className="text-sm font-medium" style={{ color: checked ? '#2E1A60' : '#1A1030' }}>{label}</p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: checked ? P : '#8070A8' }}>{description}</p>
      </div>
    </button>
  );
}

function DistributionRow({ entry, onUpdate, onRemove }: {
  entry: DistributionEntry;
  onUpdate: (e: DistributionEntry) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: entry.hasCopy ? '#F5F0FF' : '#FAF8FF', border: `1px solid ${entry.hasCopy ? '#C4B0E8' : '#E0D8F5'}` }}>
      <button onClick={() => onUpdate({ ...entry, hasCopy: !entry.hasCopy })}
        className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
        style={{ background: entry.hasCopy ? P : 'white', border: `2px solid ${entry.hasCopy ? P : '#C4B0E8'}` }}>
        {entry.hasCopy && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#1A1030] truncate">{entry.name}</p>
        <p className="text-xs text-[#8070A8] truncate">{entry.relationship} · {entry.hasCopy ? 'Has a copy' : 'No copy yet'}</p>
      </div>
      <button onClick={onRemove} className="text-xs text-[#C4B0E8] hover:text-[#C47090] transition-colors">✕</button>
    </div>
  );
}

export default function DocumentsPage() {
  const { plan, loaded, saveDocuments, addDistributionEntry, updateDistributionEntry, removeDistributionEntry } = usePlan();
  const [form, setForm] = useState<DocumentsData>(plan.documents);
  const [newName, setNewName] = useState('');
  const [newRel, setNewRel] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (loaded) setForm(plan.documents); }, [loaded, plan.documents]);

  const update = (field: keyof DocumentsData) => (value: unknown) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    saveDocuments(updated);
  };

  const addPerson = () => {
    if (!newName.trim()) return;
    const entry: DistributionEntry = {
      id: crypto.randomUUID(), name: newName.trim(),
      relationship: newRel.trim(), hasCopy: false,
    };
    addDistributionEntry(entry);
    setForm(prev => ({ ...prev, distribution: [...prev.distribution, entry] }));
    setNewName('');
    setNewRel('');
  };

  const handleSave = () => {
    saveDocuments(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!loaded) return null;

  const inputStyle = { border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' };
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = '#A090D8');
  const inputBlur  = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = '#E0D8F5');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#7C5CAF] uppercase mb-4">Legal validity</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">Documents & distribution</h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        A Minnesota Health Care Directive must be written, dated, signed, and witnessed by a notary public or two witnesses to be legally enforceable. This section helps you confirm your directive is valid and in the right hands.
      </p>

      <div className="flex flex-col gap-6">

        {/* Legal checklist */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-1">Legal checklist</h2>
          <p className="text-xs text-[#8070A8] mb-6">Minnesota requirements for a valid health care directive.</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: '#EDE8FF' }}>
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#7C5CAF]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-[#4A3870]">Written and dated</p>
                <p className="text-xs text-[#7C5CAF] mt-0.5">Your plan in Stillwater is written and date-stamped automatically.</p>
              </div>
            </div>
            <Toggle checked={form.isSigned}
              onChange={v => { const d = { ...form, isSigned: v }; setForm(d); saveDocuments(d); }}
              label="Signed by me"
              description="I have printed my directive and signed it by hand, or will do so." />
            <Toggle checked={form.isWitnessed}
              onChange={v => { const d = { ...form, isWitnessed: v }; setForm(d); saveDocuments(d); }}
              label="Witnessed or notarized"
              description="My signature was witnessed by a notary public OR by two witnesses who are not my healthcare providers." />
            {form.isWitnessed && (
              <div className="flex gap-2 pl-9">
                {(['notary', 'two-witnesses'] as const).map(w => (
                  <button key={w} onClick={() => { const d = { ...form, witnessType: w }; setForm(d); saveDocuments(d); }}
                    className="px-4 py-2 rounded-full text-xs font-medium transition-all border"
                    style={form.witnessType === w
                      ? { borderColor: P, background: '#F5F0FF', color: P }
                      : { borderColor: '#E0D8F5', color: '#8070A8' }}>
                    {w === 'notary' ? 'Notary public' : 'Two witnesses'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {form.isSigned && form.isWitnessed && (
            <div className="mt-4 p-4 rounded-2xl flex items-center gap-3" style={{ background: '#E8F5EE', border: '1px solid #C0E8D0' }}>
              <svg className="w-5 h-5 text-[#3E8868] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-xs text-[#3E8868]">Your directive meets Minnesota's legal requirements. Make sure copies reach your proxy, family, and care providers.</p>
            </div>
          )}
        </div>

        {/* Storage */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-6">Where it's kept</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">Original document location</label>
              <input type="text" placeholder="e.g. In the fireproof box in my home office, top shelf"
                value={form.storageLocation}
                onChange={e => { const d = { ...form, storageLocation: e.target.value }; setForm(d); }}
                onBlur={() => saveDocuments(form)}
                className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none"
                style={inputStyle}
                onFocus={inputFocus}
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">Digital backup</label>
              <input type="text" placeholder="e.g. Scanned PDF in my Google Drive / Stillwater account"
                value={form.digitalBackup}
                onChange={e => { const d = { ...form, digitalBackup: e.target.value }; setForm(d); }}
                onBlur={() => saveDocuments(form)}
                className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none"
                style={inputStyle}
                onFocus={inputFocus}
                onBlurCapture={inputBlur}
              />
            </div>
            <div className="rounded-xl p-4 flex gap-3 items-start" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
              <svg className="w-4 h-4 text-[#C08858] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-xs text-[#7A4820] leading-relaxed">
                <strong>Do not keep your original in a safe deposit box.</strong> Banks are closed nights, weekends, and holidays — exactly when emergencies happen. Keep the signed original somewhere accessible at home or with your healthcare agent.
              </p>
            </div>
          </div>
        </div>

        {/* Distribution */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-1">Who has a copy</h2>
          <p className="text-xs text-[#8070A8] mb-4">Minnesota law says you should give copies to your proxy, family members, and healthcare providers. Track who has received one.</p>
          <div className="rounded-xl p-4 mb-5 flex gap-3 items-start" style={{ background: '#EBF2FF', border: '1px solid #BDD0FF' }}>
            <svg className="w-4 h-4 text-[#5B8DEF] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-[#3A6090] leading-relaxed">
              <strong>Minnesota driver&apos;s license tip:</strong> You can note that you have a health care directive on your MN driver&apos;s license or state ID. Visit any Driver and Vehicle Services (DVS) office or update your record at dvs.mn.gov.
            </p>
          </div>

          {plan.documents.distribution.length === 0 && (
            <p className="text-sm text-[#C4B0E8] mb-4 italic">No one added yet. Add your proxy, family, and doctor.</p>
          )}

          <div className="flex flex-col gap-2 mb-4">
            {plan.documents.distribution.map(entry => (
              <DistributionRow key={entry.id} entry={entry}
                onUpdate={e => { updateDistributionEntry(e); setForm(prev => ({ ...prev, distribution: prev.distribution.map(d => d.id === e.id ? e : d) })); }}
                onRemove={() => { removeDistributionEntry(entry.id); setForm(prev => ({ ...prev, distribution: prev.distribution.filter(d => d.id !== entry.id) })); }}
              />
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <input type="text" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm placeholder:text-[#C4B0E8] focus:outline-none"
              style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
            />
            <input type="text" placeholder="Relationship" value={newRel} onChange={e => setNewRel(e.target.value)}
              className="w-32 rounded-xl px-4 py-2.5 text-sm placeholder:text-[#C4B0E8] focus:outline-none"
              style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}
              onKeyDown={e => e.key === 'Enter' && addPerson()}
            />
            <button onClick={addPerson}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ background: '#EDE8FF', color: P }}>
              Add
            </button>
          </div>
        </div>

        {/* POLST info */}
        <div className="rounded-3xl p-8" style={{ background: '#EDF7F3', border: '1px solid #B8E0D0' }}>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#C8EED8', color: '#3E8868' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#1A1030]">Consider a POLST form</h2>
              <p className="text-xs text-[#3E6858] mt-1 leading-relaxed">
                A POLST (Physician Orders for Life-Sustaining Treatment) is a separate medical order — signed by both you and your doctor — that is honored immediately by emergency responders. It complements your health care directive but is not the same thing.
              </p>
            </div>
          </div>
          <Link href="/plan/polst"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#3E8868] hover:text-[#2A6050] transition-colors">
            Learn about POLST in Minnesota →
          </Link>
        </div>

        {/* Revocation info */}
        <div className="rounded-3xl p-8" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-4">How to cancel or update your directive</h2>
          <p className="text-xs text-[#4A3870] leading-relaxed mb-4 opacity-80">Minnesota law allows you to cancel your directive at any time by any of these methods:</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Write a statement saying you want to cancel it',
              'Destroy the physical document',
              'Tell at least two people you\'re cancelling it',
              'Sign a new health care directive',
            ].map(m => (
              <div key={m} className="flex items-start gap-2 text-xs text-[#4A3870]">
                <span className="text-[#C4B0E8] mt-0.5">◇</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between mt-10">
        <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
        <button onClick={handleSave}
          className="px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all"
          style={{ background: saved ? '#5A3E8A' : '#7C5CAF', color: 'white' }}>
          {saved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
    </div>
  );
}
