import { Product } from '../../model/product';

export function drawProduct(product: Product): void {
    const body = document.body;
    const mainElement = document.createElement('main');
    mainElement.className = 'product';
    body.append(mainElement);

    const container = document.createElement('div');
    container.className = 'container';
    mainElement.append(container);

    const linkNavigation = document.createElement('div');
    linkNavigation.className = 'product__link-navigation';
    createProductLinkNavigation(product, linkNavigation);
    container.append(linkNavigation);

    const productWrapperAbout = document.createElement('div');
    productWrapperAbout.className = 'product__wrapper-about';
    createProductWrapperAbout(product, productWrapperAbout);
    container.append(productWrapperAbout);
}

function createProductLinkNavigation(product: Product, linkNavigation: HTMLDivElement): void {
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

function createProductWrapperAbout(product: Product, productWrapperAbout: HTMLDivElement): void {
    const productTitle = document.createElement('div');
    productTitle.className = 'product__title';
    productTitle.textContent = product.title;

    const productDescription = document.createElement('div');
    productDescription.className = 'product__description';
    createProductDescription(product, productDescription);

    productWrapperAbout.append(productTitle);
    productWrapperAbout.append(productDescription);
}

function createProductDescription(product: Product, productDescription: HTMLDivElement): void {
    const productWrapperPhotos = document.createElement('div');
    productWrapperPhotos.className = 'product__wrapper-photos';

    const productDetails = document.createElement('div');
    productDetails.className = 'product__details';

    createProductDetailsElements('Description:', product.description, 'product__item-description', productDetails);
    createProductDetailsElements(
        'Discount Percentage:',
        product.discountPercentage.toString(),
        'product__details-discount',
        productDetails
    );
    createProductDetailsElements('Rating:', product.rating.toString(), 'product__details-rating', productDetails);
    createProductDetailsElements('Stock:', product.stock.toString(), 'product__details-stock', productDetails);
    createProductDetailsElements('Brand:', product.brand, 'product__details-brand', productDetails);
    createProductDetailsElements('Category:', product.category, 'product__details-category', productDetails);

    const productWrapperPrice = document.createElement('div');
    productWrapperPrice.className = 'product__wrapper-price';
    createProductWrapperPriceElements(product, productWrapperPrice);

    const productPhotos = document.createElement('div');
    productPhotos.className = 'product__photos';

    const productPhotoMini = document.createElement('div');
    productPhotoMini.className = 'product__photo-mini';

    product.images.forEach((imageUrl) => {
        const photoMini = document.createElement('img');
        photoMini.className = 'photo-mini';
        photoMini.src = imageUrl;
        photoMini.alt = '#';
        productPhotoMini.append(photoMini);
    });

    const productPhotoBig = document.createElement('div');
    productPhotoBig.className = 'product__photo-big';

    const photoBig = document.createElement('img');
    photoBig.className = 'photo-big';
    photoBig.src = product.images[0]; //todo change on click
    photoBig.alt = '#';

    productPhotoBig.append(photoBig);
    productPhotos.append(productPhotoMini);
    productPhotos.append(productPhotoBig);
    productWrapperPhotos.append(productPhotos);
    productDescription.append(productWrapperPhotos);
    productDescription.append(productDetails);
    productDescription.append(productWrapperPrice);
}

function createProductDetailsElements(
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

function createProductWrapperPriceElements(product: Product, productWrapperPrice: HTMLDivElement): void {
    const productPrice = document.createElement('div');
    productPrice.className = 'product__price';
    productPrice.textContent = `€${product.price}`;

    const productBtn = document.createElement('button');
    productBtn.className = 'product__btn';
    productBtn.id = 'btn-drop';
    productBtn.textContent = 'drop from cart'; //todo change text click add to cart

    const productBtnBuy = document.createElement('button');
    productBtnBuy.className = 'product__btn';
    productBtnBuy.id = 'btn-buy';
    productBtnBuy.textContent = 'buy now';

    productWrapperPrice.append(productPrice);
    productWrapperPrice.append(productBtn);
    productWrapperPrice.append(productBtnBuy);
}
