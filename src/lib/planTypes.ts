export type AdditionalPowers = {
  whileCompetent: boolean;
  funeralBurial: boolean;
  mentalHealth: boolean;
  pregnancy: boolean;
  afterDivorce: boolean;
};

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
  primaryAddress: string;
  agentActMode: 'alone' | 'together' | '';
  alternateName: string;
  alternateRelationship: string;
  alternatePhone: string;
  alternateAddress: string;
  secondAlternateName: string;
  secondAlternateRelationship: string;
  secondAlternatePhone: string;
  secondAlternateAddress: string;
  additionalPowers: AdditionalPowers;
  agentLimitations: string;
  notes: string;
};

export type ScenarioRating = '0' | '1' | '2' | '3' | '4' | '';

export type ValuesData = {
  whatMatters: string;
  qualityVsQuantity: 'quality' | 'quantity' | 'balance' | '';
  biggestFear: string;
  biggestHope: string;
  spiritualBeliefs: string;
  importantRituals: string;
  scenarioTerminal: ScenarioRating;
  scenarioBrainInjury: ScenarioRating;
  scenarioDementia: ScenarioRating;
  conditionsToStop: string;
  painTradeOff: ScenarioRating;
  financialBurden: ScenarioRating;
  preferredCareLocation: 'home' | 'hospital' | 'nursing-home' | 'hospice' | 'other' | '';
  preferredCareLocationName: string;
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

export type LegacyData = {
  lifeLesson: string;
  proudestMoment: string;
  advice: string;
  favoriteQuote: string;
  memorialize: string;
  readAtService: string;
  toFuture: string;
};

export type MedicationEntry = {
  id: string;
  name: string;
  dose: string;
  prescriber: string;
};

export type MedicalData = {
  bloodType: string;
  allergies: string;
  conditions: string;
  medications: MedicationEntry[];
  pcpName: string;
  pcpPhone: string;
  specialists: string;
  preferredHospital: string;
  insuranceCarrier: string;
  insurancePolicyNum: string;
  insuranceGroupNum: string;
};

export type VaultData = {
  willLocation: string;
  trustLocation: string;
  lifeInsurance: string;
  healthInsurance: string;
  retirementAccounts: string;
  bankInstitutions: string;
  realEstate: string;
  vehicles: string;
  digitalPasswords: string;
  safeLocation: string;
  safeCombo: string;
  taxReturns: string;
  otherNotes: string;
};

export type GiftEntry = {
  id: string;
  recipient: string;
  relationship: string;
  item: string;
  note: string;
};

export type GiftsData = {
  entries: GiftEntry[];
  generalNote: string;
};

export type PlanData = {
  name: string;
  principalDOB: string;
  principalAddress: string;
  principalPhone: string;
  principalAltPhone: string;
  wishes: WishesData;
  proxy: ProxyData;
  values: ValuesData;
  letters: Letter[];
  arrangements: ArrangementsData;
  documents: DocumentsData;
  legacy: LegacyData;
  medical: MedicalData;
  vault: VaultData;
  gifts: GiftsData;
};

const defaultAdditionalPowers: AdditionalPowers = {
  whileCompetent: false,
  funeralBurial: false,
  mentalHealth: false,
  pregnancy: false,
  afterDivorce: false,
};

export const defaultWishes: WishesData = {
  cpr: '', ventilator: '', dialysis: '', feedingTube: '',
  setting: '', painPriority: '', organDonation: '',
  organDonationNotes: '', additionalNotes: '',
};

export const defaultProxy: ProxyData = {
  primaryName: '', primaryRelationship: '', primaryPhone: '', primaryEmail: '',
  primaryAddress: '', agentActMode: '',
  alternateName: '', alternateRelationship: '', alternatePhone: '', alternateAddress: '',
  secondAlternateName: '', secondAlternateRelationship: '', secondAlternatePhone: '', secondAlternateAddress: '',
  additionalPowers: defaultAdditionalPowers,
  agentLimitations: '', notes: '',
};

export const defaultValues: ValuesData = {
  whatMatters: '', qualityVsQuantity: '', biggestFear: '',
  biggestHope: '', spiritualBeliefs: '', importantRituals: '',
  scenarioTerminal: '', scenarioBrainInjury: '', scenarioDementia: '',
  conditionsToStop: '', painTradeOff: '', financialBurden: '',
  preferredCareLocation: '', preferredCareLocationName: '',
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

export const defaultLegacy: LegacyData = {
  lifeLesson: '', proudestMoment: '', advice: '',
  favoriteQuote: '', memorialize: '', readAtService: '', toFuture: '',
};

export const defaultMedical: MedicalData = {
  bloodType: '', allergies: '', conditions: '',
  medications: [],
  pcpName: '', pcpPhone: '', specialists: '', preferredHospital: '',
  insuranceCarrier: '', insurancePolicyNum: '', insuranceGroupNum: '',
};

export const defaultVault: VaultData = {
  willLocation: '', trustLocation: '', lifeInsurance: '', healthInsurance: '',
  retirementAccounts: '', bankInstitutions: '', realEstate: '', vehicles: '',
  digitalPasswords: '', safeLocation: '', safeCombo: '', taxReturns: '', otherNotes: '',
};

export const defaultGifts: GiftsData = {
  entries: [],
  generalNote: '',
};

export const defaultPlan: PlanData = {
  name: '',
  principalDOB: '', principalAddress: '', principalPhone: '', principalAltPhone: '',
  wishes: defaultWishes,
  proxy: defaultProxy,
  values: defaultValues,
  letters: [],
  arrangements: defaultArrangements,
  documents: defaultDocuments,
  legacy: defaultLegacy,
  medical: defaultMedical,
  vault: defaultVault,
  gifts: defaultGifts,
};
