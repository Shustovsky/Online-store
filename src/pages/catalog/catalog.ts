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

    function createFilter(name: string): void {
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

    createFilter('category');
    createFilter('brand');
}
