
import { GoogleGenAI } from "@google/genai";
import { NumerologyNumbers, UserData } from "../types";

export const generatePersonalizedAnalysis = async (
  user: UserData,
  numbers: NumerologyNumbers
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const fullName = `${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim();
  
  const prompt = `
    En tant qu'expert en numérologie harmonique de la "Fleur de Vie", rédige une analyse mystique pour ${fullName}.
    
    CONSIGNE DE FORMATAGE CRUCIALE :
    - SÉPARE le texte de chaque élément (Graine, Sol, Tige, Essence, Moteur, etc.) par un nouveau paragraphe (double retour à la ligne).
    - Mets en **GRAS** les noms des éléments de la fleur et les mots-clés importants (ex: **Graine**, **Ancrage**, **Prospérité**, **Engagement**).
    - Rends la lecture aérée et agréable.

    Structure ton analyse selon ces piliers :

    1. LES BESOINS DE SÉCURITÉ INTÉRIEURE (L'Ancrage) :
    - **Graine** (Esprit) : ${numbers.graine}
    - **Sol** (Corps) : ${numbers.sol}
    - **Feuille** (Cœur) : ${numbers.feuille}
    - **Essence** (Polarité Féminine) : ${numbers.essence}
    Explique comment chacun de ces 4 éléments stabilisent l'individu spécifiquement.

    2. LE SYSTÈME DE MOTIVATION (L'Incarnation) :
    - **Essence** (Féminin) : ${numbers.essence}
    - **Tige** (Engagement) : ${numbers.tige}
    - **Moteur** (Polarité Masculine) : ${numbers.impulsion}
    Explique que l'élan dans la vie se fait grâce à la **Tige**. Précise que la synergie entre l'**Essence** et la **Tige** activent le **Moteur**.

    3. L'HARMONIE SUPRÊME ET RAYONNEMENT :
    - **Pleine conscience** : ${numbers.pleineConscience}
    - **Fleur** : ${numbers.fleur}
    Interprète l'alignement global.

    4. TEMPORALITÉ :
    - **Année Universelle** : ${numbers.universalYear}
    - **Année Personnelle** : ${numbers.personalYear}
    Donne un conseil sur le climat actuel.

    CONTEXTE SUR LE SYSTÈME NERVEUX :
    Si une personne ne respecte pas ses besoins de sécurité ou son système de motivation, son système nerveux se déséquilibre (**désaliénation**). Cela entraîne : l'échec à répétition, la procrastination, la passivité, l'impulsivité, un vide existentiel.

    CONSIGNE FINALE :
    - Reste élégant, spirituel et profond.
    - Utilise le français uniquement.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "La fleur reste close pour l'instant.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Les vents célestes sont trop forts pour lire votre thème. Réessayez bientôt.";
  }
};
