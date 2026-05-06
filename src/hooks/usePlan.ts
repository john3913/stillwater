'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  PlanData, WishesData, ProxyData, ValuesData, Letter,
  ArrangementsData, DocumentsData, DistributionEntry,
} from '@/lib/planTypes';
import { defaultPlan } from '@/lib/planTypes';

const KEY = 'stillwater-plan';

export function usePlan() {
  const [plan, setPlan] = useState<PlanData>(defaultPlan);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPlan({ ...defaultPlan, ...JSON.parse(raw) });
    } catch { /* */ }
    setLoaded(true);
  }, []);

  const persist = useCallback((updated: PlanData) => {
    setPlan(updated);
    try { localStorage.setItem(KEY, JSON.stringify(updated)); } catch { /* */ }
  }, []);

  const saveWishes       = useCallback((w: WishesData)       => persist({ ...plan, wishes: w }),       [plan, persist]);
  const saveProxy        = useCallback((p: ProxyData)         => persist({ ...plan, proxy: p }),        [plan, persist]);
  const saveValues       = useCallback((v: ValuesData)        => persist({ ...plan, values: v }),       [plan, persist]);
  const saveArrangements = useCallback((a: ArrangementsData)  => persist({ ...plan, arrangements: a }), [plan, persist]);
  const saveDocuments    = useCallback((d: DocumentsData)     => persist({ ...plan, documents: d }),    [plan, persist]);

  const saveLetter = useCallback((letter: Letter) => {
    const rest = plan.letters.filter(l => l.id !== letter.id);
    persist({ ...plan, letters: [...rest, letter] });
  }, [plan, persist]);

  const deleteLetter = useCallback((id: string) => {
    persist({ ...plan, letters: plan.letters.filter(l => l.id !== id) });
  }, [plan, persist]);

  const addDistributionEntry = useCallback((entry: DistributionEntry) => {
    const docs = { ...plan.documents, distribution: [...plan.documents.distribution, entry] };
    persist({ ...plan, documents: docs });
  }, [plan, persist]);

  const updateDistributionEntry = useCallback((entry: DistributionEntry) => {
    const distribution = plan.documents.distribution.map(e => e.id === entry.id ? entry : e);
    persist({ ...plan, documents: { ...plan.documents, distribution } });
  }, [plan, persist]);

  const removeDistributionEntry = useCallback((id: string) => {
    const distribution = plan.documents.distribution.filter(e => e.id !== id);
    persist({ ...plan, documents: { ...plan.documents, distribution } });
  }, [plan, persist]);

  const pct = (n: number, d: number) => Math.round((n / d) * 100);

  const wishKeys = ['cpr', 'ventilator', 'dialysis', 'feedingTube', 'setting', 'painPriority', 'organDonation'] as const;
  const valKeys  = ['whatMatters', 'qualityVsQuantity', 'biggestFear', 'biggestHope'] as const;

  const wishesCompletion  = pct(wishKeys.filter(k => plan.wishes[k] !== '').length, wishKeys.length);
  const proxyCompletion   = plan.proxy.primaryName && plan.proxy.primaryPhone ? 100 : plan.proxy.primaryName ? 40 : 0;
  const valuesCompletion  = pct(valKeys.filter(k => plan.values[k] !== '').length, valKeys.length);
  const lettersCompletion = plan.letters.length > 0 ? 100 : 0;

  const arrangementsCompletion = plan.arrangements.afterPassing && plan.arrangements.serviceType
    ? (plan.arrangements.willLocation ? 100 : 60) : plan.arrangements.afterPassing ? 30 : 0;

  const documentsCompletion = plan.documents.isSigned && plan.documents.isWitnessed && plan.documents.distribution.length > 0
    ? 100 : (plan.documents.isSigned || plan.documents.distribution.length > 0) ? 40 : 0;

  const overallCompletion = pct(
    wishesCompletion + proxyCompletion + valuesCompletion + lettersCompletion + arrangementsCompletion + documentsCompletion,
    600,
  );

  return {
    plan, loaded,
    saveWishes, saveProxy, saveValues, saveLetter, deleteLetter,
    saveArrangements, saveDocuments,
    addDistributionEntry, updateDistributionEntry, removeDistributionEntry,
    wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion,
    arrangementsCompletion, documentsCompletion, overallCompletion,
  };
}
