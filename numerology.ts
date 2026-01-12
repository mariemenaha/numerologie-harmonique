
import { UserData, NumerologyNumbers, Capacity } from '../types';

const ALPHABET_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y'];

const reduceNumber = (num: number, masterNumbers: number[] = [11, 22, 33, 44]): number => {
  if (num === 0) return 0;
  let sum = num;
  while (sum > 9 && !masterNumbers.includes(sum)) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return sum;
};

const sumValues = (text: string, filter?: (char: string) => boolean): number => {
  const cleanText = text.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z]/g, '');
  let sum = 0;
  for (const char of cleanText) {
    if (!filter || filter(char)) {
      sum += ALPHABET_VALUES[char] || 0;
    }
  }
  return sum;
};

const getLetterCount = (text: string, filter: (char: string) => boolean): number => {
  const cleanText = text.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z]/g, '');
  let count = 0;
  for (const char of cleanText) {
    if (filter(char)) {
      count++;
    }
  }
  return count;
};

export const getNumerologyTheme = (user: UserData): NumerologyNumbers => {
  const fullName = `${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim();
  const dateParts = user.birthDate.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  const yearSum = year.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  const graine = reduceNumber(day + month + yearSum);
  const sol = reduceNumber(sumValues(fullName));
  const feuille = reduceNumber(sumValues(fullName, char => VOWELS.includes(char)));
  const essence = reduceNumber(graine + sol + feuille);
  const tige = reduceNumber(day + month);
  const impulsion = reduceNumber(essence + tige);
  const pleineConscience = reduceNumber(essence + impulsion);
  const fleur = reduceNumber(sumValues(fullName, char => !VOWELS.includes(char)));
  const aura = reduceNumber(day);

  // Temporalité
  const currentYear = new Date().getFullYear();
  const universalYear = reduceNumber(currentYear);
  const personalYear = reduceNumber(day + month + universalYear);

  const capacityGroups = [
    { name: "Agir", letters: ['A', 'J', 'S'], val: 1 },
    { name: "Observer / Écouter", letters: ['B', 'K', 'T'], val: 2 },
    { name: "S'ouvrir", letters: ['C', 'L', 'U'], val: 3 },
    { name: "Se structurer", letters: ['D', 'M', 'V'], val: 4 },
    { name: "S'adapter", letters: ['E', 'N', 'W'], val: 5 },
    { name: "S'aimer", letters: ['F', 'O', 'X'], val: 6 },
    { name: "Réfléchir", letters: ['G', 'P', 'Y'], val: 7 },
    { name: "Bâtir", letters: ['H', 'Q', 'Z'], val: 8 },
    { name: "Se relier", letters: ['I', 'R'], val: 9 },
  ];

  // 1. Calculer les comptes bruts
  const rawCounts = capacityGroups.map(group => 
    getLetterCount(fullName, char => group.letters.includes(char))
  );

  // 2. Identifier les déclencheurs de résonance
  // Une valeur V (1 à 9) devient un déclencheur si sa cellule correspondante a 0 lettre OU un nombre de lettres égal à V.
  const resonanceTriggers = new Set<number>();
  rawCounts.forEach((count, index) => {
    const referenceValue = capacityGroups[index].val;
    if (count === 0 || count === referenceValue) {
      resonanceTriggers.add(referenceValue);
    }
  });

  // 3. Assigner les statuts selon la hiérarchie : Sagesse > Bloquée > Résonance > Consciente
  const capacities: Capacity[] = capacityGroups.map((group, index) => {
    const count = rawCounts[index];
    const score = reduceNumber(count);
    let status: Capacity['status'] = 'consciente';

    if (count === 0) {
      status = 'sagesse';
    } else if (count === group.val) {
      status = 'bloquee';
    } else if (resonanceTriggers.has(count)) {
      // Blocage par résonance : si le chiffre (count) réapparaît ailleurs alors qu'il est déclencheur
      status = 'resonance';
    } else {
      status = 'consciente';
    }

    return { 
      name: group.name, 
      score, 
      status, 
      baseValue: group.val,
      count
    };
  });

  return {
    graine, sol, feuille, essence, tige, impulsion, pleineConscience, fleur, aura, capacities,
    universalYear, personalYear
  };
};
