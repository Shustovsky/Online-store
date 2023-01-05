import { Product } from '../../model/product';
import { ProductController } from './productController';
import { ShoppingCart } from "../../model/shoppingCart";

export class ProductView {
    productController: ProductController | null;

    constructor(productController: ProductController | null) {
        this.productController = productController;
    }

    public renderProduct(product: Product, shoppingCart: ShoppingCart): void {
        const header = document.querySelector('.header') as HTMLElement;

        const mainElement = document.createElement('main');
        mainElement.className = 'product';
        header.after(mainElement);

        const container = document.createElement('div');
        container.className = 'container';
        mainElement.append(container);

        const linkNavigation = document.createElement('div');
        linkNavigation.className = 'product__link-navigation';
        this.createProductLinkNavigation(product, linkNavigation);
        container.append(linkNavigation);

        const productWrapperAbout = document.createElement('div');
        productWrapperAbout.className = 'product__wrapper-about';
        this.createProductWrapperAbout(product, shoppingCart, productWrapperAbout);
        container.append(productWrapperAbout);
    }

    public removeProduct(): void {
        const mainElement = document.querySelector('.product') as HTMLElement;
        mainElement.remove();
    }

    private createProductLinkNavigation(product: Product, linkNavigation: HTMLDivElement): void {
        const linkNavigationStore = document.createElement('a');
        linkNavigationStore.className = 'link-navigation-store';
        linkNavigationStore.textContent = 'store';

        const linkArray = document.createElement('p');
        linkArray.className = 'link-array';
        linkArray.textContent = '>';

        const linkNavigationCategory = document.createElement('a');
        linkNavigationCategory.className = 'link-navigation-category';
        linkNavigationCategory.textContent = product.category;

        const linkArray2 = document.createElement('p');
        linkArray2.className = 'link-array';
        linkArray2.textContent = '>';

        const linkNavigationBrand = document.createElement('a');
        linkNavigationBrand.className = 'link-navigation-brand';
        linkNavigationBrand.textContent = product.brand;

        const linkArray3 = document.createElement('p');
        linkArray3.className = 'link-array';
        linkArray3.textContent = '>';

        const linkNavigationTitle = document.createElement('a');
        linkNavigationTitle.className = 'link-navigation-title';
        linkNavigationTitle.textContent = product.title;

        linkNavigation.append(linkNavigationStore);
        linkNavigation.append(linkArray);
        linkNavigation.append(linkNavigationCategory);
        linkNavigation.append(linkArray2);
        linkNavigation.append(linkNavigationBrand);
        linkNavigation.append(linkArray3);
        linkNavigation.append(linkNavigationTitle);
    }

    private createProductWrapperAbout(product: Product, shoppingCart: ShoppingCart, productWrapperAbout: HTMLDivElement): void {
        const productTitle = document.createElement('div');
        productTitle.className = 'product__title';
        productTitle.textContent = product.title;

        const productDescription = document.createElement('div');
        productDescription.className = 'product__description';
        this.createProductDescription(product, shoppingCart, productDescription);

        productWrapperAbout.append(productTitle);
        productWrapperAbout.append(productDescription);
    }

    private createProductDescription(product: Product, shoppingCart: ShoppingCart, productDescription: HTMLDivElement): void {
        const productWrapperPhotos = document.createElement('div');
        productWrapperPhotos.className = 'product__wrapper-photos';

        const productDetails = document.createElement('div');
        productDetails.className = 'product__details';

        this.createProductDetailsElements(
            'Description:',
            product.description,
            'product__item-description',
            productDetails
        );
        this.createProductDetailsElements(
            'Discount Percentage:',
            product.discountPercentage.toString(),
            'product__details-discount',
            productDetails
        );
        this.createProductDetailsElements(
            'Rating:',
            product.rating.toString(),
            'product__details-rating',
            productDetails
        );
        this.createProductDetailsElements('Stock:', product.stock.toString(), 'product__details-stock', productDetails);
        this.createProductDetailsElements('Brand:', product.brand, 'product__details-brand', productDetails);
        this.createProductDetailsElements('Category:', product.category, 'product__details-category', productDetails);

        const productWrapperPrice = document.createElement('div');
        productWrapperPrice.className = 'product__wrapper-price';
        this.createProductWrapperPriceElements(product, shoppingCart, productWrapperPrice);

        const productPhotos = document.createElement('div');
        productPhotos.className = 'product__photos';

        const productPhotoMini = document.createElement('div');
        productPhotoMini.className = 'product__photo-mini';

        product.images.forEach((imageUrl) => {
            const photoMini = document.createElement('img');
            photoMini.className = 'photo-mini';
            photoMini.src = imageUrl;
            photoMini.alt = `${product.title} photo`;
            productPhotoMini.append(photoMini);
            photoMini.addEventListener('click', () => this.productController?.changeBigPhotoProduct(photoMini))
        });

        const productPhotoBig = document.createElement('div');
        productPhotoBig.className = 'product__photo-big';

        const photoBig = document.createElement('img');
        photoBig.className = 'photo-big';
        photoBig.src = product.images[0]; //todo change on click
        photoBig.alt = `${product.title} photo`;

        productPhotoBig.append(photoBig);
        productPhotos.append(productPhotoMini);
        productPhotos.append(productPhotoBig);
        productWrapperPhotos.append(productPhotos);
        productDescription.append(productWrapperPhotos);
        productDescription.append(productDetails);
        productDescription.append(productWrapperPrice);
    }

    private createProductDetailsElements(
        title: string,
        value: string,
        style: string,
        productDetails: HTMLDivElement
    ): void {
        const productDetailsItem = document.createElement('div');
        productDetailsItem.className = 'product__details-item';

        const productDetailsTitle = document.createElement('div');
        productDetailsTitle.className = 'product__details-title';
        productDetailsTitle.textContent = title;

        const productItemDescription = document.createElement('div');
        productItemDescription.className = style;
        productItemDescription.textContent = value;

        productDetailsItem.append(productDetailsTitle);
        productDetailsItem.append(productItemDescription);
        productDetails.append(productDetailsItem);
    }

    private createProductWrapperPriceElements(product: Product, shoppingCart: ShoppingCart, productWrapperPrice: HTMLDivElement): void {
        const productPrice = document.createElement('div');
        productPrice.className = 'product__price';
        productPrice.textContent = `€${product.price}`;

        const productBtn = document.createElement('button');
        productBtn.className = 'product__btn';
        if (shoppingCart.hasProduct(product.id)) {
            productBtn.id = 'btn-drop';
            productBtn.textContent = 'drop from cart';
            productBtn.addEventListener("click", () => {
                this.productController?.removeProductFromShoppingCart(product.id);
            })
        } else {
            productBtn.id = 'btn-add';
            productBtn.textContent = 'add to cart';
            productBtn.addEventListener("click", () => {
                this.productController?.addProductToShoppingCart(product.id);
            })
        }

        const productBtnBuy = document.createElement('button');
        productBtnBuy.className = 'product__btn';
        productBtnBuy.id = 'btn-buy';
        productBtnBuy.textContent = 'buy now';
        productBtnBuy.addEventListener('click', () => this.productController?.goToBuyNow());

        productWrapperPrice.append(productPrice);
        productWrapperPrice.append(productBtn);
        productWrapperPrice.append(productBtnBuy);
    }

    public onShoppingCartChange(shoppingCart: ShoppingCart, productId: number): void {
        const wrapper = document.querySelector('.product__wrapper-price') as HTMLDivElement;
        wrapper.querySelector('.product__btn')?.remove();

        const productBtn = document.createElement('button');
        productBtn.className = 'product__btn';
        if (shoppingCart.hasProduct(productId)) {
            productBtn.id = 'btn-drop';
            productBtn.textContent = 'drop from cart';
            productBtn.addEventListener("click", () => {
                this.productController?.removeProductFromShoppingCart(productId);
            })
        } else {
            productBtn.id = 'btn-add';
            productBtn.textContent = 'add to cart';
            productBtn.addEventListener("click", () => {
                this.productController?.addProductToShoppingCart(productId);
            })
        }

        const productPrice = document.querySelector('.product__price') as HTMLDivElement;
        productPrice.after(productBtn);
    }

    public doChangeBigPhoto(img: HTMLImageElement) {
        const bigPhoto = document.querySelector('.photo-big') as HTMLImageElement;
        if (bigPhoto) {
            bigPhoto.src = img.src;
            bigPhoto.alt = img.alt;
        }
    }
}
