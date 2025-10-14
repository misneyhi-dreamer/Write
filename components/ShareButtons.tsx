import React, { useState } from 'react';
import { GeneratedContent } from '../types';

interface ShareButtonsProps {
  content: GeneratedContent;
}

const formatContentForSharing = (content: GeneratedContent): string => {
  const titles = content.titles.map(title => `- "${title}"`).join('\n');
  const cards = content.cards.map((card, index) => `카드 #${index + 1}:\n${card}`).join('\n\n');

  return `
✨ AI가 생성한 카드뉴스 원고 ✨

[추천 제목]
${titles}

---

[카드뉴스 원고]
${cards}
  `.trim();
};


export const ShareButtons: React.FC<ShareButtonsProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);
  const formattedContent = formatContentForSharing(content);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formattedContent).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('클립보드 복사에 실패했습니다.', err);
      alert('클립보드 복사에 실패했습니다.');
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">결과 공유하기</h2>
      <p className="text-slate-500 mb-6">생성된 원고를 클립보드에 복사하여 활용할 수 있습니다.</p>
      <div className="flex">
        <button
            onClick={handleCopyToClipboard}
            disabled={isCopied}
            className={`w-full flex justify-center items-center gap-2 font-bold py-3 px-6 rounded-lg transition duration-200 text-lg shadow-sm ${
              isCopied
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
            aria-label="클립보드에 복사"
          >
            {isCopied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                복사 완료!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" />
                </svg>
                클립보드에 복사
              </>
            )}
          </button>
      </div>
    </div>
  );
};