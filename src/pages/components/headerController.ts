import { HeaderView } from './headerView';
import { ShoppingcartService } from '../shoppingcart/shoppingcartService';

export class HeaderController {
    headerView: HeaderView = new HeaderView();
    shoppingcartService: ShoppingcartService = new ShoppingcartService();

    drawHeader(): void {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.headerView.createHeader(shoppingCart);
    }
}
