'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { WishesData } from '@/lib/planTypes';

const P = '#7C5CAF';

type Step = {
  id: keyof Pick<WishesData, 'cpr' | 'ventilator' | 'dialysis' | 'feedingTube' | 'setting' | 'painPriority' | 'organDonation'>;
  tag: string;
  question: string;
  context: string;
  options: { value: string; label: string; description: string }[];
};

const steps: Step[] = [
  {
    id: 'cpr',
    tag: 'Resuscitation',
    question: 'If your heart or breathing stops, do you want medical staff to attempt to restart it?',
    context: 'CPR uses chest compressions and possibly electric shocks to restart the heart. It can be life-saving, but in advanced illness the success rate is lower and it can be physically intense.',
    options: [
      { value: 'yes',     label: 'Yes — attempt CPR',        description: 'Try all available means to restart my heart and breathing.' },
      { value: 'limited', label: 'For a limited trial',      description: 'Attempt CPR, but stop if there\'s no response after a reasonable effort.' },
      { value: 'no',      label: 'Allow a natural death',    description: 'Focus on comfort care. Do not attempt CPR.' },
    ],
  },
  {
    id: 'ventilator',
    tag: 'Breathing support',
    question: 'If you cannot breathe on your own, do you want a machine to breathe for you?',
    context: 'A mechanical ventilator takes over breathing when you cannot do so independently. It can be temporary — such as after surgery — or long-term in cases of serious illness.',
    options: [
      { value: 'yes',     label: 'Yes — use a ventilator',   description: 'I want a breathing machine if I cannot breathe on my own.' },
      { value: 'limited', label: 'For a limited time',       description: 'Use the ventilator for a trial period, then reassess with my care team.' },
      { value: 'no',      label: 'No breathing machine',     description: 'I prefer comfort care. Do not place me on a ventilator.' },
    ],
  },
  {
    id: 'dialysis',
    tag: 'Kidney support',
    question: 'If your kidneys stop working, do you want dialysis to filter your blood?',
    context: 'Dialysis takes over kidney function when the kidneys fail. It typically requires sessions several times a week. It can be life-sustaining, but is also physically demanding.',
    options: [
      { value: 'yes',     label: 'Yes — I want dialysis',    description: 'Use dialysis to sustain my life if my kidneys fail.' },
      { value: 'limited', label: 'For a limited trial',      description: 'Try dialysis for a set period. Stop if my quality of life declines significantly.' },
      { value: 'no',      label: 'No dialysis',              description: 'I prefer to decline dialysis and focus on comfort care.' },
    ],
  },
  {
    id: 'feedingTube',
    tag: 'Artificial nutrition',
    question: 'If you cannot eat or swallow, do you want nutrition delivered through a feeding tube?',
    context: 'A feeding tube provides nutrition when someone can\'t eat or drink on their own. It can sustain life, but in advanced illness may not restore meaningful function or quality of life.',
    options: [
      { value: 'yes',     label: 'Yes — use a feeding tube', description: 'Provide nutrition artificially if I\'m unable to eat.' },
      { value: 'limited', label: 'For a limited time',       description: 'Use a feeding tube through a health crisis, then reassess with my proxy.' },
      { value: 'no',      label: 'No feeding tube',          description: 'I prefer natural eating or sips for comfort. Do not use a feeding tube.' },
    ],
  },
  {
    id: 'setting',
    tag: 'Care setting',
    question: 'If you become seriously ill, where would you most like to be cared for?',
    context: 'The setting of your care shapes your experience and your family\'s ability to be present. There\'s no right answer — only your answer.',
    options: [
      { value: 'home',    label: 'At home',                  description: 'I want to be cared for at home, close to the people and places I love.' },
      { value: 'hospice', label: 'A hospice facility',       description: 'I prefer a dedicated hospice or palliative care environment.' },
      { value: 'hospital',label: 'A hospital',               description: 'I want to be in a hospital where all treatments are immediately available.' },
      { value: 'depends', label: 'Whatever is best',         description: 'Let my proxy and care team decide based on my condition at the time.' },
    ],
  },
  {
    id: 'painPriority',
    tag: 'Comfort and care',
    question: 'When it comes to your care near the end of life, what matters most to you?',
    context: 'This question guides how your care team balances keeping you comfortable with pursuing available treatments. It is one of the most important questions in your plan.',
    options: [
      { value: 'comfort',   label: 'Prioritize my comfort',         description: 'Relieve my pain and discomfort above all else, even if it may shorten my life.' },
      { value: 'balance',   label: 'Balance comfort and treatment', description: 'Weigh quality of life and treatment options together. Include my proxy in these decisions.' },
      { value: 'treatment', label: 'Pursue every treatment',        description: 'Try every available treatment to extend my life, even if there\'s some discomfort.' },
    ],
  },
  {
    id: 'organDonation',
    tag: 'Organ & tissue donation',
    question: 'Would you like to donate your organs or tissues after death?',
    context: 'Organ and tissue donation is a deeply personal decision. One donor can save or improve the lives of many people. Whatever you decide, your wishes will be honored.',
    options: [
      { value: 'yes',        label: 'Yes — donate anything helpful', description: 'I consent to donating any organs or tissues that may help others.' },
      { value: 'specific',   label: 'Yes, with specific wishes',     description: 'I want to donate, but with conditions I\'ll describe below.' },
      { value: 'no',         label: 'No — I decline to donate',      description: 'I prefer not to donate my organs or tissues.' },
      { value: 'registered', label: 'Already registered',            description: 'I\'ve already registered as a donor through my state\'s program.' },
    ],
  },
];

function ChoiceCard({ option, selected, onSelect }: {
  option: Step['options'][number]; selected: boolean; onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} className="w-full text-left p-5 rounded-2xl border-2 transition-all duration-150"
      style={selected
        ? { borderColor: P, background: '#F5F0FF' }
        : { borderColor: '#E0D8F5', background: 'white' }}>
      <div className="flex items-start gap-4">
        <div className="mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
          style={selected ? { borderColor: P, background: P } : { borderColor: '#C4B0E8' }}>
          {selected && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
            <path d="M10 3L5 8.5 2 5.5l-1 1L5 10.5l6-7-1-0.5z" />
          </svg>}
        </div>
        <div>
          <p className="font-medium text-sm" style={{ color: selected ? '#2E1A60' : '#1A1030' }}>{option.label}</p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: selected ? P : '#8070A8' }}>{option.description}</p>
        </div>
      </div>
    </button>
  );
}

export default function WishesPage() {
  const router = useRouter();
  const { plan, loaded, saveWishes } = usePlan();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<WishesData>(plan.wishes);
  const [donationNotes, setDonationNotes] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded) {
      setAnswers(plan.wishes);
      setDonationNotes(plan.wishes.organDonationNotes);
      setAdditionalNotes(plan.wishes.additionalNotes);
    }
  }, [loaded, plan.wishes]);

  if (!loaded) return null;

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const current = answers[step.id];
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const select = (value: string) => setAnswers(prev => ({ ...prev, [step.id]: value as never }));

  const next = () => {
    if (isLast) {
      saveWishes({ ...answers, organDonationNotes: donationNotes, additionalNotes });
      setSaved(true);
    } else {
      setStepIndex(i => i + 1);
    }
  };

  const back = () => {
    if (stepIndex === 0) router.push('/plan');
    else setStepIndex(i => i - 1);
  };

  if (saved) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#EDE8FF' }}>
          <svg className="w-8 h-8 text-[#7C5CAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Your wishes are saved.
        </h2>
        <p className="text-[#4A3870] text-sm max-w-xs leading-relaxed mb-8">
          These answers will guide your care team and your loved ones. You can return and update them anytime.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/plan/proxy"
            className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white text-center transition-all hover:-translate-y-0.5"
            style={{ background: '#C47090', boxShadow: '0 4px 18px rgba(196,112,144,0.3)' }}>
            Next: Name your proxy →
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
        <div className="flex items-center justify-between mb-3">
          <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
          <span className="text-xs text-[#8070A8] tracking-wider">{stepIndex + 1} of {steps.length}</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: '#EDE8FF' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(to right, #9B68D0, #C47090)' }} />
        </div>
      </div>

      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] text-[#7C5CAF] uppercase mb-4">{step.tag}</p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] leading-tight mb-5">
          {step.question}
        </h2>
        <p className="text-[#4A3870] text-sm leading-relaxed rounded-2xl p-4 opacity-80"
          style={{ background: '#F5F0FF', border: '1px solid #E0D8F5' }}>
          {step.context}
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {step.options.map(opt => (
          <ChoiceCard key={opt.value} option={opt} selected={current === opt.value} onSelect={() => select(opt.value)} />
        ))}
      </div>

      {step.id === 'organDonation' && answers.organDonation === 'specific' && (
        <div className="mb-8">
          <label className="block text-xs text-[#8070A8] tracking-wider uppercase mb-2">Specific donation wishes</label>
          <textarea
            className="w-full rounded-2xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none resize-none"
            style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
            onFocus={e => (e.target.style.borderColor = '#A090D8')}
            onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
            rows={3}
            placeholder="e.g. I would like to donate my corneas and heart, but not my kidneys."
            value={donationNotes}
            onChange={e => setDonationNotes(e.target.value)}
          />
        </div>
      )}

      {isLast && (
        <div className="mb-8">
          <label className="block text-xs text-[#8070A8] tracking-wider uppercase mb-2">
            Anything else you'd like to add? <span className="text-[#C4B0E8]">(optional)</span>
          </label>
          <textarea
            className="w-full rounded-2xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none resize-none"
            style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
            onFocus={e => (e.target.style.borderColor = '#A090D8')}
            onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
            rows={4}
            placeholder="Any other instructions, values, or context that matters to you…"
            value={additionalNotes}
            onChange={e => setAdditionalNotes(e.target.value)}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <button onClick={back} className="text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors px-4 py-2">
          ← {stepIndex === 0 ? 'Back to plan' : 'Previous'}
        </button>
        <button onClick={next} disabled={!current}
          className="px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all"
          style={current
            ? { background: '#7C5CAF', color: 'white' }
            : { background: '#EDE8FF', color: '#8070A8', cursor: 'not-allowed' }}>
          {isLast ? 'Save my wishes' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
