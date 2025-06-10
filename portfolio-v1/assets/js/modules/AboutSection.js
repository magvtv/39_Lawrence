/**
 * AboutSection Module
 * Handles the dynamic rendering of about section content
 */
export default class AboutSection {
    constructor() {
        console.log('AboutSection: Initializing');
        this.aboutData = window.customData?.about || {};
        console.log('AboutSection: Data loaded', this.aboutData);
        this.init();
    }

    init() {
        // Wait for DOM content to be loaded
        if (document.readyState === 'loading') {
            console.log('AboutSection: DOM still loading, adding event listener');
            document.addEventListener('DOMContentLoaded', () => this.renderContent());
        } else {
            console.log('AboutSection: DOM already loaded, rendering content');
            this.renderContent();
        }
    }

    renderContent() {
        console.log('AboutSection: Rendering content');
        this.renderPhilosophy();
        this.renderExperience();
        this.renderEducation();
        this.renderCertifications();
        this.renderCollaborations();
    }

    renderPhilosophy() {
        const data = this.aboutData.philosophy;
        console.log('AboutSection: Rendering philosophy', data);
        if (!data) return;

        const container = document.querySelector('[data-tab-content="about"]');
        if (!container) {
            console.error('AboutSection: Philosophy container not found');
            return;
        }

        // Update image if it exists
        const imageElement = container.querySelector('.about-banner img');
        if (imageElement && data.image) {
            imageElement.src = data.image;
            imageElement.alt = data.title || 'Philosophy';
        }

        // Update title if it exists
        const titleElement = container.querySelector('.section-title');
        if (titleElement && data.title) {
            titleElement.textContent = data.title;
        }

        // Update description if it exists
        const descriptionElement = container.querySelector('.section-text');
        if (descriptionElement && data.description) {
            descriptionElement.textContent = data.description;
        }

        // Add or update the quote
        let quoteElement = container.querySelector('.philosophy-quote');
        if (!quoteElement) {
            quoteElement = document.createElement('blockquote');
            quoteElement.className = 'philosophy-quote';
            
            const quoteText = document.createElement('p');
            quoteText.className = 'quote-text';
            quoteText.textContent = '"Better product always beats a good idea"';
            
            quoteElement.appendChild(quoteText);
            
            // Insert after the description
            if (descriptionElement) {
                descriptionElement.after(quoteElement);
            }
        }
    }

    renderExperience() {
        const data = this.aboutData.experience;
        console.log('AboutSection: Rendering experience', data);
        if (!data) return;

        const container = document.querySelector('[data-tab-content="skillset"]');
        if (!container) {
            console.error('AboutSection: Experience container not found');
            return;
        }

        // Update image if it exists
        const imageElement = container.querySelector('.skill-banner img');
        if (imageElement && data.image) {
            imageElement.src = data.image;
            imageElement.alt = data.title || 'Experience';
        }

        // Update title if it exists
        const titleElement = container.querySelector('.section-title');
        if (titleElement && data.title) {
            titleElement.textContent = data.title;
        }

        // Update description if it exists
        const descriptionElement = container.querySelector('.section-text');
        if (descriptionElement && data.description) {
            descriptionElement.textContent = data.description;
        }

        // Update or create experience items
        if (data.items && data.items.length > 0) {
            const skillList = container.querySelector('.skill-list');
            if (skillList) {
                skillList.innerHTML = ''; // Clear existing items
                
                data.items.forEach((item, index) => {
                    const listItem = document.createElement('li');
                    
                    const skillWrapper = document.createElement('div');
                    skillWrapper.className = 'skill-wrapper';
                    
                    const titleSpan = document.createElement('span');
                    titleSpan.className = 'span';
                    titleSpan.textContent = `${item.title} at ${item.organization}`;
                    
                    const valueSpan = document.createElement('span');
                    valueSpan.className = 'value';
                    valueSpan.textContent = item.duration;
                    
                    skillWrapper.appendChild(titleSpan);
                    skillWrapper.appendChild(valueSpan);
                    
                    const progressBar = document.createElement('div');
                    progressBar.className = 'progress-bar';
                    
                    const progressFill = document.createElement('div');
                    progressFill.className = 'progress-fill';
                    // Calculate width based on position (first item has most experience)
                    const width = 100 - (index * 10);
                    progressFill.style.width = `${width}%`;
                    
                    progressBar.appendChild(progressFill);
                    
                    listItem.appendChild(skillWrapper);
                    listItem.appendChild(progressBar);
                    
                    skillList.appendChild(listItem);
                });
            }
        }
    }

    renderEducation() {
        const data = this.aboutData.education;
        console.log('AboutSection: Rendering education', data);
        if (!data) return;

        const container = document.querySelector('[data-tab-content="interview"]');
        if (!container) {
            console.error('AboutSection: Education container not found');
            return;
        }

        // Update title if it exists
        const titleElement = container.querySelector('.section-title');
        if (titleElement && data.title) {
            titleElement.textContent = data.title;
        }

        // Update description if it exists
        const descriptionElement = container.querySelector('.section-text');
        if (descriptionElement && data.description) {
            descriptionElement.textContent = data.description;
        }

        // Update or create education items
        if (data.items && data.items.length > 0) {
            const skillList = container.querySelector('.skill-list');
            if (skillList) {
                skillList.innerHTML = ''; // Clear existing items
                
                data.items.forEach(item => {
                    const listItem = document.createElement('li');
                    
                    const skillWrapper = document.createElement('div');
                    skillWrapper.className = 'skill-wrapper';
                    
                    const titleSpan = document.createElement('span');
                    titleSpan.className = 'span';
                    titleSpan.textContent = `${item.degree}`;
                    
                    const valueSpan = document.createElement('span');
                    valueSpan.className = 'value';
                    valueSpan.textContent = item.institution;
                    
                    skillWrapper.appendChild(titleSpan);
                    skillWrapper.appendChild(valueSpan);
                    
                    const progressBar = document.createElement('div');
                    progressBar.className = 'progress-bar';
                    
                    const progressFill = document.createElement('div');
                    progressFill.className = 'progress-fill';
                    progressFill.style.width = '100%';
                    
                    progressBar.appendChild(progressFill);
                    
                    listItem.appendChild(skillWrapper);
                    listItem.appendChild(progressBar);
                    
                    skillList.appendChild(listItem);
                });
            }
        }

        // Handle the image - find the existing image element or create a new one if needed
        let imageContainer = container.querySelector('.skill-banner');
        const gridList = container.querySelector('.grid-list');
        
        if (!gridList) {
            console.error('AboutSection: grid-list not found in education section');
            return;
        }
        
        // Remove existing image container if it exists
        if (imageContainer) {
            imageContainer.remove();
        }
        
        // Create new image element and container
        if (data.image) {
            const imageElement = this.createImageElement(data.image, data.title || 'Education');
            imageContainer = this.createImageContainer(imageElement);
            gridList.appendChild(imageContainer);
            
            // Force a reflow to ensure the image is displayed properly
            setTimeout(() => {
                console.log('AboutSection: Forcing reflow for education image');
                imageContainer.style.opacity = '0.99';
                setTimeout(() => {
                    imageContainer.style.opacity = '1';
                }, 50);
            }, 100);
        }
    }

    renderCertifications() {
        const data = this.aboutData.certifications;
        console.log('AboutSection: Rendering certifications', data);
        if (!data) return;

        const container = document.querySelector('[data-tab-content="awward"]');
        if (!container) {
            console.error('AboutSection: Certifications container not found');
            return;
        }

        // Update title if it exists
        const titleElement = container.querySelector('.section-title');
        if (titleElement && data.title) {
            titleElement.textContent = data.title;
        }

        // Update or create certification items
        if (data.items && data.items.length > 0) {
            const gridList = container.querySelector('.grid-list');
            if (gridList) {
                gridList.innerHTML = ''; // Clear existing items
                
                data.items.forEach(item => {
                    const listItem = document.createElement('li');
                    
                    const awardCard = document.createElement('div');
                    awardCard.className = 'award-card';
                    
                    const cardBanner = document.createElement('figure');
                    cardBanner.className = 'card-banner img-holder';
                    cardBanner.style = '--width: 534; --height: 383;';
                    cardBanner.setAttribute('data-tilt', '');
                    
                    const img = document.createElement('img');
                    img.src = item.image;
                    img.width = 534;
                    img.height = 383;
                    img.loading = 'lazy';
                    img.alt = item.name;
                    img.className = 'img-cover';
                    
                    cardBanner.appendChild(img);
                    
                    const cardContent = document.createElement('div');
                    cardContent.className = 'card-content';
                    
                    const cardTitle = document.createElement('h4');
                    cardTitle.className = 'card-title';
                    cardTitle.textContent = item.name;
                    
                    const cardText = document.createElement('p');
                    cardText.className = 'card-text';
                    cardText.textContent = `${item.issuer} (${item.year})`;
                    
                    cardContent.appendChild(cardTitle);
                    cardContent.appendChild(cardText);
                    
                    awardCard.appendChild(cardBanner);
                    awardCard.appendChild(cardContent);
                    
                    listItem.appendChild(awardCard);
                    gridList.appendChild(listItem);
                });
            }
        }
    }

    renderCollaborations() {
        const data = this.aboutData.collaborations;
        console.log('AboutSection: Rendering collaborations', data);
        if (!data) return;

        const container = document.querySelector('[data-tab-content="exhibition"]');
        if (!container) {
            console.error('AboutSection: Collaborations container not found');
            return;
        }

        // Add title if it doesn't exist
        if (data.title) {
            let titleElement = container.querySelector('.section-title');
            if (!titleElement) {
                titleElement = document.createElement('h3');
                titleElement.className = 'h4 title section-title';
                container.prepend(titleElement);
            }
            titleElement.textContent = data.title;
        }

        // Update or create collaboration items
        if (data.items && data.items.length > 0) {
            const gridList = container.querySelector('.grid-list');
            if (gridList) {
                gridList.innerHTML = ''; // Clear existing items
                
                data.items.forEach(item => {
                    const listItem = document.createElement('li');
                    
                    const exhibitionCard = document.createElement('div');
                    exhibitionCard.className = 'exhibition-card';
                    
                    const cardBanner = document.createElement('figure');
                    cardBanner.className = 'card-banner img-holder';
                    cardBanner.style = '--width: 376; --height: 200;';
                    cardBanner.setAttribute('data-tilt', '');
                    
                    const img = document.createElement('img');
                    img.src = item.image;
                    img.width = 376;
                    img.height = 200;
                    img.loading = 'lazy';
                    img.alt = item.partner;
                    img.className = 'img-cover';
                    
                    cardBanner.appendChild(img);
                    
                    const cardIcon = document.createElement('div');
                    cardIcon.className = 'card-icon';
                    
                    const icon = document.createElement('ion-icon');
                    
                    // Set icon based on type
                    switch (item.type) {
                        case 'video':
                            icon.setAttribute('name', 'logo-youtube');
                            break;
                        case 'audio':
                            icon.setAttribute('name', 'logo-soundcloud');
                            break;
                        case 'image':
                        default:
                            icon.setAttribute('name', 'image-outline');
                    }
                    
                    icon.setAttribute('aria-hidden', 'true');
                    
                    cardIcon.appendChild(icon);
                    
                    // Add tooltip for partnership info
                    const tooltip = document.createElement('div');
                    tooltip.className = 'collaboration-tooltip';
                    tooltip.innerHTML = `<strong>${item.partner}</strong><br>${item.project}`;
                    tooltip.style.position = 'absolute';
                    tooltip.style.bottom = '0';
                    tooltip.style.left = '0';
                    tooltip.style.right = '0';
                    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    tooltip.style.color = 'white';
                    tooltip.style.padding = '10px';
                    tooltip.style.fontSize = '14px';
                    tooltip.style.opacity = '0';
                    tooltip.style.transition = 'opacity 0.3s ease';
                    tooltip.style.textAlign = 'center';
                    
                    exhibitionCard.appendChild(cardBanner);
                    exhibitionCard.appendChild(cardIcon);
                    exhibitionCard.appendChild(tooltip);
                    
                    // Show tooltip on hover
                    exhibitionCard.addEventListener('mouseenter', () => {
                        tooltip.style.opacity = '1';
                    });
                    
                    exhibitionCard.addEventListener('mouseleave', () => {
                        tooltip.style.opacity = '0';
                    });
                    
                    listItem.appendChild(exhibitionCard);
                    gridList.appendChild(listItem);
                });
            }
        }
    }

    // Helper function to create image elements
    createImageElement(src, alt, width = 570, height = 420) {
        console.log(`AboutSection: Creating image element for ${src}`);
        const img = document.createElement('img');
        img.src = src;
        img.width = width;
        img.height = height;
        img.loading = 'lazy';
        img.alt = alt || 'Image';
        img.className = 'img-cover';
        
        // Add error handling for image loading
        img.onerror = () => {
            console.error(`AboutSection: Failed to load image: ${src}`);
            img.src = './assets/images/philosophy.jpeg'; // Fallback image
            img.alt = 'Image failed to load';
        };
        
        // Add load event listener
        img.onload = () => {
            console.log(`AboutSection: Image loaded successfully: ${src}`);
            // Add a class to trigger a subtle animation when the image loads
            img.classList.add('loaded');
        };
        
        return img;
    }
    
    // Helper function to create image container
    createImageContainer(imageElement, width = 570, height = 420) {
        const container = document.createElement('figure');
        container.className = 'skill-banner img-holder';
        container.style = `--width: ${width}; --height: ${height};`;
        container.setAttribute('data-tilt', '');
        container.appendChild(imageElement);
        return container;
    }
} 