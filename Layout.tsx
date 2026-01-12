
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-6 text-center">
        <h1 className="text-5xl font-bold gold-gradient italic mb-2">Numérologie Harmonique</h1>
        <p className="text-slate-400 font-light tracking-widest text-sm uppercase">Décryptez le code de votre âme</p>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="p-8 text-center text-slate-500 text-xs">
        <p>© 2026 Numérologie Harmonique - Sagesse Ancestrale & Intelligence Artificielle - créé par Marie Menaha</p>
      </footer>
    </div>
  );
};

export default Layout;
