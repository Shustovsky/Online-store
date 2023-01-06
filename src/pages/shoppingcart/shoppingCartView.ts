import { Product } from '../../model/product';
import { PromoCode, ShoppingCart } from '../../model/shoppingCart';
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
        modalBtn.addEventListener('click', () => {
            const name = document.getElementById('personalName') as HTMLInputElement;
            const isValidName = this.shoppingCartController?.validateName(name.value);

            const phoneNumber = document.getElementById('phoneNumber') as HTMLInputElement;
            const isValidPhoneNumber = this.shoppingCartController?.validatePhone(phoneNumber.value);

            const address = document.getElementById('address') as HTMLInputElement;
            const isValidAddress = this.shoppingCartController?.validateAddress(address.value);

            const email = document.getElementById('email') as HTMLInputElement;
            const isValidEmail = this.shoppingCartController?.validateEmail(email.value);

            const cartNumber = document.querySelector('.shoppingcart__cart-number') as HTMLInputElement;
            const isValidCartNumber = this.shoppingCartController?.validateCartNumber(cartNumber.value);

            const thru = document.querySelector('.shoppingcart__valid-thru') as HTMLInputElement;
            const isValidThru = this.shoppingCartController?.validateThru(thru.value);

            const cvv = document.querySelector('.shoppingcart__valid-code') as HTMLInputElement;
            const isValidCvv = this.shoppingCartController?.validateCvv(cvv.value);

            if (
                isValidName &&
                isValidPhoneNumber &&
                isValidAddress &&
                isValidEmail &&
                isValidCartNumber &&
                isValidThru &&
                isValidCvv
            ) {
                modalPersonalDetails.remove();
                modalCartDetails.remove();
                modalBtn.remove();

                const modalConfirm = document.createElement('div');
                modalConfirm.className = 'shoppingcart__modal-confirm';
                modalConfirm.textContent = 'your order has been placed';

                modal.append(modalConfirm);

                setTimeout(() => {
                    this.shoppingCartController?.clearShoppingCart();
                    this.closeModalWrapper();
                    window.location.href = '#catalog';
                }, 3000);
            }
        });

        modal.append(modalPersonalDetails);
        modal.append(modalCartDetails);
        modal.append(modalBtn);
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

        this.createNameItem(modalPersonalDetails);
        this.createPhoneNumItem(modalPersonalDetails);
        this.createAddressItem(modalPersonalDetails);
        this.createEmailItem(modalPersonalDetails);

        return modalPersonalDetails;
    }

    private createNameItem(modalPersonalDetails: HTMLElement): HTMLElement {
        const formDetail = document.createElement('div');
        formDetail.className = 'shoppingcart__form-detail name';

        const formItem = document.createElement('input');
        formItem.className = 'shoppingcart__form-item';
        formItem.type = 'text';
        formItem.placeholder = 'Name';
        formItem.id = 'personalName';
        formItem.addEventListener('blur', (ev) => {
            const target = ev.target as HTMLInputElement;
            this.shoppingCartController?.validateName(target.value);
        });

        formDetail.append(formItem);
        modalPersonalDetails.append(formDetail);

        return modalPersonalDetails;
    }

    private createPhoneNumItem(modalPersonalDetails: HTMLElement): HTMLElement {
        const formDetail = document.createElement('div');
        formDetail.className = 'shoppingcart__form-detail phoneNumber';

        const formItem = document.createElement('input');
        formItem.className = 'shoppingcart__form-item';
        formItem.type = 'text';
        formItem.placeholder = 'Phone number';
        formItem.id = 'phoneNumber';

        formItem.addEventListener('input', (ev) => {
            const target = ev.target as HTMLInputElement;
            let value = target.value;
            value = value.replace(/[^0-9+]/, '');
            target.value = value;
            if (value.length > 10) {
                target.value = value.slice(0, -1);
            }
        });

        formItem.addEventListener('blur', (ev) => {
            const target = ev.target as HTMLInputElement;
            this.shoppingCartController?.validatePhone(target.value);
        });

        formDetail.append(formItem);
        modalPersonalDetails.append(formDetail);

        return modalPersonalDetails;
    }

    private createAddressItem(modalPersonalDetails: HTMLElement): HTMLElement {
        const formDetail = document.createElement('div');
        formDetail.className = 'shoppingcart__form-detail address';

        const formItem = document.createElement('input');
        formItem.className = 'shoppingcart__form-item';
        formItem.type = 'text';
        formItem.placeholder = 'Delivery address';
        formItem.id = 'address';
        formItem.addEventListener('blur', (ev) => {
            const target = ev.target as HTMLInputElement;
            this.shoppingCartController?.validateAddress(target.value);
        });

        formDetail.append(formItem);
        modalPersonalDetails.append(formDetail);

        return modalPersonalDetails;
    }

    private createEmailItem(modalPersonalDetails: HTMLElement): HTMLElement {
        const formDetail = document.createElement('div');
        formDetail.className = 'shoppingcart__form-detail email';

        const formItem = document.createElement('input');
        formItem.className = 'shoppingcart__form-item';
        formItem.type = 'text';
        formItem.placeholder = 'E-mail';
        formItem.id = 'email';
        formItem.addEventListener('blur', (ev) => {
            const target = ev.target as HTMLInputElement;
            this.shoppingCartController?.validateEmail(target.value);
        });

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
        cartImg.src = './assets/icons/no-logo.webp';
        const cartNumber = document.createElement('input');
        cartNumber.className = 'shoppingcart__cart-number';
        cartNumber.type = 'text';
        cartNumber.placeholder = 'Cart number';

        cartNumber.addEventListener('input', (ev) => {
            const target = ev.target as HTMLInputElement;
            const value = target.value;
            if (value[0] === '3') {
                cartImg.src = './assets/icons/ae-logo.jpg';
            } else if (value[0] === '4') {
                cartImg.src = './assets/icons/visa-logo.png';
            } else if (value[0] === '5') {
                cartImg.src = './assets/icons/mc-logo.svg';
            } else {
                cartImg.src = './assets/icons/no-logo.webp';
            }
        });

        cartNumber.addEventListener('input', (ev) => {
            const target = ev.target as HTMLInputElement;
            let value = target.value;
            value = value.replace(/[^0-9]/, '');
            target.value = value;
            if (value.length > 16) {
                target.value = value.slice(0, -1);
            }
        });

        cartNumber.addEventListener('blur', (ev) => {
            const target = ev.target as HTMLInputElement;
            this.shoppingCartController?.validateCartNumber(target.value);
        });

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
        validThru.addEventListener('input', (ev) => {
            const target = ev.target as HTMLInputElement;
            let value = target.value;
            value = value.replace(/[^0-9/]/gi, '');
            target.value = value;
            if (value.length <= 5) {
                if (value.length === 2) {
                    value = value + '/';
                    target.value = value;
                }
            } else {
                target.value = value.slice(0, -1);
            }
        });
        validThru.addEventListener('blur', (ev) => {
            const target = ev.target as HTMLInputElement;
            this.shoppingCartController?.validateThru(target.value);
        });

        const validCode = document.createElement('input');
        validCode.className = 'shoppingcart__valid-code';
        validCode.type = 'text';
        validCode.placeholder = 'Code';

        validCode.addEventListener('input', (ev) => {
            const target = ev.target as HTMLInputElement;
            let value = target.value;
            value = value.replace(/[^0-9/]/gi, '');
            target.value = value;
            if (value.length > 3) {
                target.value = value.slice(0, -1);
            }
        });
        validCode.addEventListener('blur', (ev) => {
            const target = ev.target as HTMLInputElement;
            this.shoppingCartController?.validateCvv(target.value);
        });

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

        const deleteProduct = document.createElement('button');
        deleteProduct.className = 'delete-product';
        deleteProduct.textContent = '-';
        deleteProduct.addEventListener('click', () => this.shoppingCartController?.deleteItemFromShoppingCart(id));
        productAddWrapper.append(deleteProduct);

        const displayQuantity = document.createElement('div');
        displayQuantity.className = 'display-quantity';
        displayQuantity.textContent = productCount.toString();
        productAddWrapper.append(displayQuantity);

        const addProduct = document.createElement('button');
        addProduct.className = 'add-product';
        addProduct.textContent = '+';
        addProduct.addEventListener('click', () => this.shoppingCartController?.addItemToShoppingCart(id));
        productAddWrapper.append(addProduct);

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
        if (shoppingCart.totalPrice !== shoppingCart.totalPriceWithDiscount) {
            const withoutDiscount = this.createProductsTotalPriceWithoutDiscount(shoppingCart);
            displayCart.append(withoutDiscount);
        }

        if (shoppingCart.promoCodes.length > 0) {
            const appliedCodesWrapper = this.createAppliedCodesWrapper(shoppingCart);
            displayCart.append(appliedCodesWrapper);
        }

        const enterCode = document.createElement('input');
        enterCode.className = 'enter-code';
        enterCode.type = 'text';
        enterCode.placeholder = 'Enter promo code';
        enterCode.addEventListener('input', (ev) => {
            const target = ev.target as HTMLInputElement;
            this.shoppingCartController?.checkPromoCode(target.value.toUpperCase());
        });
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
        totalCost.textContent = `€${shoppingCart.totalPriceWithDiscount}`;
        totalWrapper.append(totalCost);

        return totalWrapper;
    }

    private createProductsTotalPriceWithoutDiscount(shoppingCart: ShoppingCart): HTMLDivElement {
        const totalWrapper = document.createElement('div');
        totalWrapper.className = 'shoppingcart__display-total-cost';

        const titleTotal = document.createElement('div');
        titleTotal.className = 'shoppingcart__title-total';
        titleTotal.textContent = 'Total:';
        totalWrapper.append(titleTotal);

        const totalCost = document.createElement('div');
        totalCost.className = 'shoppingcart__total-cost cross-total-cost';
        totalCost.textContent = `€${shoppingCart.totalPrice}`;
        totalWrapper.append(totalCost);

        return totalWrapper;
    }

    public createNameError(): void {
        if (!document.querySelector('.name-error')) {
            const name = document.querySelector('.name') as HTMLElement;
            const error = document.createElement('div');
            error.className = 'error-massage name-error';
            error.textContent = 'error';
            name.append(error);
        }
    }

    public deleteNameError(): void {
        const nameError = document.querySelector('.name-error') as HTMLElement;
        nameError?.remove();
    }

    public createPhoneNumberError(): void {
        if (!document.querySelector('.phone-number-error')) {
            const phoneNumber = document.querySelector('.phoneNumber') as HTMLElement;
            const error = document.createElement('div');
            error.className = 'error-massage phone-number-error';
            error.textContent = 'error';
            phoneNumber.append(error);
        }
    }

    public deletePhoneNumberError(): void {
        const phoneNumberError = document.querySelector('.phone-number-error') as HTMLElement;
        phoneNumberError?.remove();
    }

    public createAddressError(): void {
        if (!document.querySelector('.address-error')) {
            const address = document.querySelector('.address') as HTMLElement;
            const error = document.createElement('div');
            error.className = 'error-massage address-error';
            error.textContent = 'error';
            address.append(error);
        }
    }

    public deleteAddressError(): void {
        const phoneNumberError = document.querySelector('.address-error') as HTMLElement;
        phoneNumberError?.remove();
    }

    public createEmailError(): void {
        if (!document.querySelector('.email-error')) {
            const email = document.querySelector('.email') as HTMLElement;
            const error = document.createElement('div');
            error.className = 'error-massage email-error';
            error.textContent = 'error';
            email.append(error);
        }
    }

    public deleteEmailError(): void {
        const emailError = document.querySelector('.email-error') as HTMLElement;
        emailError?.remove();
    }

    public createModalCartNumberError(): void {
        if (!document.querySelector('.cart-number-error')) {
            const modalCartDetails = document.querySelector('.shoppingcart__modal-cart-details') as HTMLElement;
            const cartNumber = document.createElement('div');
            cartNumber.className = 'error-massage cart-number-error';
            cartNumber.textContent = 'Cart number - error';
            modalCartDetails.append(cartNumber);
        }
    }

    public deleteModalCartNumberError(): void {
        const emailError = document.querySelector('.cart-number-error') as HTMLElement;
        emailError?.remove();
    }

    public createThruError(): void {
        if (!document.querySelector('.thru-error')) {
            const modalCartDetails = document.querySelector('.shoppingcart__modal-cart-details') as HTMLElement;
            const thruError = document.createElement('div');
            thruError.className = 'error-massage thru-error';
            thruError.textContent = 'Card valid thru - error';
            modalCartDetails.append(thruError);
        }
    }

    public deleteThruError(): void {
        const thruError = document.querySelector('.thru-error') as HTMLElement;
        thruError?.remove();
    }

    public createCvvError(): void {
        if (!document.querySelector('.cvv-error')) {
            const modalCartDetails = document.querySelector('.shoppingcart__modal-cart-details') as HTMLElement;
            const cvvError = document.createElement('div');
            cvvError.className = 'error-massage cvv-error';
            cvvError.textContent = 'Card CVV - error';
            modalCartDetails.append(cvvError);
        }
    }

    public deleteCvvError(): void {
        const cvvError = document.querySelector('.cvv-error') as HTMLElement;
        cvvError?.remove();
    }

    public removeAddPromoCodeBlock() {
        document.querySelector('.shoppingcart__res-promo-wrapper')?.remove();
    }

    public createAddPromoCodeBlock(promoCode: PromoCode): void {
        const enterCode = document.querySelector('.enter-code') as HTMLInputElement;

        const resPromoWrapper = document.createElement('div');
        resPromoWrapper.className = 'shoppingcart__res-promo-wrapper';

        const resPromo = document.createElement('div');
        resPromo.className = 'shoppingcart__res-promo';
        resPromo.textContent = `${promoCode.description} - ${promoCode.discountPercent * 100}%`;

        const btnResPromo = document.createElement('button');
        btnResPromo.className = 'shoppingcart__btn-res-promo';
        btnResPromo.textContent = 'add';
        btnResPromo.addEventListener('click', () => this.shoppingCartController?.applyPromoCode(promoCode.value));

        resPromoWrapper.append(resPromo);
        resPromoWrapper.append(btnResPromo);

        enterCode.after(resPromoWrapper);
    }

    public onPromoCodeChange(shoppingCart: ShoppingCart): void {
        this.createNewProductsTotalPrice(shoppingCart);
        this.removeAddPromoCodeBlock();

        document.querySelector('.shoppingcart__applied-codes-wrapper')?.remove();
        if (shoppingCart.promoCodes.length > 0) {
            const inputPromoCode = document.querySelector('.enter-code') as HTMLInputElement;
            const appliedCodesWrapper = this.createAppliedCodesWrapper(shoppingCart);
            inputPromoCode.before(appliedCodesWrapper);
        }
    }

    private createAppliedCodesWrapper(shoppingCart: ShoppingCart): HTMLDivElement {
        const appliedCodesWrapper = document.createElement('div');
        appliedCodesWrapper.className = 'shoppingcart__applied-codes-wrapper';

        const appliedCodesTitle = document.createElement('div');
        appliedCodesTitle.className = 'shoppingcart__applied-codes-title';
        appliedCodesTitle.textContent = 'Applied codes';
        appliedCodesWrapper.append(appliedCodesTitle);

        shoppingCart.promoCodes.forEach((promoCode) => {
            const appliedCodeItem = this.createAppliedCodeItem(promoCode);
            appliedCodesWrapper.append(appliedCodeItem);
        });

        return appliedCodesWrapper;
    }

    private createNewProductsTotalPrice(shoppingCart: ShoppingCart): void {
        document.querySelectorAll('.shoppingcart__display-total-cost').forEach((value) => value.remove());

        const productCountWrapper = document.querySelector('.shoppingcart__wrapper-products') as HTMLDivElement;
        const totalWrapper = this.createProductsTotalPrice(shoppingCart);
        productCountWrapper.after(totalWrapper);
        if (shoppingCart.totalPrice !== shoppingCart.totalPriceWithDiscount) {
            const withoutDiscount = this.createProductsTotalPriceWithoutDiscount(shoppingCart);
            totalWrapper.before(withoutDiscount);
        }
    }

    public createAppliedCodeItem(promoCode: PromoCode): HTMLDivElement {
        const appliedCodeItem = document.createElement('div');
        appliedCodeItem.className = 'shoppingcart__applied-code-item';

        const appliedCodeTitle = document.createElement('div');
        appliedCodeTitle.className = 'shoppingcart__applied-code-title';
        appliedCodeTitle.textContent = `${promoCode.description} - ${promoCode.discountPercent * 100}%`;

        const appliedCodeBtn = document.createElement('button');
        appliedCodeBtn.className = 'shoppingcart__applied-code-btn';
        appliedCodeBtn.textContent = 'drop';
        appliedCodeBtn.addEventListener('click', () => this.shoppingCartController?.removePromoCode(promoCode.value));

        appliedCodeItem.append(appliedCodeTitle);
        appliedCodeItem.append(appliedCodeBtn);

        return appliedCodeItem;
    }
}
