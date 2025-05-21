import Preloader from './modules/Preloader.js';
import Navigation from './modules/Navigation.js';
import TiltEffect from './modules/TiltEffect.js';
import TabContent from './modules/TabContent.js';
import CustomCursor from './modules/CustomCursor.js';
import ContactForm from './modules/ContactForm.js';
import { updateCopyright } from './utils/dom.js';
import TestimonialCarousel from './modules/TestimonialCarousel.js';
import ProjectSlider from './modules/ProjectSlider.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    new Preloader();
    new Navigation();
    new TiltEffect();
    new TabContent();
    new CustomCursor();
    new ContactForm();
    updateCopyright();
    
    // Initialize testimonials
    new TestimonialCarousel();
    
    // Initialize project slider
    new ProjectSlider();
}); 