import { addEventOnElements } from '../utils/dom.js';

export default class TiltEffect {
    constructor() {
        this.tiltElements = document.querySelectorAll("[data-tilt]");
        this.init();
    }

    init() {
        this.tiltElements.forEach(element => {
            element.addEventListener("mousemove", (e) => this.handleTilt(e, element));
            element.addEventListener("mouseout", () => this.resetTilt(element));
        });
    }

    handleTilt(event, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const tiltPosY = ((mouseX - centerX) / centerX) * 10;
        const tiltPosX = ((mouseY - centerY) / centerY) * 10;

        element.style.transform = `perspective(1000px) rotateX(${-tiltPosX}deg) rotateY(${tiltPosY}deg)`;
    }

    resetTilt(element) {
        element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
} 