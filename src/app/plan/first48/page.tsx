'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const ARRANGEMENT_LABELS: Record<string, string> = {
  burial: 'Traditional burial',
  cremation: 'Cremation',
  'donate-science': 'Body donation to medical science',
  other: 'Other arrangements — see notes below',
};

const SERVICE_LABELS: Record<string, string> = {
  religious: 'a religious service',
  celebration: 'a celebration of life',
  private: 'a private family gathering',
  graveside: 'a graveside ceremony',
  none: 'no formal service',
};

export default function First48Page() {
  const { loaded, plan } = usePlan();

  if (!loaded) return null;

  const proxyName = plan.proxy.primaryName || '';
  const proxyPhone = plan.proxy.primaryPhone || '';
  const proxyRelationship = plan.proxy.primaryRelationship || '';
  const altName = plan.proxy.alternateName || '';
  const altPhone = plan.proxy.alternatePhone || '';
  const afterPassing = plan.arrangements.afterPassing ? ARRANGEMENT_LABELS[plan.arrangements.afterPassing] : '';
  const serviceType = plan.arrangements.serviceType ? SERVICE_LABELS[plan.arrangements.serviceType] : '';
  const willLocation = plan.arrangements.willLocation || '';
  const insuranceLocation = plan.arrangements.insuranceLocation || '';
  const attorney = plan.arrangements.attorney || '';
  const financialAdvisor = plan.arrangements.financialAdvisor || '';
  const music = plan.arrangements.music || '';
  const readings = plan.arrangements.readings || '';
  const finalResting = plan.arrangements.finalResting || '';

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Back */}
      <div className="mb-10 no-print">
        <Link href="/plan" className="back-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Your plan
        </Link>
      </div>

      {/* Print instruction */}
      <div className="rounded-2xl p-5 mb-10 flex gap-4 items-center no-print animate-fade-up"
        style={{ background: 'linear-gradient(135deg, #F5F0FF, #EDE8FF)', border: '1px solid #C4B0E8' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #7C5CAF, #9B5CAF)' }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#4A3870]">Print and keep with your directive</p>
          <p className="text-xs text-[#8070A8] mt-0.5">Leave it somewhere your family can find it — with your advance directive, in a bedside drawer, or with your proxy.</p>
        </div>
        <button onClick={() => window.print()}
          className="px-5 py-2.5 rounded-xl text-xs font-medium text-white shrink-0 transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #7C5CAF, #9B5CAF)', boxShadow: '0 2px 12px rgba(124,92,175,0.3)' }}>
          Print guide
        </button>
      </div>

      {/* Document */}
      <div className="bg-white rounded-3xl overflow-hidden animate-fade-up"
        style={{ border: '1px solid #E0D8F5', boxShadow: '0 4px 28px rgba(90,62,138,0.06)', animationDelay: '80ms' }}>

        {/* Header */}
        <div className="relative overflow-hidden px-10 py-12 text-center"
          style={{ background: 'linear-gradient(135deg, #EBF2FF 0%, #EDE8FF 50%, #FDE8F4 100%)', borderBottom: '1px solid #E0D8F5' }}>
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #B8D0FF, transparent 70%)', animation: 'float-a 18s ease-in-out infinite' }} />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F5C0DC, transparent 70%)', animation: 'float-b 23s ease-in-out infinite' }} />
          <p className="relative text-[10px] tracking-[0.5em] uppercase text-[#8070A8] mb-3">A guide for my family</p>
          <h1 className="relative font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[#1A1030] mb-3">
            When the time comes
          </h1>
          {plan.name && (
            <p className="relative font-[family-name:var(--font-cormorant)] text-xl font-light text-[#4A3870]">
              Prepared with love by {plan.name}
            </p>
          )}
        </div>

        <div className="px-8 md:px-12 py-10">

          {/* Opening note */}
          <div className="mb-10 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FAF8FF, #F5F0FF)', border: '1px solid #EDE8FF' }}>
            <p className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[#4A3870] italic leading-relaxed">
              "I prepared this guide because I love you, and I don't want you to have to figure things out alone during one of the hardest times of your life. Please follow these steps — it will help."
            </p>
            {plan.name && <p className="text-xs text-[#A090C0] mt-3 font-medium">— {plan.name}</p>}
          </div>

          {/* Step 1: Right now */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                style={{ background: '#C47090', boxShadow: '0 2px 10px rgba(196,112,144,0.3)' }}>1</div>
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030]">Right now</h2>
                <p className="text-[10px] tracking-widest uppercase text-[#C47090]">First steps</p>
              </div>
            </div>
            <div className="ml-13 flex flex-col gap-3 ml-[52px]">
              <div className="p-4 rounded-xl" style={{ background: '#FDE8EF', border: '1px solid #F5C8D8' }}>
                <p className="text-sm font-semibold text-[#6A1040] mb-1">Find my advance directive</p>
                <p className="text-xs text-[#8B3060] leading-relaxed">
                  This document tells my care team exactly what treatments I do and don't want. Give it to the hospital, hospice, or care facility right away.
                </p>
              </div>
              {(proxyName || altName) && (
                <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-2">Call my healthcare proxy</p>
                  {proxyName && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-[#4A3870]">{proxyName}{proxyRelationship ? ` (${proxyRelationship})` : ''}</p>
                      {proxyPhone && <p className="text-sm font-bold text-[#7C5CAF] mt-0.5">{proxyPhone}</p>}
                      <p className="text-xs text-[#8070A8] mt-1">They know my wishes and are legally authorized to speak for me. Call them before any major decisions are made.</p>
                    </div>
                  )}
                  {altName && (
                    <div className="pt-2 mt-2" style={{ borderTop: '1px solid #E0D8F5' }}>
                      <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">If primary proxy is unavailable</p>
                      <p className="text-xs font-medium text-[#4A3870]">{altName}</p>
                      {altPhone && <p className="text-sm font-bold text-[#9B68D0] mt-0.5">{altPhone}</p>}
                    </div>
                  )}
                </div>
              )}
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-sm font-semibold text-[#4A3870] mb-1">Let the family know</p>
                <p className="text-xs text-[#8070A8] leading-relaxed">Notify close family and friends. There is no right order — do what feels natural. It's okay to ask others to help make calls.</p>
              </div>
            </div>
          </div>

          {/* Step 2: Within 24 hours */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                style={{ background: '#7C5CAF', boxShadow: '0 2px 10px rgba(124,92,175,0.3)' }}>2</div>
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030]">Within 24 hours</h2>
                <p className="text-[10px] tracking-widest uppercase text-[#7C5CAF]">Important decisions</p>
              </div>
            </div>
            <div className="ml-[52px] flex flex-col gap-3">
              {afterPassing && (
                <div className="p-4 rounded-xl" style={{ background: '#F5F0FF', border: '1px solid #DDD0F8' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-1">My wish for after I pass</p>
                  <p className="text-sm text-[#4A3870] font-medium">{afterPassing}</p>
                  {serviceType && <p className="text-xs text-[#8070A8] mt-1">I would like {serviceType}.</p>}
                  {plan.arrangements.afterPassingNotes && (
                    <p className="text-xs text-[#8070A8] mt-1 italic">Notes: {plan.arrangements.afterPassingNotes}</p>
                  )}
                </div>
              )}
              {(music || readings || finalResting) && (
                <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-2">My service wishes</p>
                  {music && <p className="text-xs text-[#8070A8]"><strong>Music:</strong> {music}</p>}
                  {readings && <p className="text-xs text-[#8070A8] mt-1"><strong>Readings:</strong> {readings}</p>}
                  {finalResting && <p className="text-xs text-[#8070A8] mt-1"><strong>Final resting place:</strong> {finalResting}</p>}
                </div>
              )}
              {plan.arrangements.serviceNotes && (
                <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-1">Additional service notes</p>
                  <p className="text-xs text-[#8070A8] leading-relaxed">{plan.arrangements.serviceNotes}</p>
                </div>
              )}
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-sm font-semibold text-[#4A3870] mb-1">Contact a funeral home</p>
                <p className="text-xs text-[#8070A8] leading-relaxed">You do not need to rush this decision. Take time to speak with my proxy and family. Most funeral homes will give you a few days.</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-sm font-semibold text-[#4A3870] mb-1">Don't make major financial decisions yet</p>
                <p className="text-xs text-[#8070A8] leading-relaxed">Wait at least 30 days before making significant financial decisions. Grief affects judgment, and you deserve time. Seek counsel when the time comes.</p>
              </div>
            </div>
          </div>

          {/* Step 3: Practical matters */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                style={{ background: '#5E9E7E', boxShadow: '0 2px 10px rgba(94,158,126,0.3)' }}>3</div>
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030]">Practical matters</h2>
                <p className="text-[10px] tracking-widest uppercase text-[#5E9E7E]">In the days following</p>
              </div>
            </div>
            <div className="ml-[52px] flex flex-col gap-3">
              <div className="p-4 rounded-xl" style={{ background: '#E8F5EE', border: '1px solid #C0DDD0' }}>
                <p className="text-sm font-semibold text-[#2A5A44] mb-1">Get certified death certificates</p>
                <p className="text-xs text-[#4A7860] leading-relaxed">Order at least 10–12 certified copies. You'll need them for banks, life insurance, SSA, property transfers, retirement accounts, and more.</p>
              </div>
              {willLocation && (
                <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-1">Find my will</p>
                  <p className="text-xs text-[#8070A8]">Location: <strong className="text-[#4A3870]">{willLocation}</strong></p>
                </div>
              )}
              {insuranceLocation && (
                <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-1">Find my insurance documents</p>
                  <p className="text-xs text-[#8070A8]">Location: <strong className="text-[#4A3870]">{insuranceLocation}</strong></p>
                </div>
              )}
              {attorney && (
                <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-1">Contact my attorney</p>
                  <p className="text-xs text-[#8070A8]"><strong className="text-[#4A3870]">{attorney}</strong></p>
                </div>
              )}
              {financialAdvisor && (
                <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-1">Contact my financial advisor</p>
                  <p className="text-xs text-[#8070A8]"><strong className="text-[#4A3870]">{financialAdvisor}</strong></p>
                </div>
              )}
              {plan.arrangements.guardianPreference && (
                <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <p className="text-sm font-semibold text-[#4A3870] mb-1">My guardian preference</p>
                  <p className="text-xs text-[#8070A8] leading-relaxed">{plan.arrangements.guardianPreference}</p>
                </div>
              )}
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-sm font-semibold text-[#4A3870] mb-1">Notify Social Security</p>
                <p className="text-xs text-[#8070A8] leading-relaxed">Call 1-800-772-1213. They will also notify Medicare. Do not cash any Social Security checks received for the month of death.</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-sm font-semibold text-[#4A3870] mb-1">Notify banks and financial institutions</p>
                <p className="text-xs text-[#8070A8] leading-relaxed">Bring certified death certificates. Freeze or transfer accounts as needed. This process takes weeks — that's normal.</p>
              </div>
            </div>
          </div>

          {/* Letters note */}
          {plan.letters.length > 0 && (
            <div className="mb-10 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FFF8EE, #FEF0E4)', border: '1px solid #F0D0A8' }}>
              <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">Letters I've written for you</p>
              <p className="text-sm font-medium text-[#7A4820] mb-1">
                I've left {plan.letters.length} personal {plan.letters.length === 1 ? 'letter' : 'letters'} for loved ones.
              </p>
              <p className="text-xs text-[#A06030] leading-relaxed">
                These letters are stored in my Stillwater care plan. Ask whoever has access to my account to share them, or look for printed copies with this guide.
              </p>
            </div>
          )}

          {/* Grief note */}
          <div className="mb-8 p-7 rounded-2xl text-center"
            style={{ background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF)', border: '1px solid rgba(155,92,175,0.15)' }}>
            <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#4A3870] italic leading-relaxed mb-3">
              "Grief is not a problem to solve. Let yourself feel it fully."
            </p>
            <p className="text-xs text-[#8070A8] leading-relaxed max-w-sm mx-auto">
              Please take care of yourselves. Eat. Sleep. Accept help when it's offered. There is no timeline, and there is no right way to grieve.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-6 text-center" style={{ borderTop: '1px solid #E0D8F5' }}>
            <p className="text-[10px] text-[#A090C0] tracking-wider">
              Prepared with Stillwater care planning · stillwatercare.vercel.app
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white; }
          .rounded-3xl { border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
}
