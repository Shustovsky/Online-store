import { Product } from './product';

export class ShoppingCart {
    totalPrice = 0;
    productsCount = 0;
    products: Item[] = [];
}

export class Item {
    product: Product;
    count: number;

    constructor(product: Product, count: number) {
        this.product = product;
        this.count = count;
    }
}
