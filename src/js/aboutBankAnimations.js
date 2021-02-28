import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function init() {

    const aboutBankIntro = document.querySelector('.new-about-bank-intro');

    const aboutBankIntroBG = document.querySelector('.new-about-bank-intro__bg')

    if (aboutBankIntro && aboutBankIntroBG)
    gsap.to(aboutBankIntroBG, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: aboutBankIntro,
            // start: "top bottom", // the default values
            // end: "bottom top",
            scrub: true
        }
    });


    const imageBlock = document.querySelector('.new-about-bank-experience__image-block');
    const experience = document.querySelector('.new-about-bank-experience')

    if (imageBlock && experience) {
        gsap.from(imageBlock, {
            yPercent: 20,
            autoAlpha: 0,
            ease: "power2.out",
            duration: 1,
            scrollTrigger: {
                trigger: experience,
                start: "top center"
                // end: "bottom top",
               
            }
        });
    }

    const success = document.querySelector('.new-about-bank-success');
    const successItems = Array.from(document.querySelectorAll('.new-about-bank-success__achievements-item'));

    if (success && successItems) {
        gsap.from(successItems, {
            yPercent: 30,
            autoAlpha: 0,
            ease: "power2.out",
            duration: 1.5,
            stagger: 0.3,
            scrollTrigger: {
                trigger: success,
            }
        });
    }
}

export default {
    init
};
