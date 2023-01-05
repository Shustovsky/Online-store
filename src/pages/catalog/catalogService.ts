import { Product } from '../../model/product';
import { ProductService } from '../product/productService';
import { Filter } from '../../model/Filter';
import { ShoppingCart } from '../../model/shoppingCart';
import { ShoppingcartService } from '../shoppingcart/shoppingcartService';

export class CatalogService {
    productService: ProductService;
    shoppingcartService: ShoppingcartService;

    constructor(productService: ProductService, shoppingcartService: ShoppingcartService) {
        this.productService = productService;
        this.shoppingcartService = shoppingcartService;
    }

    public getCatalog(): Product[] {
        return this.productService.getProducts();
    }

    public getFilter(): Filter {
        const products = this.productService.getProducts();
        const filter = new Filter();
        const categories = new Set(products.map((val) => val.category.toLowerCase()));
        const brandes = new Set(products.map((val) => val.brand.toLowerCase()));
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

    public changeCategoryQueryParam(param: string): void {
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

    public changeBrandQueryParam(param: string): void {
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

    public changeMinPriceQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('minPrice', param);
        this.insertUrlParam(searchParams);
    }

    public changeMaxPriceQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('maxPrice', param);
        this.insertUrlParam(searchParams);
    }

    public changeMinStockQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('minStock', param);
        this.insertUrlParam(searchParams);
    }

    public changeMaxStockQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('maxStock', param);
        this.insertUrlParam(searchParams);
    }

    public changeSearchQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('search', param);
        this.insertUrlParam(searchParams);
    }

    public changeSortParam(value: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('sort', value);
        this.insertUrlParam(searchParams);
    }

    public changeViewParam(value: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('view', value);
        this.insertUrlParam(searchParams);
    }

    private insertUrlParam(searchParams: URLSearchParams): void {
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

    public getFilterFromQueryParams(): Filter {
        const searchParams = new URLSearchParams(window.location.search);
        const filter = new Filter();

        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            filter.categories = categoryParam.split('|') || [];
        }

        const brandParam = searchParams.get('brand');
        if (brandParam) {
            filter.brandes = brandParam.split('|') || [];
        }

        const minPriceParam = searchParams.get('minPrice');
        if (minPriceParam) {
            filter.minPrice = +minPriceParam;
        }

        const maxPriceParam = searchParams.get('maxPrice');
        if (maxPriceParam) {
            filter.maxPrice = +maxPriceParam;
        }

        const minStockParam = searchParams.get('minStock');
        if (minStockParam) {
            filter.minStock = +minStockParam;
        }
        const maxStock = searchParams.get('maxStock');
        if (maxStock) {
            filter.maxStock = +maxStock;
        }
        const search = searchParams.get('search');
        if (search) {
            filter.search = search;
        }
        const sort = searchParams.get('sort');
        if (sort) {
            filter.sort = sort;
        }
        return filter;
    }

    public getFilteredProduct(filter: Filter): Product[] {
        let products = this.getCatalog();

        if (filter.categories.length > 0) {
            products = products.filter((item) => filter.categories.includes(item.category.toLowerCase()));
        }
        if (filter.brandes.length > 0) {
            products = products.filter((item) => filter.brandes.includes(item.brand.toLowerCase()));
        }
        if (filter.minPrice > 0) {
            products = products.filter((item) => item.price >= filter.minPrice);
        }
        if (filter.maxPrice > 0) {
            products = products.filter((item) => item.price <= filter.maxPrice);
        }
        if (filter.minStock > 0) {
            products = products.filter((item) => item.stock >= filter.minStock);
        }
        if (filter.maxStock > 0) {
            products = products.filter((item) => item.stock <= filter.maxStock);
        }
        if (filter.search) {
            products = products.filter((item) => {
                if (filter.search) {
                    if (item.brand.toLowerCase().includes(filter.search)) {
                        return true;
                    }
                    if (item.category.toLowerCase().includes(filter.search)) {
                        return true;
                    }
                    if (item.title.toLowerCase().includes(filter.search)) {
                        return true;
                    }
                    if (`${item.price}`.includes(filter.search)) {
                        return true;
                    }
                    if (`${item.discountPercentage}`.includes(filter.search)) {
                        return true;
                    }
                    if (`${item.rating}`.includes(filter.search)) {
                        return true;
                    }
                    return `${item.stock}`.includes(filter.search);
                }
            });
        }
        if (filter.sort) {
            if (filter.sort === 'price-high') {
                products = products.sort((a, b) => b.price - a.price);
            }
            if (filter.sort === 'price-low') {
                products = products.sort((a, b) => a.price - b.price);
            }
            if (filter.sort === 'name-az') {
                products = products.sort((a, b) => a.title.localeCompare(b.title));
            }
            if (filter.sort === 'name-za') {
                products = products.sort((a, b) => b.title.localeCompare(a.title));
            }
        }
        return products;
    }

    public getChangeView(): string | null {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get('view');
    }

    public doResetURL() {
        const newURL = location.href.split('?')[0];
        window.history.pushState('object', document.title, newURL);
    }

    public doCopyURL(): Promise<void> {
        const url = document.location.href;
        return navigator.clipboard.writeText(url);
    }

    public chooseAddOrRemoveItemToShoppingCart(shoppingCart: ShoppingCart, productId: number): ShoppingCart {
        const products = shoppingCart.products;
        for (const item of products) {
            if (item.product.id === productId) {
                return this.shoppingcartService.deleteItem(productId);
            }
        }
        return this.shoppingcartService.addItem(productId);
    }
}
