
import React, { useState } from 'react';
import { UserData } from '../types';

interface Props {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const NumerologyForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.birthDate) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl max-w-lg mx-auto shadow-2xl space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Prénom</label>
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            placeholder="Ex: Marie"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Autres prénoms</label>
          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            placeholder="Séparés par des espaces"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Nom de famille</label>
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            placeholder="Nom à la naissance"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Date de naissance</label>
          <input
            required
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-slate-300"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold hover:from-orange-500 hover:to-amber-500 transition-all shadow-lg hover:shadow-orange-500/20 disabled:opacity-50"
      >
        {isLoading ? 'Calcul du Thème...' : 'Découvrir mon Thème'}
      </button>
    </form>
  );
};

export default NumerologyForm;
