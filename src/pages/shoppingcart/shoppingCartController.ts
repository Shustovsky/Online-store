import { ShoppingCartView } from './shoppingCartView';
import { ShoppingcartService } from './shoppingcartService';
import { HeaderView } from '../components/headerView';
import { ShoppingcartValidator } from './shoppingcartValidationServise';

export class ShoppingCartController {
    shoppingcartService: ShoppingcartService;
    shoppingcartValidator: ShoppingcartValidator;
    shoppingCartView: ShoppingCartView;
    headerView: HeaderView;

    constructor(
        shoppingcartService: ShoppingcartService,
        shoppingcartValidator: ShoppingcartValidator,
        shoppingCartView: ShoppingCartView,
        headerView: HeaderView
    ) {
        this.shoppingcartService = shoppingcartService;
        this.shoppingcartValidator = shoppingcartValidator;
        this.shoppingCartView = shoppingCartView;
        this.headerView = headerView;
    }

    drawPage(): void {
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.shoppingCartView.renderShoppingCart(shoppingCart);
    }

    addItemToShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.addItem(productId);
        this.shoppingCartView.onShoppingCardChange(shoppingCart);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    deleteItemFromShoppingCart(productId: number): void {
        const shoppingCart = this.shoppingcartService.deleteItem(productId);
        this.shoppingCartView.onShoppingCardChange(shoppingCart);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    clearShoppingCart() {
        const shoppingCart = this.shoppingcartService.clearShoppingCart();
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    validateName(name: string): boolean {
        if (this.shoppingcartValidator.validateName(name)) {
            this.shoppingCartView.deleteNameError();
            return true;
        } else {
            this.shoppingCartView.createNameError();
            return false;
        }
    }

    validatePhone(phoneNumber: string): boolean {
        if (this.shoppingcartValidator.validatePhoneNumber(phoneNumber)) {
            this.shoppingCartView.deletePhoneNumberError();
            return true;
        } else {
            this.shoppingCartView.createPhoneNumberError();
            return false;
        }
    }

    validateAddress(address: string): boolean {
        if (this.shoppingcartValidator.validateAddress(address)) {
            this.shoppingCartView.deleteAddressError();
            return true;
        } else {
            this.shoppingCartView.createAddressError();
            return false;
        }
    }

    validateEmail(email: string): boolean {
        if (this.shoppingcartValidator.validateEmail(email)) {
            this.shoppingCartView.deleteEmailError();
            return true;
        } else {
            this.shoppingCartView.createEmailError();
            return false;
        }
    }

    validateCartNumber(cartNumber: string): boolean {
        if (this.shoppingcartValidator.validateCartNumber(cartNumber)) {
            this.shoppingCartView.deleteModalCartNumberError();
            return true;
        } else {
            this.shoppingCartView.createModalCartNumberError();
            return false;
        }
    }

    validateThru(thru: string): boolean {
        if (this.shoppingcartValidator.validateThru(thru)) {
            this.shoppingCartView.deleteThruError();
            return true;
        } else {
            this.shoppingCartView.createThruError();
            return false;
        }
    }

    validateCvv(cvv: string): boolean {
        if (this.shoppingcartValidator.validateCVV(cvv)) {
            this.shoppingCartView.deleteCvvError();
            return true;
        } else {
            this.shoppingCartView.createCvvError();
            return false;
        }
    }

    checkPromoCode(promoCodeValue: string) {
        const promoCode = this.shoppingcartService.getPromoCode(promoCodeValue);
        if (promoCode) {
            this.shoppingCartView.removeAddPromoCodeBlock();
            this.shoppingCartView.createAddPromoCodeBlock(promoCode);
        } else {
            this.shoppingCartView.removeAddPromoCodeBlock();
        }
    }

    applyPromoCode(promoCodeValue: string) {
        this.shoppingcartService.applyPromoCode(promoCodeValue);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.shoppingCartView.onPromoCodeChange(shoppingCart);
        this.headerView.onShoppingCardChange(shoppingCart);
    }

    removePromoCode(promoCodeValue: string) {
        this.shoppingcartService.removePromoCode(promoCodeValue);
        const shoppingCart = this.shoppingcartService.getShoppingCart();
        this.shoppingCartView.onPromoCodeChange(shoppingCart);
        this.headerView.onShoppingCardChange(shoppingCart);
    }
}
