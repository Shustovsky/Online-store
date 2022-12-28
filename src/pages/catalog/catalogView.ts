import { Product } from '../../model/product';
import { CatalogController } from './catalogController';
import { Filter } from '../../model/Filter';

export class CatalogView {
    catalogController: CatalogController | null;

    constructor(catalogController: CatalogController | null) {
        this.catalogController = catalogController;
    }

    public createCatalog(products: Product[], filter: Filter): void {
        const header = document.querySelector('.header') as HTMLElement;

        const main = document.createElement('main');
        header.after(main);

        const container = document.createElement('div');
        container.className = 'container';
        main.append(container);

        const mainContainer = document.createElement('div');
        mainContainer.className = 'main_container';
        container.append(mainContainer);

        const filters = this.createFilters(filter);
        mainContainer.append(filters);

        const productsWrapper = document.createElement('div');
        productsWrapper.className = 'products';
        mainContainer.append(productsWrapper);

        const productsSort = this.createSortBlock();
        productsWrapper.append(productsSort);

        this.createSortBlock();

        const productsItems = document.createElement('div');
        productsItems.className = 'products__items';
        productsWrapper.append(productsItems);

        products.forEach((item) => productsItems.append(this.createItems(item)));

        // this.changeView();
    }

    private createFilters(filter: Filter): HTMLDivElement {
        const filters = document.createElement('div');
        filters.className = 'filters';

        const filtersButtons = document.createElement('div');
        filtersButtons.className = 'filters__buttons';
        filters.append(filtersButtons);

        const btnReset = this.createBtn('Reset');
        const btnCopy = this.createBtn('Copy');
        filtersButtons.append(btnReset);
        filtersButtons.append(btnCopy);

        const categoryFilter = this.createCategoryFilter(filter);
        const brandFilter = this.createBrandFilter(filter);
        filters.append(categoryFilter);
        filters.append(brandFilter);

        const priceFilter = this.createPriceFilter(filter);
        const stockFilter = this.createStockFilter(filter);
        filters.append(priceFilter);
        filters.append(stockFilter);

        return filters;
    }

    private createBtn(name: string): HTMLButtonElement {
        const btn = document.createElement('button');
        btn.id = `btn_${name}`;
        btn.className = 'filters__buttons_btn';
        btn.innerHTML = name;

        return btn;
    }

    private createCategoryFilter(filter: Filter): HTMLDivElement {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = `filters__category`;

        const filtersCheckbox = document.createElement('fieldset');
        filtersCheckbox.className = 'filters-checkbox';
        filtersCategory.append(filtersCheckbox);

        const legend = document.createElement('legend');
        legend.innerHTML = 'category';
        filtersCheckbox.append(legend);

        filter.categories.forEach((item) => {
            const div = document.createElement('div');
            filtersCheckbox.append(div);

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `${item}`;
            input.name = `${item}`;
            div.append(input);
            input.addEventListener('click', () => this.catalogController?.onCategoryFilterChange(item));

            const label = document.createElement('label');
            label.setAttribute('for', `${item}`);
            label.innerHTML = `${item}`;
            div.append(label);
        });

        return filtersCategory;
    }

    private createBrandFilter(filter: Filter): HTMLDivElement {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = `filters__brand`;

        const filtersCheckbox = document.createElement('fieldset');
        filtersCheckbox.className = 'filters-checkbox';
        filtersCategory.append(filtersCheckbox);

        const legend = document.createElement('legend');
        legend.innerHTML = 'brand';
        filtersCheckbox.append(legend);

        filter.brandes.forEach((item) => {
            const div = document.createElement('div');
            filtersCheckbox.append(div);

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `${item}`;
            input.name = `${item}`;
            div.append(input);
            input.addEventListener('click', () => this.catalogController?.onBrandFilterChange(item));

            const label = document.createElement('label');
            label.setAttribute('for', `${item}`);
            label.innerHTML = `${item}`;
            div.append(label);
        });

        return filtersCategory;
    }

    private createPriceFilter(filter: Filter): HTMLDivElement {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = 'filters__price';

        const filtersRange = document.createElement('fieldset');
        filtersRange.className = 'filters-range';
        filtersCategory.append(filtersRange);

        const legend = document.createElement('legend');
        legend.innerHTML = 'price';
        filtersRange.append(legend);

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
        inputLower.value = inputLower.min;
        div.append(inputLower);

        const inputUpper = document.createElement('input');
        inputUpper.className = 'input-range upper';
        inputUpper.type = 'range';
        inputUpper.min = `${filter.minPrice}`;
        inputUpper.max = `${filter.maxPrice}`;
        inputUpper.value = inputUpper.max;
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

    private createStockFilter(filter: Filter): HTMLDivElement {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = 'filters__stock';

        const filtersRange = document.createElement('fieldset');
        filtersRange.className = 'filters-range';
        filtersCategory.append(filtersRange);

        const legend = document.createElement('legend');
        legend.innerHTML = 'stock';
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
        inputLower.value = inputLower.min;
        div.append(inputLower);

        const inputUpper = document.createElement('input');
        inputUpper.className = 'input-range upper';
        inputUpper.type = 'range';
        inputUpper.min = `${filter.minStock}`;
        inputUpper.max = `${filter.maxStock}`;
        inputUpper.value = inputUpper.max;
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

    private createSortBlock(): HTMLDivElement {
        const productsSort = document.createElement('div');
        productsSort.className = 'products__sort';

        const sortOptions = document.createElement('select');
        sortOptions.className = 'sort__options';
        productsSort.append(sortOptions);

        const sortTitle = this.createOption('sort-title', 'Sort options:');
        const priceHigh = this.createOption('price-high', 'Price: High to Low');
        const priceLow = this.createOption('price-low', 'Price: Low to High');
        const ratingA = this.createOption('rating-a', 'Name: A to Z');
        const ratingZ = this.createOption('rating-z', 'Name: Z to A');

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
        sortStatValue.innerHTML = '74'; //TODO поменять на переменную
        sortStat.append(sortStatValue);

        const sortSearch = document.createElement('input');
        sortSearch.id = 'sort_search';
        sortSearch.type = 'search';
        sortSearch.placeholder = 'Search product';
        productsSort.append(sortSearch);

        const sortView = document.createElement('div');
        sortView.className = 'sort__view';
        productsSort.append(sortView);

        const sortViewGrid = document.createElement('div');
        sortViewGrid.className = 'sort__view_grid active';
        sortViewGrid.title = 'Grid';
        sortView.append(sortViewGrid);
        sortViewGrid.addEventListener('click', () => this.catalogController?.changeViewItems(sortViewGrid));

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
        sortViewList.addEventListener('click', () => this.catalogController?.changeViewItems(sortViewList));

        const div5 = document.createElement('div');
        sortViewList.append(div5);
        const div6 = document.createElement('div');
        sortViewList.append(div6);

        return productsSort;
    }

    private createOption(value: string, inner: string): HTMLOptionElement {
        const option = document.createElement('option');
        option.value = value;
        option.className = 'sort-name';
        option.innerHTML = inner;

        return option;
    }

    private createItems(product: Product): HTMLDivElement {
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
        spanBrand.innerHTML = product.brand;
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
        addButton.innerHTML = 'ADD TO CART';
        addButton.addEventListener('click', () => this.catalogController?.addItemToShoppingCart(product.id));
        itemButtons.append(addButton);

        const detailsButton = document.createElement('button');
        detailsButton.className = 'item__buttons_btn details_btn';
        detailsButton.innerHTML = 'DETAILS';
        itemButtons.append(detailsButton);

        detailsButton.addEventListener('click', () => {
            const itemID = item.getAttribute('data-id');
            window.location.href = `?id=${itemID}#product`;
        });

        return item;
    }

    public changeView(div: HTMLDivElement): void {
        const sortViewGrid = document.querySelector('.sort__view_grid') as HTMLDivElement;
        const sortViewList = document.querySelector('.sort__view_list') as HTMLDivElement;
        if (div.classList.contains('sort__view_grid')) {
            const productItems = document.querySelector('.products__items-list') as HTMLDivElement;
            productItems.className = 'products__items';
            sortViewGrid.classList.toggle('active');
            sortViewList.classList.toggle('active');
        } else if (div.classList.contains('sort__view_list')) {
            const productItems = document.querySelector('.products__items') as HTMLDivElement;
            productItems.className = 'products__items-list';
            sortViewList.classList.toggle('active');
            sortViewGrid.classList.toggle('active');
        }
    }

    public onFilterChange(products: Product[]): void {
        const productsItems = document.querySelector('.products__items') as HTMLDivElement;
        productsItems.innerHTML = '';
        products.forEach((item) => productsItems.append(this.createItems(item)));
    }
}
