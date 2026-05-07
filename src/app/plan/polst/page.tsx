import Link from 'next/link';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

const differences = [
  {
    label: 'Health Care Directive',
    color: '#7C5CAF',
    bg: '#EDE8FF',
    border: '#C4B0E8',
    points: [
      'Written by you, in your own words',
      'Guides your proxy and healthcare team',
      'Effective when you cannot speak for yourself',
      'Flexible — can cover many scenarios',
      "Does not require a doctor's signature",
    ],
  },
  {
    label: 'POLST Form',
    color: '#3E8868',
    bg: '#E8F5EE',
    border: '#B8DFC8',
    points: [
      "A physician's medical order",
      'Must be signed by your doctor or NP',
      'Honored immediately by first responders',
      'Specific to your current medical condition',
      'Travels with you to hospitals, nursing homes',
    ],
  },
];

export default function PolstPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan/documents" className="back-btn"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg> Documents</Link>
      </div>

      <p className="text-xs tracking-[0.3em] text-[#3E8868] uppercase mb-4">Minnesota medical orders</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030] mb-4">
        What is a POLST form?
      </h1>
      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        A POLST (Physician Orders for Life-Sustaining Treatment) is a medical order that works alongside your health care directive. Understanding the difference helps you make sure your wishes are honored in every situation.
      </p>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {differences.map(d => (
          <div key={d.label} className="rounded-3xl p-7" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
            <p className="text-xs tracking-widest uppercase font-medium mb-4" style={{ color: d.color }}>{d.label}</p>
            <div className="flex flex-col gap-2.5">
              {d.points.map(p => (
                <div key={p} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: d.color }} />
                  <p className="text-xs text-[#4A3870] leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* When to consider */}
      <div className="bg-white rounded-3xl p-8 mb-6" style={{ border: '1px solid #E0D8F5' }}>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1030] mb-4">When to consider a POLST</h2>
        <div className="flex flex-col gap-3">
          {[
            'You have a serious illness or are in declining health',
            'You are 75 years old or older',
            'You have been recently hospitalized or discharged to a care facility',
            'You want your wishes honored by 911 responders, not just hospital staff',
          ].map(s => (
            <div key={s} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#FAF8FF' }}>
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#7C5CAF' }} />
              <p className="text-sm text-[#4A3870] leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#A090C0] mt-5 leading-relaxed">
          If none of these apply to you now, a health care directive is likely enough. A POLST is most valuable when you have a current, specific medical situation.
        </p>
      </div>

      {/* How to get one */}
      <div className="rounded-2xl p-6 mb-8" style={{ background: '#EBF2FF', border: '1px solid #BDD0FF' }}>
        <div className="flex items-start gap-4">
          <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#5B8DEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-[#2A5090] mb-2">How to get a POLST form in Minnesota</p>
            <p className="text-xs text-[#3A6090] leading-relaxed">
              Talk to your doctor, nurse practitioner, or palliative care team. They will complete the form with you based on your current condition and wishes. The form must be signed by both you and your clinician to be valid.
            </p>
            <p className="text-xs text-[#3A6090] mt-2 leading-relaxed">
              The Minnesota POLST form (also called a "DNAR" or "DNR" in some contexts) is bright pink so it's recognizable to first responders.
            </p>
          </div>
        </div>
      </div>

      {/* CTA back */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/plan/documents"
          className="flex-1 text-center py-3.5 rounded-2xl text-sm font-medium text-white transition-all hover:-translate-y-0.5"
          style={{ background: GRAD, boxShadow: '0 4px 20px rgba(91,141,239,0.28)' }}>
          Back to documents
        </Link>
        <Link href="/plan"
          className="flex-1 text-center py-3.5 rounded-2xl text-sm font-medium text-[#7C5CAF] border transition-all hover:bg-[#F0EAFF]"
          style={{ borderColor: '#C4B0E8' }}>
          ← Your plan
        </Link>
      </div>
    </div>
  );
}
