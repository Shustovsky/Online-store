import { HeaderView } from './headerView';
import { ShoppingcartService } from '../shoppingcart/shoppingcartService';

export class HeaderController {
    headerView: HeaderView;
    shoppingcartService: ShoppingcartService;

    constructor(headerView: HeaderView, shoppingcartService: ShoppingcartService) {
        this.headerView = headerView;
        this.shoppingcartService = shoppingcartService;
    }

    drawHeader(): void {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.headerView.createHeader(shoppingCart);
    }
}
