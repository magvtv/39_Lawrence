// LinkedIn API Configuration
const linkedInConfig = {
    clientId: window.appConfig.linkedIn.clientId,
    redirectUri: window.appConfig.linkedIn.redirectUri,
    scope: window.appConfig.linkedIn.scope
};

class FeedManager {
    constructor() {
        this.page = 1;
        this.itemsPerPage = 6;
        this.currentTab = 'all';
        this.init();
    }

    init() {
        this.feedContainer = document.querySelector('.feed-items');
        this.loadMoreBtn = document.querySelector('.load-more-btn');
        this.tabButtons = document.querySelectorAll('.feed-tab');
        
        if (!this.feedContainer) {
            console.error('Feed container not found');
            return;
        }

        this.setupEventListeners();
        this.loadContent();
    }

    setupEventListeners() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.page++;
                this.loadContent();
            });
        }

        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentTab = btn.dataset.tab;
                this.page = 1;
                this.updateActiveTab(btn);
                this.loadContent(true);
            });
        });
    }

    updateActiveTab(activeBtn) {
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    async loadContent(reset = false) {
        try {
            let items = [];
            
            // Get LinkedIn posts if needed
            if (this.currentTab === 'all' || this.currentTab === 'linkedin') {
                const linkedInPosts = await this.getLinkedInPosts();
                items = items.concat(linkedInPosts);
            }

            // Get custom content if needed
            if (this.currentTab === 'all' || this.currentTab === 'projects') {
                items = items.concat(window.customData.projects || []);
            }

            if (this.currentTab === 'all' || this.currentTab === 'publications') {
                items = items.concat(window.customData.publications || []);
            }

            // Sort all items by date
            items.sort((a, b) => new Date(b.date) - new Date(a.date));

            this.displayItems(items, reset);
        } catch (error) {
            console.error('Error loading content:', error);
            this.showError('Failed to load content');
        }
    }

    async getLinkedInPosts() {
        // For demo purposes, return sample LinkedIn posts
        return [
            {
                date: new Date().toISOString(),
                title: 'Recent LinkedIn Update',
                description: 'Excited to share updates about our latest initiatives in technology education.',
                link: 'https://www.linkedin.com/in/dr-lawrence-nderu',
                type: 'linkedin'
            },
            {
                date: new Date(Date.now() - 86400000).toISOString(),
                title: 'AI Research Progress',
                description: 'Making significant progress in our AI research projects. Looking forward to sharing more details soon.',
                link: 'https://www.linkedin.com/in/dr-lawrence-nderu',
                type: 'linkedin'
            }
        ];
    }

    displayItems(items, reset = false) {
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageItems = items.slice(start, end);

        if (reset) {
            this.feedContainer.innerHTML = '';
        }

        const html = pageItems.map(item => this.createItemElement(item)).join('');
        this.feedContainer.insertAdjacentHTML('beforeend', html);

        // Show/hide load more button
        this.loadMoreBtn.style.display = end < items.length ? 'block' : 'none';
    }

    createItemElement(item) {
        return `
            <div class="feed-item" data-type="${item.type}">
                <span class="source-badge">${this.getSourceLabel(item.type)}</span>
                <div class="date">${new Date(item.date).toLocaleDateString()}</div>
                <h3 class="title">${item.title}</h3>
                <p class="description">${item.description}</p>
                <a href="${item.link}" class="read-more" target="_blank">
                    Read More
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>
            </div>
        `;
    }

    getSourceLabel(type) {
        switch (type) {
            case 'linkedin':
                return 'LinkedIn';
            case 'projects':
                return 'Project';
            case 'publications':
                return 'Publication';
            default:
                return 'Update';
        }
    }

    showError(message) {
        console.error(message);
        this.feedContainer.innerHTML = `
            <div class="feed-error">
                <p>${message}</p>
                <button class="btn btn:hover" onclick="window.feedManager.loadContent(true)">
                    <span class="span">Try Again</span>
                </button>
            </div>
        `;
    }
}

// Initialize the feed when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.feedManager = new FeedManager();
}); 