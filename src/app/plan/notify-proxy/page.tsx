'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const CPR_PLAIN: Record<string, string> = {
  yes: 'I want CPR attempted.',
  no: 'I do not want CPR — please allow a natural death.',
  limited: 'CPR for a limited trial period only, then let nature take its course.',
};
const VENT_PLAIN: Record<string, string> = {
  yes: 'I want a mechanical ventilator to help me breathe.',
  no: 'I do not want a ventilator — comfort care only.',
  limited: 'A ventilator for a limited trial, then let my proxy reassess.',
};
const QUALITY_PLAIN: Record<string, string> = {
  quality: 'quality of life over length of life',
  balance: 'a balance between quality and length of life',
  quantity: 'every available treatment to extend life',
};
const SETTING_PLAIN: Record<string, string> = {
  home: 'I want to be at home if at all possible.',
  hospice: 'I want to be in a hospice or palliative care setting.',
  hospital: 'I want to be in a hospital with all treatments available.',
  depends: 'Wherever is medically best — please use your judgment.',
};

export default function NotifyProxyPage() {
  const { plan, loaded } = usePlan();
  const [copied, setCopied] = useState(false);

  if (!loaded) return null;

  const myName = plan.name || 'Your loved one';
  const proxyName = plan.proxy.primaryName;
  const proxyFirst = proxyName ? proxyName.split(' ')[0] : '';
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const lines: string[] = [];

  if (proxyName) {
    lines.push(`Dear ${proxyName},`, '');
    lines.push(
      `I am writing to let you know that I have named you as my healthcare proxy in my Minnesota Health Care Directive. If I ever become unable to speak for myself — whether from illness, accident, or another situation — you are legally authorized to make healthcare decisions on my behalf.`,
      '',
      `This is one of the most important roles I could ask of anyone, and I chose you because I trust your judgment deeply and know that you truly care about me.`,
    );

    if (plan.values.whatMatters) {
      lines.push('', `Here is what matters most to me, in my own words:`, '', `   "${plan.values.whatMatters}"`);
    }

    if (plan.values.qualityVsQuantity) {
      lines.push('', `When it comes to my care, I have expressed that I want ${QUALITY_PLAIN[plan.values.qualityVsQuantity]}.`);
    }

    if (plan.values.biggestFear) {
      lines.push('', `Something I fear most: "${plan.values.biggestFear}"`);
    }

    const wishSummaries: string[] = [];
    if (plan.wishes.cpr) wishSummaries.push(`Resuscitation (CPR): ${CPR_PLAIN[plan.wishes.cpr]}`);
    if (plan.wishes.ventilator) wishSummaries.push(`Breathing support: ${VENT_PLAIN[plan.wishes.ventilator]}`);
    if (plan.wishes.setting) wishSummaries.push(`Where I want to be: ${SETTING_PLAIN[plan.wishes.setting]}`);

    if (wishSummaries.length > 0) {
      lines.push('', 'Some specific wishes I want you to know:', '');
      wishSummaries.forEach(w => lines.push(`   • ${w}`));
    }

    if (plan.documents.storageLocation) {
      lines.push('', `My signed directive is kept at: ${plan.documents.storageLocation}`);
    }

    lines.push(
      '',
      `I would welcome the chance to talk through this together — please reach out any time. My hope is that you never have to use this, but if you do, I want you to feel certain about what I'd want.`,
      '',
      `Thank you for being someone I can trust with something this important.`,
      '',
      `With love and gratitude,`,
      myName,
    );
  }

  const letterText = lines.join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-12 no-print">
        <div className="mb-10">
          <Link href="/plan" className="back-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Your plan
          </Link>
        </div>

        <p className="text-xs tracking-[0.3em] text-[#C47090] uppercase mb-4">Closing the loop</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-3">
          Notify your proxy
        </h1>
        <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-lg opacity-80">
          {proxyName
            ? `A directive only works if your proxy knows about it. Below is a personalized letter you can send, share, or read together with ${proxyFirst}.`
            : 'Name a healthcare proxy first, then return here to send them a personal letter about their role.'}
        </p>

        {proxyName ? (
          <>
            {/* Letter */}
            <div className="bg-white rounded-3xl p-8 mb-6"
              style={{ border: '1px solid #E0D8F5', boxShadow: '0 2px 20px rgba(90,62,138,0.06)' }}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4B0E8]">Personal letter · {date}</p>
                <button onClick={handleCopy}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all"
                  style={copied
                    ? { background: '#E8F5EE', color: '#3E8868' }
                    : { background: '#EDE8FF', color: '#7C5CAF' }}>
                  {copied ? '✓ Copied' : 'Copy text'}
                </button>
              </div>

              <div className="flex flex-col gap-0.5">
                {lines.map((line, i) =>
                  line === '' ? (
                    <div key={i} className="h-3" />
                  ) : line.startsWith('   •') ? (
                    <p key={i} className="text-sm text-[#4A3870] leading-relaxed pl-4">{line.replace('   •', '•')}</p>
                  ) : line.startsWith('   "') ? (
                    <p key={i} className="text-sm text-[#1A1030] leading-relaxed pl-4 italic">{line.replace('   ', '')}</p>
                  ) : (
                    <p key={i} className="text-sm text-[#1A1030] leading-relaxed">{line}</p>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={() => window.print()}
                className="flex-1 py-4 rounded-2xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
                Print letter
              </button>
              <button onClick={handleCopy}
                className="px-6 py-4 rounded-2xl text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{ border: '1.5px solid #C4B0E8', background: 'white', color: '#7C5CAF' }}>
                {copied ? '✓ Copied' : 'Copy text'}
              </button>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: '#EBF2FF', border: '1px solid #BDD0FF' }}>
              <p className="text-xs font-medium text-[#3A6090] mb-1.5">After you send this letter</p>
              <p className="text-xs text-[#4A7090] leading-relaxed mb-3">
                Have the conversation in person if you can. Walk {proxyFirst} through your directive together — especially your values and fears.
                A proxy who understands your reasoning can navigate difficult decisions with much more confidence than one who only has a document.
              </p>
              <Link href="/plan/conversation"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#5B8DEF] hover:text-[#3A6090] transition-colors">
                Open conversation guide →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 rounded-3xl" style={{ border: '2px dashed #E0D8F5' }}>
            <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#C4B0E8] mb-3">
              No proxy named yet
            </p>
            <p className="text-[#8070A8] text-sm mb-8">Name your healthcare proxy first, then return here to notify them.</p>
            <Link href="/plan/proxy"
              className="px-6 py-3 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{ background: '#C47090', color: 'white' }}>
              Name your proxy →
            </Link>
          </div>
        )}
      </div>

      {/* Print layout */}
      <div className="notify-print">
        <div style={{ padding: '0.8in 1in', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1A1030', maxWidth: '6.5in' }}>
          <div style={{ borderBottom: '1px solid #C4B0E8', paddingBottom: 14, marginBottom: 22 }}>
            <p style={{ fontSize: '8pt', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A090C0', margin: '0 0 4px 0' }}>Personal letter</p>
            <p style={{ fontSize: '10pt', color: '#8070A8', margin: 0 }}>{date}</p>
          </div>
          {lines.map((line, i) =>
            line === '' ? (
              <div key={i} style={{ height: '0.5em' }} />
            ) : line.startsWith('   •') ? (
              <p key={i} style={{ fontSize: '11pt', lineHeight: 1.75, color: '#2A1848', margin: '0 0 2px 16px' }}>{line.replace('   •', '•')}</p>
            ) : line.startsWith('   "') ? (
              <p key={i} style={{ fontSize: '11pt', lineHeight: 1.75, color: '#2A1848', margin: '0 0 2px 16px', fontStyle: 'italic' }}>{line.replace('   ', '')}</p>
            ) : (
              <p key={i} style={{ fontSize: '11pt', lineHeight: 1.75, color: '#2A1848', margin: '0 0 2px 0' }}>{line}</p>
            )
          )}
        </div>
      </div>

      <style>{`
        .notify-print { display: none; }
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: white !important; }
          .notify-print { display: block !important; }
        }
      `}</style>
    </>
  );
}
