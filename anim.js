window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const animationElement = document.querySelectorAll('.anim');

    const triggerDistance = 300;
    if (scrollY > triggerDistance) {
        animationElement.classList.add('scrolled');
    } else {
        animationElement.classList.remove('scrolled');
    }
});