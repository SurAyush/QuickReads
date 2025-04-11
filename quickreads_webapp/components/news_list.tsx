"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Article {
    id: number;
    category: string;
    title: string;
    description: string;
}



const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'TOP NEWS': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-200', border: 'border-l-blue-500' },
  'INDIA': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-200', border: 'border-l-purple-500' },
  'ENTERTAINMENT': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-200', border: 'border-l-green-500' },
  'REAL ESTATE': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-200', border: 'border-l-amber-500' },
  'BUSINESS': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-200', border: 'border-l-red-500' },
  'SPORTS': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-200', border: 'border-l-orange-500' },
  'WORLD': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-800 dark:text-cyan-200', border: 'border-l-cyan-500' },
  'TECHNOLOGY': { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-800 dark:text-pink-200', border: 'border-l-pink-500' },
};

const categories = ['TOP NEWS', 'INDIA', 'WORLD', 'REAL ESTATE', 'ENTERTAINMENT', 'BUSINESS', 'SPORTS', 'TECHNOLOGY']

export default function NewsList({articles, date}: {articles: Article[], date: string|null}) {
    
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredArticles = selectedCategory === "ALL" 
    ? articles 
    : (articles).filter(article => article.category === selectedCategory);

  if (!mounted) {
    return null;
  }

  const getCategoryStyle = (category: string) => {
    if (category === "All") {
      return {
        button: `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === category
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`,
        tag: ""
      };
    }
    
    const colors = categoryColors[category];
    return {
      button: `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        selectedCategory === category
          ? `${colors.bg} ${colors.text}`
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`,
      tag: `${colors.bg} ${colors.text}`
    };
  };

  if(articles.length === 0) {
return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Navbar date={date}/>
          <h2 className="text-2xl font-bold mb-4">Sorry!!!</h2>
          <h2 className="text-2xl font-bold mb-4">No articles available for this date...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Navbar date={date}/>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={getCategoryStyle(category).button}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {filteredArticles[0] && (
          <div className="mb-12 group cursor-pointer">
            <div className={`bg-card rounded-2xl p-8 border hover:border-primary transition-colors border-l-4 ${categoryColors[filteredArticles[0].category].border}`}>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getCategoryStyle(filteredArticles[0].category).tag}`}>
                {filteredArticles[0].category}
              </span>
              <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {filteredArticles[0].title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {filteredArticles[0].description}
              </p>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className={`bg-card rounded-xl p-6 border h-full hover:border-primary transition-colors border-l-4 ${categoryColors[article.category].border}`}>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getCategoryStyle(article.category).tag}`}>
                  {article.category}
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}