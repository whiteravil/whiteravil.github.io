import { gsap } from 'gsap';

function init() {
    const currencyBlocks = Array.from(document.querySelectorAll('.js-currency'));

    currencyBlocks.forEach(element => {
        const currentCity = element.querySelector('.offices__city-current');
        const cities = Array.from(element.querySelectorAll('.offices__city-dropdown-link'));
        const outerTabs = Array.from(element.querySelectorAll('.currency__outer-tab-item'));
        const outerTabsParent = element.querySelector('.currency__outer-tabs');
        const innerTabBtns = Array.from(element.querySelectorAll('.js-tabs-nav'));
        let outerTabsIndex = 0;

        console.log(outerTabs)
        function setCity(index) {
            cities.forEach(city => city.classList.remove('selected'));
            const newCity = cities[index];
            newCity.classList.add('selected');
            currentCity.textContent = newCity.textContent;

            changeOuterTabs(index);
        }

        function changeOuterTabs(index) {
            const heightBefore = parseFloat(window.getComputedStyle(outerTabsParent).getPropertyValue('height'));

            gsap.set(outerTabsParent, {
                height: 'auto'
            });

            outerTabs.forEach(tab => tab.classList.remove('active'));
            outerTabs[index].classList.add('active');
            outerTabsIndex = index;

            const heightAfter = parseFloat(window.getComputedStyle(outerTabsParent).getPropertyValue('height'));

            gsap.fromTo(
                outerTabsParent,
                { height: heightBefore },
                {
                    duration: 0.4,
                    height: heightAfter,
                    clearProps: 'all'
                }
            );

            setInnerTabs(0);
        }

        function setInnerTabs(index) {
            const currentOuterTab = outerTabs[outerTabsIndex];
            const innerTabsParent = currentOuterTab.querySelector('.tab-items');
            const innerTabs = Array.from(currentOuterTab.querySelectorAll('.tab-items__item'));

            const heightBefore = parseFloat(window.getComputedStyle(innerTabsParent).getPropertyValue('height'));

            gsap.set(innerTabsParent, {
                height: 'auto'
            });

            innerTabs.forEach(tab => tab.classList.remove('active'));
            innerTabs[index].classList.add('active');
            innerTabBtns.forEach(tab => tab.classList.remove('active'));
            innerTabBtns[index].classList.add('active')

            const heightAfter = parseFloat(window.getComputedStyle(innerTabsParent).getPropertyValue('height'));

            gsap.fromTo(
                innerTabsParent,
                { height: heightBefore },
                {
                    duration: 0.4,
                    height: heightAfter,
                    clearProps: 'all'
                }
            );
        }

        setCity(0);

        setInnerTabs(0);

        cities.forEach((btn, btnIndex) =>
            btn.addEventListener('click', event => {
                event.preventDefault();
                setCity(btnIndex);
            })
        );

        innerTabBtns.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                setInnerTabs(btnIndex);
            })
        })
    });
}

function destroy() {}

export default {
    init,
    destroy
};
