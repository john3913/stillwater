'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { ProxyData, AdditionalPowers } from '@/lib/planTypes';

const P = '#C47090';

function Field({ label, hint, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <div>
      <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">{label}</label>
      {hint && <p className="text-xs text-[#8070A8] mb-2 leading-relaxed">{hint}</p>}
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

function PowerCheck({ label, description, checked, onToggle }: {
  label: string; description: string; checked: boolean; onToggle: () => void;
}) {
  return (
    <button onClick={onToggle}
      className="flex items-start gap-4 w-full text-left p-4 rounded-2xl transition-all"
      style={{ background: checked ? '#FDE8EF' : 'white', border: `1px solid ${checked ? '#E8A8C0' : '#E0D8F5'}` }}>
      <div className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
        style={{ background: checked ? P : 'white', border: `2px solid ${checked ? P : '#C4B0E8'}` }}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>}
      </div>
      <div>
        <p className="text-sm font-medium" style={{ color: checked ? '#6A1040' : '#1A1030' }}>{label}</p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: checked ? P : '#8070A8' }}>{description}</p>
      </div>
    </button>
  );
}

export default function ProxyPage() {
  const { plan, loaded, saveProxyAndPrincipal } = usePlan();
  const [form, setForm] = useState<ProxyData>(plan.proxy);
  const [dob, setDob] = useState(plan.principalDOB);
  const [addr, setAddr] = useState(plan.principalAddress);
  const [phone, setPhone] = useState(plan.principalPhone);
  const [altPhone, setAltPhone] = useState(plan.principalAltPhone);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded) {
      setForm(plan.proxy);
      setDob(plan.principalDOB);
      setAddr(plan.principalAddress);
      setPhone(plan.principalPhone);
      setAltPhone(plan.principalAltPhone);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const set = (field: keyof ProxyData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const setPower = (power: keyof AdditionalPowers) => () =>
    setForm(prev => ({
      ...prev,
      additionalPowers: { ...prev.additionalPowers, [power]: !prev.additionalPowers[power] },
    }));

  const handleSave = () => {
    saveProxyAndPrincipal(form, {
      principalDOB: dob,
      principalAddress: addr,
      principalPhone: phone,
      principalAltPhone: altPhone,
    });
    setSaved(true);
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
        <p className="text-[#4A3870] text-sm max-w-xs leading-relaxed mb-8">
          Make sure {form.primaryName || 'your proxy'} knows they hold this role — and what your wishes are.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/plan/values"
            className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white text-center transition-all hover:-translate-y-0.5"
            style={{ background: '#5E9E7E', boxShadow: '0 4px 18px rgba(94,158,126,0.3)' }}>
            Next: Share your values →
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

      <p className="text-xs tracking-[0.3em] text-[#C47090] uppercase mb-4">Healthcare proxy</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
        Who will speak for you?
      </h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        A healthcare agent is the person who will make medical decisions for you if you cannot speak for yourself. Choose someone who knows you, respects your values, and can hold firm under pressure.
      </p>

      <div className="flex flex-col gap-6">

        {/* Your information */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">Your information</h2>
          <p className="text-xs text-[#8070A8] mb-6 leading-relaxed">
            These appear in the header of your printed directive for legal identification.
          </p>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">Date of birth</label>
              <input type="text" placeholder="e.g. January 15, 1958"
                value={dob} onChange={e => setDob(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none transition-colors"
                style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
                onFocus={e => (e.target.style.borderColor = '#A090D8')}
                onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">Your address</label>
              <input type="text" placeholder="Street address, city, MN zip"
                value={addr} onChange={e => setAddr(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none transition-colors"
                style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
                onFocus={e => (e.target.style.borderColor = '#A090D8')}
                onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">Phone</label>
                <input type="tel" placeholder="(555) 000-0000"
                  value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none transition-colors"
                  style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
                  onFocus={e => (e.target.style.borderColor = '#A090D8')}
                  onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
                />
              </div>
              <div>
                <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-1.5">Alternate phone</label>
                <input type="tel" placeholder="(555) 000-0000"
                  value={altPhone} onChange={e => setAltPhone(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none transition-colors"
                  style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
                  onFocus={e => (e.target.style.borderColor = '#A090D8')}
                  onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Primary agent */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-6">Primary healthcare agent</h2>
          <div className="grid grid-cols-1 gap-5">
            <Field label="Full name" placeholder="e.g. Maria Chen" value={form.primaryName} onChange={set('primaryName')} />
            <Field label="Relationship" placeholder="e.g. Spouse, sister, close friend" value={form.primaryRelationship} onChange={set('primaryRelationship')} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone" type="tel" placeholder="(555) 000-0000" value={form.primaryPhone} onChange={set('primaryPhone')} />
              <Field label="Email" type="email" placeholder="email@example.com" value={form.primaryEmail} onChange={set('primaryEmail')} />
            </div>
            <Field label="Address" placeholder="Street address, city, state, zip" value={form.primaryAddress} onChange={set('primaryAddress')} />
          </div>
        </div>

        {/* First successor */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">First successor agent</h2>
          <p className="text-[#8070A8] text-xs mb-6 leading-relaxed">
            Optional but recommended. Named if your primary agent is unable or unwilling to act.
          </p>
          <div className="grid grid-cols-1 gap-5">
            <Field label="Full name" placeholder="e.g. James Rivera" value={form.alternateName} onChange={set('alternateName')} />
            <Field label="Relationship" placeholder="e.g. Brother, close friend" value={form.alternateRelationship} onChange={set('alternateRelationship')} />
            <Field label="Phone" type="tel" placeholder="(555) 000-0000" value={form.alternatePhone} onChange={set('alternatePhone')} />
            <Field label="Address" placeholder="Street address, city, state, zip" value={form.alternateAddress} onChange={set('alternateAddress')} />
          </div>
        </div>

        {/* Second successor */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">Second successor agent</h2>
          <p className="text-[#8070A8] text-xs mb-6 leading-relaxed">
            Optional. Named if both your primary and first successor agents are unavailable.
          </p>
          <div className="grid grid-cols-1 gap-5">
            <Field label="Full name" placeholder="e.g. Sarah Kim" value={form.secondAlternateName} onChange={set('secondAlternateName')} />
            <Field label="Relationship" placeholder="e.g. Daughter, longtime friend" value={form.secondAlternateRelationship} onChange={set('secondAlternateRelationship')} />
            <Field label="Phone" type="tel" placeholder="(555) 000-0000" value={form.secondAlternatePhone} onChange={set('secondAlternatePhone')} />
            <Field label="Address" placeholder="Street address, city, state, zip" value={form.secondAlternateAddress} onChange={set('secondAlternateAddress')} />
          </div>
        </div>

        {/* How agents may act */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">How agents may act</h2>
          <p className="text-[#8070A8] text-xs mb-6 leading-relaxed">
            Minnesota law requires you to specify how your agents may act when more than one is named.
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                value: 'alone',
                label: 'May act independently',
                description: 'Any one agent can make decisions on their own, without needing the others to agree. (Most common.)',
              },
              {
                value: 'together',
                label: 'Must act jointly',
                description: 'All available agents must agree before a decision can be made. If they disagree, a majority rules.',
              },
            ].map(opt => (
              <button key={opt.value}
                onClick={() => setForm(prev => ({ ...prev, agentActMode: opt.value as 'alone' | 'together' }))}
                className="text-left p-5 rounded-2xl border-2 transition-all duration-150"
                style={form.agentActMode === opt.value
                  ? { borderColor: P, background: '#FDE8EF' }
                  : { borderColor: '#E0D8F5', background: 'white' }}>
                <p className="font-medium text-sm" style={{ color: form.agentActMode === opt.value ? '#6A1040' : '#1A1030' }}>{opt.label}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: form.agentActMode === opt.value ? P : '#8070A8' }}>{opt.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Additional powers */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">Optional additional powers</h2>
          <p className="text-[#8070A8] text-xs mb-6 leading-relaxed">
            Your agent already has standard healthcare decision authority under Minnesota law. Check any additional powers you wish to grant explicitly.
          </p>
          <div className="flex flex-col gap-3">
            <PowerCheck
              label="Decisions while I still have capacity"
              description="My agent may make healthcare decisions on my behalf even while I retain the ability to make my own decisions."
              checked={form.additionalPowers.whileCompetent}
              onToggle={setPower('whileCompetent')}
            />
            <PowerCheck
              label="Funeral and burial decisions"
              description="My agent may make decisions about my funeral, burial, or cremation arrangements."
              checked={form.additionalPowers.funeralBurial}
              onToggle={setPower('funeralBurial')}
            />
            <PowerCheck
              label="Mental health care (including ECT)"
              description="My agent may consent to or refuse mental health treatment, including electroconvulsive therapy (ECT) and antipsychotic medications."
              checked={form.additionalPowers.mentalHealth}
              onToggle={setPower('mentalHealth')}
            />
            <PowerCheck
              label="Pregnancy-related decisions"
              description="My agent may make healthcare decisions related to pregnancy on my behalf."
              checked={form.additionalPowers.pregnancy}
              onToggle={setPower('pregnancy')}
            />
            <PowerCheck
              label="Continues after divorce or dissolution"
              description="My agent's authority continues even if my marriage or domestic partnership with them is ended by divorce, dissolution, or a similar legal proceeding."
              checked={form.additionalPowers.afterDivorce}
              onToggle={setPower('afterDivorce')}
            />
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">
            Limit my agent&apos;s powers
          </h2>
          <p className="text-[#8070A8] text-xs mb-5 leading-relaxed">
            Optional. Describe any specific decisions you do not want your agent to make on your behalf.
          </p>
          <textarea
            className="w-full rounded-xl px-4 py-3 text-sm placeholder:text-[#C4B0E8] focus:outline-none resize-none transition-colors"
            style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
            onFocus={e => (e.target.style.borderColor = '#A090D8')}
            onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
            rows={4}
            placeholder="e.g. My agent may not consent to organ donation on my behalf. / My agent may not approve experimental treatments without consulting my physician."
            value={form.agentLimitations}
            onChange={set('agentLimitations')}
          />
        </div>

        {/* Message to proxy */}
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">Message to your agent</h2>
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

      </div>

      <div className="flex items-center justify-between mt-10">
        <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
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
