'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  PlanData, WishesData, ProxyData, ValuesData, Letter,
  ArrangementsData, DocumentsData, DistributionEntry, LegacyData,
  MedicalData, VaultData, GiftsData, GiftEntry,
} from '@/lib/planTypes';
import {
  defaultPlan, defaultProxy, defaultWishes, defaultValues,
  defaultArrangements, defaultDocuments, defaultLegacy,
  defaultMedical, defaultVault, defaultGifts,
} from '@/lib/planTypes';
import type { Profile } from '@/lib/profiles';
import { loadProfiles, saveProfiles, createProfile } from '@/lib/profiles';

const KEY = 'stillwater-plan';

type PrincipalInfo = {
  principalDOB: string;
  principalAddress: string;
  principalPhone: string;
  principalAltPhone: string;
};

function hydratePlan(d: Partial<PlanData>): PlanData {
  return {
    ...defaultPlan,
    ...d,
    proxy: {
      ...defaultProxy,
      ...d.proxy,
      additionalPowers: { ...defaultProxy.additionalPowers, ...(d.proxy?.additionalPowers ?? {}) },
    },
    wishes: { ...defaultWishes, ...d.wishes },
    values: { ...defaultValues, ...d.values },
    arrangements: { ...defaultArrangements, ...d.arrangements },
    documents: { ...defaultDocuments, ...d.documents },
    legacy: { ...defaultLegacy, ...(d.legacy ?? {}) },
    medical: {
      ...defaultMedical,
      ...(d.medical ?? {}),
      medications: d.medical?.medications ?? [],
    },
    vault: { ...defaultVault, ...(d.vault ?? {}) },
    gifts: {
      ...defaultGifts,
      ...(d.gifts ?? {}),
      entries: d.gifts?.entries ?? [],
    },
  };
}

export function usePlan() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [plan, setPlan] = useState<PlanData>(defaultPlan);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { profiles: profs, activeId: id } = loadProfiles();
    const active = profs.find(p => p.id === id) ?? profs[0];
    setProfiles(profs);
    setActiveId(active.id);
    setPlan(hydratePlan(active.plan));
    setLoaded(true);
  }, []);

  const persist = useCallback((updated: PlanData) => {
    setPlan(updated);
    setProfiles(prev => {
      const next = prev.map(p =>
        p.id === activeId
          ? { ...p, plan: updated, lastEdited: new Date().toISOString() }
          : p
      );
      saveProfiles(next, activeId);
      return next;
    });
    // Keep legacy key in sync for backwards compat
    try { localStorage.setItem(KEY, JSON.stringify(updated)); } catch { /* */ }
  }, [activeId]);

  const switchProfile = useCallback((id: string) => {
    setProfiles(prev => {
      const profile = prev.find(p => p.id === id);
      if (!profile) return prev;
      setActiveId(id);
      setPlan(hydratePlan(profile.plan));
      saveProfiles(prev, id);
      return prev;
    });
  }, []);

  const createNewProfile = useCallback((displayName: string) => {
    const newProfile = createProfile(displayName);
    setProfiles(prev => {
      const next = [...prev, newProfile];
      saveProfiles(next, newProfile.id);
      return next;
    });
    setActiveId(newProfile.id);
    setPlan(defaultPlan);
    return newProfile;
  }, []);

  const deleteProfile = useCallback((id: string) => {
    setProfiles(prev => {
      if (prev.length <= 1) return prev; // always keep at least one
      const next = prev.filter(p => p.id !== id);
      const newActiveId = id === activeId ? next[0].id : activeId;
      saveProfiles(next, newActiveId);
      if (id === activeId) {
        const newActive = next.find(p => p.id === newActiveId)!;
        setActiveId(newActiveId);
        setPlan(hydratePlan(newActive.plan));
      }
      return next;
    });
  }, [activeId]);

  const renameProfile = useCallback((id: string, displayName: string) => {
    setProfiles(prev => {
      const next = prev.map(p => p.id === id ? { ...p, displayName } : p);
      saveProfiles(next, activeId);
      return next;
    });
  }, [activeId]);

  const touchPlan        = useCallback(() => persist(plan),                                             [plan, persist]);
  const saveName         = useCallback((n: string)             => persist({ ...plan, name: n }),         [plan, persist]);
  const saveWishes       = useCallback((w: WishesData)         => persist({ ...plan, wishes: w }),       [plan, persist]);
  const saveProxy        = useCallback((p: ProxyData)          => persist({ ...plan, proxy: p }),        [plan, persist]);
  const saveValues       = useCallback((v: ValuesData)         => persist({ ...plan, values: v }),       [plan, persist]);
  const saveArrangements = useCallback((a: ArrangementsData)   => persist({ ...plan, arrangements: a }), [plan, persist]);
  const saveDocuments    = useCallback((d: DocumentsData)      => persist({ ...plan, documents: d }),    [plan, persist]);
  const saveLegacy       = useCallback((l: LegacyData)         => persist({ ...plan, legacy: l }),       [plan, persist]);
  const saveMedical      = useCallback((m: MedicalData)        => persist({ ...plan, medical: m }),      [plan, persist]);
  const saveVault        = useCallback((v: VaultData)          => persist({ ...plan, vault: v }),        [plan, persist]);
  const saveGifts        = useCallback((g: GiftsData)          => persist({ ...plan, gifts: g }),        [plan, persist]);

  const saveProxyAndPrincipal = useCallback(
    (proxy: ProxyData, info: PrincipalInfo) => persist({ ...plan, proxy, ...info }),
    [plan, persist],
  );

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

  const addGiftEntry = useCallback((entry: GiftEntry) => {
    const gifts = { ...plan.gifts, entries: [...plan.gifts.entries, entry] };
    persist({ ...plan, gifts });
  }, [plan, persist]);

  const updateGiftEntry = useCallback((entry: GiftEntry) => {
    const entries = plan.gifts.entries.map(e => e.id === entry.id ? entry : e);
    persist({ ...plan, gifts: { ...plan.gifts, entries } });
  }, [plan, persist]);

  const removeGiftEntry = useCallback((id: string) => {
    const entries = plan.gifts.entries.filter(e => e.id !== id);
    persist({ ...plan, gifts: { ...plan.gifts, entries } });
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

  const activeProfile = profiles.find(p => p.id === activeId);
  const activeProfileName = activeProfile?.displayName ?? '';
  const lastEdited: string | null = (activeProfile as { lastEdited?: string } | undefined)?.lastEdited ?? null;

  return {
    plan, loaded,
    profiles, activeId, activeProfileName, lastEdited,
    switchProfile, createNewProfile, deleteProfile, renameProfile,
    touchPlan, saveName, saveWishes, saveProxy, saveValues, saveLetter, deleteLetter,
    saveArrangements, saveDocuments, saveProxyAndPrincipal, saveLegacy,
    saveMedical, saveVault, saveGifts,
    addDistributionEntry, updateDistributionEntry, removeDistributionEntry,
    addGiftEntry, updateGiftEntry, removeGiftEntry,
    wishesCompletion, proxyCompletion, valuesCompletion, lettersCompletion,
    arrangementsCompletion, documentsCompletion, overallCompletion,
  };
}
