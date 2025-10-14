import React, { useState } from 'react';
import { Tone } from '../types';

interface InputFormProps {
  onGenerate: (pressReleaseText: string, cardCount: number, tone: Tone) => void;
  isLoading: boolean;
  onReset: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading, onReset }) => {
  const [pressReleaseText, setPressReleaseText] = useState<string>('');
  const [cardCount, setCardCount] = useState<number>(4);
  const [tone, setTone] = useState<Tone>(Tone.Formal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(pressReleaseText, cardCount, tone);
  };
  
  const handleLocalReset = () => {
    setPressReleaseText('');
    setCardCount(4);
    setTone(Tone.Formal);
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
      <div>
        <label htmlFor="pressRelease" className="block text-lg font-semibold text-slate-700 mb-2">
          1. 보도자료 내용 붙여넣기 <span className="text-sm font-normal text-slate-500">(최대 4000자까지 등록 가능)</span>
        </label>
        <textarea
          id="pressRelease"
          value={pressReleaseText}
          onChange={(e) => setPressReleaseText(e.target.value)}
          placeholder="이곳에 보도자료 원문 내용을 붙여넣어 주세요..."
          className="w-full h-60 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          disabled={isLoading}
          maxLength={4000}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="cardCount" className="block text-lg font-semibold text-slate-700 mb-2">
            2. 카드뉴스 장수 <span className="text-sm font-normal text-slate-500">(최대 15장까지 제작 가능)</span>
          </label>
          <input
            type="number"
            id="cardCount"
            value={cardCount}
            onChange={(e) => setCardCount(Math.max(2, parseInt(e.target.value, 10)))}
            min="2"
            max="15"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            disabled={isLoading}
          />
        </div>
        <div>
          <span className="block text-lg font-semibold text-slate-700 mb-2">3. 원고 말투 선택</span>
          <div className="flex space-x-4 mt-3">
            <button
              type="button"
              onClick={() => setTone(Tone.Formal)}
              disabled={isLoading}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition duration-200 ${tone === Tone.Formal ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              정확한 정보 어투
            </button>
            <button
              type="button"
              onClick={() => setTone(Tone.Casual)}
              disabled={isLoading}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition duration-200 ${tone === Tone.Casual ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              친근한 어투
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-grow flex justify-center items-center bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition duration-200 text-lg shadow-sm"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              생성 중...
            </>
          ) : (
            '카드뉴스 원고 생성하기'
          )}
        </button>
        <button
            type="button"
            onClick={handleLocalReset}
            disabled={isLoading}
            className="flex-shrink-0 bg-slate-200 text-slate-700 font-bold py-4 px-6 rounded-lg hover:bg-slate-300 disabled:bg-slate-100 disabled:cursor-not-allowed transition duration-200 text-lg shadow-sm"
          >
            초기화
        </button>
      </div>
    </form>
  );
};