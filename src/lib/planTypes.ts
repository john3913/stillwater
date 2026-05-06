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

export type ArrangementsData = {
  afterPassing: 'burial' | 'cremation' | 'donate-science' | 'other' | '';
  afterPassingNotes: string;
  serviceType: 'religious' | 'celebration' | 'private' | 'graveside' | 'none' | '';
  serviceNotes: string;
  music: string;
  readings: string;
  finalResting: string;
  willLocation: string;
  insuranceLocation: string;
  attorney: string;
  financialAdvisor: string;
  guardianPreference: string;
  additionalNotes: string;
};

export type DistributionEntry = {
  id: string;
  name: string;
  relationship: string;
  hasCopy: boolean;
};

export type DocumentsData = {
  isSigned: boolean;
  isWitnessed: boolean;
  witnessType: 'notary' | 'two-witnesses' | '';
  storageLocation: string;
  digitalBackup: string;
  distribution: DistributionEntry[];
};

export type PlanData = {
  wishes: WishesData;
  proxy: ProxyData;
  values: ValuesData;
  letters: Letter[];
  arrangements: ArrangementsData;
  documents: DocumentsData;
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

export const defaultArrangements: ArrangementsData = {
  afterPassing: '', afterPassingNotes: '', serviceType: '', serviceNotes: '',
  music: '', readings: '', finalResting: '', willLocation: '',
  insuranceLocation: '', attorney: '', financialAdvisor: '',
  guardianPreference: '', additionalNotes: '',
};

export const defaultDocuments: DocumentsData = {
  isSigned: false, isWitnessed: false, witnessType: '',
  storageLocation: '', digitalBackup: '', distribution: [],
};

export const defaultPlan: PlanData = {
  wishes: defaultWishes,
  proxy: defaultProxy,
  values: defaultValues,
  letters: [],
  arrangements: defaultArrangements,
  documents: defaultDocuments,
};
