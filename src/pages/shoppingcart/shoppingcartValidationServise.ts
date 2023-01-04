export class ShoppingcartValidator {
    private readonly PHONE_REGEX = new RegExp(/^[0-9]+/);
    private readonly EMAIL_REGEX = new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    );
    private readonly CART_NUMBER_REGEXP = new RegExp(/[0-9]+/);
    private readonly THRU_REGEXP = new RegExp(/^[0-9]{2}\/[0-9]{2}$/);
    private readonly CVV_REGEX = new RegExp(/[0-9]{3}/);

    public validateName(name: string): boolean {
        if (!name) {
            return false;
        }

        const nameArr = name.split(' ');
        if (nameArr.length < 2) {
            return false;
        }

        for (let i = 0; i < nameArr.length; i++) {
            const item = nameArr[i];
            if (!item || item.length < 3) {
                return false;
            }
        }

        return true;
    }

    public validatePhoneNumber(phoneNumber: string): boolean {
        if (!phoneNumber) {
            return false;
        }
        if (phoneNumber[0] !== '+') {
            return false;
        }
        phoneNumber = phoneNumber.slice(1);
        if (!this.PHONE_REGEX.test(phoneNumber)) {
            return false;
        }
        return phoneNumber.length === 9;
    }

    public validateAddress(address: string): boolean {
        if (!address) {
            return false;
        }

        const addressArr = address.split(' ');
        if (addressArr.length < 3) {
            return false;
        }

        for (let i = 0; i < addressArr.length; i++) {
            const item = addressArr[i];
            if (!item || item.length < 5) {
                return false;
            }
        }

        return true;
    }

    public validateEmail(email: string): boolean {
        if (!email) {
            return false;
        }

        return this.EMAIL_REGEX.test(String(email).toLowerCase());
    }

    public validateCartNumber(cartNumber: string): boolean {
        if (!cartNumber) {
            return false;
        }
        cartNumber = cartNumber.replace(/ /gi, '');
        if (cartNumber.length !== 16) {
            return false;
        }
        return this.CART_NUMBER_REGEXP.test(cartNumber);
    }

    public validateThru(thru: string): boolean {
        if (!thru) {
            return false;
        }

        if (!this.THRU_REGEXP.test(thru)) {
            return false;
        }

        const mount = +thru.slice(0, 2);
        const year = +thru.slice(3);

        if (mount > 12) {
            return false;
        }
        return year >= 23;
    }

    public validateCVV(cvv: string): boolean {
        if (!cvv) {
            return false;
        }
        if (cvv.length > 3) {
            return false;
        }
        return this.CVV_REGEX.test(cvv);
    }
}
