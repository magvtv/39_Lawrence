export default class TestimonialCarousel {
    constructor() {
        this.testimonials = [
            {
                quote: "Dr. Nderu's teaching approach transformed my understanding of AI and Machine Learning. His practical methods and real-world applications made complex concepts accessible and exciting.",
                name: "James Mwangi",
                role: "Fourth Year Student, Computer Science",
                image: "./assets/images/testimonials/student.jpg"
            },
            {
                quote: "Having collaborated with Lawrence on several Microsoft initiatives in Africa, his dedication to nurturing tech talent and fostering innovation is unmatched.",
                name: "Sarah Chen",
                role: "Senior Frontend Developer, Microsoft",
                image: "./assets/images/testimonials/microsoft.jpg"
            },
            {
                quote: "A brilliant mind with an exceptional ability to bridge academic theory with industry practice. His research contributions have significantly impacted our department.",
                name: "Dr. Patricia Kamau",
                role: "Fellow Lecturer, Computer Science Department",
                image: "./assets/images/testimonials/lecturer.jpg"
            },
            {
                quote: "Dr. Nderu's vision for African tech innovation aligns perfectly with our mission. His insights have been invaluable to our collaborative projects.",
                name: "Hiroshi Tanaka",
                role: "Chief Executive, JICA-PAUSTI",
                image: "./assets/images/testimonials/executive.jpg"
            },
            {
                quote: "His understanding of digital transformation and its application in African markets has been instrumental in shaping our tech initiatives.",
                name: "Peter Ndegwa",
                role: "Managing Director, Safaricom",
                image: "./assets/images/testimonials/director.jpg"
            }
        ];

        this.currentIndex = 0;
        this.container = document.querySelector('.testi-content');
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.render();
        this.startRotation();
        this.setupResizeHandler();
    }

    render() {
        const current = this.testimonials[this.currentIndex];
        
        // Create new testimonial element
        const newTestimonial = document.createElement('div');
        newTestimonial.className = 'testimonial-slide';
        newTestimonial.innerHTML = `
            <div class="testimonial-content">
                <blockquote class="title h4 section-text">
                    &ldquo; ${current.quote} &rdquo;
                </blockquote>

                <div class="profile-card">
                    <figure class="card-banner img-holder" style="--width: 70; --height: 70;">
                        <img src="${current.image}" width="70" height="70" loading="lazy" alt="${current.name}"
                            class="img-cover">
                    </figure>

                    <div>
                        <p class="title h5 card-title">
                            ${current.name}
                        </p>

                        <p class="card-subtitle">
                            ${current.role}
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Create progress indicators
        const indicators = document.createElement('div');
        indicators.className = 'testimonial-indicators';
        indicators.innerHTML = this.testimonials
            .map((_, index) => `
                <button class="indicator ${index === this.currentIndex ? 'active' : ''}" 
                        data-index="${index}" aria-label="View testimonial ${index+1}">
                </button>
            `)
            .join('');

        // Add click handlers to indicators
        indicators.addEventListener('click', (e) => {
            if (e.target.matches('.indicator') && !this.isTransitioning) {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            }
        });

        // Handle transition
        const oldTestimonial = this.container.querySelector('.testimonial-slide');
        if (oldTestimonial) {
            oldTestimonial.classList.remove('active');
            setTimeout(() => {
                oldTestimonial.remove();
                this.container.innerHTML = '';
                this.container.appendChild(newTestimonial);
                this.container.appendChild(indicators);
                
                // Trigger entrance animation after a brief delay
                requestAnimationFrame(() => {
                    newTestimonial.classList.add('active');
                    this.adjustHeight();
                });
            }, 500); // Match this with CSS transition duration
        } else {
            this.container.appendChild(newTestimonial);
            this.container.appendChild(indicators);
            requestAnimationFrame(() => {
                newTestimonial.classList.add('active');
                this.adjustHeight();
            });
        }
    }

    goToSlide(index) {
        if (this.currentIndex === index || this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentIndex = index;
        this.render();
        
        // Reset transition lock after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    startRotation() {
        setInterval(() => {
            if (!this.isTransitioning) {
                const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
                this.goToSlide(nextIndex);
            }
        }, 5000);
    }
    
    // Adjust container height based on content
    adjustHeight() {
        const activeSlide = this.container.querySelector('.testimonial-slide.active');
        if (activeSlide) {
            // Get content height including testimonial content and indicators
            const contentHeight = activeSlide.querySelector('.testimonial-content').offsetHeight;
            const indicatorsHeight = this.container.querySelector('.testimonial-indicators').offsetHeight;
            
            // Set min-height based on content plus padding
            const totalHeight = contentHeight + indicatorsHeight + 60; // Adding some padding
            this.container.style.minHeight = `${totalHeight}px`;
        }
    }
    
    // Handle window resize events
    setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.adjustHeight();
            }, 250);
        });
    }
} 