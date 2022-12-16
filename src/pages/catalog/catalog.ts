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
        inputLower.value = '1';
        div.append(inputLower);

        const inputUpper = document.createElement('input');
        inputUpper.className = 'input-range lower';
        inputUpper.type = 'range';
        inputUpper.min = '1';
        inputUpper.max = '100';
        inputUpper.value = '100';
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
}
