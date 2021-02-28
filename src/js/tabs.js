import { gsap } from 'gsap';

let instances = [];

function init() {
    const tabs = Array.from(document.querySelectorAll('.js-tabs'));

    tabs.forEach(element => {
        const tabsNav = Array.from(element.querySelectorAll('.js-tabs-nav'));

        if (element.matches('.js-tabs-constructor')) {
            if (document.body.classList.contains('is-admin')) return;
            const tabItemsContainer = element.querySelector('.js-tab-items');
            if (!tabItemsContainer) {
                console.warn('No tab items container specified');
                return;
            }
            const moveTabItem = (id, btn) => {
                const blocksToMove = Array.from(document.querySelectorAll(`[data-id="${id.replace('#', '')}"]`));
                if (!blocksToMove.length) {
                    console.warn('No blocks to move');
                    btn.remove();
                    console.warn('Removing button to keep indexes in sync', btn)
                    return;
                }
                const tabItem = document.createElement('div');
                tabItem.className = 'tab-items__item js-tabs-item';
                tabItem.append(...blocksToMove);
                tabItemsContainer.appendChild(tabItem);
            }

            tabsNav.forEach(btn => {
                const id = btn.hash;
                if (!id) {
                    console.warn('No block id on btn', btn);
                    return;
                }

                moveTabItem(id, btn);
            })
        }


        const tabItems = Array.from(element.querySelectorAll('.js-tabs-item'));

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
                    duration: .4,
                    height: heightAfter,
                    clearProps: 'all' 
                }
            );
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

        setActiveTab(0);
    });
}

function destroy() {
    instances.forEach(instance => {
        instance.btn.removeEventListener('click', instance.handler);
    });
    instances = [];
}

export default {
    init,
    destroy
};
