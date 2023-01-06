import { Product } from '../../model/product';
import products from '../../assets/json/products.json';
import { PageNotFound } from '../components/pageNotFound';

export class ProductService {
    pageNotFound: PageNotFound;

    constructor() {
        this.pageNotFound = new PageNotFound();
    }

    public fetchProduct(id: number, callback: (product: Product) => void): void {
        const product = this.getProduct(id);
        if (product) {
            callback(product);
        } else {
            fetch('https://dummyjson.com/products/' + id)
                .then((res) => {
                    if (!res.ok) {
                        const main = document.querySelector('main') as HTMLElement;
                        if (main) {
                            main.remove();
                        }
                        this.pageNotFound.createPageNotFound();
                        throw new Error(res.statusText);
                    }
                    return res.json();
                })
                .then((product: Product) => callback(product));
        }
    }

    getProducts(): Product[] {
        const productsJson = localStorage.getItem('products');
        if (productsJson) {
            return JSON.parse(productsJson);
        } else {
            const defaultProducts = products.products; //todo temporary
            this.saveProducts(defaultProducts);
            return defaultProducts;
        }
    }

    saveProducts(products: Product[]): void {
        localStorage.setItem('products', JSON.stringify(products));
    }

    public getProduct(id: number): Product | undefined {
        return this.getProducts().find((product) => product.id === id);
    }
}
