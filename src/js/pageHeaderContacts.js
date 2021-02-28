export default function pageHeaderContacts() {
    const element = document.querySelector('.js-page-header-contacts')


    if (element) {
        const btn = element.querySelector('.page-header__contacts-btn')
        btn.addEventListener('click', event => {
            event.preventDefault();
            element.classList.toggle('active');
        });


        element.addEventListener('mouseenter', event => {
            element.classList.add('active');
        })
        element.addEventListener('mouseleave', event => {
            element.classList.remove('active');
        })


        document.addEventListener('click', event => {
            if (!event.target.matches('.js-page-header-contacts') && !event.target.closest('.js-page-header-contacts')) {
                element.classList.remove('active');
            }
            if (event.target.matches('.page-header__contacts-dropdown-close') || event.target.closest('.page-header__contacts-dropdown-close')) {
                element.classList.remove('active');
            }


        })
    }

   
}