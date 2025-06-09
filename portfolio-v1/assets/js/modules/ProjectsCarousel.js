/**
 * ProjectsCarousel Module
 * Handles the dynamic rendering and interaction of projects carousel
 */
export default class ProjectsCarousel {
  constructor() {
    // DOM Elements
    this.container = document.querySelector('.project .slider-container');
    this.sliderList = document.querySelector('.project .slider-list');
    this.prevBtn = document.querySelector('.project .scroll-btn.prev');
    this.nextBtn = document.querySelector('.project .scroll-btn.next');
    
    // State
    this.projects = [];
    this.scrollAmount = 0;
    this.itemWidth = 0;
    this.maxScroll = 0;
  }

  /**
   * Initialize the projects carousel
   * @param {Array} projectsData - Array of project objects
   */
  init(projectsData) {
    if (!this.container || !this.sliderList) {
      return;
    }

    this.projects = projectsData;
    
    // Render the projects
    this.render();
    
    // Setup the carousel functionality
    setTimeout(() => {
      this.calculateDimensions();
      this.setupEventListeners();
      this.checkOverflow();
    }, 100);

    // Re-calculate on window resize
    window.addEventListener('resize', () => {
      this.calculateDimensions();
      this.checkOverflow();
      this.resetScroll();
    });
    
    // Also recalculate after all images have loaded for better accuracy
    window.addEventListener('load', () => {
      this.calculateDimensions();
      this.checkOverflow();
    });
  }

  /**
   * Render projects to the DOM
   */
  render() {
    // Clear existing content
    this.sliderList.innerHTML = '';
    
    // Create and append project items
    this.projects.forEach(project => {
      const projectElement = this.createProjectElement(project);
      this.sliderList.appendChild(projectElement);
    });
  }

  /**
   * Create DOM element for a single project
   * @param {Object} project - Project data object
   * @returns {HTMLElement} - Project DOM element
   */
  createProjectElement(project) {
    const listItem = document.createElement('li');
    listItem.className = 'slider-item';
    
    listItem.innerHTML = `
      <div class="project-card">
        <div class="card-banner">
          <img src="${project.image}" width="380" height="300" loading="lazy"
              alt="${project.title}" class="img-cover">
        </div>
        <div class="card-content">
          <p class="card-subtitle">${project.subtitle}</p>
          <h3 class="card-title">
            <a href="${project.link}">${project.title}</a>
          </h3>
          <p class="card-text">${project.description}</p>
          <a href="${project.link}" class="btn btn:hover">
            <span class="span">View Project</span>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </a>
        </div>
      </div>
    `;
    
    return listItem;
  }

  /**
   * Calculate dimensions for scrolling
   */
  calculateDimensions() {
    if (!this.sliderList.children.length) {
      return;
    }
    
    const firstItem = this.sliderList.children[0];
    // Get the actual item width including margins
    const computedStyle = window.getComputedStyle(firstItem);
    const marginRight = parseFloat(computedStyle.marginRight) || 0;
    const marginLeft = parseFloat(computedStyle.marginLeft) || 0;
    
    // Include margins in the item width calculation
    this.itemWidth = firstItem.offsetWidth + marginRight + marginLeft;
    
    // Calculate maximum scroll amount
    const containerWidth = this.container.clientWidth;
    const totalWidth = this.sliderList.scrollWidth;
    
    // Ensure the last item is fully visible
    this.maxScroll = Math.max(0, totalWidth - containerWidth);
    
    // Adjust to ensure we can fully see the last project
    const itemsPerView = Math.floor(containerWidth / this.itemWidth);
    const lastItemOffset = (this.projects.length - itemsPerView) * this.itemWidth;
    
    // Use the smaller value to prevent scrolling past the end
    this.maxScroll = Math.min(this.maxScroll, lastItemOffset);
  }

  /**
   * Setup event listeners for navigation
   */
  setupEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.scroll('prev'));
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.scroll('next'));
    }
    
    // Add smooth scrolling with mouse wheel
    this.sliderList.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      
      event.preventDefault();
      const scrollDirection = event.deltaY > 0 ? 'next' : 'prev';
      this.scroll(scrollDirection);
    });
  }

  /**
   * Scroll the carousel in the specified direction
   * @param {String} direction - 'prev' or 'next'
   */
  scroll(direction) {
    const scrollStep = this.itemWidth;
    
    if (direction === 'prev') {
      this.scrollAmount = Math.max(0, this.scrollAmount - scrollStep);
    } else {
      this.scrollAmount = Math.min(this.maxScroll, this.scrollAmount + scrollStep);
    }
    
    this.sliderList.style.transform = `translateX(-${this.scrollAmount}px)`;
    this.checkScrollPosition();
  }

  /**
   * Check if at the beginning or end of scrolling
   */
  checkScrollPosition() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.scrollAmount <= 0;
      this.prevBtn.style.opacity = this.scrollAmount <= 0 ? '0.5' : '1';
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = this.scrollAmount >= this.maxScroll;
      this.nextBtn.style.opacity = this.scrollAmount >= this.maxScroll ? '0.5' : '1';
    }
  }

  /**
   * Check if content overflows and needs scrolling
   */
  checkOverflow() {
    const hasOverflow = this.maxScroll > 0;
    this.container.classList.toggle('has-more', hasOverflow);
    
    if (this.prevBtn) this.prevBtn.style.display = hasOverflow ? 'grid' : 'none';
    if (this.nextBtn) this.nextBtn.style.display = hasOverflow ? 'grid' : 'none';
  }

  /**
   * Reset scroll position
   */
  resetScroll() {
    this.scrollAmount = 0;
    this.sliderList.style.transform = 'translateX(0)';
    this.checkScrollPosition();
  }
} 