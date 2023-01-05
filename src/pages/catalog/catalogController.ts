import { CatalogService } from './catalogService';
import { CatalogView } from './catalogView';
import { ShoppingcartService } from '../shoppingcart/shoppingcartService';
import { HeaderView } from '../components/headerView';
import { Item } from '../../model/shoppingCart';

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
        this.catalogView.createCatalog(catalog, filter, userFilter);
        this.catalogView.changeSortStatValue(catalog);
        const view = this.catalogService.getChangeView();
        this.catalogView.changeView(view);
        this.doViewSelectedItem();
    }

    public addOrRemoveItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        const changeShoppingCart = this.catalogService.chooseAddOrRemoveItemToShoppingCart(shoppingCart, productId);
        this.doViewSelectedItem();
        this.headerView.onShoppingCardChange(changeShoppingCart);
    }

    private doViewSelectedItem(): Item[] {
        const shoppingCart = this.shoppingcartService.getShoppingCart().products;
        this.catalogView.changeViewSelectedItem(shoppingCart);
        return shoppingCart;
    }

    public onCategoryFilterChange(name: string): void {
        this.catalogService.changeCategoryQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
        this.doViewSelectedItem();
    }

    public onBrandFilterChange(name: string): void {
        this.catalogService.changeBrandQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
        this.doViewSelectedItem();
    }

    public onPriceLowerFilterChange(name: string): void {
        this.catalogService.changeMinPriceQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
        this.doViewSelectedItem();
    }

    public onPriceUpperFilterChange(name: string): void {
        this.catalogService.changeMaxPriceQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
        this.doViewSelectedItem();
    }

    public onStockLowerFilterChange(name: string): void {
        this.catalogService.changeMinStockQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
        this.doViewSelectedItem();
    }

    public onStockUpperFilterChange(name: string): void {
        this.catalogService.changeMaxStockQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
        this.doViewSelectedItem();
    }

    public changeViewItems(name: string): void {
        this.catalogService.changeViewParam(name);
        this.catalogView.changeView(name);
        this.doViewSelectedItem();
    }

    public onSearchFilterChange(data: string): void {
        this.catalogService.changeSearchQueryParam(data);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        this.catalogView.onFilterChange(filteredProducts);
        this.doViewSelectedItem();
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
