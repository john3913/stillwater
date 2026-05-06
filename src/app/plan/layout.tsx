import Link from 'next/link';

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8FF]/80 backdrop-blur-md border-b border-[#E0D8F5]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-[0.25em] text-[#4A3870]">
            stillwater
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
