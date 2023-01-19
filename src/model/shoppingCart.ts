import { Product } from './product';

export class ShoppingCart {
    totalPrice = 0;
    totalPriceWithDiscount = 0;
    productsCount = 0;
    products: Item[] = [];
    promoCodes: PromoCode[] = [];

    public hasProduct(productId: number): boolean {
        const item = this.products.find((item) => item.product.id === productId);
        return !!item;
    }

    public hasPromoCode(promoCodeValue: string): boolean {
        const promoCode = this.promoCodes.find((promoCode) => promoCode.value === promoCodeValue);
        return promoCode ? true : false;
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

export class PromoCode {
    value: string;
    discountPercent: number;
    description: string;

    constructor(value: string, discountPercent: number, description: string) {
        this.value = value;
        this.discountPercent = discountPercent;
        this.description = description;
    }
}
