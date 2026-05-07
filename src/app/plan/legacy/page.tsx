'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { LegacyData } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const FIELDS: { key: keyof LegacyData; label: string; hint: string; prompt: string; rows: number }[] = [
  {
    key: 'lifeLesson',
    label: 'The most important thing I\'ve learned',
    hint: 'A lesson that shaped who you are — something you wish you\'d known earlier, or learned the hard way.',
    prompt: 'What has life taught you that you most want to pass on?',
    rows: 4,
  },
  {
    key: 'proudestMoment',
    label: 'What I\'m most proud of',
    hint: 'Not necessarily awards or titles — perhaps how you loved, showed up, or persevered.',
    prompt: 'What moment or quality in yourself brings you the most peace?',
    rows: 4,
  },
  {
    key: 'advice',
    label: 'Advice for those I leave behind',
    hint: 'The counsel you\'d give if you could sit with them one last time.',
    prompt: 'What do you want your loved ones to know about how to live?',
    rows: 5,
  },
  {
    key: 'favoriteQuote',
    label: 'Words that have guided me',
    hint: 'A quote, verse, poem, or phrase that has meant something to you.',
    prompt: 'Is there a passage or saying that captured something true for you?',
    rows: 3,
  },
  {
    key: 'memorialize',
    label: 'How I\'d like to be remembered',
    hint: 'Not a eulogy — just what essence you hope lingers. A feeling, a quality, a presence.',
    prompt: 'What do you hope people feel when they think of you?',
    rows: 4,
  },
  {
    key: 'readAtService',
    label: 'Something to read or share at my service',
    hint: 'A poem, a scripture, a story — anything you\'d want spoken aloud.',
    prompt: 'Is there something you\'d want read or played at your memorial?',
    rows: 5,
  },
  {
    key: 'toFuture',
    label: 'A message to those who come after',
    hint: 'To grandchildren, generations not yet born, or anyone who inherits your world.',
    prompt: 'What would you want to say to someone living in a time you\'ll never see?',
    rows: 5,
  },
];

function LegacyField({
  field, value, onChange,
}: {
  field: typeof FIELDS[number];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-white rounded-3xl p-7" style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
      <div className="mb-4">
        <p className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#1A1030] mb-1.5">
          {field.label}
        </p>
        <p className="text-xs text-[#8070A8] leading-relaxed italic">{field.prompt}</p>
      </div>
      <p className="text-[10px] text-[#C4B0E8] mb-2 leading-relaxed">{field.hint}</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={field.rows}
        placeholder="Write here…"
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#D0C4E8] focus:outline-none resize-none transition-colors leading-relaxed"
        style={{ border: '1px solid #E0D8F5', background: '#FAFAFF', color: '#1A1030' }}
        onFocus={e => (e.target.style.borderColor = '#A090D8')}
        onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
      />
    </div>
  );
}

export default function LegacyPage() {
  const { plan, loaded, saveLegacy } = usePlan();
  const [form, setForm] = useState<LegacyData>(plan.legacy);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded) setForm(plan.legacy);
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = () => {
    saveLegacy(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const hasAny = Object.values(form).some(v => !!v);
  const filledCount = Object.values(form).filter(v => !!v).length;

  if (!loaded) return null;

  return (
    <>
      {/* ── Screen ── */}
      <div className="max-w-4xl mx-auto px-6 py-12 no-print">
        <div className="mb-10">
          <Link href="/plan" className="back-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Your plan
          </Link>
        </div>

        <p className="text-xs tracking-[0.3em] text-[#9B68D0] uppercase mb-4">Legacy</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          My story
        </h1>
        <p className="text-[#4A3870] text-sm leading-relaxed mb-3 max-w-lg opacity-80">
          Beyond the legal document — the human one. These reflections can be read at a service, shared with family, or simply kept as a record of who you were and what you believed.
        </p>
        <p className="text-[10px] text-[#C4B0E8] tracking-wide mb-10">
          {filledCount} of {FIELDS.length} questions answered · Saves automatically
        </p>

        <div className="flex flex-col gap-5 mb-10">
          {FIELDS.map(field => (
            <LegacyField
              key={field.key}
              field={field}
              value={form[field.key]}
              onChange={v => setForm(prev => ({ ...prev, [field.key]: v }))}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={handleSave}
            className="flex-1 py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
            {saved ? '✓ Saved' : 'Save my story'}
          </button>
          {hasAny && (
            <button onClick={() => window.print()}
              className="px-6 py-4 rounded-2xl text-sm font-medium text-[#7C5CAF] transition-all hover:-translate-y-0.5"
              style={{ border: '1.5px solid #C4B0E8', background: 'white' }}>
              Print
            </button>
          )}
        </div>
      </div>

      {/* ── Print ── */}
      <div className="legacy-print">
        <div style={{ padding: '0.7in 0.9in', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1A1030' }}>
          <div style={{ borderBottom: '2px solid #C4B0E8', paddingBottom: 18, marginBottom: 28 }}>
            <p style={{ fontSize: '8pt', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 6px 0' }}>My Story</p>
            <p style={{ fontSize: '28pt', fontWeight: 400, margin: '0 0 4px 0', lineHeight: 1.1 }}>
              {plan.name || 'My Legacy'}
            </p>
            <p style={{ fontSize: '9pt', color: '#8070A8', margin: 0 }}>stillwatercare.vercel.app</p>
          </div>

          {FIELDS.filter(f => form[f.key]).map(field => (
            <div key={field.key} style={{ marginBottom: 28, breakInside: 'avoid' }}>
              <p style={{ fontSize: '8pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 6px 0' }}>
                {field.label}
              </p>
              <p style={{ fontSize: '11pt', lineHeight: 1.7, color: '#2A1848', margin: 0, whiteSpace: 'pre-wrap' }}>
                {form[field.key]}
              </p>
            </div>
          ))}

          {!hasAny && (
            <p style={{ fontSize: '10pt', color: '#C4B0E8', fontStyle: 'italic' }}>No content yet.</p>
          )}
        </div>
      </div>

      <style>{`
        .legacy-print { display: none; }
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white !important; }
          .legacy-print { display: block !important; }
        }
      `}</style>
    </>
  );
}
