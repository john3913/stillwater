'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { PlanData } from '@/lib/planTypes';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const IMPORTANCE = ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'];

function codeStatus(cpr: string, vent: string): string {
  if (cpr === 'no' && vent === 'no') return 'DNR / DNI — Do Not Resuscitate / Do Not Intubate';
  if (cpr === 'yes' && vent === 'yes') return 'Full Code — all life-sustaining measures';
  if (cpr === 'no') return 'DNR — Do Not Resuscitate (ventilator may be used if otherwise appropriate)';
  if (vent === 'no') return 'DNI — Do Not Intubate (CPR may be attempted)';
  if (cpr === 'limited' || vent === 'limited') return 'Modified code — limited trial, then reassess';
  return '';
}

function ScenarioRow({ label, value }: { label: string; value: string }) {
  const n = parseInt(value);
  return (
    <div className="flex items-center gap-4 py-3" style={{ borderBottom: '0.5px solid #E0D8F5' }}>
      <p className="text-sm text-[#4A3870] flex-1 leading-snug">{label}</p>
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex gap-1">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ background: i <= n ? '#5B8DEF' : '#E0D8F5' }} />
          ))}
        </div>
        <span className="text-xs text-[#8070A8] w-24 text-right">{IMPORTANCE[n]} ({value}/4)</span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="py-2.5" style={{ borderBottom: '0.5px solid #E0D8F5' }}>
      <span className="text-[10px] tracking-widest uppercase text-[#A090C0] mr-3">{label}</span>
      <span className="text-sm text-[#1A1030]">{value}</span>
    </div>
  );
}

function DoctorContent({ plan }: { plan: PlanData }) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const code = plan.wishes.cpr && plan.wishes.ventilator ? codeStatus(plan.wishes.cpr, plan.wishes.ventilator) : '';

  const cprLabels: Record<string,string> = {
    yes: 'Attempt CPR', no: 'Do Not Resuscitate (DNR)', limited: 'Limited trial, then reassess',
  };
  const ventLabels: Record<string,string> = {
    yes: 'Yes — intubate if indicated', no: 'Do Not Intubate (DNI)', limited: 'Limited trial, then reassess',
  };
  const dialysisLabels: Record<string,string> = {
    yes: 'Yes — dialysis if indicated', no: 'No dialysis', limited: 'Limited trial, then reassess',
  };
  const feedingLabels: Record<string,string> = {
    yes: 'Yes — use feeding tube', no: 'No artificial nutrition', limited: 'Limited trial, then reassess',
  };
  const settingLabels: Record<string,string> = {
    home: 'Home', hospice: 'Hospice / palliative facility', hospital: 'Hospital', depends: 'Per care team judgment',
  };
  const painLabels: Record<string,string> = {
    comfort: 'Comfort-focused (palliative priority)', balance: 'Balanced comfort and treatment', treatment: 'Aggressive treatment priority',
  };
  const qualityLabels: Record<string,string> = {
    quality: 'Quality of life preferred over longevity',
    balance: 'Balance between quality and longevity',
    quantity: 'Maximum longevity desired',
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Document header */}
      <div className="text-center py-7 rounded-3xl"
        style={{ background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF)', border: '1px solid rgba(91,141,239,0.2)' }}>
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#5B8DEF] mb-2">Goals of Care Summary</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-1">
          {plan.name || 'Patient'} — Advance Care Preferences
        </h1>
        {plan.principalDOB && (
          <p className="text-sm text-[#4A3870]">DOB: {plan.principalDOB}</p>
        )}
        {plan.principalAddress && (
          <p className="text-xs text-[#8070A8]">{plan.principalAddress}</p>
        )}
        <p className="text-xs text-[#A090C0] mt-2">Prepared with Stillwater · {date}</p>
      </div>

      {/* Directive status */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-4">Advance Directive Status</p>
          <div className="flex flex-col gap-2.5">
            {[
              { label: 'Minnesota Health Care Directive on file', done: true },
              { label: 'Signed by patient', done: plan.documents.isSigned },
              { label: 'Witnessed / notarized', done: plan.documents.isWitnessed },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                  style={{ background: item.done ? '#E8F5EE' : '#F5F0FF', border: `1.5px solid ${item.done ? '#C0E8D0' : '#E0D8F5'}` }}>
                  {item.done && <svg className="w-2.5 h-2.5 text-[#3E8868]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>}
                </div>
                <p className="text-xs text-[#4A3870]">{item.label}</p>
              </div>
            ))}
          </div>
          {plan.documents.storageLocation && (
            <p className="text-xs text-[#8070A8] mt-4">
              <span className="uppercase tracking-wider">Original: </span>{plan.documents.storageLocation}
            </p>
          )}
        </div>

        {/* Healthcare agent */}
        <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-4">Healthcare Agent</p>
          {plan.proxy.primaryName ? (
            <>
              <p className="font-medium text-[#1A1030] mb-0.5">{plan.proxy.primaryName}</p>
              {plan.proxy.primaryRelationship && <p className="text-xs text-[#8070A8] mb-1">{plan.proxy.primaryRelationship}</p>}
              {plan.proxy.primaryPhone && <p className="text-sm text-[#5B8DEF] font-medium mb-3">{plan.proxy.primaryPhone}</p>}
              {plan.proxy.primaryEmail && <p className="text-xs text-[#8070A8]">{plan.proxy.primaryEmail}</p>}
              {plan.proxy.agentActMode && (
                <p className="text-xs text-[#A090C0] mt-2">
                  Acts: {plan.proxy.agentActMode === 'alone' ? 'independently' : 'jointly with other agents'}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-[#C4B0E8] italic">No agent designated</p>
          )}
        </div>
      </div>

      {/* Code status */}
      {(plan.wishes.cpr || plan.wishes.ventilator) && (
        <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-4">Code Status & Resuscitation</p>
          {code && (
            <div className="p-4 rounded-2xl mb-4" style={{ background: '#F5F0FF', border: '1px solid #D4C8F8' }}>
              <p className="text-sm font-semibold text-[#2E1A60]">{code}</p>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-1">
            {plan.wishes.cpr && <Row label="CPR" value={cprLabels[plan.wishes.cpr] || plan.wishes.cpr} />}
            {plan.wishes.ventilator && <Row label="Ventilator / Intubation" value={ventLabels[plan.wishes.ventilator] || plan.wishes.ventilator} />}
            {plan.wishes.dialysis && <Row label="Dialysis" value={dialysisLabels[plan.wishes.dialysis] || plan.wishes.dialysis} />}
            {plan.wishes.feedingTube && <Row label="Artificial nutrition" value={feedingLabels[plan.wishes.feedingTube] || plan.wishes.feedingTube} />}
          </div>
        </div>
      )}

      {/* Goals of care */}
      {(plan.wishes.painPriority || plan.wishes.setting || plan.values.qualityVsQuantity) && (
        <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-4">Goals of Care</p>
          {plan.values.qualityVsQuantity && <Row label="Overall goal" value={qualityLabels[plan.values.qualityVsQuantity] || ''} />}
          {plan.wishes.painPriority && <Row label="Comfort priority" value={painLabels[plan.wishes.painPriority] || ''} />}
          {plan.wishes.setting && <Row label="Preferred setting" value={settingLabels[plan.wishes.setting] || ''} />}
          {plan.values.preferredCareLocation && (
            <Row
              label="If dying — preferred location"
              value={[
                plan.values.preferredCareLocation === 'nursing-home' ? 'Nursing home' : plan.values.preferredCareLocation.charAt(0).toUpperCase() + plan.values.preferredCareLocation.slice(1),
                plan.values.preferredCareLocationName,
              ].filter(Boolean).join(' — ')}
            />
          )}
        </div>
      )}

      {/* Scenario preferences */}
      {(plan.values.scenarioTerminal || plan.values.scenarioBrainInjury || plan.values.scenarioDementia) && (
        <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">Scenario Preferences</p>
          <p className="text-xs text-[#8070A8] mb-4 leading-relaxed">
            Patient-rated importance of continuing life-sustaining treatment (0 = would want to stop / limit, 4 = continue all treatment):
          </p>
          <div>
            {plan.values.scenarioTerminal && (
              <ScenarioRow label="Terminal illness — treatment only delays death" value={plan.values.scenarioTerminal} />
            )}
            {plan.values.scenarioBrainInjury && (
              <ScenarioRow label="Severe permanent brain injury, little chance of consciousness" value={plan.values.scenarioBrainInjury} />
            )}
            {plan.values.scenarioDementia && (
              <ScenarioRow label="Severe dementia — condition only worsening" value={plan.values.scenarioDementia} />
            )}
          </div>
          {plan.values.conditionsToStop && (
            <div className="mt-4 p-4 rounded-2xl" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
              <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">Conditions under which to stop treatment</p>
              <p className="text-sm text-[#4A3870] leading-relaxed">{plan.values.conditionsToStop}</p>
            </div>
          )}
          {plan.values.painTradeOff && (
            <p className="text-xs text-[#4A3870] mt-3 leading-relaxed">
              <strong>Pain management:</strong> Patient rates importance of pain control — even at risk of shortened life — as{' '}
              <strong>{IMPORTANCE[parseInt(plan.values.painTradeOff)]?.toLowerCase()}</strong> ({plan.values.painTradeOff}/4).
            </p>
          )}
        </div>
      )}

      {/* Patient's words */}
      {plan.values.whatMatters && (
        <div className="rounded-3xl p-6" style={{ background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF)', border: '1px solid #C4D0F0' }}>
          <p className="text-[10px] tracking-widest uppercase text-[#5B8DEF] mb-3">In the patient&apos;s own words</p>
          <p className="font-[family-name:var(--font-cormorant)] text-xl text-[#1A1030] italic leading-relaxed">
            &ldquo;{plan.values.whatMatters}&rdquo;
          </p>
          {plan.values.biggestFear && (
            <p className="text-xs text-[#4A3870] mt-4 leading-relaxed">
              <strong>What they fear most:</strong> {plan.values.biggestFear}
            </p>
          )}
        </div>
      )}

      {/* Organ donation */}
      {plan.wishes.organDonation && (
        <div className="bg-white rounded-3xl p-6" style={{ border: '1px solid #E0D8F5' }}>
          <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-3">Organ &amp; Tissue Donation</p>
          <p className="text-sm text-[#1A1030]">
            {{
              yes: 'Yes — donate any organs or tissues that can help others.',
              specific: 'Yes, with specific conditions — see notes below.',
              no: 'No — patient prefers not to donate.',
              registered: 'Already registered as a donor through the state program.',
            }[plan.wishes.organDonation] || plan.wishes.organDonation}
          </p>
          {plan.wishes.organDonationNotes && (
            <p className="text-xs text-[#4A3870] mt-2 leading-relaxed">{plan.wishes.organDonationNotes}</p>
          )}
        </div>
      )}

      <p className="text-center text-[10px] text-[#C4B0E8] tracking-wider">
        Generated with Stillwater · stillwatercare.vercel.app · This document does not replace a signed directive
      </p>

    </div>
  );
}

export default function DoctorPage() {
  const { plan, loaded } = usePlan();
  if (!loaded) return null;

  const hasContent = plan.wishes.cpr || plan.values.whatMatters || plan.proxy.primaryName;

  if (!hasContent) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
        </div>
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#EBF2FF' }}>
            <svg className="w-8 h-8 text-[#5B8DEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1A1030] mb-4">
            Complete your plan first
          </h2>
          <p className="text-[#4A3870] text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Add your medical wishes and proxy to generate the doctor summary.
          </p>
          <Link href="/plan/guide" className="btn-primary">Start your plan →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8FF] min-h-screen">
      <div className="no-print sticky top-16 z-40 border-b border-[#E0D8F5] bg-[#FAF8FF]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#8070A8] hidden md:block">Bring this to your next doctor&apos;s appointment</span>
            <button onClick={() => window.print()}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: GRAD, boxShadow: '0 3px 12px rgba(91,141,239,0.25)' }}>
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 print-page">
        <div className="mb-8 no-print">
          <p className="text-xs tracking-[0.3em] text-[#5B8DEF] uppercase mb-2">For your doctor</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030]">Doctor summary</h1>
          <p className="text-[#4A3870] text-sm mt-2 opacity-75 max-w-md">
            A clinical one-pager for your physician — code status, goals of care, and your key preferences in medical language. Print it and bring it to your next appointment.
          </p>
        </div>
        <DoctorContent plan={plan} />
      </div>

      <style>{`
        @media print {
          body { background: white; font-size: 10pt; }
          .no-print { display: none !important; }
          .bg-white, .rounded-3xl, .rounded-2xl { border-radius: 0 !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
