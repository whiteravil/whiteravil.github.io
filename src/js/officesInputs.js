export default function officesForms() {
    const officesForms = Array.from(document.querySelectorAll('.offices__list-view-search-form'));

    officesForms.forEach(element => {
        const input = element.querySelector('input');
        element.addEventListener('submit', event => {
            if (!input.value || !input.value.trim()) {
                event.preventDefault();
            }
        })
    })
}