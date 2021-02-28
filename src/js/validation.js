import 'parsleyjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)


window.Parsley.addValidator('requiredIfChecked', {
    requirementType: 'string',
    validateString: function(value, requirement) {
        console.log('Validating', value)

        const checkbox = document.querySelector(requirement);

        if (!checkbox) {
            return false;
        }

        if (checkbox.checked && !value.trim()) {
            return false;
        }

        return true;
    },
    messages: {
        en: 'Required field',
        ru: 'Обязательное поле'
    },
    priority: 33
});

window.Parsley.addValidator('phone', {
    requirementType: 'string',
    validateString: function(value) {
        if (value.trim() === '') return true;
        return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
    },
    messages: {
        en: 'This value should be a mobile number',
        ru: 'Введите правильный номер мобильного телефона'
    }
});
window.Parsley.addValidator('passportseries', {
    requirementType: 'string',
    validateString: function(value) {
        if (value.trim() === '') return true;
        return /^[0-9]{4}$/.test(value);
    },
    messages: {
        en: 'Enter correct passport series',
        ru: 'Введите правильно серию паспорта'
    }
});
window.Parsley.addValidator('passportnumber', {
    requirementType: 'string',
    validateString: function(value) {
        if (value.trim() === '') return true;
        return /^[0-9]{6}$/.test(value);
    },
    messages: {
        en: 'Enter correct passport number',
        ru: 'Введите правильно номер паспорта'
    }
});
window.Parsley.addValidator('department', {
    requirementType: 'string',
    validateString: function(value) {
        if (value.trim() === '') return true;
        return /^[0-9]{3}\-[0-9]{3}$/.test(value);
    },
    messages: {
        en: 'Enter correct department number',
        ru: 'Введите правильно код подразделения'
    }
});
window.Parsley.addValidator('snils', {
    requirementType: 'string',
    validateString: function(value) {
        if (value.trim() === '') return true;
        const newValue = value.toString().replace(/\s/g, '');
        console.log('Validating new snils value', newValue)
        
        return /^[0-9]{11}$/.test(newValue);
    },
    messages: {
        en: 'Enter correct SNILS number',
        ru: 'Введите правильно номер СНИЛС'
    },
    priority: 5
});
window.Parsley.addValidator('date', {
    requirementType: 'string',
    validateString: function(value) {
        if (value.trim() === '') return true;
        console.log('Validating date', {
            value,
            valid: dayjs(value, 'DD.MM.YYYY', true).isValid()
        })
        return dayjs(value, 'DD.MM.YYYY', true).isValid()
    },
    messages: {
        en: 'Enter correct date',
        ru: 'Введите правильно дату'
    }
});




Parsley.addMessages('ru', {
    defaultMessage: 'Некорректное значение.',
    type: {
        email: 'В данном поле может быть только E-mail',
        url: 'Адрес сайта введен неверно.',
        number: 'Введите число.',
        integer: 'Введите целое число.',
        digits: 'Введите только цифры.',
        alphanum: 'Введите буквенно-цифровое значение.'
    },
    notblank: 'Это поле должно быть заполнено.',
    required: 'Обязательное поле',
    pattern: 'Это значение некорректно.',
    min: 'Это значение должно быть не менее чем %s.',
    max: 'Это значение должно быть не более чем %s.',
    range: 'Это значение должно быть от %s до %s.',
    minlength: 'Это значение должно содержать не менее %s символов.',
    maxlength: 'Это значение должно содержать не более %s символов.',
    length: 'Это значение должно содержать от %s до %s символов.',
    mincheck: 'Выберите не менее %s значений.',
    maxcheck: 'Выберите не более %s значений.',
    check: 'Выберите от %s до %s значений.',
    equalto: 'Это значение должно совпадать.'
});

Parsley.setLocale('ru');

function init() {
    const formsToValidate = Array.from(document.querySelectorAll('form[data-need-validation]'));

    formsToValidate.forEach(form => {
        $(form).parsley();
    });
}

function destroy() {}

export default {
    init,
    destroy
};
