import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function brainstormIdeas(prompt: string, history: { role: string, text: string }[]) {
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are an expert book writing assistant. Help the user brainstorm ideas, outline chapters, and develop characters. You have memory of past projects, tastes, writing style, ethics, and rules. Keep responses concise and actionable.",
    },
  });

  // Replay history
  for (const msg of history) {
    if (msg.role === 'user') {
      await chat.sendMessage({ message: msg.text });
    }
  }

  const response = await chat.sendMessage({ message: prompt });
  return response.text;
}

export async function validateText(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Analyze the following text for proofreading, grammar, errors, and legalities. Provide a structured JSON response.
    
    Text:
    ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          grammarIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
          spellingErrors: { type: Type.ARRAY, items: { type: Type.STRING } },
          legalWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          overallScore: { type: Type.NUMBER, description: "Score out of 100" }
        },
        required: ["grammarIssues", "spellingErrors", "legalWarnings", "suggestions", "overallScore"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function checkLayout(marginData: any, canvasData: any) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Analyze the following layout data for a book page. Check margins, layout, and ensure text doesn't flow off the page.
    
    Margin Settings: ${JSON.stringify(marginData)}
    Canvas Elements: ${JSON.stringify(canvasData)}
    
    Provide a structured JSON response with any issues found and suggestions for fixing them.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          marginIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
          textOverflows: { type: Type.ARRAY, items: { type: Type.STRING } },
          layoutSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          isLayoutValid: { type: Type.BOOLEAN }
        },
        required: ["marginIssues", "textOverflows", "layoutSuggestions", "isLayoutValid"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function researchTopic(topic: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Research the following topic and provide a detailed summary of rules, policies, and terms and conditions.
    
    Topic: ${topic}`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  return response.text;
}
