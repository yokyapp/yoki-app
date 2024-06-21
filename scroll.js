document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    const scrollSensitivity = 1.5;
    const scrollDuration = 700;

    const smoothScroll = (targetPosition) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed / scrollDuration) * distance + startPosition;
            window.scrollTo(0, run);
            if (timeElapsed < scrollDuration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    const moveToSection = (index) => {
        if (isScrolling) return;
        isScrolling = true;

        const targetPosition = sections[index].offsetTop;
        console.log(`Moving to section ${index}, target position: ${targetPosition}px`);

        smoothScroll(targetPosition);

        const targetPhonePosition = index * 100;
        console.log(`Phone animation starts to translateY(${targetPhonePosition}vh)`);

        setTimeout(() => {
            isScrolling = false;
        }, scrollDuration);
    };

    const handleScroll = (event) => {
        event.preventDefault();

        if (isScrolling) return;

        const direction = event.deltaY > 0 ? 1 : -1;
        if ((direction > 0 && currentSectionIndex < sections.length - 1) || (direction < 0 && currentSectionIndex > 0)) {
            currentSectionIndex += direction;
            moveToSection(currentSectionIndex);
        }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    const resizeSections = () => {
        const viewportHeight = window.innerHeight;
        sections.forEach(section => {
            section.style.height = `${viewportHeight}px`;
        });
    };

    window.addEventListener('resize', resizeSections);
    resizeSections();

    moveToSection(currentSectionIndex);
});
