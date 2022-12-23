import { ShoppingCart } from '../../model/shoppingCart';

export class ShoppingcartService {
    public getShoppingCart(): ShoppingCart {
        const shoppingCartJson = localStorage.getItem('shoppingCart');
        if (shoppingCartJson) {
            return JSON.parse(shoppingCartJson);
        } else {
            const shoppingCart = new ShoppingCart();
            //todo delete test data
            shoppingCart.productsCount = 1;
            shoppingCart.totalPrice = 549 * 2;
            shoppingCart.products = [{
                product: {
                    id: 1,
                    title: "iPhone 9",
                    description: "An apple mobile which is nothing like apple",
                    price: 549,
                    discountPercentage: 12.96,
                    rating: 4.69,
                    stock: 94,
                    brand: "Apple",
                    category: "smartphones",
                    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                    images: [
                        "https://i.dummyjson.com/data/products/1/1.jpg",
                        "https://i.dummyjson.com/data/products/1/2.jpg",
                        "https://i.dummyjson.com/data/products/1/3.jpg",
                        "https://i.dummyjson.com/data/products/1/4.jpg",
                        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                    ]
                },
                count : 2
            }]
            this.saveShoppingCartInLocalStorage(shoppingCart);
            return shoppingCart;
        }
    }

    private saveShoppingCartInLocalStorage(shoppingCart: ShoppingCart): void {
        let shoppingCartJson = JSON.stringify(shoppingCart);
        localStorage.setItem('shoppingCart', shoppingCartJson);
    }

}

