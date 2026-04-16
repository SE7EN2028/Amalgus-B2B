# AmalGus Intelligent Matching Prototype

This is a prototype for AmalGus, featuring an **AI-led Product Discovery and Intelligent Matching** engine built for the glass and allied products industry.

## Features Built

1. **Intelligent Matching Engine**: Uses LLM-based matching (Google Gemini 1.5 Flash) to take a buyer's natural language requirement and return the top matching products with scores and clear explanations.
2. **Mock Catalog**: 15 realistic glass products covering Tempered Glass, Laminated Safety Glass, Float Glass, Insulated Glass Units, and Hardware.
3. **Premium UX**: A clean, B2B-friendly Next.js + TailwindCSS + Framer Motion interface.

## Tech Stack Used
* **Framework**: Next.js 15 (App Router)
* **Styling**: Tailwind CSS & Framer Motion
* **AI Provider**: Google Generative AI (`gemini-1.5-flash`)
* **Icons**: Lucide React
* **Language**: TypeScript

## How to Run Locally

### Prerequisites
* Node.js (v18+)
* A free Gemini API Key (get one at [Google AI Studio](https://aistudio.google.com/))

### Step-by-Step Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Test the Application**
   Open [http://localhost:3000](http://localhost:3000) with your browser. Use the preset queries or try:
   - *"I need 6mm tempered glass for office cabin partitions, clear, size around 2m x 1.2m, with polished edges"*
   - *"Budget-friendly 4mm float glass for windows in a residential project, large quantity needed"*

## How the Intelligent Matching Works

1. **Approach**: "Hybrid LLM Prompting Setup"
2. **Why**: For a catalog of 15-50 products, calculating embeddings + cosine similarity works well, but it often lacks **deep contextual reasoning** for why something matches (e.g., *Why* is 4+2+4 thickness better for balconies?). 
3. **Execution**: We inject the user's natural language query alongside our sanitized `products.ts` catalog JSON into `gemini-1.5-flash`. The model natively understands structural requirements, safety norms (e.g. ANSI Z97.1), and architectural context. It processes the criteria, calculates a confidence score (0-100), and formulates a human-readable explanation for the match.
4. **Result**: The API strictly formats the output as JSON, which the frontend cross-references back with the database to display beautiful, highly conversational product cards.

## AI Tools Used & How They Helped

* **AI Code Assistant**: Directed architectural choices, wrote robust React/Next.js boilerplate, designed the premium Tailwind UI iteratively, compiled the mock data, and handled the strict JSON-forcing mechanism with `gemini-1.5-flash`. This drastically accelerated setup from a multi-day project to a 2.5-hour prototype.
* **Google Gemini (Integration)**: Handles the runtime NL-to-JSON reasoning out of the box with zero vector-database overhead.

## Assumptions & Trade-offs
* **Scalability Trade-off**: The current approach passes the *entire* product array into the prompt. This works exceptionally out-of-the-box for 15 products (fast & highly explainable). However, scaling to 10,000+ products will exceed context limits and increase latency/cost. 
* **Future Solution for Scale**: At scale, a Hybrid Vector approach with Pinecone/Faiss + Embeddings should be implemented as a first-pass retrieval (fetching Top 20 Candidates), which are then passed to the LLM to rerank, score, and write explanations (Top 5 Results).
* **Mock Data**: Product specs are representative but may not cover every edge-case dimension format typical in B2B transactions.
