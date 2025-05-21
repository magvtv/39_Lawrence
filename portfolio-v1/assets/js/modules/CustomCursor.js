import { addEventOnElements } from '../utils/dom.js';

export default class CustomCursor {
    constructor() {
        this.cursors = document.querySelectorAll("[data-cursor]");
        this.hoveredElements = [
            ...document.querySelectorAll("button"),
            ...document.querySelectorAll("a")
        ];
        
        this.init();
    }

    init() {
        this.setupCursorMovement();
        this.setupHoverEffects();
    }

    setupCursorMovement() {
        window.addEventListener("mousemove", (event) => {
            const posX = event.clientX;
            const posY = event.clientY;

            // Cursor dot position
            this.cursors[0].style.left = `${posX}px`;
            this.cursors[0].style.top = `${posY}px`;

            // Cursor outline position with delay
            setTimeout(() => {
                this.cursors[1].style.left = `${posX}px`;
                this.cursors[1].style.top = `${posY}px`;
            }, 80);
        });
    }

    setupHoverEffects() {
        // Add hovered class on mouseover
        addEventOnElements(this.hoveredElements, "mouseover", () => {
            this.cursors.forEach(cursor => cursor.classList.add("hovered"));
        });

        // Remove hovered class on mouseout
        addEventOnElements(this.hoveredElements, "mouseout", () => {
            this.cursors.forEach(cursor => cursor.classList.remove("hovered"));
        });
    }
} 