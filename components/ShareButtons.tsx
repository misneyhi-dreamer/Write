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
  const encodedContent = encodeURIComponent(formattedContent);

  const emailSubject = encodeURIComponent('AI 카드뉴스 원고 생성 결과');
  const mailtoLink = `mailto:?subject=${emailSubject}&body=${encodedContent}`;
  
  const telegramLink = `https://t.me/share/url?url=&text=${encodedContent}`;

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
      <p className="text-slate-500 mb-6">생성된 원고를 복사하거나 이메일, 텔레그램으로 보낼 수 있습니다.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
            onClick={handleCopyToClipboard}
            disabled={isCopied}
            className={`flex-1 flex justify-center items-center gap-2 font-bold py-3 px-6 rounded-lg transition duration-200 text-lg shadow-sm ${
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
        <a
          href={mailtoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-center items-center gap-2 bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition duration-200 text-lg shadow-sm"
          aria-label="이메일로 결과 전송"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          이메일로 전송
        </a>
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-center items-center gap-2 bg-sky-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-600 transition duration-200 text-lg shadow-sm"
          aria-label="텔레그램으로 결과 전송"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.1-.86 1.32-1.7.82l-4.76-3.51l-2.27 2.15c-.25.24-.45.44-.88.44l.28-4.23z"/>
          </svg>
          텔레그램으로 전송
        </a>
      </div>
    </div>
  );
};