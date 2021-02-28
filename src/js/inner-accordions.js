// import { ScrollTrigger } from "gsap/ScrollTrigger";

let animating = false;

function openAccordeon(element) {
    element.style.maxHeight = 'none';
    const computedStyle = getComputedStyle(element);
    const computedHeight = computedStyle.height;
    element.style.maxHeight = '';
    animating = true;
    element && element.scrollTop;

    const transitionEndHandler = () => {
      
        element.style.maxHeight = 'none';
        element.removeEventListener('transitionend', transitionEndHandler);
        animating = false;
        // ScrollTrigger.refresh(true);
    };
    element.addEventListener('transitionend', transitionEndHandler);
    element.style.maxHeight = `${computedHeight}`;
}

function closeAccordeon(element) {
    const computedStyle = getComputedStyle(element);
    const computedHeight = computedStyle.height;
    element.style.maxHeight = `${computedHeight}`;

    element && element.scrollTop;

    element.style.maxHeight = '';

    // ScrollTrigger.refresh(true);
}

export default function(accordionElements, openFirst = false) {
    let accordionInstances = [];
    let initialized = false;

    function init() {
        accordionElements.forEach(element => {
            const btns = Array.from(element.querySelectorAll('.js-additional-info-inner-accordion-btn'));
            const content = element.querySelector('.js-additional-info-inner-accordion-content');

            if (!content || !btns.length) {
                console.warn('No content or accordion btns');
                return;
            }

        
            const handler = function(event) {
                if (animating) return;

                if (event) {
                    event.preventDefault();
                    if (event.relatedTarget) {
                        event.relatedTarget.focus();
                    } else {
                        event.currentTarget.blur();
                    }
                }

                if (!element.classList.contains('active')) {
                    accordionInstances.forEach(acc => {
                        closeAccordeon(acc.content);
                    });
                    accordionElements.forEach(element => element.classList.remove('active'));
                    openAccordeon(content);
                    element.classList.add('active');
                } else {
                    closeAccordeon(content);
                    element.classList.remove('active');
                }
            };

            btns.forEach(btn => {
                btn.addEventListener('click', handler);
            });

            accordionInstances.push({
                btns,
                content,
                handler,
                element
            });
        });

        if (openFirst && accordionInstances.length) {
            accordionInstances[0].btns.length && accordionInstances[0].btns[0].click();
        }

        initialized = true;
    }

    function destroy() {
        accordionInstances.forEach(instance => {
            instance.btns.forEach(btn => btn.removeEventListener('click', instance.handler));
        });
        accordionInstances = [];
        initialized = false;
    }

    function getInstances() {
        return accordionInstances;
    }

    function isInitailized() {
        return initialized;
    }

    return {
        init,
        destroy,
        isInitailized,
        getInstances
    };
}
