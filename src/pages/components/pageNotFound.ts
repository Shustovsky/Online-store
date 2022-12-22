export class PageNotFound {
    createPageNotFound(): void {
        const header = document.querySelector('.header') as HTMLElement;

        const main = document.createElement('main');
        header.after(main);

        const container = document.createElement('div');
        container.className = 'container';
        main.append(container);

        const h1 = document.createElement('h1');
        h1.innerHTML = 'PAGE NOT FOUND (404)';
        h1.style.textAlign = 'center';
        h1.style.paddingTop = '50px';
        container.append(h1);
    }
}
