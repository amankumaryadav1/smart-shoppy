import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { RecommendationEngine } from "@/utils/recommendations";
import { useInteractions } from "@/hooks/useInteractions";
import { Sparkles } from "lucide-react";

interface HomeProps {
  onAddToCart: (product: Product) => void;
  searchQuery?: string;
}

export default function Home({ onAddToCart, searchQuery = "" }: HomeProps) {
  const { interactions } = useInteractions();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    const trending = RecommendationEngine.getTrendingProducts(products, interactions, 6);
    setTrendingProducts(trending.length > 0 ? trending : products.slice(0, 6));
  }, [interactions]);

  const filteredProducts = searchQuery.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-hero-gradient border-b border-border">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Recommendations
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Discover Your Perfect
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Products</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Shop with confidence using our machine learning-powered recommendation engine that learns your preferences
          </p>
          <Button size="lg" className="text-lg px-8">
            Explore Now
          </Button>
        </div>
      </section>

      {/* Trending Section */}
      {!searchQuery && trendingProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
        </h2>
        
        {/* Category Filter */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching "{searchQuery}"</p>
          </div>
        )}
      </section>
    </div>
  );
}
