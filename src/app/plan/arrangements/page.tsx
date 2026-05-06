'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { ArrangementsData } from '@/lib/planTypes';

const P = '#7C5CAF';
const SAVED_BG = '#F5F0FF';

function ChoiceCard({ label, description, selected, onSelect }: {
  label: string; description: string; selected: boolean; onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} className="text-left p-5 rounded-2xl border-2 transition-all duration-150 w-full"
      style={selected
        ? { borderColor: P, background: SAVED_BG }
        : { borderColor: '#E0D8F5', background: 'white' }}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
          style={selected ? { borderColor: P, background: P } : { borderColor: '#C4B0E8' }}>
          {selected && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M10 3L5 8.5 2 5.5l-1 1L5 10.5l6-7-1-0.5z" /></svg>}
        </div>
        <div>
          <p className="font-medium text-sm" style={{ color: selected ? '#2E1A60' : '#1A1030' }}>{label}</p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: selected ? P : '#8070A8' }}>{description}</p>
        </div>
      </div>
    </button>
  );
}

function TextArea({ label, hint, value, onChange, placeholder, rows = 3 }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; placeholder: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">{label}</label>
      {hint && <p className="text-xs text-[#8070A8] mb-2 leading-relaxed">{hint}</p>}
      <textarea rows={rows} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] resize-none transition-colors focus:outline-none"
        style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
        onFocus={e => (e.target.style.borderColor = '#A090D8')}
        onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
      />
    </div>
  );
}

function Input({ label, hint, value, onChange, placeholder }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">{label}</label>
      {hint && <p className="text-xs text-[#8070A8] mb-2">{hint}</p>}
      <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none transition-colors"
        style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
        onFocus={e => (e.target.style.borderColor = '#A090D8')}
        onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
      />
    </div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-1">{title}</h2>
      {subtitle && <p className="text-xs text-[#8070A8] mb-6">{subtitle}</p>}
      {!subtitle && <div className="mb-6" />}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default function ArrangementsPage() {
  const router = useRouter();
  const { plan, loaded, saveArrangements } = usePlan();
  const [form, setForm] = useState<ArrangementsData>(plan.arrangements);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (loaded) setForm(plan.arrangements); }, [loaded, plan.arrangements]);

  const set = (field: keyof ArrangementsData) => (value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const hasAny = form.afterPassing || form.serviceType || form.willLocation || form.attorney;

  const handleSave = () => {
    saveArrangements(form);
    setSaved(true);
    setTimeout(() => router.push('/plan'), 1600);
  };

  if (!loaded) return null;

  if (saved) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#EDE8FF' }}>
          <svg className="w-8 h-8 text-[#7C5CAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">Your arrangements are saved.</h2>
        <p className="text-[#4A3870] text-sm max-w-xs leading-relaxed">These wishes will spare your family difficult decisions at a very difficult time.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors">← Your plan</Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#7C5CAF] uppercase mb-4">Funeral & practical</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">Final arrangements</h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        Under Minnesota law, your health care directive can include funeral and memorial wishes, as well as guidance on where important documents are kept. These answers spare your family difficult decisions at a tender time.
      </p>

      <div className="flex flex-col gap-6">

        <Card title="After I pass" subtitle="Your preference for what happens to your remains.">
          <ChoiceCard label="Traditional burial" description="I prefer to be buried in a casket, in a cemetery or chosen resting place."
            selected={form.afterPassing === 'burial'} onSelect={() => set('afterPassing')('burial')} />
          <ChoiceCard label="Cremation" description="I prefer to be cremated. My ashes may be kept, scattered, or interred."
            selected={form.afterPassing === 'cremation'} onSelect={() => set('afterPassing')('cremation')} />
          <ChoiceCard label="Donate to science" description="I would like to donate my body to a medical school or research institution."
            selected={form.afterPassing === 'donate-science'} onSelect={() => set('afterPassing')('donate-science')} />
          <ChoiceCard label="Other or undecided" description="I have specific wishes or haven't decided yet — see my notes below."
            selected={form.afterPassing === 'other'} onSelect={() => set('afterPassing')('other')} />
          <TextArea label="Additional notes" placeholder="e.g. I'd like to be cremated and have my ashes scattered in Lake Superior, near the cabin."
            value={form.afterPassingNotes} onChange={set('afterPassingNotes')} />
        </Card>

        <Card title="Memorial service" subtitle="What kind of gathering, if any, would feel right to you?">
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: 'religious',    l: 'Religious service',      d: 'Faith-based service at a church, temple, or place of worship.' },
              { v: 'celebration',  l: 'Celebration of life',    d: 'A joyful gathering focused on celebrating who I was.' },
              { v: 'private',      l: 'Private family only',    d: 'A small, intimate gathering with close family and friends.' },
              { v: 'graveside',    l: 'Graveside only',         d: 'A simple ceremony at the burial or interment site.' },
              { v: 'none',         l: 'No formal service',      d: 'I do not wish to have a formal service or gathering.' },
            ].map(o => (
              <button key={o.v} onClick={() => set('serviceType')(o.v)}
                className="text-left p-4 rounded-2xl border-2 transition-all text-xs"
                style={form.serviceType === o.v
                  ? { borderColor: P, background: SAVED_BG, color: '#2E1A60' }
                  : { borderColor: '#E0D8F5', background: 'white', color: '#4A3870' }}>
                <p className="font-medium mb-0.5">{o.l}</p>
                <p className="text-[#8070A8] leading-relaxed" style={{ fontSize: '10px' }}>{o.d}</p>
              </button>
            ))}
          </div>
          <TextArea label="Service notes" placeholder="e.g. I'd like it held at our church. My favorite hymn is 'Amazing Grace.'"
            value={form.serviceNotes} onChange={set('serviceNotes')} />
        </Card>

        <Card title="Special requests" subtitle="Music, readings, or personal touches that matter to you.">
          <Input label="Music" placeholder="e.g. Amazing Grace, Danny Boy, Here Comes the Sun"
            value={form.music} onChange={set('music')} />
          <Input label="Readings or poems" placeholder="e.g. Psalm 23, Mary Oliver's 'The Summer Day'"
            value={form.readings} onChange={set('readings')} />
          <TextArea label="Where I'd like my remains" placeholder="e.g. Forest Hills Cemetery, plot near the oak tree / Scatter near the cabin in northern Minnesota"
            value={form.finalResting} onChange={set('finalResting')} />
        </Card>

        <Card title="Practical matters" subtitle="Help your family find what they need quickly. You don't need to include account numbers — just hints about where to look.">
          <Input label="Location of my will" placeholder="e.g. In the fireproof safe in my home office / With my attorney at Smith Law Group"
            value={form.willLocation} onChange={set('willLocation')} />
          <Input label="Location of insurance documents" placeholder="e.g. Top drawer of my desk / Online at MetLife.com, login in my password manager"
            value={form.insuranceLocation} onChange={set('insuranceLocation')} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Attorney" placeholder="Name and firm"
              value={form.attorney} onChange={set('attorney')} />
            <Input label="Financial advisor" placeholder="Name and firm"
              value={form.financialAdvisor} onChange={set('financialAdvisor')} />
          </div>
          <TextArea label="Guardian preference (if applicable)" hint="If someone may need to be appointed to manage your affairs — who would you want?" placeholder="e.g. I would prefer my sister Maria to be appointed guardian for any dependent children."
            value={form.guardianPreference} onChange={set('guardianPreference')} />
          <TextArea label="Anything else" placeholder="Any other wishes, instructions, or things your family should know…"
            value={form.additionalNotes} onChange={set('additionalNotes')} />
        </Card>
      </div>

      <div className="flex items-center justify-between mt-10">
        <Link href="/plan" className="text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors px-4 py-2">← Back to plan</Link>
        <button onClick={handleSave} disabled={!hasAny}
          className="px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all"
          style={hasAny ? { background: '#7C5CAF', color: 'white' } : { background: '#EDE8FF', color: '#8070A8', cursor: 'not-allowed' }}>
          Save my arrangements
        </button>
      </div>
    </div>
  );
}
