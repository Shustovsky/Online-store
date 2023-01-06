import { Product } from './product';

export class ShoppingCart {
    totalPrice = 0;
    productsCount = 0;
    products: Item[] = [];

    public hasProduct(productId: number): boolean {
        const item = this.products.find((item) => item.product.id === productId);
        return !!item;
    }
}

export class Item {
    product: Product;
    count: number;

    constructor(product: Product, count: number) {
        this.product = product;
        this.count = count;
    }
}
