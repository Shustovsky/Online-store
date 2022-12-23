import { ShoppingCartView } from './shoppingCartView';
import { ShoppingcartService } from './shoppingcartService';

export class ShoppingCartController {
    shoppingcartService: ShoppingcartService = new ShoppingcartService();
    shoppingCartView: ShoppingCartView = new ShoppingCartView();

    drawPage(): void {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.shoppingCartView.renderShoppingCart(shoppingCart);
    }
}
