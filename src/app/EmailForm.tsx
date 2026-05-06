"use client";

export default function EmailForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 px-5 py-4 rounded-full border text-sm tracking-wide focus:outline-none transition-colors"
        style={{ background: 'rgba(255,255,255,0.6)', borderColor: '#C4B0E8', color: '#4A3870' }}
      />
      <button
        type="submit"
        className="px-7 py-4 rounded-full font-medium text-sm whitespace-nowrap tracking-wide transition-colors"
        style={{ background: '#7C5CAF', color: 'white' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#5A3E8A')}
        onMouseLeave={e => (e.currentTarget.style.background = '#7C5CAF')}
      >
        Get early access
      </button>
    </form>
  );
}
