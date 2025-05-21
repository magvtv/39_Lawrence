export default class ProjectSlider {
    constructor() {
        this.sliderContainer = document.querySelector('.slider-container');
        this.sliderList = document.querySelector('.slider-list');
        this.prevBtn = document.querySelector('.scroll-btn.prev');
        this.nextBtn = document.querySelector('.scroll-btn.next');
        this.slideWidth = 0;
        
        if (this.sliderList) {
            this.init();
        }
    }

    init() {
        // Calculate slide width including gap
        const firstSlide = this.sliderList.querySelector('.slider-item');
        if (firstSlide) {
            const style = window.getComputedStyle(firstSlide);
            this.slideWidth = firstSlide.offsetWidth + parseInt(style.marginRight || 0);
        }

        this.setupEventListeners();
        this.checkOverflow();
        this.checkScrollPosition();
    }

    setupEventListeners() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.scroll('prev'));
            this.nextBtn.addEventListener('click', () => this.scroll('next'));
        }
        
        // Update states on scroll
        this.sliderList.addEventListener('scroll', () => {
            this.checkScrollPosition();
            this.checkOverflow();
        });
        
        // Update on window resize
        window.addEventListener('resize', () => {
            const firstSlide = this.sliderList.querySelector('.slider-item');
            if (firstSlide) {
                const style = window.getComputedStyle(firstSlide);
                this.slideWidth = firstSlide.offsetWidth + parseInt(style.marginRight || 0);
            }
            this.checkOverflow();
            this.checkScrollPosition();
        });

        // Initial check for overflow
        this.checkOverflow();
    }

    checkOverflow() {
        if (this.sliderContainer) {
            const hasOverflow = this.sliderList.scrollWidth > this.sliderList.clientWidth;
            this.sliderContainer.classList.toggle('has-more', hasOverflow);
        }
    }

    scroll(direction) {
        const scrollLeft = this.sliderList.scrollLeft;
        const maxScroll = this.sliderList.scrollWidth - this.sliderList.clientWidth;

        if (direction === 'next') {
            const nextScroll = Math.min(scrollLeft + this.slideWidth, maxScroll);
            this.sliderList.scrollTo({
                left: nextScroll,
                behavior: 'smooth'
            });
        } else {
            const prevScroll = Math.max(scrollLeft - this.slideWidth, 0);
            this.sliderList.scrollTo({
                left: prevScroll,
                behavior: 'smooth'
            });
        }
    }

    checkScrollPosition() {
        if (!this.prevBtn || !this.nextBtn) return;

        const scrollLeft = this.sliderList.scrollLeft;
        const maxScroll = this.sliderList.scrollWidth - this.sliderList.clientWidth;

        // Show/hide prev button
        this.prevBtn.style.opacity = scrollLeft <= 0 ? '0' : '1';
        
        // Show/hide next button
        this.nextBtn.style.opacity = scrollLeft >= maxScroll ? '0' : '1';
    }
} 