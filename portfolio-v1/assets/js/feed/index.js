import FeedManager from './FeedManager.js';
import LinkedInService from './LinkedInService.js';

// Initialize the feed when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle LinkedIn OAuth callback if present
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        LinkedInService.handleAuthCallback(code);
    }
    
    // Initialize feed manager
    new FeedManager();
}); 