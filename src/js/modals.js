import { lockScroll, unlockScroll } from './scrollBlocker';

export default function() {
    let activeModal = null;


    function openModal(id) {
        const modal = document.querySelector(id);
        if (modal) {
            lockScroll();
            modal.classList.add('active');
            activeModal = modal;
        } else {
            console.error(`Modal with ID: ${id} not found`);
        }
    }

    function closeModal(modal) {
        unlockScroll();
        modal.classList.remove('active');
        activeModal = null;
    }



    window.openModal = openModal;

    window.closeModal = closeModal;


   

    document.addEventListener('click', event => {
        
        if (event.target.matches('.js-open-modal') || event.target.closest('.js-open-modal')) {
            event.preventDefault();
            const link = event.target.matches('.js-open-modal') ? event.target : event.target.closest('.js-open-modal');
            const hash = link.hash;
            openModal(hash);
        } else if (event.target.matches('.js-close-modal') || event.target.closest('.js-close-modal')) {
            event.preventDefault();
            const modalToClose = event.target.closest('.js-modal');
            closeModal(modalToClose);
        } else if (event.target.matches('.js-modal')) {
            event.preventDefault();
            const modalToClose = event.target;
            closeModal(modalToClose);
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.which === 27 && activeModal) {
            closeModal(activeModal);
        }
    });
}
