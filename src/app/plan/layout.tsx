import Link from 'next/link';

const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8FF]/85 backdrop-blur-lg border-b border-[#E0D8F5]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2.5 group">
            <span className="font-[family-name:var(--font-cormorant)] text-2xl italic font-light tracking-[0.2em]"
              style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              stillwater
            </span>
            <span className="text-[10px] tracking-[0.32em] text-[#A090C0] uppercase transition-colors group-hover:text-[#8070A8]">
              care plan
            </span>
          </Link>
          <Link href="/plan" className="text-xs text-[#8070A8] hover:text-[#4A3870] tracking-widest uppercase transition-colors">
            Your Plan
          </Link>
        </div>
      </nav>
      <div className="pt-16">{children}</div>
    </div>
  );
}
