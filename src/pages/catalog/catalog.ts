import { Product } from '../../model/product';

export default function createCatalog(products: Product[]): void {
    const header = document.querySelector('.header') as HTMLElement;

    const main = document.createElement('main');
    header.after(main);

    const container = document.createElement('div');
    container.className = 'container';
    main.append(container);

    const mainContainer = document.createElement('div');
    mainContainer.className = 'main_container';
    container.append(mainContainer);

    const filters = document.createElement('div');
    filters.className = 'filters';
    mainContainer.append(filters);

    const filtersButtons = document.createElement('div');
    filtersButtons.className = 'filters__buttons';
    filters.append(filtersButtons);

    const btnReset = document.createElement('button');
    btnReset.id = 'btn_reset';
    btnReset.className = 'filters__buttons_btn';
    btnReset.innerHTML = 'Reset Filters';
    filtersButtons.append(btnReset);

    const btnCopy = document.createElement('button');
    btnCopy.id = 'btn_copy';
    btnCopy.className = 'filters__buttons_btn';
    btnCopy.innerHTML = 'Reset Filters';
    filtersButtons.append(btnCopy);

    function createCheckboxFilter(name: string): void {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = `filters__${name}`;
        filters.append(filtersCategory);

        const filtersCheckbox = document.createElement('fieldset');
        filtersCheckbox.className = 'filters-checkbox';
        filtersCategory.append(filtersCheckbox);

        const legend = document.createElement('legend');
        legend.innerHTML = `${name}`;
        filtersCheckbox.append(legend);

        const allCategory: string[] = [];

        for (const item of products) {
            //захаркодил т.к. let categoryItem = item[name]; по каким-то причинам не работает
            let categoryItem = '';
            if (name === 'category') {
                categoryItem = item.category;
            } else if (name === 'brand') {
                categoryItem = item.brand;
            }
            if (!allCategory.includes(categoryItem)) {
                allCategory.push(categoryItem);
            }
        }
        allCategory.forEach((item) => {
            const div = document.createElement('div');
            filtersCheckbox.append(div);

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `${item}`;
            input.name = `${item}`;
            div.append(input);

            const label = document.createElement('label');
            label.setAttribute('for', `${item}`);
            label.innerHTML = `${item}`;
            div.append(label);
        });
    }

    createCheckboxFilter('category');
    createCheckboxFilter('brand');

    function createRangeFilter(name: string): void {
        const filtersCategory = document.createElement('div');
        filtersCategory.className = `filters__${name}`;
        filters.append(filtersCategory);

        const filtersRange = document.createElement('fieldset');
        filtersRange.className = 'filters-range';
        filtersCategory.append(filtersRange);

        const legend = document.createElement('legend');
        legend.innerHTML = `${name}`;
        filtersRange.append(legend);

        const filterValue = document.createElement('div');
        filterValue.className = 'filters-range_value';
        filtersRange.append(filterValue);

        const div = document.createElement('div');
        filtersRange.append(div);

        const inputLower = document.createElement('input');
        inputLower.className = 'input-range lower';
        inputLower.type = 'range';
        inputLower.min = '1';
        inputLower.max = '100';
        inputLower.value = inputLower.min;
        div.append(inputLower);

        const inputUpper = document.createElement('input');
        inputUpper.className = 'input-range lower';
        inputUpper.type = 'range';
        inputUpper.min = '1';
        inputUpper.max = '100';
        inputUpper.value = inputUpper.max;
        div.append(inputUpper);

        filterValue.innerHTML = `${inputLower.value} - ${inputUpper.value}`;

        function setValue(input: HTMLInputElement): void {
            input.oninput = function (): void {
                const lowerVal = parseInt(inputLower.value);
                const upperVal = parseInt(inputUpper.value);

                filterValue.innerHTML = lowerVal < upperVal ? `${lowerVal} - ${upperVal}` : `${upperVal} - ${lowerVal}`;
            };
        }

        setValue(inputLower);
        setValue(inputUpper);
    }

    createRangeFilter('price');
    createRangeFilter('stock');

    const productsWrapper = document.createElement('div');
    productsWrapper.className = 'products';
    mainContainer.append(productsWrapper);

    function createSortBlock() {
        const productsSort = document.createElement('div');
        productsSort.className = 'products__sort';
        productsWrapper.append(productsSort);

        const sortOptions = document.createElement('select');
        sortOptions.className = 'sort__options';
        productsSort.append(sortOptions);

        function createOption(value: string, inner: string): void {
            const option = document.createElement('option');
            option.value = value;
            option.className = 'sort-name';
            option.innerHTML = inner;
            sortOptions.append(option);
        }

        createOption('sort-title', 'Sort options:');
        createOption('price-high', 'Price: High to Low');
        createOption('price-low', 'Price: Low to High');
        createOption('rating-a', 'Name: A to Z');
        createOption('rating-z', 'Name: Z to A');

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
        sortViewGrid.className = 'sort__view_grid';
        sortViewGrid.title = 'Grid';
        sortView.append(sortViewGrid);

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

        const div5 = document.createElement('div');
        sortViewList.append(div5);
        const div6 = document.createElement('div');
        sortViewList.append(div6);
    }

    createSortBlock();
}
