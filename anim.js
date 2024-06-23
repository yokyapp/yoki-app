document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const phoneContainers = document.querySelectorAll('.phone-container');
    const animationTexts = document.querySelectorAll('.tell_text');
    const qrPhones = document.querySelectorAll('.qr_phone');
    const photo2Elements = document.querySelectorAll('.photo2');

    let currentSectionIndex = 0;
    let isScrolling = false;
    let touchStartY = 0;

    const scrollDuration = 700;

    const smoothScroll = (targetPosition) => {
        anime({
            targets: 'html, body',
            scrollTop: targetPosition,
            duration: scrollDuration,
            easing: 'easeInOutQuad',
            complete: () => { isScrolling = false; }
        });
    };

    const moveToSection = (index) => {
        if (isScrolling) return;
        isScrolling = true;
        const targetPosition = sections[index].offsetTop;
        smoothScroll(targetPosition);
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

    const handleTouchStart = (event) => {
        touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
        event.preventDefault();
    };

    const handleTouchEnd = (event) => {
        const touchEndY = event.changedTouches[0].clientY;
        const direction = touchStartY - touchEndY > 0 ? 1 : -1;
        if (isScrolling) return;

        if ((direction > 0 && currentSectionIndex < sections.length - 1) || (direction < 0 && currentSectionIndex > 0)) {
            currentSectionIndex += direction;
            moveToSection(currentSectionIndex);
        }
    };

    const debounce = (func, wait) => {
        let timeout;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };

    window.addEventListener('wheel', debounce(handleScroll, 100), { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    const resizeSections = () => {
        const viewportHeight = window.innerHeight;
        sections.forEach(section => {
            section.style.height = `${viewportHeight}px`;
        });
    };

    window.addEventListener('resize', resizeSections);
    resizeSections();

    moveToSection(currentSectionIndex);

    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            if (entry.isIntersecting) {
                anime({
                    targets: element,
                    translateY: [-50, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutExpo',
                    begin: () => { element.classList.add('scrolled'); },
                    complete: () => { isScrolling = false; }
                });
            } else {
                anime({
                    targets: element,
                    translateY: [0, -50],
                    opacity: [1, 0],
                    duration: 1000,
                    easing: 'easeOutExpo',
                    begin: () => { element.classList.remove('scrolled'); },
                    complete: () => { isScrolling = false; }
                });
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const observeElements = (elements) => {
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    const allElements = [...phoneContainers, ...animationTexts, ...qrPhones, ...photo2Elements];
    observeElements(allElements);
});
