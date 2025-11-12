import { Product, UserInteraction } from "@/types/product";

/**
 * ML-based recommendation engine using content-based filtering and collaborative patterns
 */
export class RecommendationEngine {
  /**
   * Calculate similarity between two products based on features
   */
  private static calculateProductSimilarity(product1: Product, product2: Product): number {
    let score = 0;
    
    // Category match (highest weight)
    if (product1.category === product2.category) {
      score += 0.5;
    }
    
    // Price range similarity
    const priceDiff = Math.abs(product1.price - product2.price);
    const maxPrice = Math.max(product1.price, product2.price);
    const priceScore = 1 - (priceDiff / maxPrice);
    score += priceScore * 0.3;
    
    // Rating similarity
    const ratingDiff = Math.abs(product1.rating - product2.rating);
    const ratingScore = 1 - (ratingDiff / 5);
    score += ratingScore * 0.2;
    
    return score;
  }

  /**
   * Get personalized recommendations based on user interactions
   */
  static getRecommendations(
    allProducts: Product[],
    currentProduct: Product,
    interactions: UserInteraction[],
    limit: number = 4
  ): Product[] {
    // Build user preference profile from interactions
    const categoryPreferences = new Map<string, number>();
    const viewedProductIds = new Set<string>();
    
    interactions.forEach((interaction) => {
      viewedProductIds.add(interaction.productId);
      
      // Weight recent interactions more heavily
      const recencyWeight = 1 - (Date.now() - interaction.timestamp) / (7 * 24 * 60 * 60 * 1000);
      const weight = Math.max(0.1, recencyWeight);
      
      // Different interaction types have different weights
      const typeWeight = interaction.type === 'purchase' ? 3 : interaction.type === 'cart' ? 2 : 1;
      
      const currentScore = categoryPreferences.get(interaction.category) || 0;
      categoryPreferences.set(interaction.category, currentScore + weight * typeWeight);
    });

    // Score all products
    const scoredProducts = allProducts
      .filter(product => product.id !== currentProduct.id)
      .map(product => {
        let score = 0;
        
        // Content-based similarity to current product
        const contentScore = this.calculateProductSimilarity(currentProduct, product);
        score += contentScore * 0.6;
        
        // Collaborative filtering: user's category preferences
        const categoryScore = categoryPreferences.get(product.category) || 0;
        score += categoryScore * 0.3;
        
        // Boost highly rated products
        score += (product.rating / 5) * 0.1;
        
        // Penalize already viewed products
        if (viewedProductIds.has(product.id)) {
          score *= 0.5;
        }
        
        return { product, score };
      });

    // Sort by score and return top recommendations
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
  }

  /**
   * Get trending products based on interaction frequency
   */
  static getTrendingProducts(
    allProducts: Product[],
    interactions: UserInteraction[],
    limit: number = 6
  ): Product[] {
    const productScores = new Map<string, number>();
    
    // Calculate trend scores based on recent interactions
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    
    interactions
      .filter(i => i.timestamp > sevenDaysAgo)
      .forEach(interaction => {
        const recencyWeight = 1 - (now - interaction.timestamp) / (7 * 24 * 60 * 60 * 1000);
        const typeWeight = interaction.type === 'purchase' ? 3 : interaction.type === 'cart' ? 2 : 1;
        
        const currentScore = productScores.get(interaction.productId) || 0;
        productScores.set(interaction.productId, currentScore + recencyWeight * typeWeight);
      });

    // Sort products by score
    return allProducts
      .map(product => ({
        product,
        score: (productScores.get(product.id) || 0) + product.rating * 0.1
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
  }
}
