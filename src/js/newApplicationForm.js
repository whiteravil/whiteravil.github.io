import { gsap } from 'gsap';

import Inputmask from 'inputmask';

export default function newApplicationForm() {
    const elements = Array.from(document.querySelectorAll('.js-new-application-form'));

    elements.forEach(element => {
        const form = element;
        const pagination = element.querySelector('.application__form-steps-numbers');

        const stepsContainer = element.querySelector('.application__form-steps-layers');

        const stepsItems = Array.from(stepsContainer.children);

        const stepsTotal = stepsItems.length;

        const nextBtn = element.querySelector('.js-form-next');
        const prevBtn = element.querySelector('.js-form-prev');

        const tabsContainer = element.querySelector('.application__form-inner-tabs-items');
        const tabItems = tabsContainer ? Array.from(tabsContainer.children) : [];
        const tabCheckboxes = Array.from(element.querySelectorAll('.application__form-inner-tabs-checkbox-input'));
        const secondStepRequiredInputs = Array.from(form.querySelectorAll('[data-parsley-group="secondstep"][required]'));

        console.log('secondStepRequiredInputs', secondStepRequiredInputs);

        let activeStep = 0;
        let activeCheckboxIndex = tabCheckboxes.findIndex(box => box.checked);
        let mode = '';

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

        $(form)
            .parsley()
            .on('field:validated', function() {
                const totalFields = Array.from(form.querySelectorAll('[data-affect-progress]'));

                const successFields = totalFields.filter(field => field.classList.contains('parsley-success'));

                // console.log('Total form fields', totalFields);
                // console.log('Success form fields', successFields);

                const progress = (successFields.length / totalFields.length).toFixed(2) * 100;

                // console.log('Progress', progress)

                document.documentElement.style.setProperty('--progress', `${progress}%`);
            });

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

        function setTab(index) {
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

            mode = Array.from(form.querySelectorAll('input[type="radio"][name="mode"]')).find(radio => radio.checked).value;

            if (mode === 'automatic') {
                secondStepRequiredInputs.forEach(input => (input.required = false));
            } else {
                secondStepRequiredInputs.forEach(input => (input.required = true));
            }

            console.log('Mode', mode);

            activeCheckboxIndex = index;
        }

        setStep(activeStep);

        if (stepsTotal >= 2) {
            setTab(0);
        }

        element.setStep = setStep;

        const codeInput = element.querySelector('.js-code-input');
        const codeInputWrapper = element.querySelector('.js-code-input-wrapper');
        const errorMessage = element.querySelector('.js-code-error-message');
        const confirmationRow = element.querySelector('.js-confirmation-row');
        const getCodeBtns = Array.from(element.querySelectorAll('.js-get-code-btn'));
        const clearCodeInputBtns = Array.from(document.querySelectorAll('.js-clear-code-input'));

        getCodeBtns.forEach(btn => {
            btn.addEventListener('click', async event => {
                event.preventDefault();
                if (typeof element.sendCode === 'function') {
                    try {
                        await element.sendCode();
                        confirmationRow.classList.add('shown');
                    } catch (err) {
                        return;
                    }
                }
            });
        });

        clearCodeInputBtns.forEach(btn => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                const input = btn.parentElement.querySelector('.js-code-input');

                if (input) input.value = '';
            });
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', async event => {
                event.preventDefault();
                const validationResult = $(form)
                    .parsley()
                    .validate({ group: 'firststep' });

                // console.log('Validation result before next step', validationResult);

                if (!validationResult) return;

                if (typeof element.validateCode === 'function') {
                    try {
                        const codeValidationResult = await element.validateCode(codeInput.value);

                        console.log(`Code ${codeInput.value} validated`, codeValidationResult);

                        errorMessage.classList.remove('shown');
                        codeInputWrapper.classList.remove('code-error');
                        confirmationRow.classList.remove('shown');

                        const phoneInput = element.querySelector('.js-phone-input');
                        const mainSendCodeBtn = element.querySelector('.js-main-send-code-btn');

                        if (mainSendCodeBtn) {
                            mainSendCodeBtn.style.display = 'none';
                        }
                        if (phoneInput) {
                            phoneInput.setAttribute('readonly', '');
                            console.log('Setting field as readonly', phoneInput);
                        }
                    } catch (err) {
                        errorMessage.classList.add('shown');
                        codeInputWrapper.classList.add('code-error');
                        console.error(`Code ${codeInput.value} validation failed`);
                        return;
                    }
                } else {
                    console.log('No validation function for code');
                }

                if (activeStep + 1 < stepsTotal) {
                    setStep(activeStep + 1);
                    if (stepsTotal >= 2) {
                        setTab(0);
                    }
                } else {
                    return;
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', event => {
                event.preventDefault();
                if (activeStep - 1 >= 0) {
                    setStep(activeStep - 1);
                } else {
                    return;
                }
            });
        }

        tabCheckboxes.forEach((box, boxIndex) => {
            box.addEventListener('change', event => {
                event.preventDefault();
                setTab(boxIndex);
            });
        });
    });
}
