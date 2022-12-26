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
            return JSON.parse(shoppingCartJson);
        } else {
            const shoppingCart = new ShoppingCart();
            this.saveShoppingCart(shoppingCart);
            return shoppingCart;
        }
    }

    public addItem(id: number): ShoppingCart {
        const product = this.productService.getProduct(id);
        if (!product) {
            throw new Error(`Product ${id} not found.`);
        }

        const shoppingCart = this.getShoppingCart();
        const item = this.getShoppingCartItem(shoppingCart, id);

        if (item) {
            item.count += 1;
        } else {
            const newItem = new Item(product, 1);
            this.addShoppingCartItem(shoppingCart, newItem);
        }
        shoppingCart.totalPrice += product.price;
        shoppingCart.productsCount += 1;

        this.saveShoppingCart(shoppingCart);
        return shoppingCart;
    }

    public deleteItem(id: number): ShoppingCart {
        const product = this.productService.getProduct(id);
        if (!product) {
            throw new Error(`Product ${id} not found.`);
        }

        const shoppingCart = this.getShoppingCart();
        const item = this.getShoppingCartItem(shoppingCart, id);

        if (item && item.count > 0) {
            item.count -= 1;
            shoppingCart.totalPrice -= product.price;
            shoppingCart.productsCount -= 1;
            this.saveShoppingCart(shoppingCart);
        }
        return shoppingCart;
    }

    public saveShoppingCart(shoppingCart: ShoppingCart): void {
        const shoppingCartJson = JSON.stringify(shoppingCart);
        localStorage.setItem('shoppingCart', shoppingCartJson);
    }

    private getShoppingCartItem(shoppingCart: ShoppingCart, productId: number): Item | undefined {
        return shoppingCart.products.find((productWrapper) => productWrapper.product.id === productId);
    }

    private addShoppingCartItem(shoppingCart: ShoppingCart, item: Item) {
        shoppingCart.products.push(item);
    }
}
