'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { ValuesData } from '@/lib/planTypes';

const P = '#5E9E7E';

function ChoiceCard({ label, description, selected, onSelect }: {
  label: string; description: string; selected: boolean; onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} className="text-left p-5 rounded-2xl border-2 transition-all duration-150"
      style={selected
        ? { borderColor: P, background: '#E8F5EE' }
        : { borderColor: '#E0D8F5', background: 'white' }}>
      <p className="font-medium text-sm" style={{ color: selected ? '#1A3830' : '#1A1030' }}>{label}</p>
      <p className="text-xs mt-1 leading-relaxed" style={{ color: selected ? P : '#8070A8' }}>{description}</p>
    </button>
  );
}

function Prompt({ label, hint, value, onChange, placeholder, rows = 4 }: {
  label: string; hint?: string; value: string;
  onChange: (v: string) => void; placeholder: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">{label}</label>
      {hint && <p className="text-xs text-[#8070A8] mb-3 leading-relaxed">{hint}</p>}
      <textarea
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none resize-none transition-colors"
        style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
        onFocus={e => (e.target.style.borderColor = '#90C8A8')}
        onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

export default function ValuesPage() {
  const router = useRouter();
  const { plan, loaded, saveValues } = usePlan();
  const [form, setForm] = useState<ValuesData>(plan.values);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (loaded) setForm(plan.values); }, [loaded, plan.values]);

  const set = (field: keyof ValuesData) => (value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const hasAny = form.whatMatters || form.qualityVsQuantity || form.biggestFear || form.biggestHope;

  const handleSave = () => {
    saveValues(form);
    setSaved(true);
    setTimeout(() => router.push('/plan'), 1600);
  };

  if (!loaded) return null;

  if (saved) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#E8F5EE' }}>
          <svg className="w-8 h-8 text-[#5E9E7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Your values are saved.
        </h2>
        <p className="text-[#4A3870] text-sm max-w-xs leading-relaxed">
          These words will help your care team and loved ones understand what truly matters to you.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors">← Your plan</Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#5E9E7E] uppercase mb-4">Personal values</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
        What matters most to you?
      </h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        Medical decisions rarely have simple answers. Your values — what you fear, what you hope for, what brings meaning — help your care team and loved ones make decisions in your spirit, even in circumstances you couldn't anticipate.
      </p>

      <div className="flex flex-col gap-8">

        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <Prompt
            label="In your own words — what matters most to you?"
            hint="Think about what makes life worth living for you. What would you want your care team to understand about who you are?"
            placeholder="e.g. Being able to recognize my family and have meaningful conversations matters more to me than being kept alive with machines. I want to be at home, if at all possible, surrounded by the people I love."
            value={form.whatMatters}
            onChange={set('whatMatters')}
            rows={5}
          />
        </div>

        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">Quality vs. length of life</p>
          <p className="text-[#4A3870] text-sm leading-relaxed mb-5 opacity-80">
            If you had to choose between a longer life with more suffering, or a shorter life with more comfort — what feels right to you?
          </p>
          <div className="grid grid-cols-1 gap-3">
            <ChoiceCard
              label="Quality of life comes first"
              description="I prefer comfort and dignity, even if it means accepting a shorter life."
              selected={form.qualityVsQuantity === 'quality'}
              onSelect={() => set('qualityVsQuantity')('quality')}
            />
            <ChoiceCard
              label="A balance between both"
              description="I want my care team to weigh both comfort and length of life together."
              selected={form.qualityVsQuantity === 'balance'}
              onSelect={() => set('qualityVsQuantity')('balance')}
            />
            <ChoiceCard
              label="Length of life comes first"
              description="I want every effort made to extend my life, even with some discomfort."
              selected={form.qualityVsQuantity === 'quantity'}
              onSelect={() => set('qualityVsQuantity')('quantity')}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 grid gap-6" style={{ border: '1px solid #E0D8F5' }}>
          <Prompt
            label="What do you fear most about serious illness or dying?"
            hint="Being honest about your fears helps your team protect you from them."
            placeholder="e.g. I fear being kept alive without awareness, or being a burden to my children, or dying in pain and alone."
            value={form.biggestFear}
            onChange={set('biggestFear')}
          />
          <Prompt
            label="What do you hope for?"
            hint="What would a 'good death' look like to you? What would you most want to experience or feel?"
            placeholder="e.g. I hope to be conscious enough to say goodbye, to have music playing, to not be in pain, and to feel loved."
            value={form.biggestHope}
            onChange={set('biggestHope')}
          />
        </div>

        <div className="bg-white rounded-3xl p-8 grid gap-6" style={{ border: '1px solid #E0D8F5' }}>
          <Prompt
            label="Spiritual or religious beliefs (optional)"
            hint="Are there beliefs, practices, or faith traditions that should guide your care?"
            placeholder="e.g. I am Catholic and would like last rites. / I do not have religious beliefs, but I believe in the natural cycles of life."
            value={form.spiritualBeliefs}
            onChange={set('spiritualBeliefs')}
          />
          <Prompt
            label="Cultural or family traditions (optional)"
            hint="Any cultural practices, rituals, or family customs that are important to you?"
            placeholder="e.g. My family has a tradition of gathering and praying together. I would like specific music played. I prefer to be buried, not cremated."
            value={form.importantRituals}
            onChange={set('importantRituals')}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-10">
        <Link href="/plan" className="text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors px-4 py-2">← Back to plan</Link>
        <button onClick={handleSave} disabled={!hasAny}
          className="px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all"
          style={hasAny
            ? { background: '#5E9E7E', color: 'white' }
            : { background: '#E8F5EE', color: '#8070A8', cursor: 'not-allowed' }}>
          Save my values
        </button>
      </div>
    </div>
  );
}
