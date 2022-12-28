import { Product } from '../../model/product';
import { ProductService } from '../product/productService';
import { Filter } from '../../model/Filter';

export class CatalogService {
    productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    getCatalog(): Product[] {
        return this.productService.getProducts();
    }

    getFilter(): Filter {
        const products = this.productService.getProducts();
        const filter = new Filter();
        const categories = new Set(products.map((val) => val.category));
        const brandes = new Set(products.map((val) => val.brand));
        filter.categories = Array.from(categories);
        filter.brandes = Array.from(brandes);

        const prices = products.map((val) => val.price);
        filter.minPrice = Math.min(...prices);
        filter.maxPrice = Math.max(...prices);

        const stocks = products.map((val) => val.stock);
        filter.minStock = Math.min(...stocks);
        filter.maxStock = Math.max(...stocks);

        return filter;
    }

    changeCategoryQueryParam(param: string): void {
        // console.log(param)
        const searchParams = new URLSearchParams(window.location.search);

        const selectedCategories = searchParams.get('category')?.split('|');
        if (selectedCategories) {
            if (selectedCategories.includes(param)) {
                selectedCategories.splice(selectedCategories.indexOf(param), 1);
            } else {
                selectedCategories.push(param);
            }
            const str = selectedCategories.join('|');
            searchParams.set('category', str);
        } else {
            searchParams.set('category', param);
        }
        this.insertUrlParam(searchParams);
    }

    changeBrandQueryParam(param: string): void {
        // console.log(param)
        const searchParams = new URLSearchParams(window.location.search);

        const selectedCategories = searchParams.get('brand')?.split('|');
        if (selectedCategories) {
            if (selectedCategories.includes(param)) {
                selectedCategories.splice(selectedCategories.indexOf(param), 1);
            } else {
                selectedCategories.push(param);
            }
            const str = selectedCategories.join('|');
            searchParams.set('brand', str);
        } else {
            searchParams.set('brand', param);
        }
        this.insertUrlParam(searchParams);
    }

    changePriceLowerQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('minPrice', param);
        this.insertUrlParam(searchParams);
    }

    changePriceUpperQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('maxPrice', param);
        this.insertUrlParam(searchParams);
    }

    changeStockLowerQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('minStock', param);
        this.insertUrlParam(searchParams);
    }

    changeStockUpperQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('maxStock', param);
        this.insertUrlParam(searchParams);
    }

    insertUrlParam(searchParams: URLSearchParams): void {
        searchParams.forEach((value, key) => {
            if (!value || key === 'id') {
                searchParams.delete(key);
            }
        });

        const newUrl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?' +
            searchParams.toString();
        window.history.pushState({ path: newUrl }, '', newUrl);
    }

    getFilterFromQueryParams(): Filter {
        const searchParams = new URLSearchParams(window.location.search);
        // console.log(searchParams);
        const filter = new Filter();
        filter.categories = searchParams.get('category')?.split('|') || [];
        filter.brandes = searchParams.get('brand')?.split('|') || [];
        filter.minPrice = +searchParams.get('minPrice')!;
        filter.maxPrice = +searchParams.get('maxPrice')!;
        filter.minStock = +searchParams.get('minStock')!;
        filter.maxStock = +searchParams.get('maxStock')!;
        return filter;
    }

    getFilteredProduct(filter: Filter): Product[] {
        let products = this.getCatalog();
        products.forEach(() => {
            if (filter.categories.length > 0) {
                products = products.filter((item) => filter.categories.includes(item.category));
            }
            if (filter.brandes.length > 0) {
                products = products.filter((item) => filter.brandes.includes(item.brand));
            }
            if (filter.minPrice > 0) {
                products = products.filter((item) => (item.price >= filter.minPrice ? item : ''));
            }
            if (filter.maxPrice > 0) {
                products = products.filter((item) => (item.price <= filter.maxPrice ? item : ''));
            }
            if (filter.minStock > 0) {
                products = products.filter((item) => (item.stock >= filter.minStock ? item : ''));
            }
            if (filter.maxStock > 0) {
                products = products.filter((item) => (item.stock <= filter.maxStock ? item : ''));
            }
        });
        return products;
    }
}
