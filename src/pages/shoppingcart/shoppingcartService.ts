import { Item, PromoCode, ShoppingCart } from '../../model/shoppingCart';
import { ProductService } from '../product/productService';

export class ShoppingcartService {
    private readonly EXIST_PROMO_CODES = [
        new PromoCode('RS', 0.1, 'Rolling Scopes School'),
        new PromoCode('EPM', 0.2, 'Epam'),
    ];

    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public getShoppingCart(): ShoppingCart {
        const shoppingCartJson = localStorage.getItem('shoppingCart');
        if (shoppingCartJson) {
            return Object.setPrototypeOf(JSON.parse(shoppingCartJson), new ShoppingCart());
        } else {
            const shoppingCart = new ShoppingCart();
            this.saveShoppingCart(shoppingCart);
            return shoppingCart;
        }
    }

    public addItem(productId: number): ShoppingCart {
        const product = this.productService.getProduct(productId);
        if (!product) {
            throw new Error(`Product ${productId} not found.`);
        }

        const shoppingCart = this.getShoppingCart();
        const item = this.getShoppingCartItem(shoppingCart, productId);

        if (item) {
            if (item.count < product.stock) {
                item.count += 1;
                shoppingCart.totalPrice += product.price;
                shoppingCart.productsCount += 1;
                this.recalculateShoppingCartPriceWithDiscount(shoppingCart);
                this.saveShoppingCart(shoppingCart);
            }
        } else {
            if (product.stock > 0) {
                const newItem = new Item(product, 1);
                this.addShoppingCartItem(shoppingCart, newItem);
                shoppingCart.totalPrice += product.price;
                shoppingCart.productsCount += 1;
                this.recalculateShoppingCartPriceWithDiscount(shoppingCart);
                this.saveShoppingCart(shoppingCart);
            }
        }
        return shoppingCart;
    }

    public deleteItem(productId: number): ShoppingCart {
        const product = this.productService.getProduct(productId);
        if (!product) {
            throw new Error(`Product ${productId} not found.`);
        }

        const shoppingCart = this.getShoppingCart();
        const item = this.getShoppingCartItem(shoppingCart, productId);

        if (item && item.count > 0) {
            item.count -= 1;
            shoppingCart.totalPrice -= product.price;
            shoppingCart.productsCount -= 1;
            if (item.count === 0) {
                const itemIndex = shoppingCart.products.indexOf(item);
                shoppingCart.products.splice(itemIndex, 1);
            }
            this.recalculateShoppingCartPriceWithDiscount(shoppingCart);
            this.saveShoppingCart(shoppingCart);
        }
        return shoppingCart;
    }

    public saveShoppingCart(shoppingCart: ShoppingCart): void {
        const shoppingCartJson = JSON.stringify(shoppingCart);
        localStorage.setItem('shoppingCart', shoppingCartJson);
    }

    public clearShoppingCart(): ShoppingCart {
        const shoppingCart = new ShoppingCart();
        this.saveShoppingCart(shoppingCart);
        return shoppingCart;
    }

    private getShoppingCartItem(shoppingCart: ShoppingCart, productId: number): Item | undefined {
        return shoppingCart.products.find((productWrapper) => productWrapper.product.id === productId);
    }

    private addShoppingCartItem(shoppingCart: ShoppingCart, item: Item) {
        shoppingCart.products.push(item);
    }

    public applyPromoCode(promoCodeValue: string) {
        const foundPromoCode = this.EXIST_PROMO_CODES.find((promoCode) => promoCode.value === promoCodeValue);
        if (!foundPromoCode) {
            return;
        }

        const shoppingCart = this.getShoppingCart();
        if (shoppingCart.hasPromoCode(promoCodeValue)) {
            return;
        }

        shoppingCart.promoCodes.push(foundPromoCode);
        this.recalculateShoppingCartPriceWithDiscount(shoppingCart);
        this.saveShoppingCart(shoppingCart);
    }

    public removePromoCode(promoCodeValue: string) {
        const shoppingCart = this.getShoppingCart();
        if (!shoppingCart.hasPromoCode(promoCodeValue)) {
            return;
        }

        const promoCodeIndex = shoppingCart.promoCodes.findIndex((promoCode) => promoCode.value === promoCodeValue);
        if (promoCodeIndex > -1) {
            shoppingCart.promoCodes.splice(promoCodeIndex, 1);
        }
        this.recalculateShoppingCartPriceWithDiscount(shoppingCart);
        this.saveShoppingCart(shoppingCart);
    }

    getPromoCode(promoCodeValue: string): PromoCode | undefined {
        return this.EXIST_PROMO_CODES.find((promoCode) => promoCode.value === promoCodeValue);
    }

    private recalculateShoppingCartPriceWithDiscount(shoppingCart: ShoppingCart) {
        const totalDiscountPercent = shoppingCart.promoCodes.reduce(
            (previousValue, currentValue) => previousValue + currentValue.discountPercent,
            0
        );
        const discountSum = Math.round(shoppingCart.totalPrice * totalDiscountPercent);
        shoppingCart.totalPriceWithDiscount = shoppingCart.totalPrice - discountSum;
    }
}
