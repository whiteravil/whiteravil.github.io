import { gsap } from 'gsap';

export default function() {
    const openAccounts = Array.from(document.querySelectorAll('.js-open-account'));

    openAccounts.forEach(element => {
        const steps = Array.from(element.querySelectorAll('.open-account__form-layer'));
        const content = element.querySelector('.open-account__content')
        const stepLinksContainer = element.querySelector('.open-account__steps');
        let activeStep = 0;
        let stepLinks = [];

        function generateStepLinks() {
            stepLinksContainer.innerHTML = '';
            steps.forEach((step, stepIndex) => {
                const stepLink = document.createElement('a');
                stepLink.className = 'open-account__step';
                stepLink.href = '#';
                stepLink.textContent = stepIndex + 1;
                stepLinks.push(stepLink);
                stepLinksContainer.appendChild(stepLink);
            });
        }

        function updateStepLinks() {
            stepLinks.forEach((stepLink, stepIndex) => {
                stepLink.classList.remove('active');
                if (stepIndex === activeStep) {
                    stepLink.classList.add('active');
                }
            });
        }

        function setActiveStep(index) {
            const heightBefore = parseFloat(window.getComputedStyle(content).getPropertyValue('height'));
            gsap.set(content, {
                height: 'auto'
            });
            steps.forEach(step => step.classList.remove('active'));
            steps[index].classList.add('active');
            activeStep = index;
            updateStepLinks();

            const heightAfter = parseFloat(window.getComputedStyle(content).getPropertyValue('height'));

            gsap.fromTo(
                content,
                { height: heightBefore },
                {
                    duration: .4,
                    height: heightAfter,
                    clearProps: 'all' 
                }
            );
        }

        generateStepLinks();
        setActiveStep(activeStep);


        element.addEventListener('click', event => {
            if (event.target.matches('.open-account__step') || event.target.closest('.open-account__step')) {
                event.preventDefault();
                const link = event.target.matches('.open-account__step') ? event.target : event.target.closest('.open-account__step');
                const linkIndex = stepLinks.indexOf(link);
                setActiveStep(linkIndex);
            } else if (event.target.matches('.open-account__btns-next-btn') || event.target.closest('.open-account__btns-next-btn')) {
                event.preventDefault();
                if (activeStep < steps.length) {
                    setActiveStep(activeStep + 1);
                }
            }
        })
    });
}
