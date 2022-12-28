import { ProductView } from './productView';
import { ProductService } from './productService';
import { ShoppingCartView } from '../shoppingcart/shoppingCartView';
import { ShoppingcartService } from '../shoppingcart/shoppingcartService';

export class ProductController {
    productService: ProductService;
    shoppingcartService: ShoppingcartService;
    productView: ProductView;
    shoppingCartView: ShoppingCartView;

    constructor(
        productService: ProductService,
        productView: ProductView,
        shoppingCartView: ShoppingCartView,
        shoppingcartService: ShoppingcartService
    ) {
        this.productService = productService;
        this.shoppingcartService = shoppingcartService;
        this.productView = productView;
        this.shoppingCartView = shoppingCartView;
    }

    drawPage(id: number) {
        this.productService.fetchProduct(id, (product) => this.productView.renderProduct(product));
    }

    goToBuyNow() {
        this.productView.removeProduct();
        this.shoppingCartView.renderShoppingCart(this.shoppingcartService.getShoppingCart());
        this.shoppingCartView.createModalWrapper();
    }
}
