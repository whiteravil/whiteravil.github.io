import Inputmask from 'inputmask';

let instances = [];
function init() {
    const phoneInputs = Array.from(document.querySelectorAll('.js-phone-input'));
    phoneInputs.forEach(input => {
        const instance = new Inputmask({ mask: '+7 (999) 999-99-99' });
        instance.mask(input);

        instances.push(instance);
    });
}

function destroy() {
    instances.forEach(instance => {
        
        instance.remove();
    });
    instances = [];
}

export default {
    init,
    destroy
}