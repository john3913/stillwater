'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { PlanData } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const CPR_PLAIN: Record<string, string> = {
  yes: 'Attempt CPR if their heart stops.',
  no: 'Do not attempt CPR — allow a natural death (DNR).',
  limited: 'Attempt CPR for a limited trial only, then reassess.',
};
const VENT_PLAIN: Record<string, string> = {
  yes: 'Use a mechanical ventilator if needed.',
  no: 'Do not use a mechanical ventilator — comfort care only.',
  limited: 'Use a ventilator for a limited trial, then reassess.',
};
const DIALYSIS_PLAIN: Record<string, string> = {
  yes: 'Use dialysis if their kidneys fail.',
  no: 'Do not use dialysis — comfort care only.',
  limited: 'Dialysis for a limited trial only, then reassess.',
};
const FEEDING_PLAIN: Record<string, string> = {
  yes: 'Use a feeding tube for nutrition.',
  no: 'No feeding tube — natural eating or comfort sips only.',
  limited: 'Feeding tube for a limited trial, then reassess.',
};
const SETTING_PLAIN: Record<string, string> = {
  home: 'Receive care at home if at all possible.',
  hospice: 'Receive care at a hospice or palliative care facility.',
  hospital: 'Receive care at a hospital where all treatments are available.',
  depends: 'Wherever the care team and proxy decide is best.',
};
const PAIN_PLAIN: Record<string, string> = {
  comfort: 'Prioritize comfort and pain control above all else.',
  balance: 'Balance comfort with available treatments.',
  treatment: 'Pursue every available treatment to extend life.',
};
const QUALITY_PLAIN: Record<string, string> = {
  quality: 'Quality of life comes first — they would choose comfort over a longer life with suffering.',
  balance: 'A balance between quality of life and length of life.',
  quantity: 'Length of life comes first — they would want every effort to extend life.',
};

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-[#C47090] mb-2">{label}</p>
      {children}
    </div>
  );
}

function BriefContent({ plan }: { plan: PlanData }) {
  const agentName = plan.proxy.primaryName || '[Your healthcare agent]';
  const principalName = plan.name || 'the person who created this directive';
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const wishes = [
    plan.wishes.cpr && { label: 'Resuscitation (CPR)', text: CPR_PLAIN[plan.wishes.cpr] },
    plan.wishes.ventilator && { label: 'Breathing support', text: VENT_PLAIN[plan.wishes.ventilator] },
    plan.wishes.dialysis && { label: 'Kidney support (dialysis)', text: DIALYSIS_PLAIN[plan.wishes.dialysis] },
    plan.wishes.feedingTube && { label: 'Artificial nutrition', text: FEEDING_PLAIN[plan.wishes.feedingTube] },
    plan.wishes.setting && { label: 'Preferred care setting', text: SETTING_PLAIN[plan.wishes.setting] },
    plan.wishes.painPriority && { label: 'Comfort priority', text: PAIN_PLAIN[plan.wishes.painPriority] },
  ].filter(Boolean) as { label: string; text: string }[];

  const additionalPowers: string[] = [];
  if (plan.proxy.additionalPowers?.whileCompetent) additionalPowers.push('Make decisions while the principal still has capacity');
  if (plan.proxy.additionalPowers?.funeralBurial) additionalPowers.push('Make funeral and burial decisions');
  if (plan.proxy.additionalPowers?.mentalHealth) additionalPowers.push('Mental health decisions including ECT and antipsychotics');
  if (plan.proxy.additionalPowers?.pregnancy) additionalPowers.push('Pregnancy-related decisions');
  if (plan.proxy.additionalPowers?.afterDivorce) additionalPowers.push('Continue as agent even after divorce or dissolution');

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="text-center py-8 rounded-3xl"
        style={{ background: 'linear-gradient(135deg, #FDE8EF, #FFF0F6)', border: '1px solid #F0C0D4' }}>
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#C47090] mb-3">Healthcare Agent Briefing</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-2">
          Dear {agentName},
        </h1>
        <p className="text-xs text-[#8070A8]">Prepared with Stillwater · {date}</p>
      </div>

      {/* Opening */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <p className="text-sm text-[#1A1030] leading-[1.9] mb-4">
          <strong>{plan.name ? plan.name : 'Someone who cares about you'}</strong> has named you as their healthcare agent under a Minnesota Health Care Directive (Chapter 145C).
        </p>
        <p className="text-sm text-[#4A3870] leading-[1.9] mb-4">
          If {plan.name || 'they'} become{plan.name ? 's' : ''} unable to make or communicate their own healthcare decisions, <strong>you have the legal authority to make those decisions on their behalf</strong> — including decisions about life-sustaining treatment.
        </p>
        <p className="text-sm text-[#4A3870] leading-[1.9]">
          This briefing document summarizes everything you need to know. Keep it with your copy of their signed directive.
        </p>
      </div>

      {/* Legal authority */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <Block label="Your legal role">
          <p className="text-sm text-[#1A1030] leading-[1.85] mb-4">
            As healthcare agent, you may — under Minnesota Statute Chapter 145C:
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {[
              'Accept or refuse any medical treatment, including life-sustaining measures',
              'Communicate with and direct the healthcare team on their behalf',
              'Access medical records and speak with providers',
              'Make decisions as they would want, guided by this document and your conversations',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#C47090' }} />
                <p className="text-sm text-[#4A3870] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          {additionalPowers.length > 0 && (
            <div className="p-4 rounded-2xl" style={{ background: '#FDE8EF', border: '1px solid #F0C0D4' }}>
              <p className="text-xs font-medium text-[#8B3060] mb-2">Additional powers explicitly granted:</p>
              {additionalPowers.map((p, i) => (
                <p key={i} className="text-xs text-[#6A1040] leading-relaxed">· {p}</p>
              ))}
            </div>
          )}
          {plan.proxy.agentLimitations && (
            <div className="mt-3 p-4 rounded-2xl" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
              <p className="text-xs font-medium text-[#7A4820] mb-1">Limitations on your authority:</p>
              <p className="text-xs text-[#6A3810] leading-relaxed">{plan.proxy.agentLimitations}</p>
            </div>
          )}
          {plan.proxy.agentActMode && (
            <p className="text-xs text-[#8070A8] mt-3 leading-relaxed">
              Multiple agents named: they may act{' '}
              <strong>{plan.proxy.agentActMode === 'alone' ? 'independently (any one agent may decide)' : 'jointly (all must agree)'}</strong>.
            </p>
          )}
        </Block>
      </div>

      {/* Key wishes */}
      {wishes.length > 0 && (
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <Block label={`${principalName}'s key medical wishes`}>
            <p className="text-xs text-[#8070A8] mb-5 leading-relaxed">
              These are their specific instructions about medical treatment. Your job is to advocate for these wishes even when it&apos;s difficult.
            </p>
            <div className="flex flex-col gap-4">
              {wishes.map((w, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#C47090' }} />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">{w.label}</p>
                    <p className="text-sm text-[#1A1030]">{w.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {plan.wishes.additionalNotes && (
              <div className="mt-4 p-4 rounded-2xl" style={{ background: '#F5F0FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">Additional notes</p>
                <p className="text-sm text-[#4A3870] leading-relaxed">{plan.wishes.additionalNotes}</p>
              </div>
            )}
          </Block>
        </div>
      )}

      {/* Values */}
      {(plan.values.whatMatters || plan.values.qualityVsQuantity || plan.values.conditionsToStop) && (
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <Block label="What matters most to them">
            {plan.values.whatMatters && (
              <div className="p-5 rounded-2xl mb-4" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-sm text-[#4A3870] leading-relaxed italic">&ldquo;{plan.values.whatMatters}&rdquo;</p>
              </div>
            )}
            {plan.values.qualityVsQuantity && (
              <p className="text-sm text-[#4A3870] leading-relaxed mb-2">
                <strong>Quality vs. length of life:</strong> {QUALITY_PLAIN[plan.values.qualityVsQuantity]}
              </p>
            )}
            {plan.values.conditionsToStop && (
              <div className="p-4 rounded-2xl mt-3" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">Conditions to stop treatment</p>
                <p className="text-sm text-[#4A3870] leading-relaxed">{plan.values.conditionsToStop}</p>
              </div>
            )}
            {plan.values.biggestFear && (
              <p className="text-sm text-[#4A3870] leading-relaxed mt-3">
                <strong>What they fear most:</strong> {plan.values.biggestFear}
              </p>
            )}
          </Block>
        </div>
      )}

      {/* Where the directive is */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <Block label="Where to find the directive">
          {plan.documents.storageLocation ? (
            <div className="p-4 rounded-2xl mb-3" style={{ background: '#E8F5EE', border: '1px solid #C0E8D0' }}>
              <p className="text-[10px] tracking-widest uppercase text-[#3E8868] mb-1">Original signed document</p>
              <p className="text-sm font-medium text-[#1A1030]">{plan.documents.storageLocation}</p>
            </div>
          ) : (
            <p className="text-sm text-[#C4B0E8] italic mb-3">No storage location recorded yet.</p>
          )}
          {plan.documents.digitalBackup && (
            <p className="text-xs text-[#4A3870] leading-relaxed">
              <strong>Digital backup:</strong> {plan.documents.digitalBackup}
            </p>
          )}
          <p className="text-xs text-[#8070A8] leading-relaxed mt-3">
            Present the signed original to hospitals, clinics, and emergency responders. Keep a copy at home.
          </p>
        </Block>
      </div>

      {/* Contact info */}
      {(plan.principalPhone || plan.proxy.alternateName) && (
        <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
          <Block label="Who else to contact">
            {plan.principalPhone && (
              <p className="text-sm text-[#4A3870] leading-relaxed mb-2">
                <strong>{plan.name || 'Principal'}:</strong> {plan.principalPhone}
                {plan.principalAltPhone && ` · ${plan.principalAltPhone}`}
              </p>
            )}
            {plan.proxy.alternateName && (
              <p className="text-sm text-[#4A3870] leading-relaxed mb-1">
                <strong>First successor agent:</strong> {plan.proxy.alternateName}
                {plan.proxy.alternatePhone && ` · ${plan.proxy.alternatePhone}`}
              </p>
            )}
            {plan.proxy.secondAlternateName && (
              <p className="text-sm text-[#4A3870] leading-relaxed mb-1">
                <strong>Second successor agent:</strong> {plan.proxy.secondAlternateName}
                {plan.proxy.secondAlternatePhone && ` · ${plan.proxy.secondAlternatePhone}`}
              </p>
            )}
          </Block>
        </div>
      )}

      {/* Personal message */}
      {plan.proxy.notes && (
        <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #FDE8EF, #FFF0F6)', border: '1px solid #F0C0D4' }}>
          <Block label={`A message from ${plan.name || 'them'}`}>
            <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#3A1028] italic leading-[1.75]">
              &ldquo;{plan.proxy.notes}&rdquo;
            </p>
          </Block>
        </div>
      )}

      <p className="text-center text-[10px] text-[#C4B0E8] tracking-wider">
        Generated with Stillwater · stillwatercare.vercel.app
      </p>

    </div>
  );
}

export default function AgentBriefPage() {
  const { plan, loaded } = usePlan();
  if (!loaded) return null;

  if (!plan.proxy.primaryName) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
        </div>
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#FDE8EF' }}>
            <svg className="w-8 h-8 text-[#C47090]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030] mb-4">
            Name a proxy first
          </h2>
          <p className="text-[#4A3870] text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            The agent briefing generates a personalized document for your healthcare agent. Add your proxy to unlock it.
          </p>
          <Link href="/plan/proxy" className="btn-primary">Add your healthcare agent →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8FF] min-h-screen">
      {/* Sticky bar */}
      <div className="no-print sticky top-16 z-40 border-b border-[#E0D8F5] bg-[#FAF8FF]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
          <button onClick={() => window.print()}
            className="px-5 py-2 rounded-full text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: GRAD, boxShadow: '0 3px 12px rgba(91,141,239,0.25)' }}>
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 print-page">
        <div className="mb-8 no-print">
          <p className="text-xs tracking-[0.3em] text-[#C47090] uppercase mb-2">For your agent</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030]">Agent briefing</h1>
          <p className="text-[#4A3870] text-sm mt-2 opacity-75 max-w-md">
            A personalized document for {plan.proxy.primaryName} — everything they need to know about their role and your wishes. Print and give them a copy alongside the signed directive.
          </p>
        </div>
        <BriefContent plan={plan} />
      </div>

      <style>{`
        @media print {
          body { background: white; font-size: 11pt; }
          .no-print { display: none !important; }
          .bg-white, .rounded-3xl, .rounded-2xl { border-radius: 0 !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
