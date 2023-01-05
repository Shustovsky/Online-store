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
import { ShoppingcartValidator } from './shoppingcart/shoppingcartValidationServise';

export enum Categories {
    CATALOG_PATH = 'catalog',
    PRODUCT_PATH = 'product',
    SHOPPING_CART_PATH = 'shoppingcart',
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
        const shoppingCartView = new ShoppingCartView(null);

        const productView = new ProductView(null);
        this.productController = new ProductController(
            productService,
            productView,
            shoppingCartView,
            shoppingcartService,
            this.header
        );
        productView.productController = this.productController;

        const catalogView = new CatalogView(null);
        this.catalogController = new CatalogController(
            catalogService,
            shoppingcartService,
            catalogView,
            this.header,
            productService,
            productView
        );
        catalogView.catalogController = this.catalogController;


        const shoppingcartValidator = new ShoppingcartValidator();
        this.shoppingCartController = new ShoppingCartController(
            shoppingcartService,
            shoppingcartValidator,
            shoppingCartView,
            this.header
        );
        shoppingCartView.shoppingCartController = this.shoppingCartController;

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

    run(): void {
        this.headerController.drawHeader();
        this.footer.createFooter();
        this.enableRouteChange();
        this.checkHashAndRender();
    }

    private getQueryParam(paramName: string): string {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        return params[paramName];
    }
}
