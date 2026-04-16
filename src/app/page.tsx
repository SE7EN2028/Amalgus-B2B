'use client';

import { useState } from 'react';
import { Search, Sparkles, Loader2, Package, Layers, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
import { Product } from '@/data/products';
interface MatchedProduct extends Product {
  matchScore: number;
  matchExplanation: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MatchedProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch matches');
      }

      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const presetQueries = [
    "I need 6mm tempered glass for office cabin partitions, clear",
    "Looking for laminated safety glass for balcony railing",
    "Budget-friendly 4mm float glass for windows",
    "Insulated glass units, 5+12+5 configuration",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Layers className="text-white h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AmalGus</h1>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#" className="hover:text-blue-600 transition-colors">Marketplace</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Suppliers</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Projects</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Product Discovery</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Find the perfect glass products instantly.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Describe what you need in plain English. Our intelligent engine matches you with the right suppliers and materials from our comprehensive catalog.
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative flex items-center rounded-2xl shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all overflow-hidden p-2 pl-4">
              <Search className="h-6 w-6 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 6mm tempered glass for office cabin partitions, clear..."
                className="w-full bg-transparent border-0 focus:ring-0 text-base md:text-lg outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 py-3"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center space-x-2 shrink-0 ml-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Search</span>}
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {presetQueries.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQuery(preset)}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  {preset}
                </button>
              ))}
            </div>
          </motion.form>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800/30 max-w-2xl mx-auto mb-8 text-center">
            {error}
          </div>
        )}
        {isLoading && (
          <div className="space-y-6 animate-pulse">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-500 animate-spin" />
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-300">Finding best matches...</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Note:</span> This is a trial version using free-tier AI, so processing may take a moment. The production version will be near-instant.
                </p>
              </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between mb-4">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24" />
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-64" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-40" />
                  </div>
                  <div className="h-8 w-20 bg-blue-100 dark:bg-blue-900/30 rounded-bl-2xl" />
                </div>
                <div className="h-16 bg-blue-50 dark:bg-blue-900/10 rounded-xl mb-4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {hasSearched && !isLoading && !error && results.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                  Top Matches ({results.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-bl-2xl font-bold text-sm shadow-sm flex items-center space-x-1">
                      <span>{product.matchScore}% Match</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2 mt-2">
                          <div>
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{product.category}</p>
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{product.name}</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center mt-1">
                              <Package className="w-4 h-4 mr-1" />
                              Supplier: <span className="font-medium text-slate-700 dark:text-slate-300 ml-1">{product.supplier}</span>
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">${product.price}</div>
                            <div className="text-slate-500 dark:text-slate-400 text-sm">{product.unit}</div>
                          </div>
                        </div>

                        <div className="my-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                          <div className="flex items-start">
                            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 shrink-0" />
                            <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                              {product.matchExplanation}
                            </p>
                          </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                          {product.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                          {product.specs.thickness && (
                            <div>
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Thickness</p>
                              <p className="font-medium text-sm mt-1">{product.specs.thickness}</p>
                            </div>
                          )}
                          {product.specs.color && (
                            <div>
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Color</p>
                              <p className="font-medium text-sm mt-1">{product.specs.color}</p>
                            </div>
                          )}
                          {product.specs.edgeFinish && (
                            <div>
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Edge Finish</p>
                              <p className="font-medium text-sm mt-1">{product.specs.edgeFinish}</p>
                            </div>
                          )}
                          {product.specs.certification && (
                            <div>
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Certification</p>
                              <div className="flex items-center mt-1">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                                <p className="font-medium text-sm">{product.specs.certification.split(',')[0]}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {hasSearched && !isLoading && !error && results.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">No products found</h3>
              <p className="text-slate-500 mt-1">Try tuning your requirements</p>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
