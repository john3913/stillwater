'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const WISH_LABELS: Record<string, string> = {
  yes: 'Yes', limited: 'For a limited trial', no: 'No',
  home: 'At home', hospice: 'Hospice / palliative care', hospital: 'Hospital', depends: 'Best setting — proxy decides',
  comfort: 'Comfort above all else', balance: 'Balance comfort and treatment', treatment: 'Pursue every treatment',
  specific: 'Yes, with specific conditions', registered: 'Already registered as donor',
};

const QUALITY_LABELS: Record<string, string> = {
  quality: 'Quality of life comes first',
  balance: 'A balance between quality and length',
  quantity: 'Length of life comes first',
};

type Step = 'intro' | 'wishes' | 'proxy' | 'values' | 'letters' | 'arrangements' | 'done';

const STEPS: Step[] = ['intro', 'wishes', 'proxy', 'values', 'letters', 'arrangements', 'done'];

function StepDot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div className="w-2 h-2 rounded-full transition-all duration-300"
      style={{
        background: done ? '#5E9E7E' : active ? '#7C5CAF' : '#D4CAE8',
        transform: active ? 'scale(1.3)' : 'scale(1)',
      }} />
  );
}

export default function CheckinPage() {
  const { loaded, plan, touchPlan } = usePlan();
  const [step, setStep] = useState<Step>('intro');
  const [confirmed, setConfirmed] = useState<Set<Step>>(new Set());

  if (!loaded) return null;

  const stepIndex = STEPS.indexOf(step);

  const confirm = () => {
    setConfirmed(prev => new Set([...prev, step]));
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };

  const finishCheckin = () => {
    touchPlan();
    setStep('done');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Back */}
      {step !== 'done' && (
        <div className="mb-10">
          <Link href="/plan" className="back-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Your plan
          </Link>
        </div>
      )}

      {/* Progress dots */}
      {step !== 'intro' && step !== 'done' && (
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['wishes', 'proxy', 'values', 'letters', 'arrangements'] as Step[]).map(s => (
            <StepDot key={s} active={step === s} done={confirmed.has(s)} />
          ))}
        </div>
      )}

      {/* INTRO */}
      {step === 'intro' && (
        <div className="animate-fade-up">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#8070A8] mb-4">Annual check-in</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
            Is your plan still accurate?
          </h1>
          <p className="text-[#4A3870] text-sm leading-relaxed mb-8" style={{ opacity: 0.85 }}>
            Life changes — and your plan should too. This check-in walks through each section and asks one simple question: does this still reflect your wishes?
          </p>
          <div className="bg-white rounded-2xl p-6 mb-8" style={{ border: '1px solid #E0D8F5' }}>
            <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-4">You'll review</p>
            {[
              { label: 'Medical wishes', color: '#7C5CAF' },
              { label: 'Healthcare proxy', color: '#C47090' },
              { label: 'Personal values', color: '#5E9E7E' },
              { label: 'Letters to loved ones', color: '#C08858' },
              { label: 'Final arrangements', color: '#9B68D0' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2.5 py-2" style={{ borderBottom: '1px solid #F5F0FF' }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
                <p className="text-sm text-[#4A3870]">{item.label}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setStep('wishes')}
            className="btn-primary btn-sm w-full">
            Begin check-in →
          </button>
        </div>
      )}

      {/* WISHES */}
      {step === 'wishes' && (
        <div className="animate-fade-up">
          <p className="text-[10px] tracking-[0.45em] uppercase mb-2" style={{ color: '#7C5CAF' }}>Medical wishes</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030] mb-6">
            Do your medical wishes still reflect what you want?
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid #E0D8F5' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8', background: '#FAF8FF' }}>
              <p className="text-xs text-[#8070A8] uppercase tracking-wider">Currently recorded</p>
            </div>
            {plan.wishes.cpr && (
              <div className="px-6 py-3.5" style={{ borderBottom: '1px solid #F0EBF8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-0.5">CPR</p>
                <p className="text-sm text-[#4A3870]">{WISH_LABELS[plan.wishes.cpr] ?? plan.wishes.cpr}</p>
              </div>
            )}
            {plan.wishes.ventilator && (
              <div className="px-6 py-3.5" style={{ borderBottom: '1px solid #F0EBF8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-0.5">Breathing support</p>
                <p className="text-sm text-[#4A3870]">{WISH_LABELS[plan.wishes.ventilator] ?? plan.wishes.ventilator}</p>
              </div>
            )}
            {plan.wishes.setting && (
              <div className="px-6 py-3.5" style={{ borderBottom: '1px solid #F0EBF8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-0.5">Care setting</p>
                <p className="text-sm text-[#4A3870]">{WISH_LABELS[plan.wishes.setting] ?? plan.wishes.setting}</p>
              </div>
            )}
            {plan.wishes.painPriority && (
              <div className="px-6 py-3.5" style={{ borderBottom: '1px solid #F0EBF8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-0.5">Comfort priority</p>
                <p className="text-sm text-[#4A3870]">{WISH_LABELS[plan.wishes.painPriority] ?? plan.wishes.painPriority}</p>
              </div>
            )}
            {plan.wishes.organDonation && (
              <div className="px-6 py-3.5">
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-0.5">Organ donation</p>
                <p className="text-sm text-[#4A3870]">{WISH_LABELS[plan.wishes.organDonation] ?? plan.wishes.organDonation}</p>
              </div>
            )}
            {!plan.wishes.cpr && !plan.wishes.ventilator && (
              <div className="px-6 py-5 text-sm text-[#C4B0E8] italic">No medical wishes recorded yet.</div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={confirm}
              className="w-full py-4 rounded-2xl text-sm font-medium transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{ background: '#E8F5EE', color: '#3E8868', border: '1px solid #C0DDD0' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Looks accurate
            </button>
            <Link href="/plan/wishes"
              className="w-full py-4 rounded-2xl text-sm font-medium text-center transition-all hover:-translate-y-0.5"
              style={{ background: 'white', color: '#7C5CAF', border: '1px solid #C4B0E8' }}>
              Update my wishes →
            </Link>
          </div>
        </div>
      )}

      {/* PROXY */}
      {step === 'proxy' && (
        <div className="animate-fade-up">
          <p className="text-[10px] tracking-[0.45em] uppercase mb-2" style={{ color: '#C47090' }}>Healthcare proxy</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030] mb-6">
            Is the right person still your proxy?
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid #E0D8F5' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8', background: '#FAF8FF' }}>
              <p className="text-xs text-[#8070A8] uppercase tracking-wider">Currently recorded</p>
            </div>
            {plan.proxy.primaryName ? (
              <div className="px-6 py-5">
                <p className="text-base font-medium text-[#1A1030] font-[family-name:var(--font-cormorant)]">{plan.proxy.primaryName}</p>
                {plan.proxy.primaryRelationship && <p className="text-xs text-[#8070A8] mt-0.5">{plan.proxy.primaryRelationship}</p>}
                {plan.proxy.primaryPhone && <p className="text-sm text-[#C47090] font-medium mt-1">{plan.proxy.primaryPhone}</p>}
                {plan.proxy.alternateName && (
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid #F0EBF8' }}>
                    <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">First alternate</p>
                    <p className="text-sm text-[#4A3870]">{plan.proxy.alternateName}</p>
                    {plan.proxy.alternatePhone && <p className="text-sm text-[#9B68D0] mt-0.5">{plan.proxy.alternatePhone}</p>}
                  </div>
                )}
              </div>
            ) : (
              <div className="px-6 py-5 text-sm text-[#C4B0E8] italic">No proxy named yet.</div>
            )}
          </div>
          <div className="rounded-2xl p-4 mb-6" style={{ background: '#FDE8EF', border: '1px solid #F5C8D8' }}>
            <p className="text-xs text-[#8B3060] leading-relaxed">
              Has anything changed in your relationship with your proxy? Have they moved, changed their phone number, or had life changes that might affect their ability to serve?
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={confirm}
              className="w-full py-4 rounded-2xl text-sm font-medium transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{ background: '#E8F5EE', color: '#3E8868', border: '1px solid #C0DDD0' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Looks accurate
            </button>
            <Link href="/plan/proxy"
              className="w-full py-4 rounded-2xl text-sm font-medium text-center transition-all hover:-translate-y-0.5"
              style={{ background: 'white', color: '#C47090', border: '1px solid #F5C8D8' }}>
              Update my proxy →
            </Link>
          </div>
        </div>
      )}

      {/* VALUES */}
      {step === 'values' && (
        <div className="animate-fade-up">
          <p className="text-[10px] tracking-[0.45em] uppercase mb-2" style={{ color: '#5E9E7E' }}>Personal values</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030] mb-6">
            Do these values still reflect who you are?
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid #E0D8F5' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8', background: '#FAF8FF' }}>
              <p className="text-xs text-[#8070A8] uppercase tracking-wider">Currently recorded</p>
            </div>
            {plan.values.whatMatters && (
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">What matters most to me</p>
                <p className="text-sm text-[#4A3870] italic leading-relaxed">"{plan.values.whatMatters}"</p>
              </div>
            )}
            {plan.values.qualityVsQuantity && (
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">Quality vs. length of life</p>
                <p className="text-sm text-[#4A3870]">{QUALITY_LABELS[plan.values.qualityVsQuantity] ?? plan.values.qualityVsQuantity}</p>
              </div>
            )}
            {plan.values.biggestFear && (
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">What I fear most</p>
                <p className="text-sm text-[#4A3870] italic">{plan.values.biggestFear}</p>
              </div>
            )}
            {plan.values.biggestHope && (
              <div className="px-6 py-4">
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">What I hope for</p>
                <p className="text-sm text-[#4A3870] italic">{plan.values.biggestHope}</p>
              </div>
            )}
            {!plan.values.whatMatters && !plan.values.qualityVsQuantity && (
              <div className="px-6 py-5 text-sm text-[#C4B0E8] italic">No values recorded yet.</div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={confirm}
              className="w-full py-4 rounded-2xl text-sm font-medium transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{ background: '#E8F5EE', color: '#3E8868', border: '1px solid #C0DDD0' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Looks accurate
            </button>
            <Link href="/plan/values"
              className="w-full py-4 rounded-2xl text-sm font-medium text-center transition-all hover:-translate-y-0.5"
              style={{ background: 'white', color: '#5E9E7E', border: '1px solid #C0DDD0' }}>
              Update my values →
            </Link>
          </div>
        </div>
      )}

      {/* LETTERS */}
      {step === 'letters' && (
        <div className="animate-fade-up">
          <p className="text-[10px] tracking-[0.45em] uppercase mb-2" style={{ color: '#C08858' }}>Letters to loved ones</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030] mb-6">
            Do your letters still say what you want to say?
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid #E0D8F5' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8', background: '#FAF8FF' }}>
              <p className="text-xs text-[#8070A8] uppercase tracking-wider">Currently recorded</p>
            </div>
            {plan.letters.length > 0 ? plan.letters.map(l => (
              <div key={l.id} className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8' }}>
                <p className="text-sm font-medium text-[#4A3870]">{l.subject || 'Untitled letter'}</p>
                <p className="text-xs text-[#A090C0] mt-0.5">To: {l.to}</p>
              </div>
            )) : (
              <div className="px-6 py-5 text-sm text-[#C4B0E8] italic">No letters written yet.</div>
            )}
          </div>
          {plan.letters.length > 0 && (
            <div className="rounded-2xl p-4 mb-6" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
              <p className="text-xs text-[#A06030] leading-relaxed">
                Have your relationships changed? Is there someone new you'd like to write to, or something you'd like to add?
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button onClick={confirm}
              className="w-full py-4 rounded-2xl text-sm font-medium transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{ background: '#E8F5EE', color: '#3E8868', border: '1px solid #C0DDD0' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {plan.letters.length > 0 ? 'Letters are current' : 'Skip for now'}
            </button>
            <Link href="/plan/letters"
              className="w-full py-4 rounded-2xl text-sm font-medium text-center transition-all hover:-translate-y-0.5"
              style={{ background: 'white', color: '#C08858', border: '1px solid #F0D0A8' }}>
              {plan.letters.length > 0 ? 'Update my letters →' : 'Write a letter →'}
            </Link>
          </div>
        </div>
      )}

      {/* ARRANGEMENTS */}
      {step === 'arrangements' && (
        <div className="animate-fade-up">
          <p className="text-[10px] tracking-[0.45em] uppercase mb-2" style={{ color: '#9B68D0' }}>Final arrangements</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030] mb-6">
            Are your final arrangement wishes still what you'd want?
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid #E0D8F5' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8', background: '#FAF8FF' }}>
              <p className="text-xs text-[#8070A8] uppercase tracking-wider">Currently recorded</p>
            </div>
            {plan.arrangements.afterPassing ? (
              <>
                <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8' }}>
                  <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">After I pass</p>
                  <p className="text-sm text-[#4A3870]">{{
                    burial: 'Traditional burial',
                    cremation: 'Cremation',
                    'donate-science': 'Body donation to medical science',
                    other: 'Other (see notes)',
                  }[plan.arrangements.afterPassing] ?? plan.arrangements.afterPassing}</p>
                </div>
                {plan.arrangements.serviceType && (
                  <div className="px-6 py-4" style={{ borderBottom: '1px solid #F0EBF8' }}>
                    <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">Service type</p>
                    <p className="text-sm text-[#4A3870]">{{
                      religious: 'Religious service',
                      celebration: 'Celebration of life',
                      private: 'Private family gathering',
                      graveside: 'Graveside ceremony',
                      none: 'No formal service',
                    }[plan.arrangements.serviceType] ?? plan.arrangements.serviceType}</p>
                  </div>
                )}
                {plan.arrangements.willLocation && (
                  <div className="px-6 py-4">
                    <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">Will location</p>
                    <p className="text-sm text-[#4A3870]">{plan.arrangements.willLocation}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="px-6 py-5 text-sm text-[#C4B0E8] italic">No arrangements recorded yet.</div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={finishCheckin}
              className="w-full py-4 rounded-2xl text-sm font-medium transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{ background: '#E8F5EE', color: '#3E8868', border: '1px solid #C0DDD0' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Looks accurate — complete check-in
            </button>
            <Link href="/plan/arrangements"
              className="w-full py-4 rounded-2xl text-sm font-medium text-center transition-all hover:-translate-y-0.5"
              style={{ background: 'white', color: '#9B68D0', border: '1px solid #DDD0F8' }}>
              Update arrangements →
            </Link>
          </div>
        </div>
      )}

      {/* DONE */}
      {step === 'done' && (
        <div className="animate-fade-up text-center">
          <div className="relative overflow-hidden rounded-3xl p-10 mb-8"
            style={{ background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF, #FDE8EF)', border: '1px solid rgba(155,92,175,0.15)' }}>
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #B8D0FF, transparent 70%)', animation: 'float-a 14s ease-in-out infinite' }} />
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: '#E8F5EE', boxShadow: '0 4px 20px rgba(94,158,126,0.2)' }}>
              <svg className="w-8 h-8 text-[#3E8868]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#8070A8] mb-3">Check-in complete</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
              Plan reviewed.
            </h2>
            <p className="text-sm text-[#4A3870] leading-relaxed" style={{ opacity: 0.85 }}>
              Your plan has been marked as reviewed today. Your loved ones benefit every time you take the time to make sure this is right.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/plan/share"
              className="w-full py-4 rounded-2xl text-sm font-medium text-white text-center transition-all hover:-translate-y-0.5"
              style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
              Share updated plan with family →
            </Link>
            <Link href="/plan"
              className="text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors py-2">
              ← Back to your plan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
