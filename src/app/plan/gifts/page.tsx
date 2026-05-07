'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { GiftsData, GiftEntry } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export default function GiftsPage() {
  const { plan, loaded, saveGifts } = usePlan();
  const [form, setForm] = useState<GiftsData>(plan.gifts);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded) setForm(plan.gifts);
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = () => {
    saveGifts(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addEntry = () => {
    const entry: GiftEntry = { id: genId(), recipient: '', relationship: '', item: '', note: '' };
    setForm(prev => ({ ...prev, entries: [...prev.entries, entry] }));
  };

  const updateEntry = (id: string, field: keyof GiftEntry, value: string) => {
    setForm(prev => ({
      ...prev,
      entries: prev.entries.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));
  };

  const removeEntry = (id: string) => {
    setForm(prev => ({ ...prev, entries: prev.entries.filter(e => e.id !== id) }));
  };

  const hasAny = form.entries.some(e => e.item || e.recipient) || !!form.generalNote;

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

        <p className="text-xs tracking-[0.3em] text-[#C47090] uppercase mb-4">Your story & legacy</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Personal gifts
        </h1>
        <p className="text-[#4A3870] text-sm leading-relaxed mb-2 max-w-lg opacity-80">
          These are the sentimental things — items not in your will that you want to go to specific people. A note that says &ldquo;I want Sarah to have grandmother&rsquo;s ring&rdquo; can prevent so much heartache.
        </p>
        <p className="text-[10px] text-[#C4B0E8] tracking-wide mb-10">
          This is not a legal document — supplement your will with a signed memorandum for legal effect.
        </p>

        <div className="mb-8">
          {form.entries.length === 0 ? (
            <div className="text-center py-16 rounded-3xl"
              style={{ border: '1.5px dashed #E0D8F5', background: '#FAFAFF' }}>
              <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: '#FFF0F8', color: '#C47090' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <p className="text-sm font-[family-name:var(--font-cormorant)] font-light text-[#4A3870] mb-1">No gifts added yet</p>
              <p className="text-xs text-[#C4B0E8] mb-5">Think of special items, keepsakes, or heirlooms — who should have them?</p>
              <button onClick={addEntry}
                className="px-5 py-2.5 rounded-2xl text-sm font-medium text-[#C47090] transition-all hover:-translate-y-0.5"
                style={{ border: '1.5px solid #F5C0D8', background: '#FFF0F8' }}>
                Add a personal gift
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {form.entries.map((entry, idx) => (
                <div key={entry.id} className="bg-white rounded-3xl p-6"
                  style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-[10px] tracking-widest uppercase text-[#C4B0E8]">Gift {idx + 1}</p>
                    <button onClick={() => removeEntry(entry.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#C4B0E8] hover:text-[#C47090] hover:bg-[#FDE8EF] transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4A3870] mb-1.5">Item or keepsake</label>
                      <input type="text" value={entry.item}
                        onChange={e => updateEntry(entry.id, 'item', e.target.value)}
                        placeholder="e.g. Grandmother's sapphire ring"
                        className="w-full rounded-xl px-4 py-2.5 text-sm placeholder:text-[#D0C4E8] focus:outline-none"
                        style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
                        onFocus={e => (e.target.style.borderColor = '#E0A0C0')}
                        onBlur={e => (e.target.style.borderColor = '#E0D8F5')} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4A3870] mb-1.5">Recipient name</label>
                      <input type="text" value={entry.recipient}
                        onChange={e => updateEntry(entry.id, 'recipient', e.target.value)}
                        placeholder="e.g. Sarah"
                        className="w-full rounded-xl px-4 py-2.5 text-sm placeholder:text-[#D0C4E8] focus:outline-none"
                        style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
                        onFocus={e => (e.target.style.borderColor = '#E0A0C0')}
                        onBlur={e => (e.target.style.borderColor = '#E0D8F5')} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4A3870] mb-1.5">Relationship</label>
                      <input type="text" value={entry.relationship}
                        onChange={e => updateEntry(entry.id, 'relationship', e.target.value)}
                        placeholder="e.g. Daughter"
                        className="w-full rounded-xl px-4 py-2.5 text-sm placeholder:text-[#D0C4E8] focus:outline-none"
                        style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
                        onFocus={e => (e.target.style.borderColor = '#E0A0C0')}
                        onBlur={e => (e.target.style.borderColor = '#E0D8F5')} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4A3870] mb-1.5">Note (optional)</label>
                      <input type="text" value={entry.note}
                        onChange={e => updateEntry(entry.id, 'note', e.target.value)}
                        placeholder="A memory or reason — why this person, why this item"
                        className="w-full rounded-xl px-4 py-2.5 text-sm placeholder:text-[#D0C4E8] focus:outline-none"
                        style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
                        onFocus={e => (e.target.style.borderColor = '#E0A0C0')}
                        onBlur={e => (e.target.style.borderColor = '#E0D8F5')} />
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={addEntry}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium text-[#C47090] transition-all hover:-translate-y-0.5"
                style={{ border: '1.5px dashed #F0BAD0', background: '#FFF8FB' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add another gift
              </button>
            </div>
          )}
        </div>

        {/* General note */}
        <div className="bg-white rounded-3xl p-7 mb-10"
          style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
          <p className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#1A1030] mb-1.5">
            A note about your things
          </p>
          <p className="text-[10px] text-[#C4B0E8] mb-3">Any general wishes about how to handle belongings — to donate, divide fairly, or let family choose.</p>
          <textarea
            rows={4}
            value={form.generalNote}
            onChange={e => setForm(prev => ({ ...prev, generalNote: e.target.value }))}
            placeholder="Write here…"
            className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#D0C4E8] focus:outline-none resize-none"
            style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
            onFocus={e => (e.target.style.borderColor = '#E0A0C0')}
            onBlur={e => (e.target.style.borderColor = '#E0D8F5')} />
        </div>

        <div className="flex gap-4">
          <button onClick={handleSave}
            className="flex-1 py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
            {saved ? '✓ Saved' : 'Save gifts'}
          </button>
          {hasAny && (
            <button onClick={() => window.print()}
              className="px-6 py-4 rounded-2xl text-sm font-medium text-[#C47090] transition-all hover:-translate-y-0.5"
              style={{ border: '1.5px solid #F5C0D8', background: 'white' }}>
              Print
            </button>
          )}
        </div>
      </div>

      {/* Print view */}
      <div className="gifts-print">
        <div style={{ padding: '0.7in 0.9in', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1A1030' }}>
          <div style={{ borderBottom: '2px solid #F5C0D8', paddingBottom: 18, marginBottom: 28 }}>
            <p style={{ fontSize: '7pt', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C47090', margin: '0 0 4px 0' }}>Personal Gifts & Keepsakes</p>
            <p style={{ fontSize: '26pt', fontWeight: 400, margin: '0 0 4px 0', lineHeight: 1.1 }}>
              {plan.name ? `From ${plan.name}` : 'Personal gifts'}
            </p>
            <p style={{ fontSize: '8pt', color: '#8070A8', margin: 0 }}>
              These are my wishes for personal belongings — not a legal document, but a statement of my intent.
            </p>
          </div>

          {form.entries.filter(e => e.item || e.recipient).map((entry, idx) => (
            <div key={entry.id} style={{ marginBottom: 22, breakInside: 'avoid', paddingBottom: 16, borderBottom: '1px solid #F5F0FF' }}>
              <p style={{ fontSize: '7pt', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4B0E8', margin: '0 0 6px 0' }}>Gift {idx + 1}</p>
              <p style={{ fontSize: '13pt', fontWeight: 600, color: '#1A1030', margin: '0 0 4px 0' }}>{entry.item}</p>
              {entry.recipient && (
                <p style={{ fontSize: '10pt', color: '#4A3870', margin: '0 0 4px 0' }}>
                  → {entry.recipient}{entry.relationship ? ` (${entry.relationship})` : ''}
                </p>
              )}
              {entry.note && (
                <p style={{ fontSize: '9pt', color: '#8070A8', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>{entry.note}</p>
              )}
            </div>
          ))}

          {form.generalNote && (
            <div style={{ marginTop: 24, breakInside: 'avoid' }}>
              <p style={{ fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C47090', margin: '0 0 8px 0' }}>General note</p>
              <p style={{ fontSize: '11pt', color: '#2A1848', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{form.generalNote}</p>
            </div>
          )}

          <div style={{ marginTop: 40, borderTop: '1px solid #E0D8F5', paddingTop: 10 }}>
            <p style={{ fontSize: '6pt', color: '#C4B0E8', margin: 0 }}>stillwatercare.vercel.app · Personal document</p>
          </div>
        </div>
      </div>

      <style>{`
        .gifts-print { display: none; }
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white !important; }
          .gifts-print { display: block !important; }
        }
      `}</style>
    </>
  );
}
