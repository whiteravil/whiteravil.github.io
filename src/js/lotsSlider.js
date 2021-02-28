import Swiper from 'swiper';

export default function lotsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-lots-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            spaceBetween: 0,
            pagination: {
                el: element.querySelector('.catalog__lots-card-slider-pagination'),
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: element.querySelector('.catalog__lots-card-slider-arrow--next'),
                prevEl: element.querySelector('.catalog__lots-card-slider-arrow--prev')
            }
        });
    });
}
