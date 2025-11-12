export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInteraction {
  productId: string;
  type: 'view' | 'cart' | 'purchase';
  timestamp: number;
  category: string;
}
