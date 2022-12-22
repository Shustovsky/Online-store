import { CatalogController } from './catalog/catalogController';
import { Header } from './components/headerView';
import { Footer } from './components/footerView';
import products from './../assets/json/products.json';

export const enum Categories {
    CATALOG_PATH = 'catalog',
    PRODUCT_PATH = 'product',
    SHOPPING_CART_PATH = 'shoppingcart',
}

export class App {
    header: Header;
    footer: Footer;
    catalogController: CatalogController;

    constructor() {
        this.header = new Header();
        this.footer = new Footer();
        this.catalogController = new CatalogController();
        //TODO добавить product и shoppingCart
    }

    renderNewPage(url: string) {
        const main = document.querySelector('main') as HTMLElement;
        if (main) {
            main.remove();
        }

        if (url === Categories.CATALOG_PATH || url === '') {
            this.catalogController.drawPage();
        } else if (url === Categories.PRODUCT_PATH) {
            //TODO добавить productController
        } else if (url === Categories.SHOPPING_CART_PATH) {
            //TODO добавить shoppingCartController
        } else {
            console.log('404')
        }

    }

    enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            this.renderNewPage(hash);
        });
    }

    run() {
        this.header.createHeader({
            totalPrice: 20000,
            productsCount: 2,
            products: [{ product: products.products[0], count: 1 }]
        }) //test shoppingcart
        this.footer.createFooter();
        if (window.location.hash === '') {
            this.catalogController.catalogView.createCatalog(products.products);
        }
        this.enableRouteChange();
    }
}
