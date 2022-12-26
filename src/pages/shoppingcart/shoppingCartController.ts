import { ShoppingCartView } from './shoppingCartView';
import { ShoppingcartService } from './shoppingcartService';

export class ShoppingCartController {
    shoppingcartService: ShoppingcartService;
    shoppingCartView: ShoppingCartView;

    constructor(shoppingcartService: ShoppingcartService, shoppingCartView: ShoppingCartView) {
        this.shoppingcartService = shoppingcartService;
        this.shoppingCartView = shoppingCartView;
    }

    drawPage(): void {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.shoppingCartView.renderShoppingCart(shoppingCart);
    }

    addItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.shoppingCartView.onShoppingCardChange(shoppingCart);
    }
}
