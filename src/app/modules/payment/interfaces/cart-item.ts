import { Product } from 'src/app/interfaces/product';

// cart items
export interface CartItem {
  product: Product;
  quantity: number;
}