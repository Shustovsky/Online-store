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
        const filter = this.catalogService.getFilter();
        this.catalogView.createCatalog(catalog, filter);
    }

    addItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    onCategoryFilterChange(name: string) {
        this.catalogService.changeCategoryQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    onBrandFilterChange(name: string) {
        this.catalogService.changeBrandQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    onPriceLowerFilterChange(name: string) {
        this.catalogService.changePriceLowerQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    onPriceUpperFilterChange(name: string) {
        this.catalogService.changePriceUpperQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    onStockLowerFilterChange(name: string) {
        this.catalogService.changeStockLowerQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    onStockUpperFilterChange(name: string) {
        this.catalogService.changeStockUpperQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }
}
