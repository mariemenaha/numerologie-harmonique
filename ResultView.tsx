
import React, { useState, useEffect } from 'react';
import { NumerologyNumbers, UserData, Capacity } from '../types';

interface Props {
  numbers: NumerologyNumbers;
  user: UserData;
  aiAnalysis: string;
  onReset: () => void;
}

const NodeBubble: React.FC<{ 
  value: number; 
  label: string; 
  sub: string; 
  className?: string;
  colorClass?: string;
}> = ({ value, label, sub, className = "", colorClass = "border-amber-500" }) => (
  <div className={`absolute flex flex-col items-center transition-all duration-1000 transform hover:scale-110 z-20 ${className}`}>
    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 ${colorClass} text-xl md:text-2xl font-bold mystical-font bg-slate-900 shadow-xl shadow-black/40`}>
      {value}
    </div>
    <div className="bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 mt-1 text-center min-w-[80px]">
      <p className="text-[9px] uppercase tracking-tighter text-slate-300 font-bold leading-none">{label}</p>
      <p className="text-[8px] italic text-slate-500 leading-tight">{sub}</p>
    </div>
  </div>
);

const ResultView: React.FC<Props> = ({ numbers, user, aiAnalysis, onReset }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getStatusConfig = (status: Capacity['status']) => {
    switch(status) {
      case 'consciente': 
        return { 
          style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', 
          label: 'Compétence consciente',
          icon: '✨'
        };
      case 'bloquee': 
        return { 
          style: 'bg-orange-500/10 text-orange-400 border-orange-500/40', 
          label: 'Capacité bloquée',
          icon: '🔒'
        };
      case 'sagesse': 
        return { 
          style: 'bg-rose-500/10 text-rose-400 border-rose-500/30', 
          label: 'Sagesse à intégrer',
          icon: '🌱'
        };
      case 'resonance': 
        return { 
          style: 'bg-violet-500/10 text-violet-400 border-violet-500/30', 
          label: 'Blocage par résonance',
          icon: '🌊'
        };
    }
  };

  const fullName = `${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim();

  return (
    <div className="space-y-16 max-w-6xl mx-auto pb-20 px-4">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl mystical-font gold-gradient italic">Ton Thème de la Fleur</h2>
        <p className="text-slate-400 font-light tracking-widest uppercase text-sm">Analyse vibratoire de {fullName}</p>
      </div>

      {/* VISUAL FLOWER DIAGRAM */}
      <div className="relative w-full max-w-2xl mx-auto aspect-[4/5] md:aspect-square flex items-center justify-center overflow-visible mt-8">
        <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_0_30px_rgba(255,165,0,0.15)]">
          <path d="M200 400 C180 430, 160 450, 150 480 M200 400 C220 430, 240 450, 250 480 M200 400 L200 480" fill="none" stroke="#b45309" strokeWidth="3" strokeLinecap="round" className={`transition-all duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`} />
          <ellipse cx="200" cy="405" rx="120" ry="20" fill="rgba(16, 185, 129, 0.05)" />
          <path d="M80 405 Q200 390 320 405" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" className={`transition-all duration-700 ${isLoaded ? 'opacity-60' : 'opacity-0'}`} />
          <path d="M200 400 Q190 250 200 120" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" className={`transition-all duration-[1500ms] ${isLoaded ? 'stroke-dashoffset-0' : 'stroke-dashoffset-full'}`} style={{ strokeDasharray: 300, strokeDashoffset: isLoaded ? 0 : 300 }} />
          <g className={`transition-all duration-[2000ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
             <path d="M198 400 Q140 380 150 300 Q175 310 198 400" fill="#fb7185" fillOpacity="0.2" stroke="#fb7185" strokeWidth="2" className={`transition-transform duration-[2000ms] ${isLoaded ? 'scale-100' : 'scale-0'} origin-[198px_400px]`} />
             <path d="M202 400 Q260 380 250 280 Q225 300 202 400" fill="#fb7185" fillOpacity="0.2" stroke="#fb7185" strokeWidth="2" className={`transition-transform duration-[2200ms] delay-300 ${isLoaded ? 'scale-100' : 'scale-0'} origin-[202px_400px]`} />
          </g>
          <g className={`transition-all duration-[2500ms] delay-700 ${isLoaded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} origin-[200px_120px]`}>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <line key={`ray-${i}`} x1="200" y1="30" x2="200" y2="0" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" transform={`rotate(${angle} 200 120)`} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <path key={i} d="M200 120 Q170 50 200 20 Q230 50 200 120" fill="#ec4899" fillOpacity="0.15" stroke="#ec4899" strokeWidth="1.5" transform={`rotate(${angle} 200 120)`} />
            ))}
            <circle cx="200" cy="120" r="25" fill="rgba(255, 255, 255, 0.05)" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" />
          </g>
          <circle cx="200" cy="120" r="90" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 8" className={`animate-spin-slow transition-opacity duration-[3000ms] ${isLoaded ? 'opacity-20' : 'opacity-0'}`} />
        </svg>

        {/* BUBBLES */}
        <NodeBubble value={numbers.fleur} label="Fleur" sub="Se réaliser" className="top-[5%] left-1/2 -translate-x-1/2" colorClass="border-pink-500 shadow-pink-500/20" />
        <NodeBubble value={numbers.aura} label="Aura" sub="Image projetée" className="top-[12%] right-[2%] md:right-[8%]" colorClass="border-sky-400 shadow-sky-400/20" />
        <NodeBubble value={numbers.impulsion} label="Moteur" sub="Pol. Masculine" className="top-[30%] left-[2%] md:left-[8%]" colorClass="border-orange-500 shadow-orange-500/20" />
        <NodeBubble value={numbers.tige} label="Tige" sub="Engagement" className="top-[52%] left-1/2 -translate-x-1/2" colorClass="border-green-500 shadow-green-500/20" />
        <NodeBubble value={numbers.essence} label="Essence" sub="Pol. Féminine" className="top-[55%] left-[2%] md:left-[8%]" colorClass="border-indigo-400 shadow-indigo-400/20" />
        <NodeBubble value={numbers.feuille} label="Feuille" sub="Cœur" className="bottom-[28%] right-[2%] md:right-[12%]" colorClass="border-rose-400 shadow-rose-400/20" />
        <NodeBubble value={numbers.sol} label="Sol" sub="Corps" className="bottom-[18%] left-[20%] md:left-[26%]" colorClass="border-emerald-600 shadow-emerald-600/20" />
        <NodeBubble value={numbers.graine} label="Graine" sub="Esprit" className="bottom-[2%] left-1/2 -translate-x-1/2" colorClass="border-amber-600 shadow-amber-600/20" />
        <NodeBubble value={numbers.pleineConscience} label="Conscience" sub="Pleine Harmonie" className="top-[22%] right-[15%] md:right-[22%]" colorClass="border-violet-500 shadow-violet-500/20 scale-125" />
      </div>

      {/* TEXT BLOCKS FOR MOTIVATION & SECURITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-[40px] border-amber-500/20 shadow-2xl">
            <h3 className="text-xl mystical-font text-gold mb-6 border-b border-amber-500/20 pb-2 italic text-left">Ancrage & Sécurité</h3>
            <div className="text-slate-400 text-sm font-light leading-relaxed space-y-4">
              <p className="text-amber-100/90 font-medium border-l-2 border-amber-500/30 pl-4 mb-4">
                La <strong>Graine</strong> représente l’esprit, le <strong>Sol</strong> le corps et la <strong>Feuille</strong> l’état intérieur.
              </p>
              <p>La <strong>Graine ({numbers.graine})</strong> et le <strong>Sol ({numbers.sol})</strong> constituent votre <strong>ancrage profond</strong>.</p>
              <p>La <strong>Graine</strong> représente votre <strong>esprit</strong> et votre <strong>âme</strong>, ce qui a besoin d’être nourri sur le plan de la <strong>conscience</strong> et du <strong>sens</strong>.</p>
              <p>Le <strong>Sol</strong> représente votre <strong>corps</strong>, la manière dont vous devez être nourri <strong>physiquement</strong> et <strong>matériellement</strong>.</p>
              <p>Les <strong>Feuilles ({numbers.feuille})</strong> reflètent votre <strong>état intérieur</strong> et <strong>affectif</strong>.</p>
              <p>Ensemble, la <strong>Graine</strong>, le <strong>Sol</strong> et les <strong>Feuilles</strong> forment la <strong>base vivante</strong> qui soutient votre <strong>Essence ({numbers.essence})</strong>.</p>
              <p>Cette base vous permet de vous exprimer sans <strong>insécurité</strong> ni <strong>sensation de vide</strong>, parce que vos <strong>besoins fondamentaux</strong> — <strong>psychiques</strong>, <strong>émotionnels</strong> et <strong>corporels</strong> — sont reconnus et respectés.</p>
            </div>
        </div>

        <div className="glass-panel p-8 rounded-[40px] border-indigo-500/20 shadow-2xl text-right">
            <h3 className="text-xl mystical-font text-indigo-400 mb-6 border-b border-indigo-500/20 pb-2 italic">Système de Motivation (incarnation)</h3>
            <div className="text-slate-400 text-sm font-light leading-relaxed space-y-4">
              <p className="text-indigo-100/90 font-medium border-r-2 border-indigo-500/30 pr-4 mb-4">
                La <strong>Tige</strong> canalise l’<strong>Essence</strong> pour activer le <strong>Moteur</strong>.
              </p>
              <p>Une fois votre <strong>sécurité intérieure</strong> ancrée, votre énergie peut se projeter dans le monde avec plus de <strong>stabilité</strong> et de <strong>confiance</strong>.</p>
              <p>
                C’est le rôle de la <strong>Tige ({numbers.tige})</strong> : elle représente votre <strong>posture dans la matière</strong>, votre capacité à <strong>vous engager</strong>, à <strong>rester fidèle à vous-même</strong> et à tenir votre <strong>axe</strong> dans la durée.
              </p>
              <p>
                La <strong>Tige</strong> transforme l’élan de votre <strong>Essence ({numbers.essence})</strong> en <strong>direction concrète</strong>. Elle <strong>canalise</strong> votre énergie, lui donne une <strong>forme</strong>, un <strong>cadre</strong> et une <strong>continuité</strong>.
              </p>
              <p>
                De la rencontre entre votre <strong>Essence ({numbers.essence})</strong> et votre <strong>Tige ({numbers.tige})</strong> naît votre <strong>Moteur ({numbers.impulsion})</strong>.
              </p>
              <p>
                Le <strong>Moteur</strong> est la force qui vous permet de passer de l’<strong>intention</strong> à l’<strong>action alignée</strong>, et de maintenir votre <strong>engagement</strong> dans le temps, même lorsque l’<strong>enthousiasme fluctue</strong>.
              </p>
              <p>
                C’est grâce à ce <strong>Moteur</strong> que votre <strong>motivation devient incarnée</strong> : elle se traduit en <strong>choix clairs</strong>, en <strong>actions cohérentes</strong> et en <strong>réalisations concrètes</strong>, alignées avec <strong>qui vous êtes profondément</strong> et capables de soutenir une <strong>prospérité fluide et durable</strong>.
              </p>
            </div>
        </div>
      </div>

      {/* AI ANALYSIS PANEL */}
      <div className="glass-panel p-8 md:p-14 rounded-[3rem] bg-gradient-to-br from-slate-900/90 to-indigo-950/40 border-slate-700/50 shadow-2xl">
        <h3 className="text-3xl mystical-font gold-gradient mb-8 text-center italic">Message de la Fleur de Vie</h3>
        <div className="prose prose-invert max-w-none text-slate-300">
          {aiAnalysis ? (
            <div className="space-y-8 text-lg font-light italic leading-relaxed">
              {aiAnalysis.split('\n\n').map((paragraph, idx) => {
                const formattedContent = paragraph.split('**').map((part, i) => 
                  i % 2 === 1 ? <strong key={i} className="text-gold not-italic font-bold">{part}</strong> : part
                );
                return (
                  <p key={idx} className="border-l border-amber-500/20 pl-6 py-2">
                    {formattedContent}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 animate-pulse text-slate-500">Alignement des fréquences en cours...</div>
          )}
        </div>
      </div>

      {/* CAPACITIES GRID */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-slate-800 pb-4">
          <h3 className="text-3xl mystical-font text-slate-200">Grille des Capacités</h3>
          <span className="text-slate-500 text-lg mystical-font italic">— {fullName}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {numbers.capacities.map((cap, i) => {
            const config = getStatusConfig(cap.status);
            return (
              <div key={i} className={`p-5 rounded-2xl border transition-all ${config.style} glass-panel flex justify-between items-center shadow-lg relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity text-2xl">
                  {config.icon}
                </div>
                <div>
                  <p className="font-semibold text-base">{cap.name}</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-70 font-bold">{config.label}</p>
                </div>
                <div className="text-3xl font-bold mystical-font text-white bg-slate-800/50 px-4 py-2 rounded-lg z-10 border border-white/5">
                  {cap.score}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TEMPORALITY SECTION */}
      <div className="space-y-6">
        <h3 className="text-3xl mystical-font text-slate-200 border-b border-slate-800 pb-4">Temporalité</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-[30px] border-sky-500/20 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-sky-400 text-3xl font-bold mystical-font text-white bg-slate-900 shadow-xl shadow-sky-400/10">
              {numbers.universalYear}
            </div>
            <div>
              <h4 className="text-xl mystical-font text-slate-100">Année Universelle</h4>
              <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Cycle Collectif ({new Date().getFullYear()})</p>
            </div>
            <p className="text-slate-400 text-sm font-light italic px-4">L'énergie vibratoire globale qui influence le monde cette année.</p>
          </div>

          <div className="glass-panel p-8 rounded-[30px] border-orange-500/20 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-orange-500 text-3xl font-bold mystical-font text-white bg-slate-900 shadow-xl shadow-orange-500/10">
              {numbers.personalYear}
            </div>
            <div>
              <h4 className="text-xl mystical-font text-slate-100">Année Personnelle</h4>
              <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Votre Cycle Individuel</p>
            </div>
            <p className="text-slate-400 text-sm font-light italic px-4">Votre climat personnel et les opportunités qui s'offrent à vous durant ce cycle.</p>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col items-center gap-8">
        <button onClick={onReset} className="px-10 py-3 bg-slate-950 border border-slate-700 text-slate-400 rounded-full hover:text-white transition-all text-xs uppercase tracking-widest">
          Refaire un thème
        </button>
        <div className="text-center space-y-4 max-w-2xl border-t border-slate-800 pt-8">
          <p className="text-slate-500 text-sm font-light leading-relaxed italic">
            Cette mini analyse offerte a été généré grâce à l'outil crée par <span className="text-gold font-semibold">Marie Menaha</span> - Profiler spécialisé en épanouissement et prospérité.
          </p>
          <p className="text-slate-400 text-xs tracking-widest uppercase">
            Si vous souhaitez une analyse détaillée, vous pouvez <a href="https://cal.com/mariemenaha/20min" className="text-orange-500 underline hover:text-orange-400 transition-colors">prendre rendez-vous ici</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
