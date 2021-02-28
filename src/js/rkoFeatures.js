import Swiper from "swiper";

export default function() {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    const rkoFeatures = Array.from(document.querySelectorAll('.js-rko-features'));

    rkoFeatures.forEach(element => {
     
    
        new Swiper(element, {
            slidesPerView: 'auto',
            spaceBetween: 18,
            watchOverflow: true
        });
    })
}