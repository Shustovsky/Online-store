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

    public drawPage(): void {
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const catalog = this.catalogService.getFilteredProduct(userFilter);
        const filter = this.catalogService.getFilter();
        console.log(userFilter);
        this.catalogView.createCatalog(catalog, filter, userFilter);
        this.catalogView.changeSortStatValue(catalog);
    }

    public addItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    public onCategoryFilterChange(name: string): void {
        this.catalogService.changeCategoryQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onBrandFilterChange(name: string): void {
        this.catalogService.changeBrandQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onPriceLowerFilterChange(name: string): void {
        this.catalogService.changeMinPriceQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onPriceUpperFilterChange(name: string): void {
        this.catalogService.changeMaxPriceQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onStockLowerFilterChange(name: string): void {
        this.catalogService.changeMinStockQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public onStockUpperFilterChange(name: string): void {
        this.catalogService.changeMaxStockQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public changeViewItems(div: HTMLDivElement): void {
        this.catalogView.changeView(div);
    }

    public onSearchFilterChange(data: string): void {
        this.catalogService.changeSearchQueryParam(data);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }

    public urlReset(): void {
        this.catalogService.doResetURL();
        this.catalogView.deleteCatalog();
        this.drawPage();
    }

    public urlCopy(): Promise<void> {
        return this.catalogService.doCopyURL();
    }

    public onSortItems(value: string): void {
        this.catalogService.changeSortParam(value);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
    }
}
