'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { MedicalData, MedicationEntry } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function Field({ label, hint, value, onChange, rows = 2 }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#4A3870] mb-1">{label}</label>
      {hint && <p className="text-[10px] text-[#C4B0E8] mb-1.5 leading-relaxed">{hint}</p>}
      {rows === 1 ? (
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="w-full rounded-xl px-4 py-2.5 text-sm placeholder:text-[#D0C4E8] focus:outline-none"
          style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
          onFocus={e => (e.target.style.borderColor = '#A090D8')}
          onBlur={e => (e.target.style.borderColor = '#E0D8F5')} />
      ) : (
        <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)}
          className="w-full rounded-xl px-4 py-2.5 text-sm placeholder:text-[#D0C4E8] focus:outline-none resize-none"
          style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
          onFocus={e => (e.target.style.borderColor = '#A090D8')}
          onBlur={e => (e.target.style.borderColor = '#E0D8F5')} />
      )}
    </div>
  );
}

export default function MedicalPage() {
  const { plan, loaded, saveMedical } = usePlan();
  const [form, setForm] = useState<MedicalData>(plan.medical);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded) setForm(plan.medical);
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key: keyof MedicalData) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));

  const handleSave = () => {
    saveMedical(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addMed = () => {
    const entry: MedicationEntry = { id: genId(), name: '', dose: '', prescriber: '' };
    setForm(prev => ({ ...prev, medications: [...prev.medications, entry] }));
  };

  const updateMed = (id: string, field: keyof MedicationEntry, value: string) => {
    setForm(prev => ({
      ...prev,
      medications: prev.medications.map(m => m.id === id ? { ...m, [field]: value } : m),
    }));
  };

  const removeMed = (id: string) => {
    setForm(prev => ({ ...prev, medications: prev.medications.filter(m => m.id !== id) }));
  };

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

        <p className="text-xs tracking-[0.3em] text-[#5B8DEF] uppercase mb-4">Health & estate</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Medical profile
        </h1>
        <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-lg opacity-80">
          A record of your health information for emergency responders, family, and providers. Printable as a one-page medical summary.
        </p>

        <div className="flex flex-col gap-6 mb-10">

          {/* Basic health info */}
          <div className="bg-white rounded-3xl p-7" style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5B8DEF] mb-5">Basic health information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Blood type" rows={1} value={form.bloodType} onChange={set('bloodType')} />
              <Field label="Allergies (medications, food, latex…)" rows={2} value={form.allergies} onChange={set('allergies')} />
              <div className="md:col-span-2">
                <Field label="Chronic conditions & diagnoses" rows={3} value={form.conditions} onChange={set('conditions')} />
              </div>
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-3xl p-7" style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5B8DEF]">Current medications</p>
              <button onClick={addMed}
                className="flex items-center gap-1.5 text-[11px] font-medium text-[#5B8DEF] hover:text-[#4070D0] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add medication
              </button>
            </div>

            {form.medications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-[#C4B0E8] mb-3">No medications added yet</p>
                <button onClick={addMed}
                  className="text-xs font-medium text-[#5B8DEF] hover:underline">Add your first medication</button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {form.medications.map(med => (
                  <div key={med.id} className="rounded-2xl p-4" style={{ background: '#FAFAFF', border: '1px solid #E8E0F5' }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-[#A090C0] mb-1">Medication name</label>
                        <input type="text" value={med.name} onChange={e => updateMed(med.id, 'name', e.target.value)}
                          placeholder="e.g. Lisinopril"
                          className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
                          style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }} />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#A090C0] mb-1">Dose / frequency</label>
                        <input type="text" value={med.dose} onChange={e => updateMed(med.id, 'dose', e.target.value)}
                          placeholder="e.g. 10mg once daily"
                          className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
                          style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }} />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-[10px] text-[#A090C0] mb-1">Prescribing provider</label>
                          <input type="text" value={med.prescriber} onChange={e => updateMed(med.id, 'prescriber', e.target.value)}
                            placeholder="Dr. Smith"
                            className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none"
                            style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }} />
                        </div>
                        <button onClick={() => removeMed(med.id)}
                          className="self-end mb-0.5 w-8 h-8 rounded-lg flex items-center justify-center text-[#C4B0E8] hover:text-[#C47090] hover:bg-[#FDE8EF] transition-all flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Providers */}
          <div className="bg-white rounded-3xl p-7" style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5B8DEF] mb-5">Healthcare providers</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Primary care provider" rows={1} value={form.pcpName} onChange={set('pcpName')} />
              <Field label="Primary care phone" rows={1} value={form.pcpPhone} onChange={set('pcpPhone')} />
              <div className="md:col-span-2">
                <Field label="Specialists (name, specialty, phone)" rows={3}
                  hint="e.g. Dr. Chen – Cardiology – 612-555-0123"
                  value={form.specialists} onChange={set('specialists')} />
              </div>
              <div className="md:col-span-2">
                <Field label="Preferred hospital or health system" rows={1}
                  value={form.preferredHospital} onChange={set('preferredHospital')} />
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="bg-white rounded-3xl p-7" style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5B8DEF] mb-5">Insurance</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Field label="Insurance carrier" rows={1} value={form.insuranceCarrier} onChange={set('insuranceCarrier')} />
              <Field label="Policy number" rows={1} value={form.insurancePolicyNum} onChange={set('insurancePolicyNum')} />
              <Field label="Group number" rows={1} value={form.insuranceGroupNum} onChange={set('insuranceGroupNum')} />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={handleSave}
            className="flex-1 py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
            {saved ? '✓ Saved' : 'Save medical profile'}
          </button>
          <button onClick={() => window.print()}
            className="px-6 py-4 rounded-2xl text-sm font-medium text-[#5B8DEF] transition-all hover:-translate-y-0.5"
            style={{ border: '1.5px solid #C0D4FF', background: 'white' }}>
            Print
          </button>
        </div>
      </div>

      {/* Print view */}
      <div className="medical-print">
        <div style={{ padding: '0.6in 0.8in', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1A1030' }}>
          <div style={{ borderBottom: '2px solid #BDD0FF', paddingBottom: 16, marginBottom: 24 }}>
            <p style={{ fontSize: '7pt', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#5B8DEF', margin: '0 0 4px 0' }}>Medical Profile</p>
            <p style={{ fontSize: '26pt', fontWeight: 400, margin: '0 0 4px 0', lineHeight: 1.1 }}>
              {plan.name || 'Medical Information'}
            </p>
            {plan.principalDOB && <p style={{ fontSize: '9pt', color: '#6A5890', margin: 0 }}>DOB: {plan.principalDOB}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px', marginBottom: 24 }}>
            {form.bloodType && (
              <div>
                <p style={{ fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5B8DEF', margin: '0 0 4px 0' }}>Blood type</p>
                <p style={{ fontSize: '14pt', fontWeight: 700, color: '#1A1030', margin: 0 }}>{form.bloodType}</p>
              </div>
            )}
            {form.allergies && (
              <div>
                <p style={{ fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C47090', margin: '0 0 4px 0' }}>Allergies</p>
                <p style={{ fontSize: '10pt', color: '#2A1848', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{form.allergies}</p>
              </div>
            )}
            {form.conditions && (
              <div style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7C5CAF', margin: '0 0 4px 0' }}>Chronic conditions</p>
                <p style={{ fontSize: '10pt', color: '#2A1848', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{form.conditions}</p>
              </div>
            )}
          </div>

          {form.medications.filter(m => m.name).length > 0 && (
            <div style={{ marginBottom: 24, breakInside: 'avoid' }}>
              <p style={{ fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5B8DEF', margin: '0 0 8px 0' }}>Current medications</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E0D8F5' }}>
                    {['Medication', 'Dose / frequency', 'Prescriber'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '4px 8px 6px 0', color: '#8070A8', fontWeight: 600, fontSize: '7pt', letterSpacing: '0.1em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {form.medications.filter(m => m.name).map(m => (
                    <tr key={m.id} style={{ borderBottom: '1px solid #F5F0FF' }}>
                      <td style={{ padding: '5px 8px 5px 0', color: '#1A1030' }}>{m.name}</td>
                      <td style={{ padding: '5px 8px 5px 0', color: '#4A3870' }}>{m.dose}</td>
                      <td style={{ padding: '5px 8px 5px 0', color: '#4A3870' }}>{m.prescriber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(form.pcpName || form.specialists || form.preferredHospital) && (
            <div style={{ marginBottom: 24, breakInside: 'avoid' }}>
              <p style={{ fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5B8DEF', margin: '0 0 8px 0' }}>Healthcare providers</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                {form.pcpName && (
                  <div>
                    <p style={{ fontSize: '7pt', color: '#8070A8', margin: '0 0 2px 0' }}>Primary care</p>
                    <p style={{ fontSize: '10pt', color: '#1A1030', margin: 0 }}>{form.pcpName}{form.pcpPhone && ` · ${form.pcpPhone}`}</p>
                  </div>
                )}
                {form.preferredHospital && (
                  <div>
                    <p style={{ fontSize: '7pt', color: '#8070A8', margin: '0 0 2px 0' }}>Preferred hospital</p>
                    <p style={{ fontSize: '10pt', color: '#1A1030', margin: 0 }}>{form.preferredHospital}</p>
                  </div>
                )}
                {form.specialists && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <p style={{ fontSize: '7pt', color: '#8070A8', margin: '0 0 2px 0' }}>Specialists</p>
                    <p style={{ fontSize: '10pt', color: '#1A1030', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{form.specialists}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {form.insuranceCarrier && (
            <div style={{ breakInside: 'avoid' }}>
              <p style={{ fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5B8DEF', margin: '0 0 6px 0' }}>Insurance</p>
              <p style={{ fontSize: '10pt', color: '#1A1030', margin: 0 }}>
                {form.insuranceCarrier}
                {form.insurancePolicyNum && ` · Policy: ${form.insurancePolicyNum}`}
                {form.insuranceGroupNum && ` · Group: ${form.insuranceGroupNum}`}
              </p>
            </div>
          )}

          <div style={{ marginTop: 32, borderTop: '1px solid #E0D8F5', paddingTop: 10 }}>
            <p style={{ fontSize: '6pt', color: '#C4B0E8', margin: 0 }}>stillwatercare.vercel.app</p>
          </div>
        </div>
      </div>

      <style>{`
        .medical-print { display: none; }
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white !important; }
          .medical-print { display: block !important; }
        }
      `}</style>
    </>
  );
}
