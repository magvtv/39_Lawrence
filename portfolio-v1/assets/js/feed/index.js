import FeedManager from './FeedManager.js';
import LinkedInService from './LinkedInService.js';

// Make services available globally for non-module scripts
window.LinkedInService = LinkedInService;

// Initialize the feed when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle LinkedIn OAuth callback if present
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        LinkedInService.handleAuthCallback(code);
    }
    
    // Initialize feed manager and make it available globally
    const feedManager = new FeedManager();
    window.feedManager = feedManager;
}); 