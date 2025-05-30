class FeedManager {
    constructor() {
        this.page = 1;
        this.itemsPerPage = 6;
        this.currentTab = 'all';
        this.init();
    }

    init() {
        this.feedContainer = document.querySelector('.feed-items');
        this.loadMoreBtn = document.querySelector('.feed .btn');
        this.tabButtons = document.querySelectorAll('.feed-tabs .tab-btn');
        
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
            // Show loading state
            const loadingElement = document.querySelector('.feed-loading');
            if (loadingElement) loadingElement.classList.add('active');
            
            let items = [];
            
            // Get LinkedIn posts
            if (this.currentTab === 'all' || this.currentTab === 'linkedin') {
                // First try to get posts from customData
                if (window.customData && window.customData.linkedin && window.customData.linkedin.length > 0) {
                    items = items.concat(window.customData.linkedin);
                } else {
                    // Fallback to LinkedInService
                    try {
                        const linkedInPosts = await window.LinkedInService.getPosts();
                        items = items.concat(linkedInPosts);
                    } catch (error) {
                        console.error('Error fetching LinkedIn posts:', error);
                        
                        // Add fallback LinkedIn posts
                        items = items.concat([
                            {
                                type: 'linkedin',
                                title: 'Recent LinkedIn Update',
                                description: 'Excited to share updates about our latest initiatives in technology education.',
                                date: '2023-05-30',
                                link: '#',
                                image: './assets/images/interview-1.jpeg'
                            },
                            {
                                type: 'linkedin',
                                title: 'AI Research Progress',
                                description: 'Making significant progress in our AI research projects. Looking forward to sharing more details soon.',
                                date: '2023-05-29',
                                link: '#',
                                image: './assets/images/interview-2.jpeg'
                            }
                        ]);
                    }
                }
            }

            // Get project content
            if (this.currentTab === 'all' || this.currentTab === 'projects') {
                if (window.customData && window.customData.projects) {
                    const projectItems = window.customData.projects.map(project => ({
                        ...project,
                        type: 'projects'
                    }));
                    items = items.concat(projectItems);
                } else {
                    // Add fallback project
                    items = items.concat([
                        {
                            type: 'projects',
                            title: 'JHUB Africa Initiative',
                            description: 'Launching a new tech hub for emerging talent in Africa focused on AI and blockchain technologies.',
                            date: '2023-03-15',
                            link: '#',
                            image: './assets/images/interview-3.jpeg'
                        }
                    ]);
                }
            }

            // Get publication content
            if (this.currentTab === 'all' || this.currentTab === 'publications') {
                if (window.customData && window.customData.publications) {
                    const publicationItems = window.customData.publications.map(pub => ({
                        ...pub,
                        type: 'publications'
                    }));
                    items = items.concat(publicationItems);
                } else {
                    // Add fallback publication
                    items = items.concat([
                        {
                            type: 'publications',
                            title: 'Fuzzy Logic in Healthcare Systems',
                            description: 'A comprehensive review of fuzzy logic applications in modern healthcare diagnostic systems.',
                            date: '2023-03-01',
                            link: '#',
                            image: './assets/images/philosophy.jpeg'
                        }
                    ]);
                }
            }

            // Sort all items by date
            items.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Hide loading state
            if (loadingElement) loadingElement.classList.remove('active');
            
            this.displayItems(items, reset);
        } catch (error) {
            console.error('Error loading content:', error);
            this.showError('Failed to load content');
        }
    }

    displayItems(items, reset = false) {
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageItems = items.slice(start, end);

        if (reset) {
            this.feedContainer.innerHTML = '';
        }

        if (pageItems.length === 0) {
            this.feedContainer.innerHTML = `
                <div class="feed-empty">
                    <p>No items to display.</p>
                </div>
            `;
            if (this.loadMoreBtn) this.loadMoreBtn.style.display = 'none';
            return;
        }

        const html = pageItems.map(item => this.createItemElement(item)).join('');
        this.feedContainer.insertAdjacentHTML('beforeend', html);

        // Show/hide load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.style.display = end < items.length ? 'inline-flex' : 'none';
        }
    }

    createItemElement(item) {
        const dateFormatted = new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `
            <div class="feed-card">
                ${item.image ? `
                    <figure class="card-banner">
                        <img src="${item.image}" alt="${item.title}" class="img-cover">
                    </figure>
                ` : ''}
                <div class="card-content">
                    <div class="meta-wrapper">
                        <span class="card-category">${this.getSourceLabel(item.type)}</span>
                        <span class="card-date">${dateFormatted}</span>
                    </div>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.description}</p>
                    <a href="${item.link}" class="read-more-btn" target="_blank">
                        Read More
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                </div>
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
        
        // Remove any existing toast
        const existingToast = document.querySelector('.feed-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create and show new toast
        const toast = document.createElement('div');
        toast.className = 'feed-toast';
        toast.innerHTML = `
            <span>${message}</span>
            <button class="retry-btn">
                Try Again
            </button>
        `;
        
        // Add event listener to retry button
        const retryBtn = toast.querySelector('.retry-btn');
        retryBtn.addEventListener('click', () => {
            this.loadContent(true);
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
        
        document.body.appendChild(toast);
        
        // Trigger reflow for animation
        toast.offsetHeight;
        toast.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

export default FeedManager; 