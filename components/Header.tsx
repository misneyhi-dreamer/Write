
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          AI 카드뉴스 원고 생성기
        </h1>
      </div>
    </div>
  </header>
);
