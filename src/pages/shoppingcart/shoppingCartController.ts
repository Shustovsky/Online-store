import { ShoppingCartView } from './shoppingCartView';
import { ShoppingcartService } from './shoppingcartService';
import { HeaderView } from '../components/headerView';

export class ShoppingCartController {
    shoppingcartService: ShoppingcartService;
    shoppingCartView: ShoppingCartView;
    headerView: HeaderView;

    constructor(shoppingcartService: ShoppingcartService, shoppingCartView: ShoppingCartView, headerView: HeaderView) {
        this.shoppingcartService = shoppingcartService;
        this.shoppingCartView = shoppingCartView;
        this.headerView = headerView;
    }

    drawPage(): void {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.shoppingCartView.renderShoppingCart(shoppingCart);
    }

    addItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.shoppingCartView.onShoppingCardChange(shoppingCart);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    deleteItemFromShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.deleteItem(productId);
        this.shoppingCartView.onShoppingCardChange(shoppingCart);
        this.headerView.onShoppingCardChange(shoppingCart);
    }
}
