
import React, { useState, useCallback } from 'react';
import Layout from './Layout';
import NumerologyForm from './NumerologyForm';
import ResultView from './ResultView';
import type { UserData, NumerologyNumbers } from './types';
import { getNumerologyTheme } from './numerology';
import { generatePersonalizedAnalysis } from './geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [numbers, setNumbers] = useState<NumerologyNumbers | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: UserData) => {
    setLoading(true);
    setUser(data);
    const calculatedNumbers = getNumerologyTheme(data);
    setNumbers(calculatedNumbers);
    
    // We scroll to results conceptually by changing view
    // Start generating AI analysis immediately
    try {
      const analysis = await generatePersonalizedAnalysis(data, calculatedNumbers);
      setAiAnalysis(analysis);
    } catch (err) {
      setAiAnalysis("Une erreur est survenue lors de la génération de votre analyse personnalisée.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUser(null);
    setNumbers(null);
    setAiAnalysis('');
    setLoading(false);
  };

  return (
    <Layout>
      {!user ? (
        <div className="max-w-4xl mx-auto py-12">
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-4xl md:text-5xl font-light text-slate-100 mystical-font leading-tight">
              Le pouvoir des nombres au service de ton épanouissement et de ta prospérité.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Depuis l'Antiquité, la numérologie révèle un bon nombre d'informations sur ton épanouissement naturel et les cycles de la vie qui t'aide à prospérer. Saisis tes informations pour obtenir un extrait de ton thème.
            </p>
          </div>
          <NumerologyForm onSubmit={handleFormSubmit} isLoading={loading} />
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-orange-500/80 mx-auto w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h4 className="text-xl mystical-font">Précision Pythagoricienne</h4>
              <p className="text-sm text-slate-500 font-light">Calculs basés sur les méthodes traditionnelles de réduction numérique.</p>
            </div>
            <div className="space-y-3">
              <div className="text-orange-500/80 mx-auto w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-xl mystical-font">IA Intuitive</h4>
              <p className="text-sm text-slate-500 font-light">Une synthèse unique générée grâce à la combinaison unique de la sagesse ancestrale & la technologie.</p>
            </div>
            <div className="space-y-3">
              <div className="text-orange-500/80 mx-auto w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h4 className="text-xl mystical-font">Données Sécurisées</h4>
              <p className="text-sm text-slate-500 font-light">Vos informations personnelles ne sont jamais stockées durablement.</p>
            </div>
          </div>
        </div>
      ) : (
        <ResultView 
          user={user} 
          numbers={numbers!} 
          aiAnalysis={aiAnalysis} 
          onReset={handleReset} 
        />
      )}
    </Layout>
  );
};

export default App;
