import Swiper from 'swiper';


export default function similarNewsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-similar-news-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 18,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.similar-news__slider-arrow--next'),
                prevEl: element.querySelector('.similar-news__slider-arrow--prev')
            },
            breakpoints: {
                768: {
                    spaceBetween: 30
                },
                1024: {
                    spaceBetween: 60
                },
                1400: {
                    spaceBetween: 80
                }
            }
        });
    });
}
