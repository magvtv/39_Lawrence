class FeedManager {
    constructor() {
        this.page = 1;
        this.itemsPerPage = 6;
        this.currentTab = 'articles';
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
            
            // Get LinkedIn content
            if (this.currentTab === 'linkedin') {
                try {
                    // Check if LinkedInService is available
                    if (typeof LinkedInService !== 'undefined') {
                        console.log('Using LinkedInService from module import');
                        const linkedInPosts = await LinkedInService.getPosts();
                        items = items.concat(linkedInPosts);
                    } else if (window.LinkedInService) {
                        console.log('Using LinkedInService from window object');
                        const linkedInPosts = await window.LinkedInService.getPosts();
                        items = items.concat(linkedInPosts);
                    } else {
                        console.error('LinkedInService not available');
                        this.showError('LinkedIn service unavailable');
                        // Fallback to static data if available
                        if (window.customData && window.customData.linkedin) {
                            items = items.concat(window.customData.linkedin);
                        } else {
                            // Show empty state if no data is available
                            if (loadingElement) loadingElement.classList.remove('active');
                            this.displayEmptyState('No LinkedIn data available. Please try again later.');
                            return;
                        }
                    }
                } catch (error) {
                    console.error('Error fetching LinkedIn posts:', error);
                    this.showError('Failed to load LinkedIn data');
                    // Fallback to static data if available
                    if (window.customData && window.customData.linkedin) {
                        items = items.concat(window.customData.linkedin);
                    } else {
                        // Show empty state if no data is available
                        if (loadingElement) loadingElement.classList.remove('active');
                        this.displayEmptyState('No LinkedIn data available. Please try again later.');
                        return;
                    }
                }
            }
            
            // Get articles content
            if (this.currentTab === 'articles') {
                if (window.customData && window.customData.articles) {
                    const articleItems = window.customData.articles.map(article => ({
                        ...article,
                        type: 'articles'
                    }));
                    items = items.concat(articleItems);
                } else {
                    // Add fallback articles
                    items = items.concat([
                        {
                            type: 'articles',
                            title: 'Machine Learning in Healthcare',
                            description: 'Exploring how ML algorithms are transforming diagnostic procedures and patient care in modern healthcare settings.',
                            date: '2023-06-15',
                            link: '#',
                            image: './assets/images/interview-1.jpeg'
                        },
                        {
                            type: 'articles',
                            title: 'Digital Identity Systems',
                            description: 'A comprehensive review of modern approaches to digital identity management and their implications for privacy.',
                            date: '2023-05-20',
                            link: '#',
                            image: './assets/images/interview-2.jpeg'
                        },
                        {
                            type: 'articles',
                            title: 'Fuzzy Logic in Decision Systems',
                            description: 'How fuzzy logic principles are being applied in decision support systems across various industries.',
                            date: '2023-04-10',
                            link: '#',
                            image: './assets/images/interview-3.jpeg'
                        }
                    ]);
                }
            }

            // Get favorites content
            if (this.currentTab === 'favorites') {
                if (window.customData && window.customData.favorites) {
                    const favoriteItems = window.customData.favorites.map(favorite => ({
                        ...favorite,
                        type: 'favorites'
                    }));
                    items = items.concat(favoriteItems);
                } else {
                    // Add fallback favorites
                    items = items.concat([
                        {
                            type: 'favorites',
                            title: 'The Future of AI Ethics',
                            description: 'A thought-provoking discussion on the ethical considerations in artificial intelligence development.',
                            date: '2023-06-10',
                            link: '#',
                            image: './assets/images/philosophy.jpeg',
                            source: 'MIT Technology Review'
                        },
                        {
                            type: 'favorites',
                            title: 'Blockchain in Education',
                            description: 'How blockchain technology can revolutionize credential verification and educational record-keeping.',
                            date: '2023-05-05',
                            link: '#',
                            image: './assets/images/interview-3.jpeg',
                            source: 'Harvard Business Review'
                        },
                        {
                            type: 'favorites',
                            title: 'The Rise of African Tech Hubs',
                            description: 'An analysis of the growing tech ecosystem across African nations and its global impact.',
                            date: '2023-04-20',
                            link: '#',
                            image: './assets/images/interview-2.jpeg',
                            source: 'TechCrunch'
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
            this.showError('Loading failed');
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
        const date = new Date(item.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const truncateDescription = (text, maxLength = 120) => {
            if (!text) return '';
            if (text.length <= maxLength) return text;
            return text.substr(0, maxLength) + '...';
        };
        
        const sourceLabel = item.type === 'favorites' && item.source 
            ? item.source 
            : this.getSourceLabel(item.type);
        
        return `
            <div class="feed-card">
                <div class="card-banner">
                    <img src="${item.image || './assets/images/interview-1.jpeg'}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <div class="meta-wrapper">
                        <span class="card-category">${sourceLabel}</span>
                        <span class="card-date">${date}</span>
                    </div>
                    <h3 class="card-title"><a href="${item.link || '#'}">${item.title}</a></h3>
                    <p class="card-text">${truncateDescription(item.description)}</p>
                    <a href="${item.link || '#'}" class="read-more-btn">
                        Read More <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>
                </div>
            </div>
        `;
    }

    getSourceLabel(type) {
        switch (type) {
            case 'articles':
                return 'Article';
            case 'favorites':
                return 'Favorite';
            case 'linkedin':
                return 'LinkedIn';
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
        
        // Create and show new toast with concise message
        const toast = document.createElement('div');
        toast.className = 'feed-toast';
        toast.innerHTML = `
            <span>Loading failed</span>
            <button class="retry-btn">
                Retry
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

    displayEmptyState(message) {
        if (!this.feedContainer) return;
        
        this.feedContainer.innerHTML = `
            <div class="feed-empty">
                <p>${message || 'No items to display.'}</p>
            </div>
        `;
        
        if (this.loadMoreBtn) {
            this.loadMoreBtn.style.display = 'none';
        }
    }
}

export default FeedManager; 