import noUiSlider from 'noUiSlider';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { debounce } from 'lodash';

momentDurationFormatSetup(moment);

moment.updateLocale('ru', {
    durationLabelsStandard: {
        M: 'месяц',
        MM: 'месяца',
        MMM: 'месяцев',
        y: 'год',
        yy: 'года',
        yyy: 'лет'
    },
    durationPluralKey: function(token, integerValue, decimalValue) {
        if (integerValue === 1) {
            return token;
        } else if (integerValue > 1 && integerValue <= 4) {
            return token + token;
        } else {
            return token + token + token;
        }
    }
});

moment.locale('ru');

function init() {
    const rangeSliders = Array.from(document.querySelectorAll('.js-range-slider'));

    rangeSliders.forEach(slider => {
        const rangeInput = slider.querySelector('.range-slider__input');
        const customRangeSliderElement = slider.querySelector('.range-slider__element');
        const displayedAmountElement = slider.querySelector('.range-slider__amount');
        const manualInput = displayedAmountElement.matches('input');
        const minValue = rangeInput.hasAttribute('min') ? cleanInput(rangeInput.getAttribute('min')) : 0;
        const maxValue = rangeInput.hasAttribute('max') ? cleanInput(rangeInput.getAttribute('max')) : 150000;
        const stepValue = rangeInput.hasAttribute('step') ? cleanInput(rangeInput.getAttribute('step')) : 500;
        const units = rangeInput.hasAttribute('data-units') ? rangeInput.getAttribute('data-units') : 'rub';
        const floatValue = rangeInput.hasAttribute('data-float-value');
        const form = slider.closest('form');
        // const noDivisions = rangeInput.hasAttribute('data-no-divisions');
        let initialRangeValue = checkValue(cleanInput(rangeInput.value));

        

        function cleanInput(value) {
            const cleanedValue = value.toString().replace(/\s/g, '');
            if (floatValue) {
                return parseFloat(cleanedValue);
            }
            return parseInt(cleanedValue, 10);
        }

        function checkValue(value) {
            if (value > maxValue) {
                return maxValue;
            } else if (value < minValue || !value) {
                return minValue;
            } else {
                return value;
            }
        }

        function handleManualInput(event) {
            const value = event.target.value;
            let cleanedValue = cleanInput(value);
            if (isNaN(cleanedValue)) cleanedValue = '';
            customRangeSliderElement.noUiSlider.set(cleanedValue);

            setValue(cleanedValue);
        }

        const checkManualInput = debounce(function(event) {
            const value = event.target.value;
            const clearedValue = checkValue(cleanInput(value));
            setValue(clearedValue);
        }, 1200);

        function setValue(value) {
            dispatchRangeUpdateEvent(value);
            rangeInput.value = value;

            const formattedValue = formatValue(value);

            if (manualInput) {
                displayedAmountElement.value = formattedValue;
            } else {
                displayedAmountElement.textContent = formattedValue;
            }
        }

        function addDivisions(value) {
            // if (noDivisions) return value;
            return value.toLocaleString();
            
        }

        function monthsToHumanReadable(value) {
            const duration = moment.duration(value, 'months');
            const formattedDuration = duration.format('M __', {
                trim: 'small',
                userLocale: 'ru'
            });
            return formattedDuration;
        }

        function formatValue(value) {
            if (units === 'months') {
                return value;
                // return monthsToHumanReadable(value);
            } else {
                return addDivisions(value);
            }
        }

        function dispatchRangeUpdateEvent(value) {
            const event = new CustomEvent('rangeupdate', { detail: value });
            rangeInput.dispatchEvent(event);


            const changeEvent = new CustomEvent('change');
            rangeInput.dispatchEvent(changeEvent);

            // if (typeof(Event) === 'function') {
            //     const changeEvent = new Event('change');
            //     rangeInput.dispatchEvent(changeEvent);
            // } else {
            //     const changeEvent = document.createEvent('Event');
            //     event.initEvent('change', true, true);
            //     rangeInput.dispatchEvent(changeEvent);
            // }
        
        }

        noUiSlider.create(customRangeSliderElement, {
            start: [initialRangeValue || 1],
            connect: 'lower',
            orientation: 'horizontal',
            step: stepValue,
            range: {
                min: minValue,
                max: maxValue
            }
        });

        customRangeSliderElement.noUiSlider.on('update', () => {
            const newValue = cleanInput(customRangeSliderElement.noUiSlider.get());
            setValue(newValue);
        });

        if (manualInput) {
            displayedAmountElement.addEventListener('input', handleManualInput);
            displayedAmountElement.addEventListener('focusout', () => {
                console.log('Focusout triggered')
                let value = displayedAmountElement.value;
                let cleanedValue = checkValue(cleanInput(value));
                if (isNaN(cleanedValue)) cleanedValue = '';
                customRangeSliderElement.noUiSlider.set(cleanedValue);
                
                setValue(cleanedValue);
            });
            
            displayedAmountElement.addEventListener('input', checkManualInput);
            // displayedAmountElement.addEventListener('focus', () => {
            //     let cleanedValue = '';
            //     customRangeSliderElement.noUiSlider.set(cleanedValue);
    
            //     setValue(cleanedValue);
            // });


        }


        rangeInput.setValue = function(value) {
            let cleanedValue = checkValue(cleanInput(value));
            if (isNaN(cleanedValue)) cleanedValue = '';
            customRangeSliderElement.noUiSlider.set(cleanedValue);
            
            setValue(cleanedValue);
        }


        rangeInput.setAnyValue = function(value) {
            let cleanedValue = cleanInput(value);
            if (isNaN(cleanedValue)) cleanedValue = '';
            customRangeSliderElement.noUiSlider.set(cleanedValue);
            
            setValue(cleanedValue);
        }

        if (form) {
            form.addEventListener('reset', () => {
                console.log('Parent form has been reset')

                customRangeSliderElement.noUiSlider.reset()
            })
        }
    });
}

function initWithExceptionHandling() {
    try {
        init();
    } catch (err) {
        console.error('error in range sliders', err);
       
    }
}

function destroy() {}

export default {
    init: initWithExceptionHandling,
    destroy
};
