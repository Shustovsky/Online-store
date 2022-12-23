import { Product } from '../../model/product';

export class ProductService {
    public fetchProduct(id: number, callback: (product: Product) => void): void {
        fetch('https://dummyjson.com/products/' + id)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((product: Product) => callback(product));
    }
}
