class LinkedInService {
    static config = {
        clientId: window.appConfig?.linkedIn?.clientId || '77nmvhcib0xo2f',
        redirectUri: window.appConfig?.linkedIn?.redirectUri || window.location.origin,
        scope: window.appConfig?.linkedIn?.scope || 'r_liteprofile r_emailaddress w_member_social',
        profileUrl: 'https://www.linkedin.com/in/dr-lawrence-nderu/',
        cacheKey: 'linkedin_profile_data',
        cacheExpiry: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        fetchTimeout: 10000, // 10 seconds timeout
        // API endpoint for the server-side scraper
        apiEndpoint: 'http://localhost:5000/api/linkedin'
    };

    static async getPosts() {
        // First try to get from cache
        const cachedData = this.getCachedData();
        if (cachedData) {
            console.log('Using cached LinkedIn data');
            return cachedData;
        }
        
        try {
            console.log('Fetching fresh LinkedIn data');
            // Try to fetch fresh data from LinkedIn via server API
            const freshData = await this.fetchLinkedInData();
            if (freshData && freshData.length > 0) {
                // Cache the successful response
                this.cacheData(freshData);
                return freshData;
            }
        } catch (error) {
            console.error('Error fetching LinkedIn data:', error);
        }
        
        // Fallback to static data if cache is empty and fetch failed
        return this.getFallbackPosts();
    }
    
    static async fetchLinkedInData() {
        try {
            // Set up the URL with the profile parameter
            const apiUrl = new URL(this.config.apiEndpoint);
            apiUrl.searchParams.append('url', this.config.profileUrl);
            
            // Set up fetch with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.fetchTimeout);
            
            // Make the request to our server API
            const response = await fetch(apiUrl.toString(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });
            
            // Clear the timeout
            clearTimeout(timeoutId);
            
            // Check if response is successful
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            // Parse the response
            const data = await response.json();
            
            // Return the data
            return data;
        } catch (error) {
            console.error('Error fetching from LinkedIn API:', error);
            // Re-throw the error to be handled by the caller
            throw error;
        }
    }
    
    static getFallbackPosts() {
        // Use window.customData if available, otherwise use hardcoded fallback
        if (window.customData && window.customData.linkedin) {
            return window.customData.linkedin;
        }
        
        // Hardcoded fallback data
        return [
            {
                date: new Date().toISOString(),
                title: 'JKUAT, UoN Lead Kenyan Institutions in AI Research',
                description: 'The future of AI is here, and we are excited to be at the forefront of this transformative journey.',
                link: 'https://www.linkedin.com/posts/dr-lawrence-nderu_jkuat-uon-lead-kenyan-institutions-in-ai-activity-7221058501840687104-V6dO',
                image: './assets/images/interview-1.jpeg',
                type: 'linkedin'
            },
            {
                date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
                title: 'Agent-Based Modeling Training at University of Nairobi',
                description: 'Facilitating a training session on Agent-Based Modeling at the University of Nairobi (UoN).',
                link: 'https://www.linkedin.com/posts/dr-lawrence-nderu_rethinking-health-cema-africa-activity-7186016660200243200-yML1',
                image: './assets/images/interview-2.jpeg',
                type: 'linkedin'
            },
            {
                date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
                title: 'AI-Powered Innovation in Healthcare',
                description: 'Exploring how artificial intelligence is revolutionizing healthcare delivery in Africa.',
                link: 'https://www.linkedin.com/in/dr-lawrence-nderu',
                image: './assets/images/interview-3.jpeg',
                type: 'linkedin'
            }
        ];
    }
    
    // Cache management functions
    static cacheData(data) {
        try {
            const cacheItem = {
                data,
                timestamp: Date.now()
            };
            localStorage.setItem(this.config.cacheKey, JSON.stringify(cacheItem));
            console.log('LinkedIn data cached successfully');
        } catch (e) {
            console.error('Error caching LinkedIn data:', e);
        }
    }
    
    static getCachedData() {
        try {
            const cacheItem = localStorage.getItem(this.config.cacheKey);
            if (!cacheItem) return null;
            
            const { data, timestamp } = JSON.parse(cacheItem);
            const now = Date.now();
            
            // Check if cache is expired
            if (now - timestamp > this.config.cacheExpiry) {
                console.log('LinkedIn cache expired, removing');
                localStorage.removeItem(this.config.cacheKey);
                return null;
            }
            
            return data;
        } catch (e) {
            console.error('Error getting cached LinkedIn data:', e);
            return null;
        }
    }

    static async authorize() {
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.config.clientId}&redirect_uri=${encodeURIComponent(this.config.redirectUri)}&scope=${encodeURIComponent(this.config.scope)}`;
        window.location.href = authUrl;
    }

    static async handleAuthCallback(code) {
        try {
            // In production, exchange code for access token
            console.log('Handling auth callback with code:', code);
            return true;
        } catch (error) {
            console.error('LinkedIn auth error:', error);
            return false;
        }
    }
}

export default LinkedInService; 