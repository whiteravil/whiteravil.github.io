import * as ScrollMagic from 'scrollmagic';
import { gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

ScrollMagicPluginGsap(ScrollMagic, gsap);

export default function() {
    if (window.matchMedia('(max-width: 767px)').matches) return;

    function animate() {
        const controller = new ScrollMagic.Controller();
        const colToFade = Array.from(document.querySelectorAll('.js-col-to-fade'));
        const colToSlide = Array.from(document.querySelectorAll('.js-col-to-slide'));

        if (colToFade.length > 0 && colToSlide.length > 0) {
            const tl = gsap.timeline();

            function getOffset() {
                const containerComputedStyle = getComputedStyle(document.querySelector('.container'));
                const cardWidth = document.querySelector('.product-navigation__card').offsetWidth;
                const containerWidth = document.querySelector('.container').offsetWidth - parseFloat(containerComputedStyle.paddingLeft) - parseFloat(containerComputedStyle.paddingRight);
                const innerContainerWidth = document.querySelector('.inner-container').offsetWidth;
                const columnWidth = colToSlide[0].offsetWidth;

                const offsetAmount = cardWidth - columnWidth - (containerWidth - innerContainerWidth) / 2;

                return offsetAmount * -1;
            }

            tl.to(colToFade, {
                ease: 'none',
                duration: 1,
                autoAlpha: 0,
                xPercent: -100
            }).to(
                colToSlide,
                {
                    ease: 'none',
                    duration: 1,
                    x: getOffset()
                },
                0.3
            );

            new ScrollMagic.Scene({
                triggerElement: document.querySelector('.product-navigation'),
                triggerHook: 0,
                duration: '20%'
                // offset: 200
            })
                .setTween(tl)
                .addTo(controller);
        }
    }

    window.scrollBy(0, 1);
    window.addEventListener('load', animate);
}
