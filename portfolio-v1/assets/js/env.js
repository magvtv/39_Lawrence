// Load environment variables
const loadEnvVariables = async () => {
    try {
        const response = await fetch('/.env');
        const text = await response.text();
        
        // Parse .env file
        const env = {};
        text.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                env[key.trim()] = value.trim();
            }
        });

        // Add to window.process.env
        window.process = window.process || {};
        window.process.env = env;
    } catch (error) {
        console.error('Error loading environment variables:', error);
    }
};

// Load environment variables before initializing the feed
loadEnvVariables(); 