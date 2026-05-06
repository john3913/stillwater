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

const WHEN_COLORS: Record<Letter['deliverWhen'], string> = {
  death: 'bg-rose-50 text-rose-700',
  incapacity: 'bg-amber-50 text-amber-700',
  anytime: 'bg-teal-50 text-teal-700',
};

function LetterEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Letter;
  onSave: (letter: Letter) => void;
  onCancel: () => void;
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
    <div className="fixed inset-0 z-50 bg-[#faf9f7] flex flex-col">
      {/* Editor nav */}
      <div className="border-b border-stone-100 px-6 py-4 flex items-center justify-between bg-[#faf9f7]/80 backdrop-blur-sm">
        <button onClick={onCancel} className="text-sm text-stone-400 hover:text-stone-600 transition-colors">
          ← Cancel
        </button>
        <span className="font-[family-name:var(--font-cormorant)] text-lg text-stone-600 tracking-wide">
          {initial ? 'Edit letter' : 'New letter'}
        </span>
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            canSave ? 'bg-teal-700 text-white hover:bg-teal-800' : 'bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
        >
          Save letter
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-6">

          {/* To */}
          <div>
            <label className="block text-xs tracking-wider text-stone-400 uppercase mb-2">To</label>
            <input
              type="text"
              placeholder="e.g. My daughter Emma, My children, My dearest friend"
              className="w-full text-xl text-stone-800 bg-transparent border-b border-stone-200 pb-2 focus:outline-none focus:border-teal-400 placeholder:text-stone-300 transition-colors font-[family-name:var(--font-cormorant)] font-light"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs tracking-wider text-stone-400 uppercase mb-2">Subject <span className="text-stone-300">(optional)</span></label>
            <input
              type="text"
              placeholder="e.g. What I most want you to know"
              className="w-full text-base text-stone-700 bg-transparent border-b border-stone-100 pb-2 focus:outline-none focus:border-teal-400 placeholder:text-stone-300 transition-colors"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>

          {/* When to deliver */}
          <div>
            <label className="block text-xs tracking-wider text-stone-400 uppercase mb-3">When should this be shared?</label>
            <div className="flex flex-wrap gap-2">
              {(['death', 'incapacity', 'anytime'] as const).map(w => (
                <button
                  key={w}
                  onClick={() => setDeliverWhen(w)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                    deliverWhen === w
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  {WHEN_LABELS[w]}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs tracking-wider text-stone-400 uppercase mb-2">Your letter</label>
            <textarea
              className="w-full min-h-[360px] text-base text-stone-800 bg-white rounded-2xl border border-stone-100 p-5 focus:outline-none focus:border-teal-300 resize-none placeholder:text-stone-300 leading-relaxed transition-colors"
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
  letter: Letter;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const preview = letter.body.slice(0, 120).trim() + (letter.body.length > 120 ? '…' : '');
  const date = new Date(letter.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-white border border-stone-100 rounded-3xl p-7 hover:border-stone-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-stone-400 tracking-wider mb-1">{date}</p>
          <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-stone-800">
            {letter.subject || 'Untitled letter'}
          </h3>
          <p className="text-sm text-stone-500 mt-0.5">To: {letter.to}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${WHEN_COLORS[letter.deliverWhen]}`}>
          {WHEN_LABELS[letter.deliverWhen]}
        </span>
      </div>

      <p className="text-stone-400 text-sm italic leading-relaxed mb-6">"{preview}"</p>

      <div className="flex items-center gap-3">
        <button
          onClick={onEdit}
          className="text-xs text-teal-700 hover:text-teal-800 font-medium tracking-wide transition-colors"
        >
          Edit
        </button>
        <span className="text-stone-200">·</span>
        {confirmDelete ? (
          <>
            <button onClick={onDelete} className="text-xs text-rose-600 font-medium">Confirm delete</button>
            <button onClick={() => setConfirmDelete(false)} className="text-xs text-stone-400">Cancel</button>
          </>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="text-xs text-stone-400 hover:text-rose-500 transition-colors">
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
        <Link href="/plan" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
          ← Your plan
        </Link>
      </div>

      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs tracking-[0.3em] text-teal-700 uppercase mb-3">Legacy messages</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-stone-800">
            Letters to loved ones
          </h1>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="bg-teal-700 text-white px-5 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-teal-800 transition-colors shrink-0"
        >
          + New letter
        </button>
      </div>

      <p className="text-stone-500 text-sm leading-relaxed mb-10 max-w-md">
        Write personal messages to the people who matter most — to be shared when the time comes, or anytime you choose. Say what you've always meant to say.
      </p>

      {letters.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-3xl">
          <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-stone-300 mb-3">
            No letters yet
          </p>
          <p className="text-stone-400 text-sm mb-8">Your first letter is the hardest. It doesn't have to be perfect.</p>
          <button
            onClick={() => setEditing('new')}
            className="bg-teal-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-teal-800 transition-colors"
          >
            Write your first letter
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {letters.map(l => (
            <LetterCard
              key={l.id}
              letter={l}
              onEdit={() => setEditing(l)}
              onDelete={() => deleteLetter(l.id)}
            />
          ))}
          <button
            onClick={() => setEditing('new')}
            className="mt-2 w-full py-5 border-2 border-dashed border-stone-100 rounded-3xl text-sm text-stone-400 hover:border-stone-200 hover:text-stone-600 transition-all"
          >
            + Write another letter
          </button>
        </div>
      )}
    </div>
  );
}
