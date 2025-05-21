import { addEventOnElements } from '../utils/dom.js';

export default class TabContent {
    constructor() {
        this.tabBtns = document.querySelectorAll("[data-tab-btn]");
        this.tabContents = document.querySelectorAll("[data-tab-content]");
        this.activeTabBtn = this.tabBtns[0];
        this.activeTabContent = this.tabContents[0];
        
        this.init();
    }

    init() {
        addEventOnElements(this.tabBtns, "click", this.handleTabClick.bind(this));
    }

    handleTabClick(event) {
        const newTabBtn = event.currentTarget;
        
        if (this.activeTabBtn !== newTabBtn) {
            // Remove active state from current tab
            this.activeTabBtn.classList.remove("active");
            this.activeTabContent.classList.remove("active");

            // Set new active tab
            newTabBtn.classList.add("active");
            this.activeTabBtn = newTabBtn;

            // Update content
            const newTabContent = document.querySelector(
                `[data-tab-content="${newTabBtn.dataset.tabBtn}"]`
            );
            newTabContent.classList.add("active");
            this.activeTabContent = newTabContent;
        }
    }
} 