
function init() {
    const openLinks = Array.from(document.querySelectorAll('.js-open-mobile-submenu-link'));
    const closeLinks = Array.from(document.querySelectorAll('.js-close-mobile-submenu-link'));

    openLinks.forEach(link => {
        const content = link.nextElementSibling;
        if (!content || !content.matches('.js-open-mobile-submenu-content')) {
            console.error('No content', link);
            return;
        }
        link.addEventListener('click', event => {
            event.preventDefault();
            content.classList.add('active');
           
        })
    });


    closeLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const content = link.closest('.js-open-mobile-submenu-content');

            if (!content) {
                console.error('No content', link);
                return;
            }

            content.classList.remove('active');
        })
    })
    
}
function destroy() {

}


export default {
    init,
    destroy
};
