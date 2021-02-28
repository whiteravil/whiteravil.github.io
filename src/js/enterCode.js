export default function enterCode() {
    const elements = Array.from(document.querySelectorAll('.js-enter-code'));

    elements.forEach(element => {
        const inputs = Array.from(element.querySelectorAll('input'));

        inputs.forEach((input, inputIndex) => {
            input.addEventListener('focus', event => {
                input.value = ''
            })
            input.addEventListener('input', () => {

                const value = input.value.trim().length ? input.value[0] : '';
                const newCleanedValue = parseInt(value.replace(/[^\d]+/g, ''), 10);
                if (isNaN(newCleanedValue)) {
                    input.value = '';
                } else {
                    input.value = newCleanedValue;

                    
                }

                if (input.value.trim() !== '') {
                    if (inputs[inputIndex + 1]) {
                        inputs[inputIndex + 1].focus();
                        // inputs[inputIndex + 1].value = ''
                        console.log('Filled going forward')
                    }
                } 
            });

            input.addEventListener('keydown', event => {
                if (!event.key) return;
                if (event.key === "Backspace" || event.key === "Delete") {
                    if (input.value.trim() === '') {
                        if (inputs[inputIndex - 1]) {
                            inputs[inputIndex - 1].focus();
                            // inputs[inputIndex + 1].value = ''
                           
                        }
                    }
                }
            })
        });
    });
}
