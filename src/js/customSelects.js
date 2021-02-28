
import Choices from 'choices.js';

let instances = [];

function init() {
    const customSelects = Array.from(document.querySelectorAll('.js-custom-select'));

    customSelects.forEach(select => {
        let instance = new Choices(select, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false
        });

        instances.push(instance)
    })
   
}

function destroy() {
    instances.forEach(instance => instance.destroy());
    instances = [];
  
}

export default {
    init,
    destroy
};
