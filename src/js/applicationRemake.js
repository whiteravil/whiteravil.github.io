import { gsap } from 'gsap';
import Inputmask from 'inputmask';

export default function applicationRemake() {
    const element = document.querySelector('.js-application-remake');

    if (element) {
        let activeStep = 0;
        const pagination = element.querySelector('.application__form-steps-numbers');
      
        const stepsContainer = element.querySelector('.application__form-steps-layers');

        const stepsItems = Array.from(stepsContainer.children);

        const stepsTotal = stepsItems.length;

        function setTab(index) {
            const tabCheckboxes = Array.from(element.querySelectorAll('.application__form-inner-tabs-checkbox-input'));
            const tabsContainer = element.querySelector('.application__form-inner-tabs-items');
     
            const tabItems = tabsContainer ? Array.from(tabsContainer.children) : [];
            const heightBefore = parseFloat(window.getComputedStyle(tabsContainer).getPropertyValue('height'));

            gsap.set(tabsContainer, {
                height: 'auto'
            });

            tabCheckboxes.forEach(box => (box.checked = false));
            tabItems.forEach(item => item.classList.remove('active'));
            tabCheckboxes[index].checked = true;
            tabItems[index].classList.add('active');

            const heightAfter = parseFloat(window.getComputedStyle(tabsContainer).getPropertyValue('height'));

            gsap.fromTo(
                tabsContainer,
                { height: heightBefore },
                {
                    duration: 0.4,
                    height: heightAfter,
                    clearProps: 'all'
                }
            );
        }

       

        function initializeTabs() {
            const tabCheckboxes = Array.from(element.querySelectorAll('.application__form-inner-tabs-checkbox-input'));
            const tabsContainer = element.querySelector('.application__form-inner-tabs-items');
            const tabItems = tabsContainer ? Array.from(tabsContainer.children) : [];
            tabCheckboxes.forEach((box, boxIndex) => {
                box.addEventListener('change', event => {
                    event.preventDefault();
                    setTab(boxIndex);
                });
            });

            if (tabItems.length >= 2) {
                setTab(0)
            }
        }

        initializeTabs();

      

        function updatePagination(index) {
            pagination.innerHTML = `Шаг ${index + 1} из ${stepsTotal}`;
        }

        function setStep(index) {
            const heightBefore = parseFloat(window.getComputedStyle(stepsContainer).getPropertyValue('height'));

            gsap.set(stepsContainer, {
                height: 'auto'
            });

            stepsItems.forEach(item => item.classList.remove('active'));
            stepsItems[index].classList.add('active');

            const heightAfter = parseFloat(window.getComputedStyle(stepsContainer).getPropertyValue('height'));

            gsap.fromTo(
                stepsContainer,
                { height: heightBefore },
                {
                    duration: 0.4,
                    height: heightAfter,
                    clearProps: 'all'
                }
            );

            activeStep = index;

            if (pagination) {
                updatePagination(index);
            }
        }

        setStep(activeStep);

        window.applicationRemakeAPI = {};
        window.applicationRemakeAPI.setStep = setStep;
        window.applicationRemakeAPI.setTab = setTab;
        window.applicationRemakeAPI.initializeTabs = initializeTabs;

        Array.from(element.querySelectorAll('[data-passport-series-mask]')).forEach(item => {
            const im = new Inputmask({
                mask: '9999',
                placeholder: ' ',
                showMaskOnHover: false,
                showMaskOnFocus: false
            });
            im.mask(item);
        });
        Array.from(element.querySelectorAll('[data-passport-number-mask]')).forEach(item => {
            const im = new Inputmask({ mask: '999999', placeholder: ' ', showMaskOnHover: false, showMaskOnFocus: false });
            im.mask(item);
        });
        Array.from(element.querySelectorAll('[data-department-mask]')).forEach(item => {
            const im = new Inputmask({ mask: '999-999', placeholder: ' ', showMaskOnHover: false, showMaskOnFocus: false });
            im.mask(item);
        });
        Array.from(element.querySelectorAll('[data-date-mask]')).forEach(item => {
            const im = new Inputmask({ mask: '99.99.9999', placeholder: ' ', showMaskOnHover: false, showMaskOnFocus: false });
            im.mask(item);
        });
        Array.from(element.querySelectorAll('[data-snils-mask]')).forEach(item => {
            const im = new Inputmask({ mask: '999 999 999 99', placeholder: ' ', showMaskOnHover: false, showMaskOnFocus: false });
            im.mask(item);
        });

        $(element)
            .parsley()
            .on('field:validated', function() {
                const totalFields = Array.from(element.querySelectorAll('[data-affect-progress]'));

                const successFields = totalFields.filter(field => field.classList.contains('parsley-success'));

                // console.log('Total form fields', totalFields);
                // console.log('Success form fields', successFields);

                const progress = (successFields.length / totalFields.length).toFixed(2) * 100;

                // console.log('Progress', progress)

                document.documentElement.style.setProperty('--progress', `${progress}%`);
            });
    }
}
