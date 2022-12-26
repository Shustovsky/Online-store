import { Product } from '../../model/product';
import {ProductService} from "../product/productService";

export class CatalogService {
    productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    getCatalog(): Product[] {
        return this.productService.getProducts();
    }
}
