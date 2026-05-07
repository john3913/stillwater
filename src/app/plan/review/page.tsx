'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { PlanData } from '@/lib/planTypes';

const WISH_LABELS: Record<string, Record<string, string>> = {
  cpr: { yes: 'Yes — attempt CPR', limited: 'For a limited trial, then reassess', no: 'Allow a natural death — do not attempt CPR' },
  ventilator: { yes: 'Yes — use a mechanical ventilator', limited: 'For a limited trial period, then reassess', no: 'No mechanical ventilation — comfort care only' },
  dialysis: { yes: 'Yes — use dialysis', limited: 'For a limited trial, then reassess', no: 'No dialysis — comfort care only' },
  feedingTube: { yes: 'Yes — use a feeding tube', limited: 'For a limited trial, then reassess with proxy', no: 'No feeding tube — natural eating or comfort sips' },
  setting: { home: 'At home, close to the people and places I love', hospice: 'In a hospice or palliative care facility', hospital: 'In a hospital where all treatments are available', depends: 'Wherever is best — let my proxy and care team decide' },
  painPriority: { comfort: 'Prioritize my comfort above all else', balance: 'Balance comfort and available treatments', treatment: 'Pursue every available treatment to extend life' },
  organDonation: { yes: 'Yes — donate any organs or tissues that can help others', specific: 'Yes, with specific conditions (see notes below)', no: 'No — I prefer not to donate', registered: 'Already registered as a donor through the state program' },
};

const WISH_TAGS: [keyof typeof WISH_LABELS, string][] = [
  ['cpr', 'Resuscitation (CPR)'],
  ['ventilator', 'Breathing Support (Ventilator)'],
  ['dialysis', 'Kidney Support (Dialysis)'],
  ['feedingTube', 'Artificial Nutrition (Feeding Tube)'],
  ['setting', 'Preferred Care Setting'],
  ['painPriority', 'Comfort Priority'],
  ['organDonation', 'Organ & Tissue Donation'],
];

const ARRANGEMENT_LABELS: Record<string, string> = {
  burial: 'Traditional burial in a casket',
  cremation: 'Cremation',
  'donate-science': 'Body donation to medical science',
  other: 'Other or undecided — see notes',
};

const SERVICE_LABELS: Record<string, string> = {
  religious: 'Religious service at a place of worship',
  celebration: 'Celebration of life gathering',
  private: 'Private family gathering only',
  graveside: 'Graveside ceremony only',
  none: 'No formal service',
};

const QUALITY_LABELS: Record<string, string> = {
  quality: 'Quality of life comes first — comfort over length',
  balance: 'A balance between quality and length of life',
  quantity: 'Length of life comes first — pursue every treatment',
};

const WHEN_LABELS: Record<string, string> = {
  death: 'To be read after passing',
  incapacity: 'If unable to communicate',
  anytime: 'Shareable anytime',
};

function SectionHeader({ number, title, color }: { number: string; title: string; color: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 no-print"
      style={{ borderBottom: '1px solid #E0D8F5', paddingBottom: '1rem' }}>
      <span className="font-[family-name:var(--font-cormorant)] text-3xl font-light" style={{ color }}>{number}</span>
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030]">{title}</h2>
    </div>
  );
}

function PrintSectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
      <h2 style={{ fontSize: '14pt', fontWeight: 'bold', margin: 0 }}>{number}. {title}</h2>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="mb-3">
      <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">{label}</p>
      <p className="text-sm text-[#1A1030] leading-relaxed">{value}</p>
    </div>
  );
}

function PlanContent({ plan }: { plan: PlanData }) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col gap-10">

      {/* Document header */}
      <div className="text-center py-8 rounded-3xl mb-2"
        style={{ background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF, #FDE8EF)', border: '1px solid rgba(155,92,175,0.14)' }}>
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#8070A8] mb-3">Minnesota Health Care Directive</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-2">Advance Care Plan</h1>
        {plan.name && <p className="font-[family-name:var(--font-cormorant)] text-xl text-[#4A3870] mb-2">{plan.name}</p>}
        <p className="text-xs text-[#8070A8]">Prepared with Stillwater · {date}</p>
        {!plan.documents.isSigned && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
            style={{ background: '#FEF0E4', color: '#C08858', border: '1px solid #F0D0A8' }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
            </svg>
            Not yet signed — print and sign to make it legally valid
          </div>
        )}
        {plan.documents.isSigned && plan.documents.isWitnessed && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
            style={{ background: '#E8F5EE', color: '#3E8868', border: '1px solid #C0E8D0' }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Signed and witnessed — meets Minnesota legal requirements
          </div>
        )}
      </div>

      {/* Statutory declaration */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-5">Declaration — Minnesota Statutes, Chapter 145C</p>
        <p className="text-sm text-[#1A1030] leading-[1.9] mb-4">
          I, <strong>{plan.name || '_______________________________'}</strong>, being 18 years of age or older and of sound mind, make this health care directive voluntarily and free from duress or undue influence. I understand its nature and consequences.
        </p>
        {(plan.principalDOB || plan.principalAddress) && (
          <p className="text-sm text-[#4A3870] leading-[1.9] mb-4">
            {plan.principalDOB && <>Date of birth: <strong>{plan.principalDOB}</strong>. </>}
            {plan.principalAddress && <>Address: <strong>{plan.principalAddress}</strong>. </>}
            {plan.principalPhone && <>Phone: <strong>{plan.principalPhone}</strong>. </>}
            {plan.principalAltPhone && <>Alternate phone: <strong>{plan.principalAltPhone}</strong>.</>}
          </p>
        )}
        <p className="text-sm text-[#4A3870] leading-[1.9] mb-4">
          This directive authorizes my health care agent to make health care decisions for me — including decisions to withhold or withdraw life-sustaining treatment — when I am unable to make or communicate my own decisions. My health care agent and all providers are directed to follow the instructions contained in this directive.
        </p>
        <p className="text-sm text-[#4A3870] leading-[1.9] mb-4">
          I intend for my health care agent to be treated as I would be with respect to my rights regarding the use and disclosure of my individually identifiable health information or other medical records.
        </p>
        <p className="text-sm font-medium text-[#4A3870] leading-[1.9] p-4 rounded-xl" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
          This directive revokes all previous living wills, Durable Powers of Attorney for Health Care, and other advance health care directives I have signed.
        </p>
      </div>

      {/* Section 1: Proxy */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <SectionHeader number="I" title="Healthcare Agent (Proxy)" color="#C47090" />
        {plan.proxy.primaryName ? (
          <>
            {plan.proxy.agentActMode && (
              <div className="mb-5 p-3 rounded-xl text-xs" style={{ background: '#FDE8EF', color: '#6A1040', border: '1px solid #E8A8C0' }}>
                Agents may act: <strong>{plan.proxy.agentActMode === 'alone' ? 'independently (any one agent may act)' : 'jointly (all agents must agree)'}</strong>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
              <div>
                <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-3 font-medium">Primary Agent</p>
                <Row label="Name" value={plan.proxy.primaryName} />
                <Row label="Relationship" value={plan.proxy.primaryRelationship} />
                <Row label="Phone" value={plan.proxy.primaryPhone} />
                <Row label="Email" value={plan.proxy.primaryEmail} />
                <Row label="Address" value={plan.proxy.primaryAddress} />
              </div>
              {plan.proxy.alternateName && (
                <div>
                  <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-3 font-medium">First Successor</p>
                  <Row label="Name" value={plan.proxy.alternateName} />
                  <Row label="Relationship" value={plan.proxy.alternateRelationship} />
                  <Row label="Phone" value={plan.proxy.alternatePhone} />
                  <Row label="Address" value={plan.proxy.alternateAddress} />
                </div>
              )}
              {plan.proxy.secondAlternateName && (
                <div>
                  <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-3 font-medium">Second Successor</p>
                  <Row label="Name" value={plan.proxy.secondAlternateName} />
                  <Row label="Relationship" value={plan.proxy.secondAlternateRelationship} />
                  <Row label="Phone" value={plan.proxy.secondAlternatePhone} />
                  <Row label="Address" value={plan.proxy.secondAlternateAddress} />
                </div>
              )}
            </div>
            {/* Additional powers */}
            {Object.values(plan.proxy.additionalPowers).some(Boolean) && (
              <div className="mb-5">
                <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-3 font-medium">Additional Powers Granted</p>
                <div className="flex flex-col gap-1.5">
                  {plan.proxy.additionalPowers.whileCompetent && <p className="text-xs text-[#4A3870]">· May make decisions while I still have capacity</p>}
                  {plan.proxy.additionalPowers.funeralBurial && <p className="text-xs text-[#4A3870]">· Funeral and burial decisions</p>}
                  {plan.proxy.additionalPowers.mentalHealth && <p className="text-xs text-[#4A3870]">· Mental health care including ECT and antipsychotics</p>}
                  {plan.proxy.additionalPowers.pregnancy && <p className="text-xs text-[#4A3870]">· Pregnancy-related decisions</p>}
                  {plan.proxy.additionalPowers.afterDivorce && <p className="text-xs text-[#4A3870]">· Authority continues after divorce or dissolution</p>}
                </div>
              </div>
            )}
            {plan.proxy.agentLimitations && (
              <div className="mb-5 p-4 rounded-2xl" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">Limitations on agent&apos;s powers</p>
                <p className="text-sm text-[#4A3870] leading-relaxed">{plan.proxy.agentLimitations}</p>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-[#C4B0E8] italic">No proxy named yet. <Link href="/plan/proxy" className="text-[#7C5CAF] hover:underline">Add your healthcare agent →</Link></p>
        )}
        {plan.proxy.notes && (
          <div className="mt-5 p-4 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
            <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">Message to my proxy</p>
            <p className="text-sm text-[#4A3870] leading-relaxed italic">"{plan.proxy.notes}"</p>
          </div>
        )}
      </div>

      {/* Section 2: Wishes */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <SectionHeader number="II" title="Medical Wishes" color="#7C5CAF" />
        {WISH_TAGS.some(([k]) => plan.wishes[k as keyof typeof plan.wishes]) ? (
          <div className="flex flex-col gap-4">
            {WISH_TAGS.map(([key, tag]) => {
              const val = plan.wishes[key as keyof typeof plan.wishes] as string;
              if (!val) return null;
              return (
                <div key={key} className="flex gap-4 items-start p-4 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: '#9B5CAF' }} />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">{tag}</p>
                    <p className="text-sm text-[#1A1030]">{WISH_LABELS[key]?.[val] ?? val}</p>
                  </div>
                </div>
              );
            })}
            {plan.wishes.organDonationNotes && (
              <Row label="Donation notes" value={plan.wishes.organDonationNotes} />
            )}
            {plan.wishes.additionalNotes && (
              <div className="mt-2 p-4 rounded-2xl" style={{ background: '#F5F0FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">Additional notes</p>
                <p className="text-sm text-[#4A3870] leading-relaxed">{plan.wishes.additionalNotes}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-[#C4B0E8] italic">No wishes recorded yet. <Link href="/plan/wishes" className="text-[#7C5CAF] hover:underline">Begin your wishes →</Link></p>
        )}
      </div>

      {/* Section 3: Values */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <SectionHeader number="III" title="Personal Values" color="#5E9E7E" />
        {plan.values.whatMatters || plan.values.qualityVsQuantity ? (
          <div className="flex flex-col gap-5">
            {plan.values.whatMatters && (
              <div className="p-5 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">What matters most to me</p>
                <p className="text-sm text-[#4A3870] leading-relaxed italic">"{plan.values.whatMatters}"</p>
              </div>
            )}
            {plan.values.qualityVsQuantity && (
              <Row label="Quality vs. length of life" value={QUALITY_LABELS[plan.values.qualityVsQuantity] ?? ''} />
            )}
            {plan.values.biggestFear && (
              <Row label="What I fear most" value={plan.values.biggestFear} />
            )}
            {plan.values.biggestHope && (
              <Row label="What I hope for" value={plan.values.biggestHope} />
            )}
            {(plan.values.scenarioTerminal || plan.values.scenarioBrainInjury || plan.values.scenarioDementia) && (
              <div className="p-4 rounded-2xl" style={{ background: '#F8FEFC', border: '1px solid #C8E8D8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-3">Scenario-based guidance (0 = limit treatment, 4 = continue all treatment)</p>
                {plan.values.scenarioTerminal && <Row label="Terminal illness — treatment only delays death" value={`${plan.values.scenarioTerminal} / 4`} />}
                {plan.values.scenarioBrainInjury && <Row label="Severe permanent brain injury" value={`${plan.values.scenarioBrainInjury} / 4`} />}
                {plan.values.scenarioDementia && <Row label="Severe dementia, worsening condition" value={`${plan.values.scenarioDementia} / 4`} />}
              </div>
            )}
            {plan.values.conditionsToStop && (
              <Row label="Conditions under which treatment should stop" value={plan.values.conditionsToStop} />
            )}
            {plan.values.painTradeOff && (
              <Row label="Pain control even if it shortens life (importance)" value={`${plan.values.painTradeOff} / 4`} />
            )}
            {plan.values.financialBurden && (
              <Row label="Avoiding financial burden to family (importance)" value={`${plan.values.financialBurden} / 4`} />
            )}
            {plan.values.preferredCareLocation && (
              <Row label="Preferred care location if dying"
                value={plan.values.preferredCareLocation === 'nursing-home' ? 'Nursing home' : plan.values.preferredCareLocation.charAt(0).toUpperCase() + plan.values.preferredCareLocation.slice(1)}
              />
            )}
            {plan.values.preferredCareLocationName && (
              <Row label="Specific facility preference" value={plan.values.preferredCareLocationName} />
            )}
            {plan.values.spiritualBeliefs && (
              <Row label="Spiritual or religious beliefs" value={plan.values.spiritualBeliefs} />
            )}
            {plan.values.importantRituals && (
              <Row label="Cultural or family traditions" value={plan.values.importantRituals} />
            )}
          </div>
        ) : (
          <p className="text-sm text-[#C4B0E8] italic">No values recorded yet. <Link href="/plan/values" className="text-[#5E9E7E] hover:underline">Reflect on your values →</Link></p>
        )}
      </div>

      {/* Section 4: Letters */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <SectionHeader number="IV" title="Letters to Loved Ones" color="#C08858" />
        {plan.letters.length > 0 ? (
          <div className="flex flex-col gap-4">
            {plan.letters.map(l => (
              <div key={l.id} className="p-5 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-[#1A1030]">{l.subject || 'Untitled letter'}</p>
                    <p className="text-xs text-[#8070A8]">To: {l.to}</p>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full text-[#C08858] bg-[#FEF0E4]">
                    {WHEN_LABELS[l.deliverWhen]}
                  </span>
                </div>
                <p className="text-xs text-[#A090C0] italic leading-relaxed">
                  "{l.body.slice(0, 160)}{l.body.length > 160 ? '…' : ''}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#C4B0E8] italic">No letters written yet. <Link href="/plan/letters" className="text-[#C08858] hover:underline">Write your first letter →</Link></p>
        )}
      </div>

      {/* Section 5: Arrangements */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <SectionHeader number="V" title="Final Arrangements" color="#9B68D0" />
        {plan.arrangements.afterPassing ? (
          <div className="flex flex-col gap-4">
            <Row label="After I pass" value={ARRANGEMENT_LABELS[plan.arrangements.afterPassing] ?? ''} />
            {plan.arrangements.afterPassingNotes && <Row label="Notes on remains" value={plan.arrangements.afterPassingNotes} />}
            {plan.arrangements.serviceType && <Row label="Memorial service" value={SERVICE_LABELS[plan.arrangements.serviceType] ?? ''} />}
            {plan.arrangements.serviceNotes && <Row label="Service notes" value={plan.arrangements.serviceNotes} />}
            {plan.arrangements.music && <Row label="Music" value={plan.arrangements.music} />}
            {plan.arrangements.readings && <Row label="Readings or poems" value={plan.arrangements.readings} />}
            {plan.arrangements.finalResting && <Row label="Where I'd like my remains" value={plan.arrangements.finalResting} />}
            <div className="mt-2 pt-4" style={{ borderTop: '1px solid #E0D8F5' }}>
              <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-3 font-medium">Practical matters</p>
              {plan.arrangements.willLocation && <Row label="Location of my will" value={plan.arrangements.willLocation} />}
              {plan.arrangements.insuranceLocation && <Row label="Insurance documents" value={plan.arrangements.insuranceLocation} />}
              {plan.arrangements.attorney && <Row label="Attorney" value={plan.arrangements.attorney} />}
              {plan.arrangements.financialAdvisor && <Row label="Financial advisor" value={plan.arrangements.financialAdvisor} />}
              {plan.arrangements.guardianPreference && <Row label="Guardian preference" value={plan.arrangements.guardianPreference} />}
              {plan.arrangements.additionalNotes && <Row label="Additional notes" value={plan.arrangements.additionalNotes} />}
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#C4B0E8] italic">No arrangements recorded yet. <Link href="/plan/arrangements" className="text-[#9B68D0] hover:underline">Add arrangements →</Link></p>
        )}
      </div>

      {/* Section 6: Legal Status */}
      <div className="bg-white rounded-3xl p-8" style={{ border: '1px solid #E0D8F5' }}>
        <SectionHeader number="VI" title="Legal Status & Distribution" color="#3E8868" />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-4 font-medium">Validity checklist</p>
            {[
              { label: 'Written and dated', done: true },
              { label: 'Signed by me', done: plan.documents.isSigned },
              { label: plan.documents.witnessType === 'notary' ? 'Witnessed by notary public' : 'Witnessed by two people', done: plan.documents.isWitnessed },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 mb-3">
                <div className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                  style={{ background: item.done ? '#E8F5EE' : '#F5F0FF', border: `1.5px solid ${item.done ? '#C0E8D0' : '#E0D8F5'}` }}>
                  {item.done && <svg className="w-3 h-3 text-[#3E8868]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>}
                </div>
                <p className="text-sm text-[#4A3870]">{item.label}</p>
              </div>
            ))}
            {plan.documents.storageLocation && <Row label="Original document location" value={plan.documents.storageLocation} />}
            {plan.documents.digitalBackup && <Row label="Digital backup" value={plan.documents.digitalBackup} />}
          </div>
          {plan.documents.distribution.length > 0 && (
            <div>
              <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-4 font-medium">Who has a copy</p>
              <div className="flex flex-col gap-2">
                {plan.documents.distribution.map(e => (
                  <div key={e.id} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: e.hasCopy ? '#3E8868' : '#C4B0E8' }} />
                    <span className="text-[#1A1030]">{e.name}</span>
                    <span className="text-[#8070A8] text-xs">{e.relationship}</span>
                    <span className="ml-auto text-xs" style={{ color: e.hasCopy ? '#3E8868' : '#C4B0E8' }}>
                      {e.hasCopy ? 'Has copy' : 'No copy yet'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legal signature & witness block */}
      <div className="rounded-3xl p-8" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-2">Principal Signature</h3>
        <p className="text-xs text-[#8070A8] mb-7 leading-relaxed">
          By signing below I confirm this directive represents my wishes, made freely and without duress, while of sound mind.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="h-14 mb-2" style={{ borderBottom: '1.5px solid #C4B0E8' }} />
            <p className="text-[10px] text-[#A090C0] uppercase tracking-wider">{plan.name ? `Signature — ${plan.name}` : 'Signature of principal'}</p>
          </div>
          <div>
            <div className="h-14 mb-2" style={{ borderBottom: '1.5px solid #C4B0E8' }} />
            <p className="text-[10px] text-[#A090C0] uppercase tracking-wider">Date</p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: '#E0D8F5' }} />
          <p className="text-[10px] text-[#A090C0] tracking-[0.3em] uppercase shrink-0">Witnessed by two adults — or notarized</p>
          <div className="flex-1 h-px" style={{ background: '#E0D8F5' }} />
        </div>

        {/* Witness attestation note */}
        <div className="rounded-2xl p-5 mb-7" style={{ background: '#EBF2FF', border: '1px solid #BDD0FF' }}>
          <p className="text-xs text-[#3A6090] leading-relaxed">
            <strong className="font-medium">Minnesota Statute § 145C.05 — Witness requirements:</strong> Each witness must be 18 or older. Neither witness may be the principal&apos;s health care agent, or stand to financially benefit from the principal&apos;s death. <strong>At most one</strong> of the two witnesses may be a health care provider or employee of a health care provider who is currently providing care to the principal.
          </p>
        </div>

        {/* Two witness blocks */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {[1, 2].map(n => (
            <div key={n}>
              <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-4 font-medium">Witness {n}</p>
              <div className="h-12 mb-1" style={{ borderBottom: '1.5px solid #C4B0E8' }} />
              <p className="text-[10px] text-[#A090C0] mb-4">Signature</p>
              <div className="h-8 mb-1" style={{ borderBottom: '1px solid #E0D8F5' }} />
              <p className="text-[10px] text-[#A090C0] mb-4">Printed name</p>
              <div className="h-8 mb-1" style={{ borderBottom: '1px solid #E0D8F5' }} />
              <p className="text-[10px] text-[#A090C0] mb-4">Address</p>
              <div className="h-8 mb-1" style={{ borderBottom: '1px solid #E0D8F5' }} />
              <p className="text-[10px] text-[#A090C0]">Date</p>
            </div>
          ))}
        </div>

        {/* Or notary */}
        <div className="flex items-center gap-4 mb-7">
          <div className="flex-1 h-px" style={{ background: '#E0D8F5' }} />
          <p className="text-[10px] text-[#A090C0] tracking-[0.3em] uppercase shrink-0">— or alternatively —</p>
          <div className="flex-1 h-px" style={{ background: '#E0D8F5' }} />
        </div>

        <div>
          <p className="text-xs text-[#8070A8] uppercase tracking-wider mb-4 font-medium">Notary Public Acknowledgment</p>
          <p className="text-xs text-[#4A3870] leading-relaxed mb-5">
            State of Minnesota, County of _______________________________
          </p>
          <p className="text-xs text-[#4A3870] leading-[1.85] mb-7">
            On this _______ day of ______________________, _________, before me personally appeared the above-named principal, known to me to be the person whose name is subscribed to this instrument, and acknowledged that they executed the same as their free and voluntary act for the purposes therein stated.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="h-12 mb-1" style={{ borderBottom: '1.5px solid #C4B0E8' }} />
              <p className="text-[10px] text-[#A090C0]">Notary Public signature and seal</p>
            </div>
            <div>
              <div className="h-12 mb-1" style={{ borderBottom: '1px solid #E0D8F5' }} />
              <p className="text-[10px] text-[#A090C0]">My commission expires</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function ReviewPage() {
  const { plan, loaded } = usePlan();
  if (!loaded) return null;

  return (
    <div className="bg-[#FAF8FF] min-h-screen">
      {/* Sticky print bar */}
      <div className="no-print sticky top-16 z-40 border-b border-[#E0D8F5] bg-[#FAF8FF]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
          <div className="flex items-center gap-4">
            <Link href="/plan/share" className="text-xs text-[#7C5CAF] hover:text-[#5A3E8A] transition-colors tracking-wide">
              Share →
            </Link>
            <button onClick={() => window.print()}
              className="px-5 py-2 rounded-full text-xs font-medium text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #5B8DEF, #9B5CAF, #C47090)', boxShadow: '0 3px 12px rgba(91,141,239,0.25)' }}>
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 print-page">
        <div className="mb-8 no-print">
          <p className="text-xs tracking-[0.3em] text-[#7C5CAF] uppercase mb-2">Review</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030]">Your directive</h1>
          <p className="text-[#4A3870] text-sm mt-2 opacity-75">A formatted view of everything in your plan. Print to create your signed directive.</p>
        </div>
        <PlanContent plan={plan} />
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
