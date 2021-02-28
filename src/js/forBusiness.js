let instances = [];

function init() {
    const forBusiness = Array.from(document.querySelectorAll('.js-for-business'));

    forBusiness.forEach(element => {
        const navLinks = Array.from(element.querySelectorAll('.for-business__tabs-nav-link'));

        const tabItems = Array.from(element.querySelectorAll('.for-business__tabs-item'));
        const slidesCount = tabItems.length;
        let timer = null;
        let activeIndex = 0;
        let autoplay = true;
        const autoplayDuration = 6000;

        function handleTabChange(index) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            tabItems.forEach(tabItem => {
                tabItem.classList.remove('active');
            });

            navLinks[index].classList.add('active');
            tabItems[index].classList.add('active');

            activeIndex = index;
        }

        function setAutoplay() {
            if (!autoplay) return;
          
            navLinks.forEach(link => {
                link.style.animationDuration = `${autoplayDuration / 1000}s`;
            });

            const goNextSlide = () => {
                if (activeIndex + 1 < slidesCount) {
                    handleTabChange(activeIndex + 1);
                } else {
                    handleTabChange(0);
                }
            };
            const autoplayHandler = () => {
                if (!autoplay) return;
               
                navLinks.forEach(link => link.classList.remove('current'));
                navLinks[activeIndex].classList.add('current');

              
            };

            autoplayHandler();

            timer = setInterval(() => {
                goNextSlide();
                autoplayHandler();
            }, autoplayDuration);
        }

        function removeAutoplay() {
            clearInterval(timer);
            autoplay = false;
            navLinks.forEach(link => link.classList.remove('current'));
            element.classList.add('autoplay-disabled')
        }

        navLinks.forEach((link, linkIndex) => {
            const handler = handleTabChange.bind(link, linkIndex);

            instances.push({
                link,
                handler
            });
            link.addEventListener('click', event => {
                event.preventDefault();
                removeAutoplay();
                handler();
            });
        });

        handleTabChange(activeIndex);

        setAutoplay();
    });
}

function destroy() {
    instances.forEach(instance => {
        instance.link.removeEventListener('click', instance.handler);
    });
}

export default {
    init,
    destroy
};
