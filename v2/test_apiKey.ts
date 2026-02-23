import { GoogleGenAI } from '@google/genai';

async function test() {
  const ai = new GoogleGenAI({ apiKey: 'bad_key' });
  try {
    await ai.models.generateContent({
      model: 'gemini-1.5-flash-8b',
      contents: 'hello',
    });
    console.log("Success");
  } catch (err: any) {
    console.log("NAME:", err.name);
    console.log("MESSAGE:", err.message);
    console.log("STATUS:", err.status);
    console.log("CODE:", err.code);
    console.log("FULL ERROR:", JSON.stringify(err, null, 2));
  }
}

test();
