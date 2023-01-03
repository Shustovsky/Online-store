import { CatalogController } from './catalog/catalogController';
import { HeaderView } from './components/headerView';
import { Footer } from './components/footerView';
import { PageNotFound } from './components/pageNotFound';
import { ShoppingCartController } from './shoppingcart/shoppingCartController';
import { ProductController } from './product/productController';
import { HeaderController } from './components/headerController';
import { CatalogService } from './catalog/catalogService';
import { CatalogView } from './catalog/catalogView';
import { ShoppingcartService } from './shoppingcart/shoppingcartService';
import { ProductService } from './product/productService';
import { ShoppingCartView } from './shoppingcart/shoppingCartView';
import { ProductView } from './product/productView';

enum Categories {
    CATALOG_PATH = 'catalog',
    PRODUCT_PATH = 'product',
    SHOPPING_CART_PATH = 'shoppingcart',
}

enum Filtres {
    CATEGORY = 'category',
    BRAND = 'brand',
    MIN_PRICE = 'minPrice',
    MAX_PRICE = 'maxPrice',
    MIN_STOCK = 'minStock',
    MAX_STOCK = 'maxStock',
    SEARCH = 'search',
}

export class App {
    header: HeaderView;
    footer: Footer;
    pageNotFound: PageNotFound;
    catalogController: CatalogController;
    shoppingCartController: ShoppingCartController;
    productController: ProductController;
    headerController: HeaderController;

    constructor() {
        this.header = new HeaderView();
        this.footer = new Footer();

        const productService = new ProductService();
        const shoppingcartService = new ShoppingcartService(productService);
        const catalogService = new CatalogService(productService);

        const catalogView = new CatalogView(null);
        this.catalogController = new CatalogController(catalogService, shoppingcartService, catalogView, this.header);
        catalogView.catalogController = this.catalogController;

        const shoppingCartView = new ShoppingCartView(null);
        this.shoppingCartController = new ShoppingCartController(shoppingcartService, shoppingCartView, this.header);
        shoppingCartView.shoppingCartController = this.shoppingCartController;

        const productView = new ProductView(null);
        this.productController = new ProductController(
            productService,
            productView,
            shoppingCartView,
            shoppingcartService
        );
        productView.productController = this.productController;

        this.pageNotFound = new PageNotFound();
        this.headerController = new HeaderController(this.header, shoppingcartService);
    }

    renderNewPage(url: string): void {
        const main = document.querySelector('main') as HTMLElement;
        if (main) {
            main.remove();
        }

        if (url.includes(Categories.CATALOG_PATH) || url === '') {
            this.catalogController.drawPage();
        } else if (url.includes(Categories.PRODUCT_PATH)) {
            const id = +this.getQueryParam('id');
            this.productController.drawPage(id);
        } else if (url === Categories.SHOPPING_CART_PATH) {
            this.shoppingCartController.drawPage();
        } else {
            this.pageNotFound.createPageNotFound();
        }
    }

    enableRouteChange(): void {
        window.addEventListener('hashchange', () => this.checkHashAndRender());
    }

    checkHashAndRender(): void {
        const hash = window.location.hash.slice(1);
        this.renderNewPage(hash);
    }

    checkQueryParametersAndRender(): void {
        const url = document.URL;
        console.log(url);
        if (url.includes(Filtres.CATEGORY)) {
            this.catalogController.onCategoryFilterChange('');
        }
        if (url.includes(Filtres.BRAND)) {
            this.catalogController.onBrandFilterChange('');
        }
        if (url.includes(Filtres.MIN_PRICE)) {
            const numb = url
                .split('?')[1]
                .split('&')
                .find((item) => item.startsWith(Filtres.MIN_PRICE))!
                .split('=')[1];
            this.catalogController.onPriceLowerFilterChange(numb);
        }
        if (url.includes(Filtres.MAX_PRICE)) {
            const numb = url
                .split('?')[1]
                .split('&')
                .find((item) => item.startsWith(Filtres.MAX_PRICE))!
                .split('=')[1];
            this.catalogController.onPriceUpperFilterChange(numb);
        }
        if (url.includes(Filtres.MIN_STOCK)) {
            const numb = url
                .split('?')[1]
                .split('&')
                .find((item) => item.startsWith(Filtres.MIN_STOCK))!
                .split('=')[1];
            this.catalogController.onStockLowerFilterChange(numb);
        }
        if (url.includes(Filtres.MAX_STOCK)) {
            const numb = url
                .split('?')[1]
                .split('&')
                .find((item) => item.startsWith(Filtres.MAX_STOCK))!
                .split('=')[1];
            this.catalogController.onStockUpperFilterChange(numb);
        }
        if (url.includes(Filtres.SEARCH)) {
            const str = url
                .split('?')[1]
                .split('&')
                .find((item) => item.startsWith(Filtres.SEARCH))!
                .split('=')[1];
            this.catalogController.textSearchProducts(str);
        }
    }

    run(): void {
        this.headerController.drawHeader();
        this.footer.createFooter();
        this.enableRouteChange();
        this.checkHashAndRender();
        this.checkQueryParametersAndRender();
    }

    private getQueryParam(paramName: string): string {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        return params[paramName];
    }
}
