export default class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        // Show loading state
        this.setLoadingState(true);
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Validate form data
            this.validateForm(data);
            
            // Send email (you'll need to implement your own email service)
            await this.sendEmail(data);
            
            // Show success message
            this.showMessage('Message sent successfully!', 'success');
            
            // Reset form
            this.form.reset();
            
        } catch (error) {
            // Show error message
            this.showMessage(error.message, 'error');
        } finally {
            // Reset loading state
            this.setLoadingState(false);
        }
    }

    validateForm(data) {
        if (!data.name.trim()) throw new Error('Please enter your name');
        if (!data.email_address.trim()) throw new Error('Please enter your email');
        if (!this.isValidEmail(data.email_address)) throw new Error('Please enter a valid email');
        if (!data.message.trim()) throw new Error('Please enter your message');
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async sendEmail(data) {
        // Here you would implement your email service
        // For example, using EmailJS, SendGrid, or your own backend
        
        // For demonstration, we'll simulate an API call
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = `
                <span class="span">Sending...</span>
                <ion-icon name="hourglass-outline" aria-hidden="true"></ion-icon>
            `;
        } else {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = `
                <span class="span">Connect For Progress</span>
                <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
            `;
        }
    }

    showMessage(message, type) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `form-toast ${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <ion-icon name="${type === 'success' ? 'checkmark-circle' : 'alert-circle'}" aria-hidden="true"></ion-icon>
        `;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
} 