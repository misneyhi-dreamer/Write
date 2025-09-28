import { GoogleGenAI, Type } from "@google/genai";
import { Tone, GeneratedContent } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const getToneDescription = (tone: Tone): string => {
  switch (tone) {
    case Tone.Formal:
      return "정확한 정보 전달에 초점을 맞춘 전문적이고 딱딱한 어투";
    case Tone.Casual:
      return "독자와의 친밀감을 형성하는 캐주얼하고 친근한 어투";
    default:
      return "일반적인 어투";
  }
};

const createPrompt = (pressReleaseText: string, cardCount: number, tone: Tone): string => {
  const toneDescription = getToneDescription(tone);

  return `
당신은 제공된 보도자료를 분석하여 소셜 미디어용 카드뉴스 원고를 만드는 전문 카피라이터입니다.

**목표:**
보도자료 내용을 기반으로, 지정된 카드뉴스 장수와 어조에 맞춰 원고를 생성하고, 사람들의 시선을 사로잡을 만한 매력적인 제목 3가지를 추천해주세요.

**요구사항:**
1.  **카드뉴스 장수:** 정확히 ${cardCount}장의 카드뉴스 원고를 생성해야 합니다.
2.  **어조:** 글의 전체적인 스타일은 '${toneDescription}'여야 합니다.
3.  **결과 형식:** 응답은 반드시 JSON 형식이어야 합니다. JSON 객체 외에 다른 설명이나 \`\`\`json 같은 마크다운은 포함하지 마세요.

**원본 보도자료:**
---
${pressReleaseText}
---

**작업 지시:**
1.  보도자료의 핵심 메시지와 주요 정보를 파악합니다.
2.  소셜 미디어에서 사용자들이 클릭하고 싶게 만드는 '후킹'이 가능한 제목 3개를 생성합니다.
3.  총 ${cardCount}장의 카드에 맞춰 내용을 논리적으로 배분하여 작성합니다. 첫 번째 카드는 도입부, 마지막 카드는 행동 유도(Call-to-Action) 또는 요약으로 구성해주세요.
4.  각 카드의 내용은 모바일 환경에서 쉽게 읽을 수 있도록 간결하게 작성합니다.
5.  최종 결과물은 아래 스키마를 따르는 JSON 객체로만 출력해주세요.
`;
};

export const generateCardNewsContent = async (
  pressReleaseText: string,
  cardCount: number,
  tone: Tone
): Promise<GeneratedContent> => {
  const prompt = createPrompt(pressReleaseText, cardCount, tone);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              description: "카드뉴스에 사용할 수 있는 시선을 끄는 제목 3개.",
              items: { type: Type.STRING },
            },
            cards: {
              type: Type.ARRAY,
              description: "카드뉴스 각 장에 들어갈 내용. 사용자가 요청한 장수만큼의 항목이어야 함.",
              items: { type: Type.STRING },
            },
          },
          required: ["titles", "cards"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    if (!parsedJson.titles || !parsedJson.cards) {
        throw new Error("Invalid JSON structure received from API.");
    }

    return parsedJson as GeneratedContent;

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    throw new Error("Failed to generate card news content.");
  }
};