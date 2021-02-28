import { lockScroll, unlockScroll } from './scrollBlocker';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function() {
    const bankMenu = document.querySelector('.bank-menu');
    const bankMenuSlot = document.querySelector('.navigation__bank-menu-slot');
    const bankMenuCloseBtns = Array.from(document.querySelectorAll('.js-bank-menu-close'));

    if (bankMenu && bankMenuSlot) {
        bankMenuSlot.appendChild(bankMenu);
    } else {
        console.warn('No bank menu or bank menu slot');
    }

    const aboutBankBtn = document.querySelector('.page-header__about-bank-link');
    let aboutBankMenuOpen = false;
    const bankMenuInnerScrollContainer = document.querySelector('.bank-menu__inner');

    function openBankMenu() {
        document.body.classList.add('bank-menu-shown');
        aboutBankMenuOpen = true;
        gsap.to(window, { duration: 0.3, scrollTo: 0, clearProps: 'all', onComplete: () => lockScroll(bankMenuInnerScrollContainer) });
        aboutBankBtn.classList.add('active');
    }

    function closeBankMenu() {
        document.body.classList.remove('bank-menu-shown');
        aboutBankMenuOpen = false;
        unlockScroll();
        aboutBankBtn.classList.remove('active');
    }

    if (aboutBankBtn && bankMenuInnerScrollContainer) {
        aboutBankBtn.addEventListener('click', event => {
            event.preventDefault();
            if (!aboutBankMenuOpen) {
                openBankMenu();
            } else {
                closeBankMenu();
            }
        });

        bankMenuCloseBtns.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                closeBankMenu();
            });
        });

        bankMenu.addEventListener('click', event => {
            if (event.target.closest('.bank-menu') && !(event.target.matches('a') || event.target.matches('button'))) {
                event.preventDefault();
                closeBankMenu();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.which === 27 && aboutBankMenuOpen) {
                closeBankMenu();
            }
        });
    } else {
        console.warn('No bank menu btn or bank menu scroll container');
    }
}
