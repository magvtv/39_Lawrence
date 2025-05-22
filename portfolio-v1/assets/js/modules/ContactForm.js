export default class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        
        // Get email configuration
        this.config = window.appConfig?.emailJS || {
            publicKey: '6OlGtEt8EHF9eYTk9',
            serviceID: 'service_2y5ubtj',
            templateID: 'template_qrihbam',
            toEmail: 'lawrencenderu@gmail.com',
            templateParams: {
                nameField: 'name',
                emailField: 'email',
                phoneField: 'phone',
                messageField: 'message'
            }
        };
        
        // Initialize EmailJS
        this.initEmailJS();
        this.init();
    }

    initEmailJS() {
        // Initialize EmailJS with public key from config
        emailjs.init(this.config.publicKey);
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
            
            // Send email using EmailJS
            await this.sendEmail(data);
            
            // Show success message
            this.showMessage('Message sent successfully!', 'success');
            
            // Reset form
            this.form.reset();
            
        } catch (error) {
            // Show error message
            this.showMessage(error.message, 'error');
            console.error('Form error:', error);
        } finally {
            // Reset loading state
            this.setLoadingState(false);
        }
    }

    validateForm(data) {
        if (!data.user_name?.trim()) throw new Error('Please enter your name');
        if (!data.user_email?.trim()) throw new Error('Please enter your email');
        if (!this.isValidEmail(data.user_email)) throw new Error('Please enter a valid email');
        if (!data.message?.trim()) throw new Error('Please enter your message');
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async sendEmail(data) {
        try {
            console.log('Sending email with data:', data);
            
            // Create template parameters object using mappings from config
            const templateParams = {};
            templateParams[this.config.templateParams.nameField] = data.user_name;
            templateParams[this.config.templateParams.emailField] = data.user_email;
            templateParams[this.config.templateParams.phoneField] = data.user_phone || 'Not provided';
            templateParams[this.config.templateParams.messageField] = data.message;
            templateParams.to_email = this.config.toEmail;
            
            console.log('Prepared template parameters:', templateParams);
            
            // Send the email using EmailJS with config values
            const response = await emailjs.send(
                this.config.serviceID,
                this.config.templateID,
                templateParams
            );
            
            return response;
        } catch (error) {
            console.error('EmailJS error:', error);
            throw new Error('Failed to send message. Please try again later.');
        }
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