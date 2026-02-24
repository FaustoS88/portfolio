import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("No VITE_GEMINI_API_KEY found in environment.");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

async function runRequest(label, model, contents, tools) {
    console.log(`\n==========================================`);
    console.log(`${label}`);
    console.log(`Model: ${model}`);
    console.log(`==========================================`);
    try {
        const response = await ai.models.generateContent({
            model,
            contents,
            config: {
                tools,
                temperature: 0.2
            }
        });

        console.log("✅ SUCCESS!");
        if (response.functionCalls && response.functionCalls.length > 0) {
            console.log("-> Model requested a function call:");
            console.log(JSON.stringify(response.functionCalls[0], null, 2));
        } else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.log("-> Model responded with text:");
            console.log((response.text || '').substring(0, 150) + '...');
        }
        return response;
    } catch (error) {
        console.error("❌ FAILED:");
        console.error(error.message);
        return null;
    }
}

async function fetchDocumentationText(targetUrl) {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    const fetchRes = await fetch(proxyUrl);
    if (!fetchRes.ok) throw new Error("Proxy fetch failed");
    const data = await fetchRes.json();
    const text = (data.contents || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 12000);
    return text;
}

async function runTests() {
    const model = 'gemini-2.5-flash';
    const docsUrl = 'https://ai.pydantic.dev/';

    const mixedTools = [
        { googleSearch: {} },
        {
            functionDeclarations: [{
                name: "read_documentation",
                description: "Fetches and reads the text content of a specific URL.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        url: { type: "STRING", description: "Absolute URL to read." }
                    },
                    required: ["url"]
                }
            }]
        }
    ];

    const googleSearchOnly = [{ googleSearch: {} }];
    const functionOnly = [{
        functionDeclarations: [{
            name: "read_documentation",
            description: "Fetches and reads the text content of a specific URL.",
            parameters: {
                type: "OBJECT",
                properties: {
                    url: { type: "STRING", description: "Absolute URL to read." }
                },
                required: ["url"]
            }
        }]
    }];

    await runRequest(
        "1) MIXED TOOLS (expected: fail)",
        model,
        `Read ${docsUrl} and also search the web for latest pydantic-ai release notes.`,
        mixedTools
    );

    await runRequest(
        "2) SEARCH ONLY (expected: pass)",
        model,
        "What is pydantic-ai and what are its key features?",
        googleSearchOnly
    );

    const functionResponse = await runRequest(
        "3) FUNCTION-ONLY (expected: may pass, depends on model capabilities)",
        model,
        `Use read_documentation for ${docsUrl} and summarize how to build a weather agent.`,
        functionOnly
    );

    if (!functionResponse || !functionResponse.functionCalls || functionResponse.functionCalls.length === 0) {
        console.log(`\n4) FALLBACK DOC FLOW (manual scrape + plain model)`);
        try {
            const docsText = await fetchDocumentationText(docsUrl);
            const fallback = await ai.models.generateContent({
                model: 'gemini-2.5-flash-lite',
                contents: `Based on these docs from ${docsUrl}, explain how to build a weather agent with pydantic-ai:\n\n${docsText}`,
                config: { temperature: 0.2 }
            });
            console.log("✅ FALLBACK SUCCESS!");
            console.log((fallback.text || '').substring(0, 200) + '...');
        } catch (error) {
            console.error("❌ FALLBACK FAILED:");
            console.error(error.message);
        }
    }
}

runTests();
