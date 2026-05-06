'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { ProxyData } from '@/lib/planTypes';

function Field({ label, hint, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <div>
      <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">{label}</label>
      {hint && <p className="text-xs text-[#8070A8] mb-2">{hint}</p>}
      <input
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none transition-colors"
        style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
        onFocus={e => (e.target.style.borderColor = '#A090D8')}
        onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
      />
    </div>
  );
}

export default function ProxyPage() {
  const router = useRouter();
  const { plan, loaded, saveProxy } = usePlan();
  const [form, setForm] = useState<ProxyData>(plan.proxy);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (loaded) setForm(plan.proxy); }, [loaded, plan.proxy]);

  const set = (field: keyof ProxyData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    saveProxy(form);
    setSaved(true);
    setTimeout(() => router.push('/plan'), 1600);
  };

  if (!loaded) return null;

  if (saved) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#FDE8EF' }}>
          <svg className="w-8 h-8 text-[#C47090]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Your proxy is saved.
        </h2>
        <p className="text-[#4A3870] text-sm max-w-xs leading-relaxed">
          Make sure {form.primaryName || 'your proxy'} knows they hold this role — and what your wishes are.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors">← Your plan</Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#C47090] uppercase mb-4">Healthcare proxy</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
        Who will speak for you?
      </h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        A healthcare proxy — also called a healthcare agent or durable power of attorney for healthcare — is the person who will make medical decisions for you if you cannot. Choose someone who knows you, respects your values, and can be firm under pressure.
      </p>

      <div className="bg-white rounded-3xl p-8 mb-6" style={{ border: '1px solid #E0D8F5' }}>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-6">Primary proxy</h2>
        <div className="grid grid-cols-1 gap-5">
          <Field label="Full name" placeholder="e.g. Maria Chen" value={form.primaryName} onChange={set('primaryName')} />
          <Field label="Relationship" placeholder="e.g. Spouse, sister, close friend" value={form.primaryRelationship} onChange={set('primaryRelationship')} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" type="tel" placeholder="(555) 000-0000" value={form.primaryPhone} onChange={set('primaryPhone')} />
            <Field label="Email" type="email" placeholder="email@example.com" value={form.primaryEmail} onChange={set('primaryEmail')} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 mb-6" style={{ border: '1px solid #E0D8F5' }}>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">Alternate proxy</h2>
        <p className="text-[#8070A8] text-xs mb-6">Optional, but recommended. Named if your primary proxy is unavailable.</p>
        <div className="grid grid-cols-1 gap-5">
          <Field label="Full name" placeholder="e.g. James Rivera" value={form.alternateName} onChange={set('alternateName')} />
          <Field label="Relationship" placeholder="e.g. Brother, close friend" value={form.alternateRelationship} onChange={set('alternateRelationship')} />
          <Field label="Phone" type="tel" placeholder="(555) 000-0000" value={form.alternatePhone} onChange={set('alternatePhone')} />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 mb-10" style={{ border: '1px solid #E0D8F5' }}>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">Message to your proxy</h2>
        <p className="text-[#8070A8] text-xs mb-5">What do you want them to know? What gives you peace? What do you trust them to decide?</p>
        <textarea
          className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none resize-none transition-colors"
          style={{ border: '1px solid #E0D8F5', background: '#FAF8FF', color: '#1A1030' }}
          onFocus={e => (e.target.style.borderColor = '#A090D8')}
          onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
          rows={5}
          placeholder="e.g. I trust you completely to make decisions in the spirit of what we've talked about. What matters most to me is…"
          value={form.notes}
          onChange={set('notes')}
        />
      </div>

      <div className="flex items-center justify-between">
        <Link href="/plan" className="text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors px-4 py-2">← Back to plan</Link>
        <button onClick={handleSave} disabled={!form.primaryName || !form.primaryPhone}
          className="px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all"
          style={form.primaryName && form.primaryPhone
            ? { background: '#C47090', color: 'white' }
            : { background: '#FDE8EF', color: '#C4B0E8', cursor: 'not-allowed' }}>
          Save my proxy
        </button>
      </div>
    </div>
  );
}
