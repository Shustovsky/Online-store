import { Product } from '../../model/product';
import { ProductService } from '../product/productService';
import { Filter } from '../../model/Filter';

export class CatalogService {
    productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
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
        return filter;
    }

    public getFilteredProduct(filter: Filter): Product[] {
        let products = this.getCatalog();

        if (filter.categories.length > 0) {
            products = products.filter((item) => filter.categories.includes(item.category.toLowerCase()));
        }
        if (filter.brandes.length > 0) {
            products = products.filter((item) => filter.brandes.includes(item.brand.toLowerCase()));
            console.log(products);
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

        return products;
    }

    public changeSearchQueryParam(param: string): void {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('search', param);
        this.insertUrlParam(searchParams);
    }

    public getTextSearchProducts(data: string, filteredProducts: Product[]): Product[] {
        // let products = this.getCatalog();
        let products = filteredProducts;
        products = products.filter((item) => {
            if (item.brand.toLowerCase().includes(data)) {
                return item;
            }
            if (item.category.toLowerCase().includes(data)) {
                return item;
            }
            if (item.title.toLowerCase().includes(data)) {
                return item;
            }
            if (`${item.price}`.includes(data)) {
                return item;
            }
            if (`${item.discountPercentage}`.includes(data)) {
                return item;
            }
            if (`${item.rating}`.includes(data)) {
                return item;
            }
            if (`${item.stock}`.includes(data)) {
                return item;
            }
        });

        return products;
    }
}
