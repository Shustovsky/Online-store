import { CatalogService } from './catalogService';
import { CatalogView } from './catalogView';
import { ShoppingcartService } from '../shoppingcart/shoppingcartService';
import { HeaderView } from '../components/headerView';

export class CatalogController {
    catalogService: CatalogService;
    shoppingcartService: ShoppingcartService;
    catalogView: CatalogView;
    headerView: HeaderView;

    constructor(
        catalogService: CatalogService,
        shoppingcartService: ShoppingcartService,
        catalogView: CatalogView,
        headerView: HeaderView
    ) {
        this.catalogService = catalogService;
        this.shoppingcartService = shoppingcartService;
        this.catalogView = catalogView;
        this.headerView = headerView;
    }

    drawPage() {
        const catalog = this.catalogService.getCatalog();
        this.catalogView.createCatalog(catalog);
    }

    addItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.headerView.onShoppingCardChange(shoppingCart);
    }
}
