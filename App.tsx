import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateCardNewsContent } from './services/geminiService';
import { Tone, GeneratedContent } from './types';
import { PromotionalBanner } from './components/PromotionalBanner';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleGenerate = useCallback(async (pressReleaseText: string, cardCount: number, tone: Tone) => {
    if (!pressReleaseText.trim()) {
      setError("보도자료 내용을 입력해주세요.");
      return;
    }
    if (!process.env.API_KEY) {
      setError("Gemini API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const result = await generateCardNewsContent(pressReleaseText, cardCount, tone);
      setGeneratedContent(result);
    } catch (e) {
      console.error(e);
      setError("콘텐츠 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setGeneratedContent(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header />
      <PromotionalBanner />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} onReset={handleReset} />
          <div className="mt-12">
            <ResultsDisplay
              isLoading={isLoading}
              error={error}
              content={generatedContent}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
