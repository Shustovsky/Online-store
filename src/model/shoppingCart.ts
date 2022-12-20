import { Product } from './product';

export type ShoppingCart = {
    totalPrice: number;
    productsCount: number;
    products: { product: Product; count: number }[];
};
