function init() {
    const layers = Array.from(document.querySelectorAll('.navigation__currency-layer'));

    if (layers.length) {
        let activeIndex = 0;
        const autoplay = 2500;
        function setLayer(index) {
            layers.forEach(layer => layer.classList.remove('active'));
            layers[index].classList.add('active');
            activeIndex = index;
        }
    
        setLayer(0);
    
        setInterval(() => {
            const nextIndex = activeIndex + 1;
            if (layers[nextIndex]) {
                setLayer(nextIndex);
            } else {
                setLayer(0);
            }
        }, autoplay);
    }

   
}

function destroy() {}

export default {
    init,
    destroy
};
