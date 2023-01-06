import { CatalogService } from './catalogService';
import { CatalogView } from './catalogView';
import { ShoppingcartService } from '../shoppingcart/shoppingcartService';
import { HeaderView } from '../components/headerView';
import { ProductService } from '../product/productService';
import { ProductView } from '../product/productView';
import { Categories } from '../App';

export class CatalogController {
    catalogService: CatalogService;
    shoppingcartService: ShoppingcartService;
    catalogView: CatalogView;
    headerView: HeaderView;
    productService: ProductService;
    productView: ProductView;

    constructor(
        catalogService: CatalogService,
        shoppingcartService: ShoppingcartService,
        catalogView: CatalogView,
        headerView: HeaderView,
        productService: ProductService,
        productView: ProductView
    ) {
        this.catalogService = catalogService;
        this.shoppingcartService = shoppingcartService;
        this.catalogView = catalogView;
        this.headerView = headerView;
        this.productService = productService;
        this.productView = productView;
    }

    public drawPage(): void {
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const catalog = this.catalogService.getFilteredProduct(userFilter);
        const filter = this.catalogService.getFilter();
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.createCatalog(catalog, filter, userFilter, shoppingCart);
        this.catalogView.changeSortStatValue(catalog);
        const view = this.catalogService.getChangeView();
        this.catalogView.changeView(view);
    }

    public addItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.catalogView.onShoppingCartChange(shoppingCart, productId);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    public removeItemFromShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.deleteItem(productId);
        this.catalogView.onShoppingCartChange(shoppingCart, productId);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    public viewProductDetails(productId: number) {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.changeUrl(Categories.PRODUCT_PATH, productId.toString());
        this.catalogView.deleteCatalog();
        this.productService.fetchProduct(productId, (product) => this.productView.renderProduct(product, shoppingCart));
    }

    private changeUrl(hash: string, productId: string) {
        const newUrl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?' +
            'id=' +
            productId +
            '#' +
            hash;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }

    public onCategoryFilterChange(name: string): void {
        this.catalogService.changeCategoryQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.onFilterChange(filteredProducts, shoppingCart);
    }

    public onBrandFilterChange(name: string): void {
        this.catalogService.changeBrandQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.onFilterChange(filteredProducts, shoppingCart);
    }

    public onPriceLowerFilterChange(name: string): void {
        this.catalogService.changeMinPriceQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.onFilterChange(filteredProducts, shoppingCart);
    }

    public onPriceUpperFilterChange(name: string): void {
        this.catalogService.changeMaxPriceQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.onFilterChange(filteredProducts, shoppingCart);
    }

    public onStockLowerFilterChange(name: string): void {
        this.catalogService.changeMinStockQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.onFilterChange(filteredProducts, shoppingCart);
    }

    public onStockUpperFilterChange(name: string): void {
        this.catalogService.changeMaxStockQueryParam(name);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.onFilterChange(filteredProducts, shoppingCart);
    }

    public changeViewItems(name: string): void {
        this.catalogService.changeViewParam(name);
        this.catalogView.changeView(name);
    }

    public onSearchFilterChange(data: string): void {
        this.catalogService.changeSearchQueryParam(data);
        const userFilter = this.catalogService.getFilterFromQueryParams();
        const filteredProducts = this.catalogService.getFilteredProduct(userFilter);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.onFilterChange(filteredProducts, shoppingCart);
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
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.catalogView.onFilterChange(filteredProducts, shoppingCart);
    }
}
