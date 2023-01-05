import { ProductView } from './productView';
import { ProductService } from './productService';
import { ShoppingCartView } from '../shoppingcart/shoppingCartView';
import { ShoppingcartService } from '../shoppingcart/shoppingcartService';
import {HeaderView} from "../components/headerView";

export class ProductController {
    productService: ProductService;
    shoppingcartService: ShoppingcartService;
    productView: ProductView;
    shoppingCartView: ShoppingCartView;
    headerView: HeaderView;

    constructor(
        productService: ProductService,
        productView: ProductView,
        shoppingCartView: ShoppingCartView,
        shoppingcartService: ShoppingcartService,
        headerView: HeaderView
    ) {
        this.productService = productService;
        this.shoppingcartService = shoppingcartService;
        this.productView = productView;
        this.shoppingCartView = shoppingCartView;
        this.headerView = headerView;
    }

    drawPage(id: number) {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.productService.fetchProduct(id, (product) => this.productView.renderProduct(product, shoppingCart));
    }

    goToBuyNow() {
        this.productView.removeProduct();
        this.shoppingCartView.renderShoppingCart(this.shoppingcartService.getShoppingCart());
        this.shoppingCartView.createModalWrapper();
    }

    removeProductFromShoppingCart(productId: number) {
        const shoppingCart = this.shoppingcartService.deleteItem(productId);
        this.productView.onShoppingCartChange(shoppingCart, productId);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    addProductToShoppingCart(productId: number) {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.productView.onShoppingCartChange(shoppingCart, productId);
        this.headerView.onShoppingCardChange(shoppingCart);
    }
}
