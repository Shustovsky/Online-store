export default function createFooter(): void {
    const body = document.body;

    const footer = document.createElement('footer');
    footer.className = 'footer';
    body.append(footer);

    const container = document.createElement('div');
    container.className = 'container';
    footer.append(container);

    const footerContainer = document.createElement('div');
    footerContainer.className = 'footer_container';
    container.append(footerContainer);

    const footerDate = createDate();
    footerContainer.append(footerDate);

    const footerGits = createGits();
    footerContainer.append(footerGits);

    const footerLogo = createLogo();
    footerContainer.append(footerLogo);
}

function createDate(): HTMLDivElement {
    const footerDate = document.createElement('div');
    footerDate.className = 'footer_date';
    footerDate.innerHTML = '© 2022';
    return footerDate;
}

function createGits(): HTMLDivElement {
    const footerGits = document.createElement('div');
    footerGits.className = 'footer__gits';

    const footerGit1 = document.createElement('a');
    footerGit1.className = 'footer__gits_link';
    footerGit1.href = 'https://github.com/shustovsky';
    footerGit1.target = '_blank';
    footerGit1.innerHTML = 'Shustovsky';
    footerGits.append(footerGit1);

    const footerGit2 = document.createElement('a');
    footerGit2.className = 'footer__gits_link';
    footerGit2.href = 'https://github.com/NadzeyaShu';
    footerGit2.target = '_blank';
    footerGit2.innerHTML = 'NadzeyaShu';
    footerGits.append(footerGit2);

    return footerGits;
}

function createLogo(): HTMLElement {
    const footerLogo = document.createElement('a');
    footerLogo.className = 'footer_logo';
    footerLogo.href = 'https://rs.school/js/';
    footerLogo.target = '_blank';

    const footerLogoImg = document.createElement('img');
    footerLogoImg.src = './assets/icons/rs_school_js.svg';
    footerLogoImg.alt = 'rs_school logo';
    footerLogo.append(footerLogoImg);

    return footerLogo;
}
