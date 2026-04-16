import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { products } from '@/data/products';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const compactCatalog = products.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  specs: p.specs,
  supplier: p.supplier,
  price: p.price,
  unit: p.unit,
}));
const catalogJSON = JSON.stringify(compactCatalog);

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
      generationConfig: { 
        responseMimeType: 'application/json',
        temperature: 0.3,
      }
    });

    const prompt = `You are a glass marketplace matching engine. Match the buyer query to the top 4-5 products from the catalog. Return a JSON array sorted by score (highest first). Each object: {"productId":"id","score":0-100,"explanation":"1 sentence why it matches"}.

Query: "${query}"

Catalog: ${catalogJSON}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    let rankedProducts = [];
    try {
      rankedProducts = JSON.parse(responseText);
    } catch {
      const match = responseText.match(/\[[\s\S]*\]/);
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
