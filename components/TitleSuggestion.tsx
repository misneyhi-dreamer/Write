
import React from 'react';

interface TitleSuggestionProps {
  title: string;
}

export const TitleSuggestion: React.FC<TitleSuggestionProps> = ({ title }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 flex flex-col justify-center items-center text-center h-full">
    <p className="text-lg font-semibold text-indigo-700">"{title}"</p>
  </div>
);
