import accordions from './accordions';
import gsap from 'gsap';

export default function() {
    const bankOffices = Array.from(document.querySelectorAll('.js-bank-offices'));

    bankOffices.forEach(element => {
        const toggles = Array.from(element.querySelectorAll('.js-offices-results-view-toggle'));
        const viewLayers = Array.from(element.querySelectorAll('.js-offices-results-view'));

        function setActiveLayer() {
            const activeIndex = toggles.findIndex(toggle => toggle.checked);
            if (activeIndex === -1) {
                console.error('Active toggle not found');
                return;
            }

            viewLayers.forEach(layer => layer.classList.remove('active'));

            viewLayers[activeIndex].classList.add('active');
        }

        toggles.forEach(toggle => toggle.addEventListener('change', setActiveLayer));

        setActiveLayer();
    });

    document.addEventListener('click', event => {
        if (event.target.matches('.js-accordion-btn') || event.target.closest('.js-accordion-btn')) {
         
            const accordion = event.target.closest('.js-offices-accordion');

            if (!accordion) {
                // console.error('No root accordion found');
                return;
            }
            event.preventDefault();
            
            const content = accordion.querySelector('.offices__list-view-accordion-body');

            if (accordion.classList.contains('active')) {
                accordion.classList.remove('active');
                gsap.to(content, {
                    height: 0,
                    duration: 0.4
                })
            } else {
                accordion.classList.add('active');
                gsap.to(content, {
                    height: 'auto',
                    duration: 0.4
                })
            }

            const otherAccordions = Array.from(document.querySelectorAll('.js-offices-accordion'));

            otherAccordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion && accordion.classList.contains('active')) {
                    otherAccordion.classList.remove('active');
                    const content = otherAccordion.querySelector('.offices__list-view-accordion-body')
                    gsap.to(content, {
                        height: 0,
                        duration: 0.4
                    })
                }
            })

           
        }
    })










   
}
