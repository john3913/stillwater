export type WishesData = {
  cpr: 'yes' | 'no' | 'limited' | '';
  ventilator: 'yes' | 'no' | 'limited' | '';
  dialysis: 'yes' | 'no' | 'limited' | '';
  feedingTube: 'yes' | 'no' | 'limited' | '';
  setting: 'home' | 'hospice' | 'hospital' | 'depends' | '';
  painPriority: 'comfort' | 'treatment' | 'balance' | '';
  organDonation: 'yes' | 'specific' | 'no' | 'registered' | '';
  organDonationNotes: string;
  additionalNotes: string;
};

export type ProxyData = {
  primaryName: string;
  primaryRelationship: string;
  primaryPhone: string;
  primaryEmail: string;
  alternateName: string;
  alternateRelationship: string;
  alternatePhone: string;
  notes: string;
};

export type ValuesData = {
  whatMatters: string;
  qualityVsQuantity: 'quality' | 'quantity' | 'balance' | '';
  biggestFear: string;
  biggestHope: string;
  spiritualBeliefs: string;
  importantRituals: string;
};

export type Letter = {
  id: string;
  to: string;
  subject: string;
  body: string;
  deliverWhen: 'death' | 'incapacity' | 'anytime';
  createdAt: string;
};

export type PlanData = {
  wishes: WishesData;
  proxy: ProxyData;
  values: ValuesData;
  letters: Letter[];
};

export const defaultWishes: WishesData = {
  cpr: '', ventilator: '', dialysis: '', feedingTube: '',
  setting: '', painPriority: '', organDonation: '',
  organDonationNotes: '', additionalNotes: '',
};

export const defaultProxy: ProxyData = {
  primaryName: '', primaryRelationship: '', primaryPhone: '', primaryEmail: '',
  alternateName: '', alternateRelationship: '', alternatePhone: '', notes: '',
};

export const defaultValues: ValuesData = {
  whatMatters: '', qualityVsQuantity: '', biggestFear: '',
  biggestHope: '', spiritualBeliefs: '', importantRituals: '',
};

export const defaultPlan: PlanData = {
  wishes: defaultWishes,
  proxy: defaultProxy,
  values: defaultValues,
  letters: [],
};
