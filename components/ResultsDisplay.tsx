import React from 'react';
import { GeneratedContent } from '../types';
import { Spinner } from './Spinner';
import { TitleSuggestion } from './TitleSuggestion';
import { Card } from './Card';
import { ShareButtons } from './ShareButtons';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  content: GeneratedContent | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, content }) => {
  if (isLoading) {
    return (
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <Spinner />
        <p className="mt-4 text-lg font-medium text-slate-600">AI가 열심히 원고를 만들고 있어요...</p>
        <p className="text-slate-500">잠시만 기다려주세요!</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-red-700">오류 발생</h3>
        <p className="mt-2 text-red-600">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center p-12 bg-white rounded-2xl shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-slate-700">AI 카드뉴스 원고 생성 결과</h3>
        <p className="mt-1 text-slate-500">보도자료를 입력하고 '생성하기' 버튼을 누르면, AI가 분석하여 이곳에 카드뉴스 원고와 추천 제목을 표시합니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">추천 제목</h2>
        <p className="text-slate-500 mb-6">AI가 제안하는 시선을 사로잡는 카드뉴스 제목입니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.titles.map((title, index) => (
            <TitleSuggestion key={index} title={title} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">카드뉴스 원고</h2>
        <p className="text-slate-500 mb-6">생성된 카드뉴스 원고입니다. 각 카드를 확인하고 활용해보세요.</p>
        <div className="space-y-6">
          {content.cards.map((cardContent, index) => (
            <Card key={index} index={index + 1} content={cardContent} />
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <ShareButtons content={content} />
      </div>
    </div>
  );
};