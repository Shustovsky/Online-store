import { Product } from './product';

export class ShoppingCart {
    totalPrice = 0;
    productsCount = 0;
    products: { product: Product; count: number }[] = [];
}
