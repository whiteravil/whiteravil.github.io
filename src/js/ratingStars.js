let instances = [];

function init() {
    const ratingBlocks = Array.from(document.querySelectorAll('.js-rating-stars'));

    ratingBlocks.forEach(element => {
        const starsCheckboxes = Array.from(element.querySelectorAll('.rating__form-star-input'));
        const totalRatingInput = element.querySelector('.rating__form-total-rating');

        function setInitialrating() {
            const totalRating = starsCheckboxes.reduce((accumulator, currentElement) => {
                return accumulator + (currentElement.checked ? 1 : 0);
            }, 0);

            totalRatingInput.value = totalRating;
        }

        function handleRatingChange(index) {
            let totalRating = 0;
            starsCheckboxes.forEach((checkbox, checkboxIndex) => {
                checkbox.checked = false;
                if (checkboxIndex <= index) {
                    checkbox.checked = true;
                    totalRating++;
                }
            });

            totalRatingInput.value = totalRating;
        }

        setInitialrating();

        starsCheckboxes.forEach((checkbox, checkboxIndex) => {
            const handler = handleRatingChange.bind(this, checkboxIndex);
            checkbox.addEventListener('change', handler);

            checkbox.addEventListener('change', () => {
                const event = new CustomEvent('ratingchange', { detail: checkboxIndex });

                document.dispatchEvent(event);
            });

            const instance = {
                checkbox,
                handler
            };
            instances.push(instance);
        });

        document.addEventListener('ratingchange', event => {
            console.log('Event detail', event.detail);
            handleRatingChange(event.detail);
        });
    });
}

function destroy() {
    instances.forEach(instance => {
        instance.checkbox.removeEventListener('change', instance.handler);
    });
}

export default {
    init,
    destroy
};
