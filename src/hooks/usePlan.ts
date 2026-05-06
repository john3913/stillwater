'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PlanData, WishesData, ProxyData, ValuesData, Letter } from '@/lib/planTypes';
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

  const saveWishes  = useCallback((w: WishesData) => persist({ ...plan, wishes: w }),  [plan, persist]);
  const saveProxy   = useCallback((p: ProxyData)  => persist({ ...plan, proxy: p }),   [plan, persist]);
  const saveValues  = useCallback((v: ValuesData)  => persist({ ...plan, values: v }),  [plan, persist]);

  const saveLetter = useCallback((letter: Letter) => {
    const rest = plan.letters.filter(l => l.id !== letter.id);
    persist({ ...plan, letters: [...rest, letter] });
  }, [plan, persist]);

  const deleteLetter = useCallback((id: string) => {
    persist({ ...plan, letters: plan.letters.filter(l => l.id !== id) });
  }, [plan, persist]);

  const wishKeys = ['cpr', 'ventilator', 'dialysis', 'feedingTube', 'setting', 'painPriority', 'organDonation'] as const;
  const valKeys  = ['whatMatters', 'qualityVsQuantity', 'biggestFear', 'biggestHope'] as const;

  const pct = (filled: number, total: number) => Math.round((filled / total) * 100);

  const wishesCompletion  = pct(wishKeys.filter(k => plan.wishes[k] !== '').length, wishKeys.length);
  const proxyCompletion   = plan.proxy.primaryName && plan.proxy.primaryPhone ? 100 : plan.proxy.primaryName ? 40 : 0;
  const valuesCompletion  = pct(valKeys.filter(k => plan.values[k] !== '').length, valKeys.length);
  const lettersCompletion = plan.letters.length > 0 ? 100 : 0;
  const overallCompletion = pct(wishesCompletion + proxyCompletion + valuesCompletion + lettersCompletion, 400);

  return {
    plan, loaded,
    saveWishes, saveProxy, saveValues, saveLetter, deleteLetter,
    wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion, overallCompletion,
  };
}
