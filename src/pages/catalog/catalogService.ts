import { Product } from '../../model/product';
import products from '../../assets/json/products.json';

export class CatalogService {
    getCatalog(): Product[] {
        return products.products; //TODO достать из localStorage
    }
}
