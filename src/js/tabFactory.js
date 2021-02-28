import { gsap } from 'gsap';

export default function(elements, initialActiveTab = 0) {
    let instances = [];

    let initialized = false;

    let tabChangeCallbacks = [];

    function init() {
        elements.forEach(element => {
            const tabsNav = Array.from(element.querySelectorAll(':not(.js-tabs-item) .js-tabs-nav'));
            const tabItems = Array.from(element.querySelectorAll(':not(.js-tabs-item) .js-tabs-item'));

            if (tabsNav.length !== tabItems.length) throw new Error('Not equal amount of tab items and tab links');

            function setActiveTab(index, event) {
                if (event) event.preventDefault();

                const heightBefore = parseFloat(window.getComputedStyle(element).getPropertyValue('height'));

                gsap.set(element, {
                    height: 'auto'
                });

                tabsNav.forEach(btn => btn.classList.remove('active'));
                tabItems.forEach(item => item.classList.remove('active'));
                tabsNav[index].classList.add('active');
                tabItems[index].classList.add('active');

                const heightAfter = parseFloat(window.getComputedStyle(element).getPropertyValue('height'));

                gsap.fromTo(
                    element,
                    { height: heightBefore },
                    {
                        duration: 0.4,
                        height: heightAfter,
                        clearProps: 'all'
                    }
                );


                tabChangeCallbacks.forEach(cb => cb(index));
            }

            tabsNav.forEach((btn, btnIndex) => {
                const handler = setActiveTab.bind(btn, btnIndex);
                btn.addEventListener('click', handler);

                const instance = {
                    btn,
                    handler
                };

                instances.push(instance);
            });

            setActiveTab(initialActiveTab);
        });
        initialized = true
    }


    function isInitialized() {
        return initialized;
    }


    function destroy() {
        instances.forEach(instance => instance.btn.removeEventListener('click', instance.handler));
        tabChangeCallbacks = [];
    }

    function onTabChange(func) {
        tabChangeCallbacks.push(func);
    }

    return {
        onTabChange,
        isInitialized,
        init,
        destroy
    }
}