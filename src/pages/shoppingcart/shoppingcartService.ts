import { Item, ShoppingCart } from '../../model/shoppingCart';
import { ProductService } from '../product/productService';

export class ShoppingcartService {
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
                this.saveShoppingCart(shoppingCart);
            }
        } else {
            if (product.stock > 0) {
                const newItem = new Item(product, 1);
                this.addShoppingCartItem(shoppingCart, newItem);
                shoppingCart.totalPrice += product.price;
                shoppingCart.productsCount += 1;
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
}
