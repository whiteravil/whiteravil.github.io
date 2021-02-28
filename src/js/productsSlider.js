import Swiper from 'swiper';


let instances = [];

function init() {
    const productsSliders = Array.from(document.querySelectorAll('.js-products-slider'));

    productsSliders.forEach(element => {
        const prev = element.querySelector('.products__slider-arrow--prev');
        const next = element.querySelector('.products__slider-arrow--next');
        const tabBtns = Array.from(element.querySelectorAll('.js-tabs-nav'));
        const tabItems = Array.from(element.querySelectorAll('.js-tabs-item'));
        const hasTabs = tabBtns.length > 0 && tabItems.length > 0;
        const localInstances = [];
        const options = {
            slidesPerView: 'auto',
            spaceBetween: 20,
            watchOverflow: true,
            watchSlidesProgress: true,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 40
                },
                1025: {
                    slidesPerView: 'auto',
                    spaceBetween: 60
                }
            }
        };

        if (hasTabs) {
            tabItems.forEach(item => {
                const container = item.querySelector('.swiper-container');
                const sliderWrapper = container.closest('.products__slider-wrapper');

                let optionsExtended = {
                    ...options,
                    on: {
                        progress: function() {
                            if (this.isEnd) {
                                sliderWrapper.classList.add('last-slide-reached');
                            } else {
                                sliderWrapper.classList.remove('last-slide-reached');
                            }
                           
                        }
                    }
                };

                const slider = new Swiper(container, optionsExtended);

                instances.push({
                    slider
                });

                localInstances.push({
                    slider,
                    tabItem: item
                });
            });
        } else {
            const container = element.querySelector('.swiper-container');
            const sliderWrapper = container.closest('.products__slider-wrapper');

            let optionsExtended = {
                ...options,
                on: {
                    progress: function() {
                        if (this.isEnd) {
                            sliderWrapper.classList.add('last-slide-reached');
                        } else {
                            sliderWrapper.classList.remove('last-slide-reached');
                        }
                       
                    }
                }
            };
            const slider = new Swiper(container, optionsExtended);
            instances.push({
                slider
            });
            localInstances.push({
                slider
            });
        }

        function handleArrowClick(direction = 'next') {
            let activeInstance = null;
            if (hasTabs) {
                activeInstance = localInstances.find(instance => instance.tabItem.matches('.active'));
                if (!activeInstance) throw new Error('No active tab index');
            } else {
                activeInstance = localInstances[0];
            }
            if (direction === 'next') {
                activeInstance.slider.slideNext();
            } else {
                activeInstance.slider.slidePrev();
            }
        }

        function handleButtonsActivity() {
            let activeInstance = null;
            if (hasTabs) {
                activeInstance = localInstances.find(instance => instance.tabItem.matches('.active'));
                if (!activeInstance) throw new Error('No active tab index');
            } else {
                activeInstance = localInstances[0];
            }
            if (prev) {
                prev.classList.remove('button-disabled');
                prev.classList.remove('button-lock-hidden');
            }
            if (next) {
                next.classList.remove('button-disabled');
                next.classList.remove('button-lock-hidden');
            }
            if (activeInstance.slider.progress == 0) {
                if (prev) prev.classList.add('button-disabled');
            }
            if (activeInstance.slider.progress == 1) {
                if (next) next.classList.add('button-disabled');
            }

            if (activeInstance.slider.isLocked) {
                prev.classList.add('button-lock-hidden');
                next.classList.add('button-lock-hidden');
            } 
        }

        if (prev)
            prev.addEventListener('click', event => {
                event.preventDefault();
                if (prev.classList.contains('button-disabled')) return;
                handleArrowClick('prev');
                handleButtonsActivity();
            });

        if (next)
            next.addEventListener('click', event => {
                event.preventDefault();
                if (next.classList.contains('button-disabled')) return;
                handleArrowClick('next');
                handleButtonsActivity();
            });

        tabBtns.forEach(btn => btn.addEventListener('click', handleButtonsActivity));

        handleButtonsActivity();
    });
}

function destroy() {
    instances.forEach(instance => instance.slider.destroy());
    instances = [];
}

export default {
    init,
    destroy
};
