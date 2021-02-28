import polyfills from './polyfills';
import detectTouch from './detectTouch';
import ratingStars from './ratingStars';
import phoneMask from './phoneMask';
import tabs from './tabs';
import customSelects from './customSelects';
import rangeSliders from './newRangeSliders';
import productsSlider from './productsSlider';
import navigation from './navigation';
import mobileMenu from './mobileMenu';
import forBusiness from './forBusiness';
import productNav from './productNav';
import barba from '@barba/core';
import { gsap } from 'gsap';
import scrollAnimations from './scrollAnimations';
import accordions from './accordions';
import rkoFeatures from './rkoFeatures';
import openAccount from './openAccount';
import bankMenu from './bankMenu';
import articleAdvantages from './articleAdvantages';
import bankOffices from './bankOffices';
import modals from './modals';
import currency from './currency';
import validation from './validation';
import anchors from './anchors';
import aboutBankAnimations from './aboutBankAnimations';
import teamSlider from './teamSlider';
import fullscreenMenu from './fullscreenMenu';
import similarNewsSlider from './similarNewsSlider';
import pageHeaderContacts from './pageHeaderContacts';
import lotsSlider from './lotsSlider';
import officesForms from './officesInputs';
import newApplicationForm from './newApplicationForm';
import fileUpload from './fileUpload';
import currencyTabs from './currencyTabs';
import mobileSubmenu from './mobileSubmenu';
import lowVision from './lowVision';
import codeInput from './codeInput';
import innerAccordions from './inner-accordions';
import applicationRemake from './applicationRemake';
import enterCode from './enterCode';
import currencyExchange from './currencyExchange';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    lowVision();
    navigation();
    mobileMenu();
    productNav();
    scrollAnimations();
    rkoFeatures();
    openAccount();
    bankMenu();
    articleAdvantages();
    bankOffices();
    modals();
    teamSlider();
    fullscreenMenu();
    similarNewsSlider();
    pageHeaderContacts();
    lotsSlider();
    officesForms();
    newApplicationForm();
    fileUpload();
    codeInput();
    currencyExchange();
    
    console.log('Тест работы')

    barba.init({
        debug: true,
        logLevel: 'error',
        transitions: [
            {
                name: 'opacity-transition',
                sync: false,
                leave: data =>
                    gsap.to(data.current.container, {
                        opacity: 0,
                        duration: 0.15,
                        onComplete: () => {
                            gsap.set(data.current.container, {
                                display: 'none'
                            });
                            
                        }
                    }),
                enter: data =>
                    gsap.from(data.next.container, {
                        duration: 0.15,
                        opacity: 0,
                       
                    })
            }
        ],
        views: [
            {
                namespace: 'home',

                beforeLeave() {
                    tabs.destroy();
                    ratingStars.destroy();
                    phoneMask.destroy();

                    productsSlider.destroy();
                    rangeSliders.destroy();
                    customSelects.destroy();
                    forBusiness.destroy();
                    currency.destroy();
                    validation.destroy();
                    anchors.destroy();
                    document.body.classList.add('category-toggles-off');

                    if (window.destroyBackendScripts && typeof window.destroyBackendScripts === 'function') {
                        window.destroyBackendScripts();
                    }
                },

                beforeEnter() {
                    console.log('Тест работы 2')
                    tabs.init();
                    console.log('Тест работы 3')
                    ratingStars.init();

                    phoneMask.init();

                    customSelects.init();
                    console.log('Перед ползунками')
                    rangeSliders.init();
                    console.log('Тест работы 4')
                    forBusiness.init();
                    productsSlider.init();
                    currency.init();
                    validation.init();
                    anchors.init();
                    console.log('Тест работы 5')
                    aboutBankAnimations.init();
                    accordions(Array.from(document.querySelectorAll('.js-accordion'))).init();
                    accordions(Array.from(document.querySelectorAll('.js-mobile-nav-accordion'))).init();
                    innerAccordions(Array.from(document.querySelectorAll('.js-additional-info-inner-accordion'))).init();

                    currencyTabs.init();
                    mobileSubmenu.init();
                    console.log('Тест работы 6')
                    document.body.classList.remove('category-toggles-off');

                    applicationRemake();

                    enterCode();

                    if (window.initBackendScripts && typeof window.initBackendScripts === 'function') {
                        window.initBackendScripts();
                        console.log('Проинициализированы бэкэнд скрипты')
                    }
                }
            }
        ]
    });

    document.addEventListener('click', function(event) {
        if (event.target.matches('.js-barba-link') || event.target.closest('.js-barba-link')) {
            event.preventDefault();
            const href = event.target.href;

            if (barba.transitions.isRunning) return;

            barba.go(href);
        }
    });
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
