export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-stone-50 dark:bg-stone-950">
      <main className="flex flex-col items-center gap-8 text-center px-8">
        <h1 className="text-6xl font-light tracking-widest text-stone-700 dark:text-stone-200">
          stillwater
        </h1>
        <p className="text-lg text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">
          End of life planning, with grace and clarity.
        </p>
        <p className="text-sm text-stone-400 dark:text-stone-600 tracking-wider uppercase">
          Coming soon
        </p>
      </main>
    </div>
  );
}
