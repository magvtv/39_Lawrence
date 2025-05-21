export default class Preloader {
    constructor() {
        this.preloader = document.querySelector("[data-preloader]");
        this.init();
    }

    init() {
        window.addEventListener("DOMContentLoaded", () => {
            this.preloader.classList.add("loaded");
            document.body.classList.add("loaded");
        });
    }
} 