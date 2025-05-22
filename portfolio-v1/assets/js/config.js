// LinkedIn Configuration
const config = {
    linkedIn: {
        clientId: '77nmvhcib0xo2f',
        // Use localhost:8000 for development, actual domain for production
        redirectUri: window.location.hostname === 'localhost' 
            ? 'http://localhost:8000'
            : 'https://39-lawrence.vercel.app',
        // Basic profile and posts scopes
        scope: [
            'r_liteprofile',      // Basic profile info
            'r_emailaddress',     // Email address
            'w_member_social'      // Post, comment and like
        ].join(' ')  // Join with spaces as required by LinkedIn
    },
    
    // EmailJS Configuration
    emailJS: {
        publicKey: '6OlGtEt8EHF9eYTk9',
        serviceID: 'service_2y5ubtj',
        templateID: 'template_qrihbam',
        toEmail: 'lawrencenderu@gmail.com',
        // Template parameter mappings - fields expected by the EmailJS template
        templateParams: {
            nameField: 'name',
            emailField: 'email',
            phoneField: 'phone',
            messageField: 'message'
        }
    }
};

// Make config available globally
window.appConfig = config; 