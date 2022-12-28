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

    public drawPage() {
        const catalog = this.catalogService.getCatalog();
        const filter = this.catalogService.getFilter();
        this.catalogView.createCatalog(catalog, filter);
    }

    public addItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    public onCategoryFilterChange(name: string) {
        this.catalogService.changeCategoryQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onBrandFilterChange(name: string) {
        this.catalogService.changeBrandQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onPriceLowerFilterChange(name: string) {
        this.catalogService.changeMinPriceQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onPriceUpperFilterChange(name: string) {
        this.catalogService.changeMaxPriceQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onStockLowerFilterChange(name: string) {
        this.catalogService.changeMinStockQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onStockUpperFilterChange(name: string) {
        this.catalogService.changeMaxStockQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public changeViewItems(div: HTMLDivElement) {
        this.catalogView.changeView(div);
    }
}
