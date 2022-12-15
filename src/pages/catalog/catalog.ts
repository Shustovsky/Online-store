export default function createCatalog(): void {
    const header = document.querySelector('.header') as HTMLElement;

    const main = document.createElement('main');
    header.after(main);

    const container = document.createElement('div');
    container.className = 'container';
    main.append(container);

    const mainContainer = document.createElement('div');
    mainContainer.className = 'main_container';
    container.append(mainContainer)

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

}
