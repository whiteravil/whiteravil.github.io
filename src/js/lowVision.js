export default function lowVision() {
    const btn = document.querySelector('.js-low-vision');

    if (btn) {
        btn.addEventListener('click', event => {
            event.preventDefault();
            if (localStorage.getItem('lowVision') == 1) {
                localStorage.setItem('lowVision', 0);
                document.body.classList.remove('low-vision');
                window.location.reload();
            } else {
                localStorage.setItem('lowVision', 1);
                document.body.classList.add('low-vision');
                window.location.reload();
            }
           
        });
    }

    if (localStorage.getItem('lowVision') == 1) {
        document.body.classList.add('low-vision');
        
    }
}
