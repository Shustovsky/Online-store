import { ProductView } from './productView';
import { ProductService } from './productService';

export class ProductController {
    productService: ProductService;
    productView: ProductView;

    constructor(productService: ProductService, productView: ProductView) {
        this.productService = productService;
        this.productView = productView;
    }

    drawPage(id: number) {
        this.productService.fetchProduct(id, (product) => this.productView.renderProduct(product));
    }
}
