'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const QUALITY_PLAIN: Record<string, string> = {
  quality: 'Quality of life comes first — I prefer comfort over length of life.',
  balance: 'I want a balance between quality and length of life.',
  quantity: 'Length of life comes first — I want every available treatment pursued.',
};
const CPR_PLAIN: Record<string, string> = {
  yes: 'I want CPR attempted.',
  no: 'I do not want CPR. Allow a natural death.',
  limited: 'CPR for a limited trial period, then let nature take its course.',
};
const VENT_PLAIN: Record<string, string> = {
  yes: 'I want a mechanical ventilator to help me breathe.',
  no: 'I do not want a ventilator. Comfort care only.',
  limited: 'Ventilator for a limited trial, then reassess.',
};
const DIALYSIS_PLAIN: Record<string, string> = {
  yes: 'I want dialysis for kidney support.',
  no: 'No dialysis. Comfort care only.',
  limited: 'Dialysis for a limited trial, then reassess.',
};
const FEEDING_PLAIN: Record<string, string> = {
  yes: 'I want a feeding tube if I cannot eat on my own.',
  no: 'No feeding tube. Natural eating or comfort sips only.',
  limited: 'Feeding tube for a limited trial, then let my proxy decide.',
};
const SETTING_PLAIN: Record<string, string> = {
  home: 'I want to be at home, near the people and places I love.',
  hospice: 'I want to be in a hospice or palliative care setting.',
  hospital: 'In a hospital where all treatments are available.',
  depends: 'Wherever is medically best — let my proxy and care team decide.',
};
const PAIN_PLAIN: Record<string, string> = {
  comfort: 'Prioritize my comfort above all else — keep me comfortable, even if it means less time.',
  balance: 'Balance my comfort with available treatments.',
  treatment: 'Pursue every available treatment to extend my life.',
};

function GuideSection({ number, title, color, children }: {
  number: string; title: string; color: string; children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '1px solid #E0D8F5' }}>
        <span className="font-[family-name:var(--font-cormorant)] text-3xl font-light" style={{ color }}>{number}</span>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function WishLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl mb-2" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#C47090' }} />
      <div>
        <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1">{label}</p>
        <p className="text-sm text-[#1A1030] leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="p-5 rounded-2xl mb-3" style={{ background: '#EDF7F3', border: '1px solid #B8DFC8' }}>
      <p className="text-xs font-medium text-[#3E8868] mb-2 leading-relaxed">{q}</p>
      <p className="text-sm text-[#1A1030] leading-relaxed">{a}</p>
    </div>
  );
}

export default function ConversationPage() {
  const { plan, loaded } = usePlan();
  if (!loaded) return null;

  const myName = plan.name || null;
  const proxyName = plan.proxy.primaryName || 'my healthcare proxy';
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const hasWishes = !!(plan.wishes.cpr || plan.wishes.ventilator || plan.wishes.dialysis || plan.wishes.feedingTube || plan.wishes.setting || plan.wishes.painPriority);
  const hasValues = !!(plan.values.whatMatters || plan.values.qualityVsQuantity || plan.values.biggestFear || plan.values.biggestHope);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 no-print">
        <Link href="/plan" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Your plan</Link>
      </div>

      {/* Header */}
      <p className="text-xs tracking-[0.3em] text-[#7C5CAF] uppercase mb-4 no-print">Conversation guide</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-2">
        For {proxyName}{myName ? `, from ${myName}` : ''}
      </h1>
      <p className="text-xs text-[#A090C0] mb-6 tracking-wide">{date}</p>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        A health care directive documents your wishes. The conversation — honest, early, and remembered — is what gets them honored. Share this with your proxy and family before you need it.
      </p>

      {/* Philosophy */}
      <div className="rounded-3xl p-8 mb-12" style={{ background: 'linear-gradient(135deg, #EDE8FF, #F0E8FF)', border: '1px solid #C4B0E8' }}>
        <div className="font-[family-name:var(--font-cormorant)] text-6xl font-light leading-none mb-3 select-none"
          style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: 0.45 }}>
          "
        </div>
        <p className="font-[family-name:var(--font-cormorant)] text-xl italic font-light text-[#3A2860] leading-relaxed mb-3">
          70% of people say they want to die at home. Only about 30% do — usually because the conversation happened too late or not at all.
        </p>
        <p className="text-xs text-[#A090C0] tracking-wider">The case for having this conversation now</p>
      </div>

      {/* 1. What I need you to know */}
      <GuideSection number="I" title="What I need you to know" color="#7C5CAF">
        {hasValues ? (
          <div className="flex flex-col gap-3">
            {plan.values.whatMatters && (
              <div className="p-5 rounded-2xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-2">What matters most to me</p>
                <p className="text-sm text-[#1A1030] leading-relaxed italic">"{plan.values.whatMatters}"</p>
              </div>
            )}
            {plan.values.qualityVsQuantity && (
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">Quality vs. length of life</p>
                <p className="text-sm text-[#1A1030] leading-relaxed">{QUALITY_PLAIN[plan.values.qualityVsQuantity]}</p>
              </div>
            )}
            {plan.values.biggestFear && (
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">What I fear most</p>
                <p className="text-sm text-[#1A1030] leading-relaxed">"{plan.values.biggestFear}"</p>
              </div>
            )}
            {plan.values.biggestHope && (
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">What I hope for</p>
                <p className="text-sm text-[#1A1030] leading-relaxed">"{plan.values.biggestHope}"</p>
              </div>
            )}
            {plan.values.spiritualBeliefs && (
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">My spiritual or cultural context</p>
                <p className="text-sm text-[#1A1030] leading-relaxed">{plan.values.spiritualBeliefs}</p>
              </div>
            )}
            {plan.values.importantRituals && (
              <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">Traditions that matter to me</p>
                <p className="text-sm text-[#1A1030] leading-relaxed">{plan.values.importantRituals}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl text-sm text-[#C4B0E8] italic" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
            Complete the <Link href="/plan/values" className="text-[#7C5CAF] hover:underline">Values section</Link> to personalize this guide.
          </div>
        )}
      </GuideSection>

      {/* 2. My medical wishes in plain language */}
      <GuideSection number="II" title="My key medical wishes" color="#C47090">
        {hasWishes ? (
          <div>
            {plan.wishes.cpr && <WishLine label="Resuscitation (CPR)" value={CPR_PLAIN[plan.wishes.cpr]} />}
            {plan.wishes.ventilator && <WishLine label="Breathing support (ventilator)" value={VENT_PLAIN[plan.wishes.ventilator]} />}
            {plan.wishes.dialysis && <WishLine label="Kidney support (dialysis)" value={DIALYSIS_PLAIN[plan.wishes.dialysis]} />}
            {plan.wishes.feedingTube && <WishLine label="Artificial nutrition (feeding tube)" value={FEEDING_PLAIN[plan.wishes.feedingTube]} />}
            {plan.wishes.setting && <WishLine label="Where I want to be" value={SETTING_PLAIN[plan.wishes.setting]} />}
            {plan.wishes.painPriority && <WishLine label="Comfort priority" value={PAIN_PLAIN[plan.wishes.painPriority]} />}
            {plan.wishes.additionalNotes && (
              <div className="mt-3 p-4 rounded-xl" style={{ background: '#FFF8EE', border: '1px solid #F0D0A8' }}>
                <p className="text-[10px] tracking-widest uppercase text-[#C08858] mb-1.5">Additional notes from me</p>
                <p className="text-sm text-[#4A3870] leading-relaxed">{plan.wishes.additionalNotes}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl text-sm text-[#C4B0E8] italic" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
            Complete the <Link href="/plan/wishes" className="text-[#7C5CAF] hover:underline">Wishes section</Link> to show your medical preferences here.
          </div>
        )}
      </GuideSection>

      {/* 3. Questions a doctor may ask */}
      <GuideSection number="III" title="Questions a doctor may ask you" color="#5E9E7E">
        <p className="text-sm text-[#4A3870] leading-relaxed mb-5 opacity-80">
          When {myName ? myName : 'I am'} unable to speak, {proxyName} may hear these questions. Here are the answers:
        </p>
        <QA
          q={`"What would ${myName ?? 'your loved one'} want in this situation?"`}
          a={plan.values.whatMatters
            ? `They have told me: "${plan.values.whatMatters.slice(0, 120)}${plan.values.whatMatters.length > 120 ? '…' : ''}"`
            : 'Their wishes are documented in their Minnesota Health Care Directive.'}
        />
        <QA
          q='"Do you want us to attempt CPR?"'
          a={plan.wishes.cpr ? CPR_PLAIN[plan.wishes.cpr] : 'See the health care directive for their stated preference.'}
        />
        <QA
          q='"Do you want life-sustaining treatment to continue?"'
          a={plan.values.qualityVsQuantity
            ? QUALITY_PLAIN[plan.values.qualityVsQuantity]
            : 'See the health care directive for their stated preference.'}
        />
        <QA
          q='"Are you aware of any other advance directives or POLST forms?"'
          a={`The original directive is kept at: ${plan.documents.storageLocation || '(see directive for storage location)'}. ${plan.documents.digitalBackup ? `Digital backup: ${plan.documents.digitalBackup}.` : ''}`}
        />
        {plan.proxy.alternateName && (
          <QA
            q='"Is there an alternate healthcare agent we should contact?"'
            a={`Yes — alternate agent: ${plan.proxy.alternateName}${plan.proxy.alternateRelationship ? ` (${plan.proxy.alternateRelationship})` : ''}${plan.proxy.alternatePhone ? `, ${plan.proxy.alternatePhone}` : ''}.`}
          />
        )}
      </GuideSection>

      {/* 4. How to start the conversation */}
      <GuideSection number="IV" title="How to start the conversation" color="#C08858">
        <p className="text-sm text-[#4A3870] leading-relaxed mb-5 opacity-80">
          The hardest part is starting. Here are three ways to open the conversation:
        </p>
        {[
          {
            label: 'With family:',
            script: `I've been thinking about my health care wishes and I want to make sure you know what I'd want if something happened. I've written it all down, but I want you to understand the heart of it — not just the document.`,
          },
          {
            label: 'With your proxy:',
            script: `I'm naming you as my healthcare proxy because I trust you deeply. I need you to know what matters most to me — not just the document, but the reasons behind each choice. Can we talk through it?`,
          },
          {
            label: 'With your doctor:',
            script: `I've completed a Minnesota Health Care Directive. I'd like to make sure it's in my chart and that we're aligned on my wishes before any procedure or hospitalization.`,
          },
        ].map(({ label, script }) => (
          <div key={label} className="p-5 rounded-2xl mb-3" style={{ background: '#FEF0E4', border: '1px solid #F0D0A8' }}>
            <p className="text-[10px] tracking-widest uppercase text-[#C08858] mb-2">{label}</p>
            <p className="text-sm text-[#4A3870] leading-relaxed italic">"{script}"</p>
          </div>
        ))}
      </GuideSection>

      {/* 5. Where the directive lives */}
      <GuideSection number="V" title="Where to find the directive" color="#3E8868">
        <div className="flex flex-col gap-3">
          {plan.documents.storageLocation ? (
            <div className="p-4 rounded-xl" style={{ background: '#EDF7F3', border: '1px solid #B8DFC8' }}>
              <p className="text-[10px] tracking-widest uppercase text-[#3E8868] mb-1.5">Original document</p>
              <p className="text-sm text-[#1A1030]">{plan.documents.storageLocation}</p>
            </div>
          ) : (
            <p className="text-sm text-[#C4B0E8] italic">
              Storage location not yet recorded. Add it in the <Link href="/plan/documents" className="text-[#3E8868] hover:underline">Documents section</Link>.
            </p>
          )}
          {plan.documents.digitalBackup && (
            <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
              <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-1.5">Digital backup</p>
              <p className="text-sm text-[#1A1030]">{plan.documents.digitalBackup}</p>
            </div>
          )}
          {plan.documents.distribution.length > 0 && (
            <div className="p-4 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
              <p className="text-[10px] tracking-widest uppercase text-[#A090C0] mb-3">Who has a copy</p>
              <div className="flex flex-col gap-1.5">
                {plan.documents.distribution.map(e => (
                  <div key={e.id} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: e.hasCopy ? '#3E8868' : '#C4B0E8' }} />
                    <span className="text-[#1A1030]">{e.name}</span>
                    {e.relationship && <span className="text-[#8070A8] text-xs">{e.relationship}</span>}
                    <span className="ml-auto text-xs" style={{ color: e.hasCopy ? '#3E8868' : '#C4B0E8' }}>
                      {e.hasCopy ? 'Has copy' : 'Not yet'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </GuideSection>

      {/* 6. When to update */}
      <GuideSection number="VI" title="When to update this plan" color="#9B68D0">
        <p className="text-sm text-[#4A3870] leading-relaxed mb-5 opacity-80">
          A health care directive reflects your wishes at a moment in time. Revisit it when:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Your health significantly changes',
            'Before any major surgery or procedure',
            'Your proxy is no longer available',
            'After a major life event (divorce, death)',
            'You move to a different state',
            'Every 1–2 years as a general review',
          ].map(s => (
            <div key={s} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: '#FAF8FF', border: '1px solid #E0D8F5' }}>
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#9B68D0' }} />
              <p className="text-xs text-[#4A3870] leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </GuideSection>

      {/* Footer actions */}
      <div className="mt-4 flex flex-col gap-3 no-print">
        <div className="flex gap-3">
          <button onClick={() => window.print()}
            className="flex-1 py-3.5 rounded-2xl text-sm font-medium text-white transition-all hover:-translate-y-0.5"
            style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
            Print guide
          </button>
          {plan.proxy.primaryName && (
            <Link href="/plan/notify-proxy"
              className="flex-1 py-3.5 rounded-2xl text-sm font-medium text-center text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #C47090, #D490A8)', boxShadow: '0 4px 18px rgba(196,112,144,0.28)' }}>
              Notify {plan.proxy.primaryName.split(' ')[0]} →
            </Link>
          )}
        </div>
        <Link href="/plan"
          className="text-center text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors py-1">
          ← Back to your plan
        </Link>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white !important; font-size: 10pt; }
          .rounded-3xl, .rounded-2xl, .rounded-xl { border-radius: 4px !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
