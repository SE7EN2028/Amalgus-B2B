'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { Search, Layers, Package, CheckCircle2, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [...new Set(products.map(p => p.category))].sort();
const thicknesses = [...new Set(products.map(p => p.specs.thickness).filter(Boolean))].sort();

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (selectedThickness && p.specs.thickness !== selectedThickness) return false;
      return true;
    });
  }, [search, selectedCategory, maxPrice, selectedThickness]);

  const activeFilterCount = [selectedCategory, maxPrice, selectedThickness].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory('');
    setMaxPrice('');
    setSelectedThickness('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Layers className="text-white h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AmalGus</h1>
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/marketplace" className="text-blue-600 dark:text-blue-400 font-semibold">Marketplace</Link>
            <Link href="/" className="hover:text-blue-600 transition-colors">AI Search</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Product Catalog</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{filtered.length} of {products.length} products</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${showFilters ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400'}`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium">
                  <X className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Max Price ($)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Thickness</label>
                <select
                  value={selectedThickness}
                  onChange={e => setSelectedThickness(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Thicknesses</option>
                  {thicknesses.map(t => <option key={t} value={t!}>{t}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium">No products match your filters</h3>
            <p className="text-slate-500 mt-1">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 text-sm text-blue-600 hover:underline font-medium">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">{product.category}</span>
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">${product.price}</div>
                    <div className="text-xs text-slate-500">{product.unit}</div>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{product.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mb-3">
                  <Package className="w-3 h-3 mr-1" /> {product.supplier}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">{product.description}</p>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {product.specs.thickness && (
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Thickness</p>
                      <p className="font-medium text-xs mt-0.5">{product.specs.thickness}</p>
                    </div>
                  )}
                  {product.specs.color && (
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Color</p>
                      <p className="font-medium text-xs mt-0.5">{product.specs.color}</p>
                    </div>
                  )}
                  {product.specs.edgeFinish && (
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Edge</p>
                      <p className="font-medium text-xs mt-0.5">{product.specs.edgeFinish}</p>
                    </div>
                  )}
                  {product.specs.certification && (
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Certified</p>
                      <div className="flex items-center mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mr-0.5" />
                        <p className="font-medium text-xs">{product.specs.certification.split(',')[0]}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
