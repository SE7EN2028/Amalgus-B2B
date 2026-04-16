import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { products } from '@/data/products';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'GEMINI_API_KEY is not set in the environment variables.' 
      }, { status: 500 });
    }

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-latest',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `
    You are an intelligent product matching engine for AmalGus, a glass marketplace.
    Your task is to take a buyer's natural language requirement and return the top 4-5 best matching products from the provided catalog.

    Buyer's Query: "${query}"

    Product Catalog (JSON):
    ${JSON.stringify(products, null, 2)}

    Output your response purely as a JSON array of objects. Do not include markdown formatting or backticks around the JSON.
    Each object must have the following structure:
    {
      "productId": "string (the exact id from the catalog)",
      "score": number between 0 and 100 representing the match confidence,
      "explanation": "Short, clear, simple explanation of why this product is a good match based on the user's specific query. Use business professional language."
    }

    Return only the top 4-5 matches, sorted by highest score first. Ensure the JSON is well-formed.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    let cleanedText = responseText.replace(/```(?:json)?/gi, '').trim();
    let rankedProducts = [];
    try {
      rankedProducts = JSON.parse(cleanedText);
    } catch (e) {
      const match = cleanedText.match(/\[[\s\S]*\]/);
      if (match) {
        rankedProducts = JSON.parse(match[0]);
      } else {
        throw new Error('Model did not return a valid JSON array');
      }
    }

    const enrichedResults = rankedProducts.map((match: { productId: string; score: number; explanation: string }) => {
      const product = products.find(p => p.id === match.productId);
      return {
        ...product,
        matchScore: match.score,
        matchExplanation: match.explanation
      };
    }).filter((r: { id?: string }) => r.id !== undefined);

    return NextResponse.json({ results: enrichedResults });
  } catch (error) {
    console.error('Error in match API:', error);
    return NextResponse.json({ error: 'Internal Server Error. Please check the server logs.' }, { status: 500 });
  }
}
