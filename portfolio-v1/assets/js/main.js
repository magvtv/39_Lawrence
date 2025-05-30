/**
 * Main JavaScript entry point for the portfolio website
 * Imports and initializes all required modules
 */

// Import all required modules
import Preloader from './modules/Preloader.js';
import Navigation from './modules/Navigation.js';
import TiltEffect from './modules/TiltEffect.js';
import TabContent from './modules/TabContent.js';
import CustomCursor from './modules/CustomCursor.js';
import ContactForm from './modules/ContactForm.js';
import { updateCopyright } from './utils/dom.js';
import TestimonialCarousel from './modules/TestimonialCarousel.js';
import ProjectsCarousel from './modules/ProjectsCarousel.js';
import { projectsData } from './data.js';

// Initialize all modules when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Core UI components
        new Preloader();
        new Navigation();
        new TiltEffect();
        new TabContent();
        new CustomCursor();
        new ContactForm();
        updateCopyright();
        
        // Initialize testimonials
        new TestimonialCarousel();
        
        // Initialize project carousel with data
        const projectsCarousel = new ProjectsCarousel();
        projectsCarousel.init(projectsData);
    } catch (error) {
        console.error('Error initializing modules:', error);
    }
}); 