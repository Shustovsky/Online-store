import { ShoppingCart } from '../../model/shoppingCart';

export class HeaderView {
    public createHeader(shoppingCart: ShoppingCart): void {
        const body = document.body;
        const header = document.createElement('header');
        header.className = 'header';
        body.prepend(header);

        const container = document.createElement('div');
        container.className = 'container';
        header.append(container);

        const headerContainer = document.createElement('div');
        headerContainer.className = 'header_container';
        container.append(headerContainer);

        const logoBlock = this.createLogo();
        headerContainer.append(logoBlock);

        const priceBlock = this.createPrice(shoppingCart);
        headerContainer.append(priceBlock);

        const cartBlock = this.createCart(shoppingCart);
        headerContainer.append(cartBlock);
    }

    public onShoppingCardChange(shoppingCart: ShoppingCart) {
        const priceNumb = document.querySelector('.price_numb');
        if (priceNumb) {
            priceNumb.innerHTML = `€ ${shoppingCart.totalPriceWithDiscount}`;
        }

        const cartCount = document.querySelector('.cart_count');
        if (cartCount) {
            cartCount.innerHTML = `${shoppingCart.productsCount}`;
        }
    }

    private createLogo(): HTMLDivElement {
        const logo = document.createElement('div');
        logo.className = 'logo';

        const logoImg = document.createElement('img');
        logoImg.className = 'logo_img';
        logoImg.src = './assets/icons/logo-man.png';
        logoImg.alt = 'logo man';
        logo.append(logoImg);

        const logoName = document.createElement('a');
        logoName.className = 'logo_name';
        logoName.href = window.location.origin;
        logo.append(logoName);

        const logoHeading = document.createElement('h1');
        logoHeading.innerHTML = 'Online Store';
        logoName.append(logoHeading);

        return logo;
    }

    private createPrice(shoppingCart: ShoppingCart): HTMLDivElement {
        const price = document.createElement('div');
        price.className = 'price';

        const priceText = document.createElement('div');
        priceText.className = 'price_text';
        priceText.innerHTML = 'ShoppingCart total:';
        price.append(priceText);

        const priceNumb = document.createElement('div');
        priceNumb.className = 'price_numb';
        priceNumb.innerHTML = `€ ${shoppingCart.totalPriceWithDiscount}`;
        price.append(priceNumb);

        return price;
    }

    private createCart(shoppingCart: ShoppingCart): HTMLDivElement {
        const cart = document.createElement('div');
        cart.className = 'cart';
        cart.onclick = function () {
            window.location.href = `${window.location.origin}/#shoppingcart`;
        };

        const cartImg = document.createElement('img');
        cartImg.className = 'cart_img';
        cartImg.src = './assets/icons/cart.png';
        cartImg.alt = 'cart';
        cart.append(cartImg);

        const cartCount = document.createElement('p');
        cartCount.className = 'cart_count';
        cartCount.innerHTML = `${shoppingCart.productsCount}`;
        cart.append(cartCount);

        return cart;
    }
}
