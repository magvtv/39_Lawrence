import { addEventOnElements } from '../utils/dom.js';

export default class Navigation {
    constructor() {
        this.navbar = document.querySelector("[data-navbar]");
        this.navTogglers = document.querySelectorAll("[data-nav-toggler]");
        this.navLinks = document.querySelectorAll("[data-nav-link]");
        this.overlay = document.querySelector("[data-overlay]");
        this.header = document.querySelector("[data-header]");
        
        this.init();
    }

    init() {
        this.setupNavToggle();
        this.setupNavLinks();
        this.setupHeaderScroll();
    }

    setupNavToggle() {
        addEventOnElements(this.navTogglers, "click", () => {
            this.navbar.classList.toggle("active");
            this.overlay.classList.toggle("active");
            document.body.classList.toggle("nav-active");
        });
    }

    setupNavLinks() {
        addEventOnElements(this.navLinks, "click", () => {
            this.navbar.classList.remove("active");
            this.overlay.classList.remove("active");
            document.body.classList.remove("nav-active");
        });
    }

    setupHeaderScroll() {
        window.addEventListener("scroll", () => {
            this.header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
        });
    }
} 