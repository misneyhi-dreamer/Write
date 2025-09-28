
import React from 'react';

interface CardProps {
  index: number;
  content: string;
}

export const Card: React.FC<CardProps> = ({ index, content }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">
          카드 #{index}
        </span>
      </div>
      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  </div>
);
