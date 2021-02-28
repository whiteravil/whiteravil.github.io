import Swiper from 'swiper';

export default function() {
    const articleAdvantages = Array.from(document.querySelectorAll('.js-article-advantages'));

    articleAdvantages.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 18,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.article__advantages-arrow--next'),
                prevEl: element.querySelector('.article__advantages-arrow--prev')
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 22
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 22
                }
            }
        });
    });
}
