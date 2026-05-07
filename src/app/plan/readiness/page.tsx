'use client';

import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

type Item = { label: string; done: boolean; href: string; hint?: string };
type Section = { title: string; color: string; href: string; items: Item[]; weight: number };

function strengthLabel(pct: number): { label: string; color: string; bg: string } {
  if (pct === 100) return { label: 'Complete', color: '#3E8868', bg: '#E8F5EE' };
  if (pct >= 75) return { label: 'Nearly complete', color: '#5B8DEF', bg: '#EBF2FF' };
  if (pct >= 50) return { label: 'Taking shape', color: '#9B68D0', bg: '#F0EBFF' };
  if (pct >= 25) return { label: 'In progress', color: '#C08858', bg: '#FEF0E4' };
  return { label: 'Just starting', color: '#A090C0', bg: '#F5F0FF' };
}

function GapItem({ item }: { item: Item }) {
  if (item.done) return null;
  return (
    <Link href={item.href}
      className="flex items-center gap-3 py-3 group transition-all"
      style={{ borderBottom: '1px solid #F0EBF8' }}>
      <div className="w-5 h-5 rounded-full border-2 border-dashed shrink-0 border-[#C4B0E8]" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#4A3870] group-hover:text-[#2E1A60] transition-colors">{item.label}</p>
        {item.hint && <p className="text-xs text-[#A090C0] mt-0.5">{item.hint}</p>}
      </div>
      <svg className="w-4 h-4 text-[#C4B0E8] shrink-0 group-hover:text-[#8070A8] transition-colors"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function SectionCard({ section }: { section: Section }) {
  const done = section.items.filter(i => i.done).length;
  const total = section.items.length;
  const pct = Math.round((done / total) * 100);
  const gaps = section.items.filter(i => !i.done);

  return (
    <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1px solid #E8E0F5', boxShadow: '0 1px 8px rgba(90,62,138,0.05)' }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <Link href={section.href}
            className="text-sm font-semibold text-[#1A1030] hover:text-[#2E1A60] transition-colors">
            {section.title}
          </Link>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: pct === 100 ? '#E8F5EE' : '#F0EBF8', color: pct === 100 ? '#3E8868' : '#8070A8' }}>
            {done}/{total}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F0EBF8' }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: section.color }} />
        </div>
      </div>

      {/* Gap items */}
      {gaps.length > 0 ? (
        <div className="px-6 pb-4">
          {gaps.map((item, i) => <GapItem key={i} item={item} />)}
        </div>
      ) : (
        <div className="px-6 pb-5 flex items-center gap-2.5 text-[#3E8868]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">All complete</p>
        </div>
      )}
    </div>
  );
}

export default function ReadinessPage() {
  const { plan, loaded, overallCompletion, wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion, arrangementsCompletion, documentsCompletion } = usePlan();

  if (!loaded) return null;

  const sections: Section[] = [
    {
      title: 'Your Wishes',
      color: '#7C5CAF',
      href: '/plan/wishes',
      weight: 100,
      items: [
        { label: 'CPR preference', done: !!plan.wishes.cpr, href: '/plan/wishes', hint: 'Do you want resuscitation attempted?' },
        { label: 'Ventilator preference', done: !!plan.wishes.ventilator, href: '/plan/wishes' },
        { label: 'Dialysis preference', done: !!plan.wishes.dialysis, href: '/plan/wishes' },
        { label: 'Feeding tube preference', done: !!plan.wishes.feedingTube, href: '/plan/wishes' },
        { label: 'Preferred care setting', done: !!plan.wishes.setting, href: '/plan/wishes', hint: 'Home, hospice, hospital, or no preference' },
        { label: 'Pain management priority', done: !!plan.wishes.painPriority, href: '/plan/wishes' },
        { label: 'Organ donation decision', done: !!plan.wishes.organDonation, href: '/plan/wishes' },
      ],
    },
    {
      title: 'Healthcare Proxy',
      color: '#C47090',
      href: '/plan/proxy',
      weight: 100,
      items: [
        { label: 'Primary agent named', done: !!plan.proxy.primaryName, href: '/plan/proxy', hint: 'The person who speaks for you — most critical role' },
        { label: 'Agent phone number', done: !!plan.proxy.primaryPhone, href: '/plan/proxy' },
        { label: 'Alternate agent named', done: !!plan.proxy.alternateName, href: '/plan/proxy', hint: 'Strongly recommended as backup' },
        { label: 'Your contact information', done: !!plan.principalDOB || !!plan.principalAddress, href: '/plan/proxy' },
      ],
    },
    {
      title: 'Your Values',
      color: '#5E9E7E',
      href: '/plan/values',
      weight: 100,
      items: [
        { label: 'What matters most to you', done: !!plan.values.whatMatters, href: '/plan/values' },
        { label: 'Quality vs. quantity of life', done: !!plan.values.qualityVsQuantity, href: '/plan/values' },
        { label: 'Your biggest fear', done: !!plan.values.biggestFear, href: '/plan/values', hint: 'Helps your proxy advocate for you' },
        { label: 'Your biggest hope', done: !!plan.values.biggestHope, href: '/plan/values' },
        { label: 'Scenario preferences', done: !!(plan.values.scenarioTerminal || plan.values.scenarioBrainInjury), href: '/plan/values' },
      ],
    },
    {
      title: 'Letters to Loved Ones',
      color: '#C08858',
      href: '/plan/letters',
      weight: 100,
      items: [
        { label: 'At least one letter written', done: plan.letters.length > 0, href: '/plan/letters', hint: 'Personal messages to be read when the time comes' },
      ],
    },
    {
      title: 'Final Arrangements',
      color: '#9B68D0',
      href: '/plan/arrangements',
      weight: 100,
      items: [
        { label: 'Burial or cremation preference', done: !!plan.arrangements.afterPassing, href: '/plan/arrangements' },
        { label: 'Memorial service wishes', done: !!plan.arrangements.serviceType, href: '/plan/arrangements' },
        { label: 'Will or trust location', done: !!plan.arrangements.willLocation, href: '/plan/arrangements', hint: 'So family can find it when needed' },
      ],
    },
    {
      title: 'Documents & Validity',
      color: '#3E8868',
      href: '/plan/documents',
      weight: 100,
      items: [
        { label: 'Directive signed', done: plan.documents.isSigned, href: '/plan/documents', hint: 'Required for legal validity in Minnesota' },
        { label: 'Properly witnessed', done: plan.documents.isWitnessed, href: '/plan/documents', hint: 'Two witnesses or a notary required' },
        { label: 'Storage location documented', done: !!plan.documents.storageLocation, href: '/plan/documents' },
        { label: 'Copies distributed', done: plan.documents.distribution.length > 0, href: '/plan/documents', hint: 'Proxy, doctor, and hospital should each have a copy' },
      ],
    },
  ];

  const totalItems = sections.reduce((a, s) => a + s.items.length, 0);
  const doneItems = sections.reduce((a, s) => a + s.items.filter(i => i.done).length, 0);
  const itemPct = Math.round((doneItems / totalItems) * 100);
  const strength = strengthLabel(itemPct);

  const completions = [wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion, arrangementsCompletion, documentsCompletion];
  const _ = completions; // referenced by sections implicitly via overallCompletion

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="back-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Your plan
        </Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#5B8DEF] uppercase mb-4">Plan readiness</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
        How strong is your directive?
      </h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-lg opacity-80">
        A strong directive is complete, specific, and distributed. Here&apos;s exactly where yours stands and what to do next.
      </p>

      {/* Score card */}
      <div className="rounded-3xl p-8 mb-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EDE8FF 0%, #EBF2FF 100%)', border: '1px solid #C8C0F0' }}>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: '#B8D0FF' }} />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Big score */}
          <div className="text-center shrink-0">
            <div className="relative inline-flex">
              <svg width="120" height="120" className="-rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(155,92,175,0.12)" strokeWidth="8" />
                <circle cx="60" cy="60" r="52" fill="none"
                  stroke="url(#rd-grad)" strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={(1 - itemPct / 100) * 2 * Math.PI * 52}
                  strokeLinecap="round" className="transition-all duration-700" />
                <defs>
                  <linearGradient id="rd-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5B8DEF" />
                    <stop offset="100%" stopColor="#C47090" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold text-[#2E1A60]">{itemPct}%</span>
                <span className="text-[9px] tracking-widest uppercase text-[#8070A8]">complete</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8070A8] mb-2">Directive strength</p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-[family-name:var(--font-cormorant)] font-medium text-[#1A1030]">{strength.label}</span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: strength.bg, color: strength.color }}>
                {doneItems} of {totalItems} items
              </span>
            </div>
            <p className="text-sm text-[#4A3870] leading-relaxed opacity-80">
              {itemPct === 100
                ? 'Your directive is comprehensive. Make sure copies are in the right hands.'
                : itemPct >= 75
                ? 'Almost there. The remaining items will significantly strengthen your directive.'
                : itemPct >= 50
                ? 'Good progress. Completing the gaps below will make your wishes legally clear.'
                : 'Every item you complete gives your loved ones more clarity. Start anywhere.'}
            </p>
          </div>
        </div>

        {/* Section mini-bars */}
        <div className="relative mt-6 pt-6" style={{ borderTop: '1px solid rgba(155,92,175,0.15)' }}>
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#A090C0] mb-3">By section</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {sections.map((s, i) => {
              const sectionDone = s.items.filter(x => x.done).length;
              const sectionPct = Math.round((sectionDone / s.items.length) * 100);
              return (
                <Link key={s.href} href={s.href} className="text-center group">
                  <div className="h-1.5 rounded-full overflow-hidden mb-1.5" style={{ background: 'rgba(255,255,255,0.5)' }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${sectionPct}%`, background: s.color }} />
                  </div>
                  <p className="text-[9px] text-[#8070A8] group-hover:text-[#4A3870] transition-colors">{s.title.split(' ').pop()}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* What's missing */}
      {doneItems < totalItems && (
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#1A1030] mb-6">
            What to complete next
          </h2>
          <div className="flex flex-col gap-4">
            {sections.map(s => {
              const gaps = s.items.filter(i => !i.done);
              if (gaps.length === 0) return null;
              return <SectionCard key={s.href} section={s} />;
            })}
          </div>
        </div>
      )}

      {/* Completed sections */}
      {sections.some(s => s.items.every(i => i.done)) && (
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#1A1030] mb-6">
            What&apos;s complete
          </h2>
          <div className="flex flex-col gap-4">
            {sections.map(s => {
              if (s.items.some(i => !i.done)) return null;
              return <SectionCard key={s.href} section={s} />;
            })}
          </div>
        </div>
      )}

      {/* Action CTA */}
      <div className="mt-12 rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #FAF8FF, #F0EAFF)', border: '1px solid #E0D8F5' }}>
        <p className="text-xs tracking-[0.3em] text-[#A090C0] uppercase mb-3">Next steps</p>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#1A1030] mb-4">
          {doneItems === totalItems ? 'Share it with those who need it.' : 'Every section you complete is a gift.'}
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {doneItems < totalItems ? (
            <Link href="/plan/guide" className="btn-primary btn-sm">Continue guided walkthrough →</Link>
          ) : (
            <Link href="/plan/share" className="btn-primary btn-sm">Share with family →</Link>
          )}
          <Link href="/plan/review" className="btn-secondary btn-sm">Review full directive</Link>
        </div>
      </div>
    </div>
  );
}
