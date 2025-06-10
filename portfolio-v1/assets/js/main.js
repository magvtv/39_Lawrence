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
import AboutSection from './modules/AboutSection.js';
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
        
        // Initialize about section with dynamic data after a short delay
        // to ensure all other components and data are loaded
        setTimeout(() => {
            console.log('Initializing AboutSection after delay');
            console.log('Current customData:', window.customData);
            new AboutSection();
        }, 500);

        // Reveal Number functionality
        setupRevealNumber();
    } catch (error) {
        console.error('Error initializing modules:', error);
    }
});

// Reveal Number functionality
const setupRevealNumber = () => {
    const revealNumberLink = document.querySelector('.reveal-number');
    
    if (revealNumberLink) {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'reveal-tooltip';
        tooltip.textContent = 'Click to see contact details';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'var(--bg-eerie-black)';
        tooltip.style.color = 'var(--text-light-gray)';
        tooltip.style.padding = '0.5em 0.75em';
        tooltip.style.borderRadius = '0.25em';
        tooltip.style.fontSize = '0.75em';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.zIndex = '10';
        tooltip.style.pointerEvents = 'none';
        
        // Add tooltip to the body
        document.body.appendChild(tooltip);
        
        // Show tooltip on hover
        revealNumberLink.addEventListener('mouseenter', (e) => {
            const rect = revealNumberLink.getBoundingClientRect();
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
            tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            tooltip.style.opacity = '1';
        });
        
        // Hide tooltip when not hovering
        revealNumberLink.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
        
        // Add click event
        revealNumberLink.addEventListener('click', (e) => {
            // We'll let the default behavior take the user to the contact section
            // But we can add a visual highlight to the phone number in the contact section
            const contactPhone = document.querySelector('.contact-item-link');
            if (contactPhone) {
                // Add a class to highlight the phone number
                contactPhone.classList.add('highlighted');
                
                // Remove the highlight after a few seconds
                setTimeout(() => {
                    contactPhone.classList.remove('highlighted');
                }, 3000);
            }
        });
    }
}; 