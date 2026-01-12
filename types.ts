
export interface UserData {
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
}

export interface Capacity {
  name: string;
  score: number;
  status: 'consciente' | 'bloquee' | 'sagesse' | 'resonance';
  baseValue: number;
  count: number;
}

export interface NumerologyNumbers {
  graine: number; // Esprit (Date)
  sol: number;    // Corps (Noms + Prénoms)
  feuille: number; // Coeur (Voyelles)
  essence: number; // Polarité Féminine (Graine+Sol+Feuille)
  tige: number;    // Tige (Jour+Mois)
  impulsion: number; // Moteur (Essence + Tige)
  pleineConscience: number; // Essence + Moteur
  fleur: number;   // Consonnes
  aura: number;    // Jour
  universalYear: number;
  personalYear: number;
  capacities: Capacity[];
}

export interface AnalysisResult {
  numbers: NumerologyNumbers;
  aiAnalysis?: string;
}
