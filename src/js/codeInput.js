export default function codeInput() {
    const codeInputs = Array.from(document.querySelectorAll('.js-code-input'));
    codeInputs.forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value;
            const newCleanedValue = parseInt(value.replace(/[^\d]+/g,''), 10);
            if (isNaN(newCleanedValue)) {
                input.value = '';
            } else {
                input.value = newCleanedValue;
            }
        })
    })


   
}