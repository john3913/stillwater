"use client";

export default function EmailForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
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
  );
}
