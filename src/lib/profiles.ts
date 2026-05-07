import type { PlanData } from './planTypes';
import { defaultPlan } from './planTypes';

export type Profile = {
  id: string;
  displayName: string;
  createdAt: string;
  lastEdited: string;
  plan: PlanData;
};

const PROFILES_KEY = 'stillwater-profiles';
const ACTIVE_KEY = 'stillwater-active-id';
const LEGACY_KEY = 'stillwater-plan';

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function loadProfiles(): { profiles: Profile[]; activeId: string } {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (raw) {
      const profiles: Profile[] = JSON.parse(raw);
      if (profiles.length > 0) {
        const savedId = localStorage.getItem(ACTIVE_KEY);
        const activeId = profiles.find(p => p.id === savedId) ? savedId! : profiles[0].id;
        return { profiles, activeId };
      }
    }

    // Migration: if legacy plan key exists, create a profile from it
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const plan: PlanData = { ...defaultPlan, ...JSON.parse(legacy) };
      const profile: Profile = {
        id: genId(),
        displayName: plan.name || 'My Plan',
        createdAt: new Date().toISOString(),
        lastEdited: new Date().toISOString(),
        plan,
      };
      const profiles = [profile];
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      localStorage.setItem(ACTIVE_KEY, profile.id);
      return { profiles, activeId: profile.id };
    }
  } catch { /* */ }

  // Fresh start
  const profile = createProfileObject('My Plan', defaultPlan);
  const profiles = [profile];
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    localStorage.setItem(ACTIVE_KEY, profile.id);
  } catch { /* */ }
  return { profiles, activeId: profile.id };
}

function createProfileObject(displayName: string, plan: PlanData): Profile {
  return {
    id: genId(),
    displayName,
    createdAt: new Date().toISOString(),
    lastEdited: new Date().toISOString(),
    plan,
  };
}

export function saveProfiles(profiles: Profile[], activeId: string): void {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    localStorage.setItem(ACTIVE_KEY, activeId);
  } catch { /* */ }
}

export function createProfile(displayName: string): Profile {
  return createProfileObject(displayName || 'New Plan', defaultPlan);
}
