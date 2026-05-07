'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { ValuesData, ScenarioRating } from '@/lib/planTypes';
import AIDraftButton from '@/components/AIDraftButton';

const P = '#5E9E7E';
const IMPORTANCE = ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'];

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

function Prompt({ label, hint, value, onChange, placeholder, rows = 4, aiPrompt }: {
  label: string; hint?: string; value: string;
  onChange: (v: string) => void; placeholder: string; rows?: number; aiPrompt?: string;
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
      {aiPrompt && <AIDraftButton prompt={aiPrompt} onAccept={onChange} accentColor="#5E9E7E" />}
    </div>
  );
}

function ImportanceRating({ question, hint, value, onChange }: {
  question: string; hint?: string;
  value: ScenarioRating;
  onChange: (v: ScenarioRating) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-[#1A1030] leading-relaxed mb-1">{question}</p>
      {hint && <p className="text-xs text-[#8070A8] mb-3 leading-relaxed">{hint}</p>}
      <div className="flex gap-2 mt-2">
        {(['0', '1', '2', '3', '4'] as ScenarioRating[]).filter(Boolean).map((v) => (
          <button key={v} onClick={() => onChange(v as ScenarioRating)}
            className="flex-1 flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl transition-all"
            style={value === v
              ? { background: '#E8F5EE', border: '2px solid #5E9E7E' }
              : { background: 'white', border: '1px solid #E0D8F5' }}>
            <span className="text-base font-semibold leading-none" style={{ color: value === v ? '#5E9E7E' : '#A090C0' }}>{v}</span>
            <span className="text-[8px] text-center leading-tight" style={{ color: value === v ? '#3E7E5E' : '#C4B0E8' }}>
              {IMPORTANCE[parseInt(v as string)]}
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-1 px-1">
        <span className="text-[9px] text-[#C4B0E8]">0 = Not at all</span>
        <span className="text-[9px] text-[#C4B0E8]">4 = Extremely important</span>
      </div>
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

  const setRating = (field: keyof ValuesData) => (v: ScenarioRating) =>
    setForm(prev => ({ ...prev, [field]: v }));

  const hasAny = form.whatMatters || form.qualityVsQuantity || form.biggestFear || form.biggestHope;

  const handleSave = () => {
    saveValues(form);
    setSaved(true);
  };

  if (!loaded) return null;

  if (saved) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 animate-fade-up">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #5E9E7E, #7AAE8E)', boxShadow: '0 8px 36px rgba(94,158,126,0.32)' }}>
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #5E9E7E, #7AAE8E)', filter: 'blur(18px)', transform: 'scale(1.3)' }} />
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light mb-3"
          style={{ background: 'linear-gradient(135deg, #5E9E7E 0%, #3E8868 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Your values are saved.
        </h2>
        <p className="text-[#4A3870] text-sm max-w-xs leading-relaxed mb-10" style={{ opacity: 0.8 }}>
          These words will help your care team and loved ones understand what truly matters to you.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/plan/letters"
            className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white text-center transition-all hover:-translate-y-0.5"
            style={{ background: '#C08858', boxShadow: '0 4px 18px rgba(192,136,88,0.3)' }}>
            Next: Write letters to loved ones →
          </Link>
          <Link href="/plan" className="text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors py-2">
            Back to plan overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#5E9E7E] uppercase mb-4">Personal values</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
        What matters most to you?
      </h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        Medical decisions rarely have simple answers. Your values — what you fear, what you hope for, how you think about specific scenarios — help your care team and loved ones make decisions in your spirit.
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
            aiPrompt="Write 2-4 sincere sentences for someone's healthcare directive about what matters most to them in life — the relationships, experiences, and qualities that make their life feel meaningful and worth living. Write in first person."
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

        {/* Scenario-based ratings */}
        <div className="bg-white rounded-3xl p-8 flex flex-col gap-7" style={{ border: '1px solid #E0D8F5' }}>
          <div>
            <p className="text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">Specific scenarios</p>
            <p className="text-[#4A3870] text-sm leading-relaxed mb-6 opacity-80">
              For each situation below, rate how important it is to you that life-sustaining treatment be continued. 0 means you would likely want to stop or limit treatment; 4 means you would want all available treatment continued.
            </p>
            <div className="flex flex-col gap-7">
              <ImportanceRating
                question="If I have a terminal illness and treatment would only delay when I die"
                hint="e.g. terminal cancer where further treatment prolongs dying rather than meaningful life"
                value={form.scenarioTerminal}
                onChange={setRating('scenarioTerminal')}
              />
              <ImportanceRating
                question="If I have severe and permanent brain injury with little chance of regaining consciousness"
                hint="e.g. persistent vegetative state or severe brain damage from stroke or accident"
                value={form.scenarioBrainInjury}
                onChange={setRating('scenarioBrainInjury')}
              />
              <ImportanceRating
                question="If I have severe dementia or confusion and my condition will only get worse"
                hint="e.g. advanced Alzheimer's where I no longer recognize family or can have meaningful experiences"
                value={form.scenarioDementia}
                onChange={setRating('scenarioDementia')}
              />
            </div>
          </div>

          <Prompt
            label="Conditions under which treatment should stop"
            hint="Describe any specific conditions or circumstances under which you feel treatment to prolong your life should no longer be used."
            placeholder="e.g. If I cannot recognize my family and cannot communicate, I would not want extraordinary measures used to keep me alive. / If I require a machine to breathe and there is no reasonable hope of recovery…"
            value={form.conditionsToStop}
            onChange={set('conditionsToStop')}
            rows={4}
          />
        </div>

        {/* Fears and hopes */}
        <div className="bg-white rounded-3xl p-8 grid gap-6" style={{ border: '1px solid #E0D8F5' }}>
          <Prompt
            label="What do you fear most about serious illness or dying?"
            hint="Being honest about your fears helps your team protect you from them."
            placeholder="e.g. I fear being kept alive without awareness, or being a burden to my children, or dying in pain and alone."
            value={form.biggestFear}
            onChange={set('biggestFear')}
            aiPrompt="Write 2-3 honest, specific sentences for a healthcare directive about what someone fears most regarding serious illness or dying — things like loss of dignity, being a burden, dying alone, or prolonged suffering. Write in first person, sincerely."
          />
          <Prompt
            label="What do you hope for?"
            hint="What would a 'good death' look like to you? What would you most want to experience or feel?"
            placeholder="e.g. I hope to be conscious enough to say goodbye, to have music playing, to not be in pain, and to feel loved."
            value={form.biggestHope}
            onChange={set('biggestHope')}
            aiPrompt="Write 2-3 sentences for a healthcare directive expressing what someone hopes for at the end of life — what a peaceful, meaningful death would look and feel like. Include things like presence of loved ones, comfort, consciousness, or dignity. Write in first person."
          />
        </div>

        {/* Care preferences */}
        <div className="bg-white rounded-3xl p-8 flex flex-col gap-7" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-xs tracking-wider text-[#8070A8] uppercase -mb-2">Care preferences</p>

          <ImportanceRating
            question="How important is it that my pain be controlled, even if it might shorten my life?"
            value={form.painTradeOff}
            onChange={setRating('painTradeOff')}
          />

          <ImportanceRating
            question="How important is it to you to avoid being a financial burden to those you care about?"
            value={form.financialBurden}
            onChange={setRating('financialBurden')}
          />

          <div>
            <p className="text-sm font-medium text-[#1A1030] mb-1">If I were dying, I would prefer to receive care at:</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {[
                { value: 'home', label: 'Home' },
                { value: 'hospital', label: 'Hospital' },
                { value: 'nursing-home', label: 'Nursing home' },
                { value: 'hospice', label: 'Hospice facility' },
                { value: 'other', label: 'Other / wherever best' },
              ].map(opt => (
                <button key={opt.value}
                  onClick={() => setForm(prev => ({ ...prev, preferredCareLocation: opt.value as ValuesData['preferredCareLocation'] }))}
                  className="text-left px-4 py-3 rounded-xl text-sm transition-all"
                  style={form.preferredCareLocation === opt.value
                    ? { background: '#E8F5EE', border: '2px solid #5E9E7E', color: '#1A3830', fontWeight: 500 }
                    : { background: 'white', border: '1px solid #E0D8F5', color: '#4A3870' }}>
                  {opt.label}
                </button>
              ))}
            </div>
            {form.preferredCareLocation && form.preferredCareLocation !== 'home' && form.preferredCareLocation !== 'other' && (
              <div className="mt-3">
                <input type="text"
                  placeholder={form.preferredCareLocation === 'hospital' ? 'Which hospital, if you have a preference?' : form.preferredCareLocation === 'nursing-home' ? 'Which facility, if you have a preference?' : 'Which hospice or facility?'}
                  value={form.preferredCareLocationName}
                  onChange={e => setForm(prev => ({ ...prev, preferredCareLocationName: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none transition-colors"
                  style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
                  onFocus={e => (e.target.style.borderColor = '#90C8A8')}
                  onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Spiritual / Cultural */}
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
        <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
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
