'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';
import type { Letter } from '@/lib/planTypes';

const WHEN_LABELS: Record<Letter['deliverWhen'], string> = {
  death: 'To be read after I pass',
  incapacity: 'If I become unable to communicate',
  anytime: 'Shareable anytime',
};

const WHEN_COLORS: Record<Letter['deliverWhen'], { bg: string; color: string }> = {
  death:      { bg: '#FDE8EF', color: '#C47090' },
  incapacity: { bg: '#FEF0E4', color: '#C08858' },
  anytime:    { bg: '#EDE8FF', color: '#7C5CAF' },
};

function LetterEditor({ initial, onSave, onCancel }: {
  initial?: Letter; onSave: (letter: Letter) => void; onCancel: () => void;
}) {
  const [to, setTo] = useState(initial?.to ?? '');
  const [subject, setSubject] = useState(initial?.subject ?? '');
  const [body, setBody] = useState(initial?.body ?? '');
  const [deliverWhen, setDeliverWhen] = useState<Letter['deliverWhen']>(initial?.deliverWhen ?? 'death');

  const canSave = to.trim() && body.trim();

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      id: initial?.id ?? crypto.randomUUID(),
      to, subject, body, deliverWhen,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#FAF8FF' }}>
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #E0D8F5', background: 'rgba(250,248,255,0.85)', backdropFilter: 'blur(8px)' }}>
        <button onClick={onCancel} className="text-sm text-[#8070A8] hover:text-[#4A3870] transition-colors">← Cancel</button>
        <span className="font-[family-name:var(--font-cormorant)] text-lg text-[#4A3870] tracking-wide">
          {initial ? 'Edit letter' : 'New letter'}
        </span>
        <button onClick={handleSave} disabled={!canSave}
          className="px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all"
          style={canSave
            ? { background: '#7C5CAF', color: 'white' }
            : { background: '#EDE8FF', color: '#C4B0E8', cursor: 'not-allowed' }}>
          Save letter
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-6">

          <div>
            <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-2">To</label>
            <input
              type="text"
              placeholder="e.g. My daughter Emma, My children, My dearest friend"
              className="w-full text-xl bg-transparent pb-2 focus:outline-none placeholder:text-[#C4B0E8] transition-colors font-[family-name:var(--font-cormorant)] font-light"
              style={{ borderBottom: '1px solid #E0D8F5', color: '#1A1030' }}
              onFocus={e => (e.target.style.borderBottomColor = '#A090D8')}
              onBlur={e => (e.target.style.borderBottomColor = '#E0D8F5')}
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-2">
              Subject <span className="text-[#C4B0E8]">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. What I most want you to know"
              className="w-full text-base bg-transparent pb-2 focus:outline-none placeholder:text-[#C4B0E8] transition-colors"
              style={{ borderBottom: '1px solid #E0D8F5', color: '#4A3870' }}
              onFocus={e => (e.target.style.borderBottomColor = '#A090D8')}
              onBlur={e => (e.target.style.borderBottomColor = '#E0D8F5')}
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-3">When should this be shared?</label>
            <div className="flex flex-wrap gap-2">
              {(['death', 'incapacity', 'anytime'] as const).map(w => (
                <button key={w} onClick={() => setDeliverWhen(w)}
                  className="px-4 py-2 rounded-full text-xs font-medium transition-all border"
                  style={deliverWhen === w
                    ? { borderColor: '#7C5CAF', background: '#EDE8FF', color: '#7C5CAF' }
                    : { borderColor: '#E0D8F5', color: '#8070A8' }}>
                  {WHEN_LABELS[w]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-wider text-[#8070A8] uppercase mb-2">Your letter</label>
            <textarea
              className="w-full min-h-[360px] text-base rounded-2xl p-5 focus:outline-none resize-none placeholder:text-[#C4B0E8] leading-relaxed transition-colors"
              style={{ border: '1px solid #E0D8F5', background: 'white', color: '#1A1030' }}
              onFocus={e => (e.target.style.borderColor = '#A090D8')}
              onBlur={e => (e.target.style.borderColor = '#E0D8F5')}
              placeholder="Begin your letter here. Take your time. There are no wrong words."
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

function LetterCard({ letter, onEdit, onDelete }: {
  letter: Letter; onEdit: () => void; onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const preview = letter.body.slice(0, 120).trim() + (letter.body.length > 120 ? '…' : '');
  const date = new Date(letter.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const { bg, color } = WHEN_COLORS[letter.deliverWhen];

  return (
    <div className="bg-white rounded-3xl p-7 transition-all hover:shadow-sm"
      style={{ border: '1px solid #E0D8F5' }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#C4B0E8')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#E0D8F5')}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-[#8070A8] tracking-wider mb-1">{date}</p>
          <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[#1A1030]">
            {letter.subject || 'Untitled letter'}
          </h3>
          <p className="text-sm text-[#4A3870] mt-0.5 opacity-80">To: {letter.to}</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full font-medium shrink-0 ml-4" style={{ background: bg, color }}>
          {WHEN_LABELS[letter.deliverWhen]}
        </span>
      </div>

      <p className="text-[#8070A8] text-sm italic leading-relaxed mb-6">"{preview}"</p>

      <div className="flex items-center gap-3">
        <button onClick={onEdit} className="text-xs font-medium tracking-wide transition-colors text-[#7C5CAF] hover:text-[#5A3E8A]">
          Edit
        </button>
        <span className="text-[#E0D8F5]">·</span>
        {confirmDelete ? (
          <>
            <button onClick={onDelete} className="text-xs text-[#C47090] font-medium">Confirm delete</button>
            <button onClick={() => setConfirmDelete(false)} className="text-xs text-[#8070A8]">Cancel</button>
          </>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="text-xs text-[#C4B0E8] hover:text-[#C47090] transition-colors">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function LettersPage() {
  const { plan, loaded, saveLetter, deleteLetter } = usePlan();
  const [editing, setEditing] = useState<Letter | null | 'new'>(null);

  useEffect(() => { /* trigger loaded read */ }, [loaded]);

  if (!loaded) return null;

  const letters = [...plan.letters].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (editing !== null) {
    return (
      <LetterEditor
        initial={editing === 'new' ? undefined : editing}
        onSave={letter => { saveLetter(letter); setEditing(null); }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="text-xs text-[#8070A8] hover:text-[#4A3870] transition-colors">← Your plan</Link>
      </div>

      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs tracking-[0.3em] text-[#C08858] uppercase mb-3">Legacy messages</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#1A1030]">
            Letters to loved ones
          </h1>
        </div>
        <button onClick={() => setEditing('new')}
          className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-colors shrink-0"
          style={{ background: '#7C5CAF', color: 'white' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#5A3E8A')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#7C5CAF')}>
          + New letter
        </button>
      </div>

      <p className="text-[#4A3870] text-sm leading-relaxed mb-10 max-w-md opacity-80">
        Write personal messages to the people who matter most — to be shared when the time comes, or anytime you choose. Say what you've always meant to say.
      </p>

      {letters.length === 0 ? (
        <div className="text-center py-20 rounded-3xl" style={{ border: '2px dashed #E0D8F5' }}>
          <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#C4B0E8] mb-3">
            No letters yet
          </p>
          <p className="text-[#8070A8] text-sm mb-8">Your first letter is the hardest. It doesn't have to be perfect.</p>
          <button onClick={() => setEditing('new')}
            className="px-6 py-3 rounded-full text-sm font-medium transition-colors"
            style={{ background: '#7C5CAF', color: 'white' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#5A3E8A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#7C5CAF')}>
            Write your first letter
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {letters.map(l => (
            <LetterCard key={l.id} letter={l} onEdit={() => setEditing(l)} onDelete={() => deleteLetter(l.id)} />
          ))}
          <button onClick={() => setEditing('new')}
            className="mt-2 w-full py-5 rounded-3xl text-sm transition-all text-[#8070A8] hover:text-[#4A3870]"
            style={{ border: '2px dashed #E0D8F5' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#C4B0E8')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#E0D8F5')}>
            + Write another letter
          </button>
        </div>
      )}
    </div>
  );
}
