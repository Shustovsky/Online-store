import { Product } from '../../model/product';
import { ShoppingCart } from '../../model/shoppingCart';
import { ShoppingCartController } from './shoppingCartController';

export class ShoppingCartView {
    shoppingCartController: ShoppingCartController | null;

    constructor(shoppingCartController: ShoppingCartController | null) {
        this.shoppingCartController = shoppingCartController;
    }

    public renderShoppingCart(shoppingCart: ShoppingCart): void {
        const header = document.querySelector('.header') as HTMLElement;

        const mainElement = document.createElement('main');
        mainElement.className = 'shoppingcart';
        header.after(mainElement);

        const container = document.createElement('div');
        container.className = 'shoppingcart-container';
        mainElement.append(container);

        const shoppingcartContents = document.createElement('div');
        shoppingcartContents.className = 'shoppingcart__contents';

        const titleWrapper = this.createTitleWrapper();
        shoppingcartContents.append(titleWrapper);

        shoppingCart.products.forEach((value, index) => {
            const contents = this.createProduct(value.product, value.count, index + 1);
            shoppingcartContents.append(contents);
        });
        container.append(shoppingcartContents);

        const summaryWrapper = this.createSummaryWrapper(shoppingCart);
        container.append(summaryWrapper);
    }

    public createModalWrapper(): HTMLElement {
        const container = document.querySelector('.container') as HTMLElement;

        const modalWrapper = document.createElement('div');
        modalWrapper.className = 'shoppingcart__modal-wrapper';
        modalWrapper.addEventListener('click', (env) => {
            if (env.target == modalWrapper) {
                this.closeModalWrapper();
            }
        });

        const modal = document.createElement('form');
        modal.className = 'shoppingcart__modal';

        const modalPersonalDetails = this.createModalPersonalDetails();
        const modalCartDetails = this.createModalCartDetails();

        const modalBtn = document.createElement('button');
        modalBtn.className = 'shoppingcart__modal-btn';
        modalBtn.type = 'submit';
        modalBtn.textContent = 'confirm';

        modal.append(modalPersonalDetails);
        modal.append(modalCartDetails);
        modalWrapper.append(modal);
        container.append(modalWrapper);

        return container;
    }

    public closeModalWrapper() {
        const modalWrapper = document.querySelector('.shoppingcart__modal-wrapper') as HTMLElement;
        modalWrapper.remove();
    }

    private createModalPersonalDetails(): HTMLElement {
        const modalPersonalDetails = document.createElement('div');
        modalPersonalDetails.className = 'shoppingcart__modal-personal-details';

        const modalPersonalTitle = document.createElement('h2');
        modalPersonalTitle.className = 'shoppingcart__modal-personal-title';
        modalPersonalTitle.textContent = 'Personal details';

        modalPersonalDetails.append(modalPersonalTitle);

        this.createFormDetail(modalPersonalDetails, 'Name');
        this.createFormDetail(modalPersonalDetails, 'Phone number');
        this.createFormDetail(modalPersonalDetails, 'Delivery address');
        this.createFormDetail(modalPersonalDetails, 'E-mail');

        return modalPersonalDetails;
    }

    private createFormDetail(modalPersonalDetails: HTMLElement, placeholder: string): HTMLElement {
        const formDetail = document.createElement('div');
        formDetail.className = 'shoppingcart__form-detail';

        const formItem = document.createElement('input');
        formItem.className = 'shoppingcart__form-item';
        formItem.type = 'text';
        formItem.placeholder = placeholder;

        formDetail.append(formItem);
        modalPersonalDetails.append(formDetail);

        return modalPersonalDetails;
    }

    private createModalCartDetails(): HTMLElement {
        const modalCartDetails = document.createElement('div');
        modalCartDetails.className = 'shoppingcart__modal-cart-details';

        const modalCartTitle = document.createElement('h2');
        modalCartTitle.className = 'shoppingcart__modal-cart-title';
        modalCartTitle.textContent = 'Credit cart details';

        const modalCartWrapper = this.createModalCartWrapper();

        modalCartDetails.append(modalCartTitle);
        modalCartDetails.append(modalCartWrapper);

        return modalCartDetails;
    }

    private createModalCartWrapper(): HTMLElement {
        const modalCartWrapper = document.createElement('div');
        modalCartWrapper.className = 'shoppingcart__modal-cart-wrapper';

        const cartWrapper = this.createCartWrapper();

        const otherData = this.createOtherData();

        modalCartWrapper.append(cartWrapper);
        modalCartWrapper.append(otherData);

        return modalCartWrapper;
    }

    private createCartWrapper(): HTMLElement {
        const cartWrapper = document.createElement('div');
        cartWrapper.className = 'shoppingcart__cart-wrapper';

        const cartImg = document.createElement('img');
        cartImg.className = 'shoppingcart__cart-img';
        cartImg.alt = 'logo of payment system';
        cartImg.src =
            'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';

        const cartNumber = document.createElement('input');
        cartNumber.className = 'shoppingcart__cart-number';
        cartNumber.type = 'text';
        cartNumber.placeholder = 'Cart number';

        cartWrapper.append(cartImg);
        cartWrapper.append(cartNumber);

        return cartWrapper;
    }

    private createOtherData(): HTMLElement {
        const otherData = document.createElement('div');
        otherData.className = 'shoppingcart__other-data';

        const validData = document.createElement('div');
        validData.className = 'shoppingcart__valid-data';
        validData.textContent = 'VALID:';

        const validCvv = document.createElement('div');
        validCvv.className = 'shoppingcart__valid-cvv';
        validCvv.textContent = 'CVV:';

        const validThru = document.createElement('input');
        validThru.className = 'shoppingcart__valid-thru';
        validThru.type = 'text';
        validThru.placeholder = 'Valid Thru';

        const validCode = document.createElement('input');
        validCode.className = 'shoppingcart__valid-code';
        validCode.type = 'text';
        validCode.placeholder = 'Code';

        validData.append(validThru);
        validCvv.append(validCode);
        otherData.append(validData);
        otherData.append(validCvv);

        return otherData;
    }

    public onShoppingCardChange(shoppingCart: ShoppingCart) {
        this.removeElementsByClass('shoppingcart__product');
        const shoppingcartContents = document.querySelector('.shoppingcart__contents');
        shoppingCart.products.forEach((value, index) => {
            const contents = this.createProduct(value.product, value.count, index + 1);
            shoppingcartContents?.append(contents);
        });

        const container = document.querySelector('.shoppingcart-container');
        this.removeElementsByClass('shoppingcart__wrapper-summary');
        const summaryWrapper = this.createSummaryWrapper(shoppingCart);
        container?.append(summaryWrapper);
    }

    private removeElementsByClass(className: string) {
        const elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0]?.parentNode?.removeChild(elements[0]);
        }
    }

    private createProduct(product: Product, productsCount: number, productSequenceNumber: number): HTMLDivElement {
        const shoppingcartProductWrapper = document.createElement('div');
        shoppingcartProductWrapper.className = 'shoppingcart__product';

        const productDisplay = this.createProductDisplay(product, productSequenceNumber);
        shoppingcartProductWrapper.append(productDisplay);

        const productDescription = this.createProductDescription(product);
        shoppingcartProductWrapper.append(productDescription);

        const changeProductQuantity = this.createChangeProductQuantity(product, productsCount);
        shoppingcartProductWrapper.append(changeProductQuantity);

        return shoppingcartProductWrapper;
    }

    private createTitleWrapper(): HTMLDivElement {
        const titleWrapper = document.createElement('div');
        titleWrapper.className = 'shoppingcart__title-wrapper';

        const title = document.createElement('div');
        title.className = 'shoppingcart__title';
        title.textContent = 'Products In Cart';
        titleWrapper.append(title);

        const shoppingcartPaginationCount = this.createPaginationCount();
        titleWrapper.append(shoppingcartPaginationCount);

        const shoppingcartPaginationPage = this.createPaginationPage();
        titleWrapper.append(shoppingcartPaginationPage);

        return titleWrapper;
    }

    private createPaginationPage(): HTMLDivElement {
        const shoppingcartPaginationPage = document.createElement('div');
        shoppingcartPaginationPage.className = 'shoppingcart__pagination-page';

        const shoppingcartPage = document.createElement('div');
        shoppingcartPage.className = 'shoppingcart__pagination-page-text';
        shoppingcartPage.textContent = 'page:';
        shoppingcartPaginationPage.append(shoppingcartPage);

        const shoppingcartBtnPre = document.createElement('button'); //todo add listener on click
        shoppingcartBtnPre.className = 'shoppingcart__btn-pre-page';
        shoppingcartBtnPre.textContent = '<';
        shoppingcartPaginationPage.append(shoppingcartBtnPre);

        const shoppingCartPage = document.createElement('div');
        shoppingCartPage.className = 'shoppingcart__current-page';
        shoppingCartPage.textContent = '1';
        shoppingcartPaginationPage.append(shoppingCartPage);

        const shoppingcartBtnNext = document.createElement('button'); //todo add listener on click
        shoppingcartBtnNext.className = 'shoppingcart__btn-next-page';
        shoppingcartBtnNext.textContent = '>';
        shoppingcartBtnNext.addEventListener('click', () => {
            //todo
        });
        shoppingcartPaginationPage.append(shoppingcartBtnNext);

        return shoppingcartPaginationPage;
    }

    private createPaginationCount(): HTMLDivElement {
        const shoppingcartPaginationCount = document.createElement('div');
        shoppingcartPaginationCount.className = 'shoppingcart__pagination-count';

        const shoppingcartItem = document.createElement('div');
        shoppingcartItem.className = 'shoppingcart__pagination-count-text';
        shoppingcartItem.textContent = 'items:';
        shoppingcartPaginationCount.append(shoppingcartItem);

        const itemsCountOnPage = document.createElement('input');
        itemsCountOnPage.className = 'shoppingcart__pagination-count-value';
        itemsCountOnPage.textContent = '5'; //todo get items count on page(from local storage)
        shoppingcartPaginationCount.append(itemsCountOnPage);

        return shoppingcartPaginationCount;
    }

    private createProductDisplay(product: Product, index: number): HTMLDivElement {
        const shoppingcartProductDisplay = document.createElement('div');
        shoppingcartProductDisplay.className = 'shoppingcart__product-display';

        const shoppingcartItemNumber = document.createElement('div');
        shoppingcartItemNumber.className = 'shoppingcart__item-number';
        shoppingcartItemNumber.textContent = index.toString();
        shoppingcartProductDisplay.append(shoppingcartItemNumber);

        const shoppingcartItemPhoto = document.createElement('img');
        shoppingcartItemPhoto.className = 'shoppingcart__item-photo';
        shoppingcartItemPhoto.src = product.images[0];
        shoppingcartItemPhoto.alt = product.title;
        shoppingcartProductDisplay.append(shoppingcartItemPhoto);

        return shoppingcartProductDisplay;
    }

    private createProductDescription(product: Product): HTMLDivElement {
        const productDescriptionWrapper = document.createElement('div');
        productDescriptionWrapper.className = 'shoppingcart__wrapper-description';

        const productTitle = document.createElement('div');
        productTitle.className = 'shoppingcart__item-title';
        productTitle.textContent = product.title;
        productDescriptionWrapper.append(productTitle);

        const productDescription = document.createElement('div');
        productDescription.className = 'shoppingcart__item-description';
        productDescription.textContent = product.description;
        productDescriptionWrapper.append(productDescription);

        const productDetails = this.createProductDetails(product);
        productDescriptionWrapper.append(productDetails);

        return productDescriptionWrapper;
    }

    private createProductDetails(product: Product): HTMLDivElement {
        const productDetails = document.createElement('div');
        productDetails.className = 'shoppingcart__wrapper-details';

        const rating = this.createRatingWrapper(product);
        productDetails.append(rating);

        const productDiscount = this.createProductDiscount(product);
        productDetails.append(productDiscount);

        return productDetails;
    }

    private createRatingWrapper(product: Product): HTMLDivElement {
        const ratingWrapper = document.createElement('div');
        ratingWrapper.className = 'shoppingcart__wrapper-rating';

        const titleRating = document.createElement('div');
        titleRating.className = 'shoppingcart__title-rating';
        titleRating.textContent = 'Rating:';
        ratingWrapper.append(titleRating);

        const rating = document.createElement('div');
        rating.className = 'shoppingcart__rating';
        rating.textContent = product.rating.toString();
        ratingWrapper.append(rating);

        return ratingWrapper;
    }

    private createProductDiscount(product: Product): HTMLDivElement {
        const discountWrapper = document.createElement('div');
        discountWrapper.className = 'shoppingcart__wrapper-discount';

        const titleDiscount = document.createElement('div');
        titleDiscount.className = 'shoppingcart__title-discount';
        titleDiscount.textContent = 'Discount:';
        discountWrapper.append(titleDiscount);

        const discount = document.createElement('div');
        discount.className = 'shoppingcart__discount';
        discount.textContent = product.discountPercentage.toString();
        discountWrapper.append(discount);

        return discountWrapper;
    }

    private createChangeProductQuantity(product: Product, productsCount: number): HTMLDivElement {
        const changeProductQuantity = document.createElement('div');
        changeProductQuantity.className = 'shoppingcart__change-quantity';

        const productStockWrapper = this.createProductStockWrapper(product);
        changeProductQuantity.append(productStockWrapper);

        const productAddWrapper = this.createProductAddWrapper(productsCount, product.id);
        changeProductQuantity.append(productAddWrapper);

        const cost = document.createElement('div');
        cost.className = 'cost';
        cost.textContent = `€${product.price * productsCount}`;
        changeProductQuantity.append(cost);

        return changeProductQuantity;
    }

    private createProductStockWrapper(product: Product): HTMLDivElement {
        const ProductAddWrapper = document.createElement('div');
        ProductAddWrapper.className = 'shoppingcart__wrapper-stock';

        const titleStock = document.createElement('div');
        titleStock.className = 'shoppingcart__title-stock';
        titleStock.textContent = 'Stock:';
        ProductAddWrapper.append(titleStock);

        const stock = document.createElement('div');
        stock.className = 'shoppingcart__stock';
        stock.textContent = product.stock.toString();
        ProductAddWrapper.append(stock);

        return ProductAddWrapper;
    }

    private createProductAddWrapper(productCount: number, id: number): HTMLDivElement {
        const productAddWrapper = document.createElement('div');
        productAddWrapper.className = 'shoppingcart__wrapper-add-product';

        const addProduct = document.createElement('button');
        addProduct.className = 'add-product';
        addProduct.textContent = '+';
        addProduct.addEventListener('click', () => this.shoppingCartController?.addItemToShoppingCart(id));
        productAddWrapper.append(addProduct);

        const displayQuantity = document.createElement('div');
        displayQuantity.className = 'display-quantity';
        displayQuantity.textContent = productCount.toString();
        productAddWrapper.append(displayQuantity);

        const deleteProduct = document.createElement('button');
        deleteProduct.className = 'delete-product';
        deleteProduct.textContent = '-';
        deleteProduct.addEventListener('click', () => this.shoppingCartController?.deleteItemFromShoppingCart(id));
        productAddWrapper.append(deleteProduct);

        return productAddWrapper;
    }

    private createSummaryWrapper(shoppingCart: ShoppingCart): HTMLDivElement {
        const summaryWrapper = document.createElement('div');
        summaryWrapper.className = 'shoppingcart__wrapper-summary';

        const summaryText = document.createElement('div');
        summaryText.className = 'shoppingcart__summary';
        summaryText.textContent = 'Summary';
        summaryWrapper.append(summaryText);

        const summary = this.createSummary(shoppingCart);
        summaryWrapper.append(summary);

        return summaryWrapper;
    }

    private createSummary(shoppingCart: ShoppingCart): HTMLDivElement {
        const displayCart = document.createElement('div');
        displayCart.className = 'shoppingcart__display-cart';

        const productsWrapper = this.createProductTotalCountWrapper(shoppingCart);
        displayCart.append(productsWrapper);

        const totalWrapper = this.createProductsTotalPrice(shoppingCart);
        displayCart.append(totalWrapper);

        const enterCode = document.createElement('input');
        enterCode.className = 'enter-code';
        enterCode.type = 'text';
        enterCode.placeholder = 'Enter promo code';
        displayCart.append(enterCode);

        const examplePromo = document.createElement('div');
        examplePromo.className = 'example-promo';
        examplePromo.textContent = "Promo for test: 'RS', 'EPM'";
        displayCart.append(examplePromo);

        const btnBuyNow = document.createElement('button');
        btnBuyNow.className = 'btn-buy-now';
        btnBuyNow.textContent = 'buy now';
        btnBuyNow.addEventListener('click', () => {
            this.createModalWrapper();
        });
        displayCart.append(btnBuyNow);

        return displayCart;
    }

    private createProductTotalCountWrapper(shoppingCart: ShoppingCart): HTMLDivElement {
        const productsWrapper = document.createElement('div');
        productsWrapper.className = 'shoppingcart__wrapper-products';

        const shoppingcartSummary = document.createElement('div');
        shoppingcartSummary.className = 'shoppingcart__products';
        shoppingcartSummary.textContent = 'Products:';
        productsWrapper.append(shoppingcartSummary);

        const productsAmount = document.createElement('div');
        productsAmount.className = 'shoppingcart__products-amount';
        productsAmount.textContent = shoppingCart.productsCount.toString();
        productsWrapper.append(productsAmount);

        return productsWrapper;
    }

    private createProductsTotalPrice(shoppingCart: ShoppingCart): HTMLDivElement {
        const totalWrapper = document.createElement('div');
        totalWrapper.className = 'shoppingcart__display-total-cost';

        const titleTotal = document.createElement('div');
        titleTotal.className = 'shoppingcart__title-total';
        titleTotal.textContent = 'Total:';
        totalWrapper.append(titleTotal);

        const totalCost = document.createElement('div');
        totalCost.className = 'shoppingcart__total-cost';
        totalCost.textContent = `€${shoppingCart.totalPrice}`;
        totalWrapper.append(totalCost);

        return totalWrapper;
    }
}
