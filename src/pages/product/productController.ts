import { ProductView } from './productView';
import { ProductService } from './productService';

export class ProductController {
    ProductService: ProductService = new ProductService();
    productView: ProductView = new ProductView();

    drawPage(id: number) {
        this.ProductService.fetchProduct(id, (product) => this.productView.renderProduct(product));
    }
}
