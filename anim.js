window.addEventListener('scroll', () => {
    const animationElements = document.querySelectorAll('.phone-container');
    const animationsText = document.querySelectorAll('.tell_text');
    const qr_phone = document.querySelectorAll('.qr_phone');
    const photo2 = document.querySelectorAll('.photo2');

    const triggerDistance = window.innerHeight - 400;
    const triggerDistance2 = window.innerHeight * 2 - 400;
    const triggerDistance3 = window.innerHeight * 3 - 400;

    function addTransition(element) {
        element.style.transition = 'transform 1s, width 1s, top 1s';
    }

    function removeTransition(element) {
        setTimeout(() => {
            element.style.transition = '';
        }, 1000);
    }

    function manageScrollAnimations(elements, scrollY, triggerDistances) {
        elements.forEach(element => {
            triggerDistances.forEach((distance, index) => {
                const className = `scrolled${index ? index + 1 : ''}`;
                if (scrollY > distance) {
                    if (!element.classList.contains(className)) {
                        addTransition(element);
                        element.classList.add(className);
                    }
                } else {
                    if (element.classList.contains(className)) {
                        addTransition(element);
                        element.classList.remove(className);
                        removeTransition(element);
                    }
                }
            });
        });
    }

    const scrollY = window.scrollY;
    const triggerDistances = [triggerDistance, triggerDistance2, triggerDistance3];
    manageScrollAnimations(animationElements, scrollY, triggerDistances);
    manageScrollAnimations(photo2, scrollY, [triggerDistance]);
    manageScrollAnimations(animationsText, scrollY, [triggerDistance2]);
    manageScrollAnimations(qr_phone, scrollY, [triggerDistance3]);
});