import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ChevronLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { RecommendationEngine } from "@/utils/recommendations";
import { useInteractions } from "@/hooks/useInteractions";

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams();
  const { interactions, trackInteraction } = useInteractions();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      trackInteraction(found.id, 'view', found.category);
      
      // Generate personalized recommendations
      const recs = RecommendationEngine.getRecommendations(
        products,
        found,
        interactions,
        4
      );
      setRecommendations(recs);
    }
  }, [id, interactions]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-bold text-xl">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-foreground">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>
            
            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-foreground">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              size="lg" 
              className="w-full md:w-auto text-lg py-6 px-8"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-foreground">Recommended for You</h2>
              <p className="text-muted-foreground">Based on your browsing history and preferences</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((rec) => (
                <ProductCard key={rec.id} product={rec} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
