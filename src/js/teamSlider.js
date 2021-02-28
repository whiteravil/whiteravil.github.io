import Swiper from 'swiper';

export default function teamSlider() {
    const elements = Array.from(document.querySelectorAll('.js-team'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 18,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.team__arrow--next'),
                prevEl: element.querySelector('.team__arrow--prev')
            },
            breakpoints: {
                768: {
                    spaceBetween: 30
                },
                1024: {
                    spaceBetween: 60
                }
            }
        });
    });
}
