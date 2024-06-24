class SectionScroller {
    constructor(options = {}) {
        this.sections = document.querySelectorAll('.section');
        this.phone = document.querySelector('.phone-container');
        this.phoneOverflow = document.querySelector('#phoneOverflow');
        this.secondaryPhone = document.querySelector('.secondary-phone');
        this.animatedText = document.querySelector('.tell_text');
        this.currentSectionIndex = 0;
        this.isScrolling = false;
        this.touchStartY = 0;
        this.scrollSensitivity = options.scrollSensitivity || 1.5;
        this.scrollDuration = options.scrollDuration || 700;
        this.phoneStyles = options.phoneStyles || [];
        this.mobilePhoneStyles = options.mobilePhoneStyles || [];
        this.imageMappings = options.imageMappings || [];
        this.secondaryPhoneSection = options.secondaryPhoneSection || null;
        this.animatTextSection = options.animatTextSection || null;

        this.init();
    }

    init() {
        this.addEventListeners();
        this.resizeSections();
        this.checkViewport();
        this.moveToSection(this.currentSectionIndex);
    }

    addEventListeners() {
        window.addEventListener('wheel', this.handleScroll.bind(this), { passive: false });
        window.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        window.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        window.addEventListener('resize', this.resizeSections.bind(this));
        window.addEventListener('resize', this.checkViewport.bind(this));
    }

    smoothScroll(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed / this.scrollDuration) * distance + startPosition;
            window.scrollTo(0, run);
            if (timeElapsed < this.scrollDuration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    moveToSection(index) {
        if (this.isScrolling) return;
        this.isScrolling = true;

        const targetPosition = this.sections[index].offsetTop;
        this.smoothScroll(targetPosition);
        this.animatePhone(index);
        this.updatePhoneImage(index);
        this.updateSecondaryPhone(index);
        this.animateText(index)

        setTimeout(() => {
            this.isScrolling = false;
        }, this.scrollDuration);
    }

    animatePhone(index) {
        const style = this.currentPhoneStyles[index] || { x: 0, y: 0, width: 100, od: 'dvw' };
        this.phone.style.transform = `translate(${style.x}%, ${style.y}%)`;
        this.phone.style.width = `${style.width}${style.od}`;
        this.phoneOverflow.style.borderRadius = `${style.br}dvw`;
        console.log(`Phone animation to position X: ${style.x}%, Y: ${style.y}%, Width: ${style.width}${style.od}`);
    }

    checkViewport() {
        if (window.innerWidth <= 768) {
            this.currentPhoneStyles = this.mobilePhoneStyles;
        } else {
            this.currentPhoneStyles = this.phoneStyles;
        }
    }

    updatePhoneImage(index) {
        const images = document.querySelectorAll('.phone .photo');
        images.forEach((img, i) => {
            if (this.imageMappings[index] === i) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    updateSecondaryPhone(index) {
        if (this.secondaryPhoneSection !== null && index === this.secondaryPhoneSection) {
            this.secondaryPhone.classList.add('active');
        } else {
            this.secondaryPhone.classList.remove('active');
        }
    }

    animateText(index) {
        if (this.animatTextSection !== null && index === this.animatTextSection) {
            this.animatedText.classList.add('active');
        } else {
            this.animatedText.classList.remove('active');
        }
    }

    handleScroll(event) {
        event.preventDefault();

        if (this.isScrolling) return;

        const direction = event.deltaY > 0 ? 1 : -1;
        if ((direction > 0 && this.currentSectionIndex < this.sections.length - 1) || (direction < 0 && this.currentSectionIndex > 0)) {
            this.currentSectionIndex += direction;
            this.moveToSection(this.currentSectionIndex);
        }
    }

    handleTouchStart(event) {
        this.touchStartY = event.touches[0].clientY;
    }

    handleTouchMove(event) {
        event.preventDefault(); // Prevent default scrolling
    }

    handleTouchEnd(event) {
        const touchEndY = event.changedTouches[0].clientY;
        const direction = this.touchStartY - touchEndY > 0 ? 1 : -1;
        if (this.isScrolling) return;

        if ((direction > 0 && this.currentSectionIndex < this.sections.length - 1) || (direction < 0 && this.currentSectionIndex > 0)) {
            this.currentSectionIndex += direction;
            this.moveToSection(this.currentSectionIndex);
        }
    }

    resizeSections() {
        const viewportHeight = window.innerHeight;
        this.sections.forEach(section => {
            section.style.height = `${viewportHeight}px`;
        });
    }

    getCurrentSectionIndex() {
        return this.currentSectionIndex;
    }

    getCurrentSectionElement() {
        return this.sections[this.currentSectionIndex];
    }

    calculateWidthHeight() {
        return window.innerHeight * (this.phone.offsetWidth / this.phone.offsetHeight);
    }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const phoneContainer = document.querySelector('.phone-container');
    const widthHeight = window.innerHeight * (phoneContainer.offsetWidth / phoneContainer.offsetHeight);
    const normanlWidthHeight =  widthHeight - widthHeight * 0.05

    const scroller = new SectionScroller({
        scrollSensitivity: 1.5,
        scrollDuration: 700,
        phoneStyles: [
            { x: -42, y: 4, width: 41, od: "dvw" }, // main
            { x: -30, y: 2.5, width: normanlWidthHeight, od: "px", br: 5 }, // tell
            { x: -16, y: -12, width: 55, od: "dvw" }, // tell 2
            { x: -30, y: 2.5, width: normanlWidthHeight, od: "px", br: 5 }, // badge
            { x: -30, y: 2.5, width: normanlWidthHeight, od: "px", br: 5 }, // now let find
            { x: -16, y: 2.5, width: 55, od: "dvw", br: 6.5 }, // find your ideal
            { x: -30, y: 2.5, width: normanlWidthHeight, od: "px", br: 5 }, // explore
            { x: -30, y: 2.5, width: normanlWidthHeight, od: "px" }, // found
            { x: -16, y: -68, width: 55, od: "dvw",  br: 6.5 }, // now sent
            { x: -30, y: 2.5, width: normanlWidthHeight, od: "px" }, // tell about yourself
            { x: -50, y: 250, width: normanlWidthHeight, od: "px" },
            { x: -50, y: 250, width: normanlWidthHeight, od: "px" },
        ],
        mobilePhoneStyles: [
            { x: -50, y: 55, width: 90, od: "dvw" }, // main
            { x: -20, y: 2.5, width: normanlWidthHeight, od: "px", br: 5 }, // tell
            { x: -50, y: 45, width: 90, od: "dvw" }, // tell 2
            { x: -75, y: 40, width: normanlWidthHeight - normanlWidthHeight * 0.35, od: "px", br: 5 }, // badge
            { x: -50, y: 30, width: normanlWidthHeight - normanlWidthHeight * 0.25, od: "px", br: 5 }, // now let find
            { x: -50, y: 42, width: 90, od: "dvw", br: 6.5 }, // find your ideal
            { x: -50, y: 35, width: normanlWidthHeight - normanlWidthHeight * 0.25, od: "px", br: 5 }, // explore
            { x: -50, y: 35, width: normanlWidthHeight - normanlWidthHeight * 0.25, od: "px" }, // found
            { x: -50, y: -55, width: 90, od: "dvw",  br: 6.5 }, // now sent
            { x: -20, y: 2.5, width: normanlWidthHeight, od: "px", }, // tell about yourself
            { x: -50, y: 200, width: 90, od: "dvw" },
            { x: -50, y: 200, width: 90, od: "dvw" },
        ],
        imageMappings: [
            0, // main
            1, // Show photo2 in section 1
            1,  // Show photo3 in section 2
            1,  // Show photo3 in section 2
            2, // find what
            3, // find ideal
            4, // explore
            5, // chose
            5, // Show photo3 in section 2
            6, // Show photo3 in section 2
        ],
        animatTextSection: 2,
        secondaryPhoneSection: 3
    });

    console.log('Current section index:', scroller.getCurrentSectionIndex());
    console.log('Current section element:', scroller.getCurrentSectionElement());
});
