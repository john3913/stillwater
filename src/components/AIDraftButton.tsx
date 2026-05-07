'use client';

import { useState, useRef } from 'react';

interface AIDraftButtonProps {
  prompt: string;
  onAccept: (text: string) => void;
  accentColor?: string;
}

export default function AIDraftButton({ prompt, onAccept, accentColor = '#9B5CAF' }: AIDraftButtonProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const generate = async () => {
    setDraft('');
    setLoading(true);
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) { setLoading(false); return; }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (!data) continue;
          try {
            const json = JSON.parse(data);
            if (json.type === 'content_block_delta' && json.delta?.type === 'text_delta') {
              setDraft(prev => prev + json.delta.text);
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') console.error('Draft error:', e);
    }
    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
    if (!draft) generate();
  };

  const handleAccept = () => {
    onAccept(draft);
    setOpen(false);
    setDraft('');
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={handleOpen}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium transition-all opacity-70 hover:opacity-100"
        style={{ color: accentColor }}>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Draft with AI
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-2xl overflow-hidden"
      style={{ border: `1.5px solid ${accentColor}30`, background: `${accentColor}06` }}>
      <div className="px-4 py-2.5 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${accentColor}20`, background: `${accentColor}10` }}>
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5" style={{ color: accentColor, opacity: 0.8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-[11px] font-semibold tracking-wide" style={{ color: accentColor }}>
            {loading ? 'Writing…' : 'AI suggestion — edit freely before using'}
          </span>
        </div>
        <button type="button" onClick={() => setOpen(false)}
          className="text-[10px] transition-colors"
          style={{ color: '#A090C0' }}>
          ✕
        </button>
      </div>

      <div className="px-4 py-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap min-h-[60px]"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', color: '#2A1848' }}>
          {draft}{loading && <span className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle" style={{ animation: 'fade-up 0.8s ease infinite alternate' }} />}
          {!draft && !loading && <span style={{ color: '#C4B0E8' }}>Click &ldquo;Try again&rdquo; to generate a new draft.</span>}
        </p>
      </div>

      <div className="px-4 pb-4 flex items-center gap-3">
        <button type="button" onClick={handleAccept} disabled={!draft || loading}
          className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all"
          style={draft && !loading
            ? { background: accentColor, color: 'white', boxShadow: `0 2px 10px ${accentColor}30` }
            : { background: '#F0EBF8', color: '#C4B0E8', cursor: 'not-allowed' }}>
          Use this →
        </button>
        <button type="button" onClick={generate} disabled={loading}
          className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
          style={loading
            ? { border: '1px solid #E0D8F5', color: '#C4B0E8', cursor: 'not-allowed' }
            : { border: '1px solid #C4B0E8', color: '#8070A8' }}>
          {loading ? 'Writing…' : 'Try again'}
        </button>
      </div>
    </div>
  );
}
