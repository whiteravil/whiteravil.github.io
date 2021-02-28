import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MOBILE_WIDTH } from './constants';
import { lockScroll, unlockScroll } from './scrollBlocker';

gsap.registerPlugin(ScrollToPlugin);

export default function fullscreenMenu() {
    const catalogMenu = document.querySelector('.catalog__menu');

    const fullscreenMenu = document.querySelector('.fullscreen-nav-menu');

    if (catalogMenu && fullscreenMenu) {
        const links = Array.from(catalogMenu.querySelectorAll('.catalog__menu-link:not(.js-simple-link)'));

        const initialActiveLinkIndex = links.findIndex(element => element.classList.contains('active'));

        const contentLayers = Array.from(fullscreenMenu.querySelectorAll('.js-product-nav-menu-item'));

        const productNavClose = fullscreenMenu.querySelector('.js-product-nav-close')

        let menuOpen = false;

        function selectLayer(index) {
            contentLayers.forEach(layer => layer.classList.remove('active'));

            contentLayers[index].classList.add('active');
        }

        function openMenu() {
            console.log('Прокрутка до верха меню')
            gsap.to(window, { duration: 0.3, scrollTo: 0, clearProps: 'all', onComplete: () => lockScroll(fullscreenMenu) });
            menuOpen = true;
            document.body.classList.add('product-nav-menu-open');
        }

        function closeMenu() {
            unlockScroll();
            menuOpen = false;
            document.body.classList.remove('product-nav-menu-open');
            links.forEach(link => link.classList.remove('active'));

            links[initialActiveLinkIndex].classList.add('active');
        }

        // if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
          
        // }

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();


                if (!menuOpen) {
                    openMenu();
                } else if (menuOpen && link.classList.contains('active')) {
                    return closeMenu();
                }
                links.forEach(link => link.classList.remove('active'));

                link.classList.add('active');

                

                selectLayer(linkIndex);
            });
        });

        productNavClose.addEventListener('click', event => {
            event.preventDefault();
            closeMenu();
        });


        document.addEventListener('anchorscroll', event => {
            // console.log('Anchorscroll event captured')
            if (menuOpen) {
                closeMenu();
            }
        })

        fullscreenMenu.addEventListener('click', event => {
            

            if (event.target.matches('a') || event.target.closest('a') || event.target.matches('button') || event.target.closest('button')) {
                
            } else {
                event.preventDefault()
                closeMenu();
            }
        })


        if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
            if (initialActiveLinkIndex !== -1) {
                const link = links[initialActiveLinkIndex]
                const distance = link.offsetLeft;
                const parent = link.parentElement

                console.log('Distance', distance);

                parent.scrollLeft = distance - parent.offsetWidth / 2 + link.offsetWidth / 2;


            }
        }
    }
}
