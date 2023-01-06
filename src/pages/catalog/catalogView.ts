import { Product } from '../../model/product';
import { CatalogController } from './catalogController';
import { Filter } from '../../model/Filter';
import { ShoppingCart } from '../../model/shoppingCart';

export class CatalogView {
    catalogController: CatalogController | null;

    constructor(catalogController: CatalogController | null) {
        this.catalogController = catalogController;
    }

    public createCatalog(products: Product[], filter: Filter, userFilter: Filter, shoppingCart: ShoppingCart): void {
        const header = document.querySelector('.header') as HTMLElement;

        const main = document.createElement('main');
        header.after(main);

        const container = document.createElement('div');
        container.className = 'container';
        main.append(container);

        const mainContainer = document.createElement('div');
        mainContainer.className = 'main_container';
        container.append(mainContainer);

        const filters = this.createFilters(filter, userFilter);
        mainContainer.append(filters);

        const productsWrapper = document.createElement('div');
        productsWrapper.className = 'products';
        mainContainer.append(productsWrapper);

        const productsSort = this.createSortBlock(userFilter);
        productsWrapper.append(productsSort);

        const productsItems = document.createElement('div');
        productsItems.className = 'products__items products__items-grid';
        productsWrapper.append(productsItems);

        products.forEach((item) => productsItems.append(this.createItems(item, shoppingCart)));
    }

    private createFilters(filter: Filter, userFilter: Filter): HTMLDivElement {
        const filters = document.createElement('div');
        filters.className = 'filters';

        const filtersButtons = document.createElement('div');
        filtersButtons.className = 'filters__buttons';
        filters.append(filtersButtons);

        const btnReset = this.createResetBtn();
        filtersButtons.append(btnReset);

        const btnCopy = this.createCopyBtn();
        filtersButtons.append(btnCopy);

        const categoryFilter = this.createCategoryFilter(filter, userFilter);
        const brandFilter = this.createBrandFilter(filter, userFilter);
        filters.append(categoryFilter);
        filters.append(brandFilter);

        const priceFilter = this.createPriceFilter(filter, userFilter);
        const stockFilter = this.createStockFilter(filter, userFilter);
        filters.append(priceFilter);
        filters.append(stockFilter);

        return filters;
    }

    private createResetBtn(): HTMLButtonElement {
        const btn = document.createElement('button');
        btn.id = `btn_reset`;
        btn.className = 'filters__buttons_btn';
        btn.innerHTML = 'Reset';
        btn.addEventListener('click', () => this.catalogController?.urlReset());

        return btn;
    }

    private createCopyBtn(): HTMLButtonElement {
        const btn = document.createElement('button');
        btn.id = `btn_copy`;
        btn.className = 'filters__buttons_btn';
        btn.innerHTML = 'Copy';
        btn.addEventListener('click', () => {
            this.catalogController?.urlCopy();
            btn.classList.add('filters__buttons_btn-active');
            btn.innerHTML = 'Copied!';
            setTimeout(() => {
                btn.classList.remove('filters__buttons_btn-active');
                btn.innerHTML = 'Copy';
            }, 1000);
        });

        return btn;
    }

    private createCategoryFilter(filter: Filter, userFilter: Filter): HTMLDivElement {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = `filters__category`;

        const filtersCheckbox = document.createElement('fieldset');
        filtersCheckbox.className = 'filters-checkbox';
        filtersCategory.append(filtersCheckbox);

        const legend = document.createElement('legend');
        legend.innerHTML = 'Category';
        filtersCheckbox.append(legend);
        filter.categories.forEach((item) => {
            const div = document.createElement('div');
            filtersCheckbox.append(div);

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `${item}`;
            input.name = `${item}`;
            if (userFilter.categories.includes(item)) {
                input.checked = true;
            }
            div.append(input);
            input.addEventListener('click', () => this.catalogController?.onCategoryFilterChange(item));

            const label = document.createElement('label');
            label.setAttribute('for', `${item}`);
            label.innerHTML = `${item}`;
            div.append(label);
        });

        return filtersCategory;
    }

    private createBrandFilter(filter: Filter, userFilter: Filter): HTMLDivElement {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = `filters__brand`;

        const filtersCheckbox = document.createElement('fieldset');
        filtersCheckbox.className = 'filters-checkbox';
        filtersCategory.append(filtersCheckbox);

        const legend = document.createElement('legend');
        legend.innerHTML = 'Brand';
        filtersCheckbox.append(legend);

        filter.brandes.forEach((item) => {
            const div = document.createElement('div');
            filtersCheckbox.append(div);

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `${item}`;
            input.name = `${item}`;
            if (userFilter.brandes.includes(item)) {
                input.checked = true;
            }
            div.append(input);
            input.addEventListener('click', () => this.catalogController?.onBrandFilterChange(item));

            const label = document.createElement('label');
            label.setAttribute('for', `${item}`);
            label.innerHTML = `${item}`;
            div.append(label);
        });

        return filtersCategory;
    }

    private createPriceFilter(filter: Filter, userFilter: Filter): HTMLDivElement {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = 'filters__price';

        const filtersRange = document.createElement('fieldset');
        filtersRange.className = 'filters-range';
        filtersCategory.append(filtersRange);

        const legendPrice = document.createElement('legend');
        legendPrice.innerHTML = 'Price';
        filtersRange.append(legendPrice);

        const filterValue = document.createElement('div');
        filterValue.className = 'filters-range_value';
        filtersRange.append(filterValue);

        const div = document.createElement('div');
        filtersRange.append(div);

        const inputLower = document.createElement('input');
        inputLower.className = 'input-range lower';
        inputLower.type = 'range';
        inputLower.min = `${filter.minPrice}`;
        inputLower.max = `${filter.maxPrice}`;
        inputLower.value = userFilter.minPrice > 0 ? `${userFilter.minPrice}` : inputLower.min;

        div.append(inputLower);

        const inputUpper = document.createElement('input');
        inputUpper.className = 'input-range upper';
        inputUpper.type = 'range';
        inputUpper.min = `${filter.minPrice}`;
        inputUpper.max = `${filter.maxPrice}`;
        inputUpper.value = userFilter.maxPrice > 0 ? `${userFilter.maxPrice}` : inputUpper.max;

        div.append(inputUpper);

        filterValue.innerHTML = `${inputLower.value} - ${inputUpper.value}`;

        inputLower.oninput = (): void => {
            const lowerVal = parseInt(inputLower.value);
            const upperVal = parseInt(inputUpper.value);

            if (lowerVal < upperVal) {
                filterValue.innerHTML = `${lowerVal} - ${upperVal}`;
                this.catalogController?.onPriceLowerFilterChange(inputLower.value);
            } else {
                filterValue.innerHTML = `${upperVal} - ${lowerVal}`;
                this.catalogController?.onPriceUpperFilterChange(inputLower.value);
                this.catalogController?.onPriceLowerFilterChange(inputUpper.value);
            }
        };
        inputUpper.oninput = (): void => {
            const lowerVal = parseInt(inputLower.value);
            const upperVal = parseInt(inputUpper.value);

            if (lowerVal < upperVal) {
                filterValue.innerHTML = `${lowerVal} - ${upperVal}`;
                this.catalogController?.onPriceUpperFilterChange(inputUpper.value);
            } else {
                filterValue.innerHTML = `${upperVal} - ${lowerVal}`;
                this.catalogController?.onPriceUpperFilterChange(inputLower.value);
                this.catalogController?.onPriceLowerFilterChange(inputUpper.value);
            }
        };

        return filtersCategory;
    }

    private createStockFilter(filter: Filter, userFilter: Filter): HTMLDivElement {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = 'filters__stock';

        const filtersRange = document.createElement('fieldset');
        filtersRange.className = 'filters-range';
        filtersCategory.append(filtersRange);

        const legend = document.createElement('legend');
        legend.innerHTML = 'Stock';
        filtersRange.append(legend);

        const filterValue = document.createElement('div');
        filterValue.className = 'filters-range_value';
        filtersRange.append(filterValue);

        const div = document.createElement('div');
        filtersRange.append(div);

        const inputLower = document.createElement('input');
        inputLower.className = 'input-range lower';
        inputLower.type = 'range';
        inputLower.min = `${filter.minStock}`;
        inputLower.max = `${filter.maxStock}`;
        inputLower.value = userFilter.minStock > 0 ? `${userFilter.minStock}` : inputLower.min;

        div.append(inputLower);

        const inputUpper = document.createElement('input');
        inputUpper.className = 'input-range upper';
        inputUpper.type = 'range';
        inputUpper.min = `${filter.minStock}`;
        inputUpper.max = `${filter.maxStock}`;
        inputUpper.value = userFilter.maxStock > 0 ? `${userFilter.maxStock}` : inputUpper.max;

        div.append(inputUpper);

        filterValue.innerHTML = `${inputLower.value} - ${inputUpper.value}`;

        inputLower.oninput = (): void => {
            const lowerVal = parseInt(inputLower.value);
            const upperVal = parseInt(inputUpper.value);

            if (lowerVal < upperVal) {
                filterValue.innerHTML = `${lowerVal} - ${upperVal}`;
                this.catalogController?.onStockLowerFilterChange(inputLower.value);
            } else {
                filterValue.innerHTML = `${upperVal} - ${lowerVal}`;
                this.catalogController?.onStockUpperFilterChange(inputLower.value);
                this.catalogController?.onStockLowerFilterChange(inputUpper.value);
            }
        };
        inputUpper.oninput = (): void => {
            const lowerVal = parseInt(inputLower.value);
            const upperVal = parseInt(inputUpper.value);

            if (lowerVal < upperVal) {
                filterValue.innerHTML = `${lowerVal} - ${upperVal}`;
                this.catalogController?.onStockUpperFilterChange(inputUpper.value);
            } else {
                filterValue.innerHTML = `${upperVal} - ${lowerVal}`;
                this.catalogController?.onStockLowerFilterChange(inputUpper.value);
                this.catalogController?.onStockUpperFilterChange(inputLower.value);
            }
        };

        return filtersCategory;
    }

    private createSortBlock(userFilter: Filter): HTMLDivElement {
        const productsSort = document.createElement('div');
        productsSort.className = 'products__sort';

        const sortOptions = document.createElement('select');
        sortOptions.className = 'sort__options';
        productsSort.append(sortOptions);
        sortOptions.addEventListener('input', () => this.catalogController?.onSortItems(sortOptions.value));

        const sortTitle = this.createOption('sort-title', 'Sort options:', userFilter);
        const priceHigh = this.createOption('price-high', 'Price: High to Low', userFilter);
        const priceLow = this.createOption('price-low', 'Price: Low to High', userFilter);
        const ratingA = this.createOption('name-az', 'Name: A to Z', userFilter);
        const ratingZ = this.createOption('name-za', 'Name: Z to A', userFilter);

        sortOptions.append(sortTitle);
        sortOptions.append(priceHigh);
        sortOptions.append(priceLow);
        sortOptions.append(ratingA);
        sortOptions.append(ratingZ);

        const sortStat = document.createElement('div');
        sortStat.className = 'sort__stat';
        productsSort.append(sortStat);

        const sortStatName = document.createElement('div');
        sortStatName.className = 'sort__stat_name';
        sortStatName.innerHTML = 'Found:';
        sortStat.append(sortStatName);

        const sortStatValue = document.createElement('div');
        sortStatValue.className = 'sort__stat_value';
        sortStat.append(sortStatValue);

        const sortSearch = document.createElement('input');
        sortSearch.id = 'sort_search';
        sortSearch.type = 'search';
        sortSearch.placeholder = 'Search product';
        if (userFilter.search) {
            sortSearch.value = userFilter.search;
        }
        productsSort.append(sortSearch);
        sortSearch.addEventListener('input', () =>
            this.catalogController?.onSearchFilterChange(sortSearch.value.toLowerCase())
        );

        const sortView = document.createElement('div');
        sortView.className = 'sort__view';
        productsSort.append(sortView);

        const sortViewGrid = document.createElement('div');
        sortViewGrid.className = 'sort__view_grid active';
        sortViewGrid.title = 'Grid';
        sortView.append(sortViewGrid);
        sortViewGrid.addEventListener('click', () => this.catalogController?.changeViewItems(sortViewGrid.title));

        const div1 = document.createElement('div');
        sortViewGrid.append(div1);
        const div2 = document.createElement('div');
        sortViewGrid.append(div2);
        const div3 = document.createElement('div');
        sortViewGrid.append(div3);
        const div4 = document.createElement('div');
        sortViewGrid.append(div4);

        const sortViewList = document.createElement('div');
        sortViewList.className = 'sort__view_list';
        sortViewList.title = 'List';
        sortView.append(sortViewList);
        sortViewList.addEventListener('click', () => this.catalogController?.changeViewItems(sortViewList.title));

        const div5 = document.createElement('div');
        sortViewList.append(div5);
        const div6 = document.createElement('div');
        sortViewList.append(div6);

        return productsSort;
    }

    private createOption(value: string, inner: string, userFilter: Filter): HTMLOptionElement {
        const option = document.createElement('option');
        option.value = value;
        option.className = 'sort-name';
        option.innerHTML = inner;
        if (value === 'sort-title') {
            option.defaultSelected = true;
            option.disabled = true;
        }
        if (userFilter.sort === value) {
            option.selected = true;
        }
        if (userFilter.sort === value) {
            option.selected = true;
        }
        if (userFilter.sort === value) {
            option.selected = true;
        }
        if (userFilter.sort === value) {
            option.selected = true;
        }

        return option;
    }

    private createItems(product: Product, shoppingCart: ShoppingCart): HTMLDivElement {
        const item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('data-id', `${product.id}`);

        const itemName = document.createElement('div');
        itemName.className = 'item_name';
        itemName.innerHTML = product.title;
        item.append(itemName);

        const itemImgContainer = document.createElement('div');
        itemImgContainer.className = 'item_img';
        item.append(itemImgContainer);

        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = `${product.title} photo`;
        itemImgContainer.append(img);

        const itemDscr = document.createElement('div');
        itemDscr.className = 'item__dscr';
        item.append(itemDscr);

        const itemDscrCategory = document.createElement('div');
        itemDscrCategory.className = 'item__dscr_category';
        itemDscrCategory.innerHTML = 'Category: ';
        itemDscr.append(itemDscrCategory);

        const spanCategory = document.createElement('span');
        spanCategory.innerHTML = product.category;
        itemDscrCategory.append(spanCategory);

        const itemDscrBrand = document.createElement('div');
        itemDscrBrand.className = 'item__dscr_brand';
        itemDscrBrand.innerHTML = 'Brand: ';
        itemDscr.append(itemDscrBrand);

        const spanBrand = document.createElement('span');
        spanBrand.innerHTML = product.brand.toLowerCase();
        itemDscrBrand.append(spanBrand);

        const itemDscrPrice = document.createElement('div');
        itemDscrPrice.className = 'item__dscr_price';
        itemDscrPrice.innerHTML = 'Price: ';
        itemDscr.append(itemDscrPrice);

        const spanPrice = document.createElement('span');
        spanPrice.innerHTML = `€${product.price}`;
        itemDscrPrice.append(spanPrice);

        const itemDscrDiscount = document.createElement('div');
        itemDscrDiscount.className = 'item__dscr_discount';
        itemDscrDiscount.innerHTML = 'Discount: ';
        itemDscr.append(itemDscrDiscount);

        const spanDiscount = document.createElement('span');
        spanDiscount.innerHTML = `${product.discountPercentage}%`;
        itemDscrDiscount.append(spanDiscount);

        const itemDscrRating = document.createElement('div');
        itemDscrRating.className = 'item__dscr_rating';
        itemDscrRating.innerHTML = 'Rating: ';
        itemDscr.append(itemDscrRating);

        const spanRating = document.createElement('span');
        spanRating.innerHTML = `${product.rating}`;
        itemDscrRating.append(spanRating);

        const itemDscrStock = document.createElement('div');
        itemDscrStock.className = 'item__dscr_stock';
        itemDscrStock.innerHTML = 'Stock: ';
        itemDscr.append(itemDscrStock);

        const spanStock = document.createElement('span');
        spanStock.innerHTML = `${product.stock}`;
        itemDscrStock.append(spanStock);

        const itemButtons = document.createElement('div');
        itemButtons.className = 'item__buttons';
        item.append(itemButtons);

        const addButton = document.createElement('button');
        addButton.className = 'item__buttons_btn add_btn';
        addButton.setAttribute('btn-product-id', `${product.id}`);
        if (shoppingCart.hasProduct(product.id)) {
            addButton.innerHTML = 'DROP FROM CART';
            addButton.addEventListener('click', () => this.catalogController?.removeItemFromShoppingCart(product.id));
        } else {
            addButton.innerHTML = 'ADD TO CART';
            addButton.addEventListener('click', () => this.catalogController?.addItemToShoppingCart(product.id));
        }
        itemButtons.append(addButton);

        const detailsButton = document.createElement('button');
        detailsButton.setAttribute('details-product-id', `${product.id}`);
        detailsButton.className = 'item__buttons_btn details_btn';
        detailsButton.innerHTML = 'DETAILS';
        itemButtons.append(detailsButton);

        detailsButton.addEventListener('click', () => {
            const itemID = item.getAttribute('data-id');
            window.location.href = `?id=${itemID}#product`;
        });

        return item;
    }

    public onShoppingCartChange(shoppingCart: ShoppingCart, productId: number): void {
        const btnDataAttribute = `btn-product-id='${productId}'`;
        document.querySelector(`[${btnDataAttribute}]`)?.remove();

        const addButton = document.createElement('button');
        addButton.className = 'item__buttons_btn';
        addButton.setAttribute('btn-product-id', `${productId}`);
        if (shoppingCart.hasProduct(productId)) {
            addButton.innerHTML = 'DROP FROM CART';
            addButton.addEventListener('click', () => this.catalogController?.removeItemFromShoppingCart(productId));
        } else {
            addButton.innerHTML = 'ADD TO CART';
            addButton.addEventListener('click', () => this.catalogController?.addItemToShoppingCart(productId));
        }

        const detailsDataAttribute = `details-product-id='${productId}'`;
        const detailsBtn = document.querySelector(`[${detailsDataAttribute}]`) as HTMLButtonElement;
        detailsBtn.before(addButton);
    }

    public changeView(name: string | null): void {
        const sortViewGrid = document.querySelector('.sort__view_grid') as HTMLDivElement;
        const sortViewList = document.querySelector('.sort__view_list') as HTMLDivElement;
        const productItems = document.querySelector('.products__items') as HTMLDivElement;
        if (name === 'Grid') {
            productItems.classList.add('products__items-grid');
            productItems.classList.remove('products__items-list');
            sortViewGrid.classList.add('active');
            sortViewList.classList.remove('active');
        }
        if (name === 'List') {
            productItems.classList.add('products__items-list');
            productItems.classList.remove('products__items-grid');
            sortViewGrid.classList.remove('active');
            sortViewList.classList.add('active');
        }
    }

    public onFilterChange(products: Product[], shoppingCart: ShoppingCart): void {
        const productsItems = document.querySelector('.products__items') as HTMLDivElement;
        productsItems.innerHTML = '';
        products.forEach((item) => productsItems.append(this.createItems(item, shoppingCart)));
        this.changeSortStatValue(products);
    }

    public changeSortStatValue(products: Product[]): void {
        const sortStatValue = document.querySelector('.sort__stat_value') as HTMLDivElement;
        sortStatValue.innerHTML = `${products.length}`;
        if (products.length === 0) {
            const productItems = document.querySelector('.products__items') as HTMLDivElement;
            productItems.innerHTML = 'No products found!';
        }
    }

    public deleteCatalog(): void {
        const main = document.querySelector('main') as HTMLElement;
        main.remove();
    }
}
