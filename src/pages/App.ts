import { CatalogController } from './catalog/catalogController';
import { Header } from './components/headerView';
import { Footer } from './components/footerView';
import products from './../assets/json/products.json';
import { PageNotFound } from './components/pageNotFound';
import { productView } from './product/productView';
import { shoppingCartView } from './shoppingcart/shoppingCartView';

export const enum Categories {
    CATALOG_PATH = 'catalog',
    PRODUCT_PATH = 'product',
    SHOPPING_CART_PATH = 'shoppingcart',
}

export class App {
    header: Header;
    footer: Footer;
    pageNotFound: PageNotFound;
    catalogController: CatalogController;

    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.catalogController = new CatalogController();
        this.pageNotFound = new PageNotFound();
        //TODO добавить product и shoppingCart
    }

    renderNewPage(url: string): void {
        const main = document.querySelector('main') as HTMLElement;
        if (main) {
            main.remove();
        }

        if (url.includes(Categories.CATALOG_PATH) || url === '') {
            this.catalogController.drawPage();
        } else if (url.includes(Categories.PRODUCT_PATH)) {
            //TODO добавить productController

            new productView().renderProduct(products.products[0]);
        } else if (url.includes(Categories.SHOPPING_CART_PATH)) {
            new shoppingCartView().renderShoppingCart({
                totalPrice: 20000,
                productsCount: 2,
                products: [{ product: products.products[0], count: 1 }],
            })
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
        this.header.createHeader({
            totalPrice: 20000,
            productsCount: 2,
            products: [{ product: products.products[0], count: 1 }],
        }); //test shoppingcart
        this.footer.createFooter();
        this.enableRouteChange();
        this.checkHashAndRender();
    }
}
