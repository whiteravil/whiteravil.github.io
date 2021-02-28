import { lockScroll, unlockScroll } from './scrollBlocker';

export default function() {
    const pageHeaderBurger = document.querySelector('.page-header__burger-btn');

    const menuScrollWrapper = document.querySelector('.page-header__mobile-nav-inner');

    let menuOpen = false;

    if (pageHeaderBurger && menuScrollWrapper) {
        pageHeaderBurger.addEventListener('click', event => {
            event.preventDefault();
            if (!menuOpen) {
                document.body.classList.add('mobile-menu-open');
                lockScroll(menuScrollWrapper);
                menuOpen = true;
            } else {
                document.body.classList.remove('mobile-menu-open');
                unlockScroll(menuScrollWrapper);
                menuOpen = false;
            }
        });
    }
}
