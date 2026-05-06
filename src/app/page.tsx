export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-[0.25em] text-stone-700">
            stillwater
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-stone-500 hover:text-stone-800 transition-colors tracking-wide">
              Features
            </a>
            <a href="#how" className="text-sm text-stone-500 hover:text-stone-800 transition-colors tracking-wide">
              How it works
            </a>
            <a
              href="#start"
              className="bg-teal-700 text-white text-sm px-5 py-2.5 rounded-full hover:bg-teal-800 transition-colors tracking-wide"
            >
              Begin your plan
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-[#faf9f7] to-teal-50/60" />

        {/* Decorative orbs */}
        <div className="absolute top-16 right-[-80px] w-[520px] h-[520px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[-60px] w-[380px] h-[380px] bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-stone-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.35em] text-teal-700 uppercase mb-8 font-medium">
              End of life planning
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-7xl font-light leading-[1.1] text-stone-800 mb-8">
              Plan with peace.<br />
              <em className="text-teal-700 font-light">Leave with love.</em>
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed mb-12 max-w-md">
              Stillwater helps you document your wishes, guide your loved ones,
              and leave a legacy of clarity — so those you love are never left wondering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#start"
                className="inline-flex items-center justify-center bg-teal-700 text-white px-8 py-4 rounded-full text-sm hover:bg-teal-800 transition-colors tracking-wide"
              >
                Begin your plan
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center border border-stone-200 text-stone-600 px-8 py-4 rounded-full text-sm hover:border-stone-400 hover:text-stone-800 transition-colors tracking-wide"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Hero illustration — concentric water rings */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-teal-200/60"
                  style={{
                    transform: `scale(${0.2 + i * 0.2})`,
                    opacity: 1 - i * 0.15,
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-teal-50 border border-teal-200/80 flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-stone-300 to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.35em] text-teal-700 uppercase mb-5 font-medium">
              What Stillwater offers
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-stone-800">
              A complete plan for those you love
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Your Wishes",
                desc: "Document your medical preferences, end-of-life care decisions, and final arrangements — all in one secure, private place.",
                color: "teal",
                bg: "bg-teal-50 group-hover:bg-teal-100",
                icon: (
                  <svg className="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                title: "For Your People",
                desc: "Leave personal messages, practical guidance, and heartfelt letters for those who matter most — to be read when they need you.",
                color: "amber",
                bg: "bg-amber-50 group-hover:bg-amber-100",
                icon: (
                  <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
              {
                title: "Your Story",
                desc: "Capture your memories, values, and the moments that define you. Leave a living legacy that tells the world who you truly were.",
                color: "sky",
                bg: "bg-sky-50 group-hover:bg-sky-100",
                icon: (
                  <svg className="w-6 h-6 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div key={f.title} className="group p-8 rounded-3xl border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all">
                <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-6 transition-colors`}>
                  {f.icon}
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-stone-800 mb-3">
                  {f.title}
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-800 to-teal-900/40 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <svg className="w-8 h-8 text-teal-500/40 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light italic text-stone-200 leading-relaxed mb-10">
            Planning for the end of life is not about dwelling in death — it is one of the deepest acts of love we can offer those we leave behind.
          </p>
          <div className="w-12 h-px bg-teal-600 mx-auto mb-6" />
          <p className="text-stone-400 text-xs tracking-[0.3em] uppercase">The Stillwater philosophy</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-32 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.35em] text-teal-700 uppercase mb-5 font-medium">
              Simple by design
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-stone-800">
              How Stillwater works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                num: "01",
                title: "Answer gently",
                desc: "We guide you through thoughtful questions at your own pace — no pressure, no jargon. Just space to reflect on what matters most.",
              },
              {
                num: "02",
                title: "Share securely",
                desc: "Invite family members or trusted people to access your plan on your terms, with full control over what they can see and when.",
              },
              {
                num: "03",
                title: "Update anytime",
                desc: "Life changes. Your plan can too. Return whenever you're ready to add, revise, or simply sit with what you've already said.",
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-5">
                <span className="font-[family-name:var(--font-cormorant)] text-7xl font-light text-stone-200 leading-none">
                  {step.num}
                </span>
                <div className="w-8 h-px bg-teal-400" />
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-stone-800">
                  {step.title}
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="py-14 border-y border-stone-100 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {[
              { label: "Private & encrypted", icon: "🔒" },
              { label: "Free to start", icon: "✦" },
              { label: "Guided at your pace", icon: "◇" },
              { label: "Share with loved ones", icon: "♡" },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2.5 text-stone-500 text-sm tracking-wide">
                <span className="text-teal-600 text-base">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-teal-900" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-700/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-900/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.35em] text-teal-300 uppercase mb-6 font-medium">
            Begin today
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light text-white leading-tight mb-6">
            For those you love.<br />
            <em className="text-teal-200">For your own peace of mind.</em>
          </h2>
          <p className="text-teal-200/80 text-lg leading-relaxed mb-12">
            Your plan takes less than an hour to start — and gives a lifetime of peace to carry.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-teal-300/70 focus:outline-none focus:border-white/50 text-sm tracking-wide"
            />
            <button
              type="submit"
              className="bg-white text-teal-900 px-7 py-4 rounded-full font-medium text-sm hover:bg-teal-50 transition-colors whitespace-nowrap tracking-wide"
            >
              Get early access
            </button>
          </form>

          <p className="text-teal-400/70 text-xs mt-5 tracking-wider">
            Free to start. Private by design. No spam, ever.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 bg-stone-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-[0.25em] text-stone-400">
            stillwater
          </span>
          <p className="text-stone-600 text-xs tracking-wider">
            End of life planning, with grace and clarity.
          </p>
          <div className="flex gap-6 text-xs text-stone-600 tracking-wide">
            <a href="#" className="hover:text-stone-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
