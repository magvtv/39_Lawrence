import os
import json
import time
from datetime import datetime, timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Cache settings
CACHE_FILE = "linkedin_cache.json"
CACHE_EXPIRY = 24 * 60 * 60  # 24 hours in seconds

def setup_driver():
    """Set up and return a headless Chrome browser"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    
    # Add user agent to mimic a real browser
    chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")
    
    # Initialize the Chrome driver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    return driver

def get_cached_data():
    """Get data from cache if it exists and is not expired"""
    if not os.path.exists(CACHE_FILE):
        return None
    
    try:
        with open(CACHE_FILE, 'r') as f:
            cache = json.load(f)
        
        # Check if cache is expired
        cached_time = cache.get('timestamp', 0)
        if time.time() - cached_time > CACHE_EXPIRY:
            return None
        
        return cache.get('data')
    except Exception as e:
        print(f"Error reading cache: {e}")
        return None

def save_to_cache(data):
    """Save data to cache with timestamp"""
    try:
        cache = {
            'timestamp': time.time(),
            'data': data
        }
        with open(CACHE_FILE, 'w') as f:
            json.dump(cache, f)
    except Exception as e:
        print(f"Error saving to cache: {e}")

def get_fallback_data():
    """Return fallback data in case scraping fails"""
    return [
        {
            'date': datetime.now().isoformat(),
            'title': 'JKUAT, UoN Lead Kenyan Institutions in AI Research',
            'description': 'The future of AI is here, and we are excited to be at the forefront of this transformative journey.',
            'link': 'https://www.linkedin.com/in/dr-lawrence-nderu',
            'image': './assets/images/interview-1.jpeg',
            'type': 'linkedin'
        },
        {
            'date': (datetime.now() - timedelta(days=30)).isoformat(),
            'title': 'Agent-Based Modeling Training at University of Nairobi',
            'description': 'Facilitating a training session on Agent-Based Modeling at the University of Nairobi (UoN).',
            'link': 'https://www.linkedin.com/in/dr-lawrence-nderu',
            'image': './assets/images/interview-2.jpeg',
            'type': 'linkedin'
        },
        {
            'date': (datetime.now() - timedelta(days=60)).isoformat(),
            'title': 'AI-Powered Innovation in Healthcare',
            'description': 'Exploring how artificial intelligence is revolutionizing healthcare delivery in Africa.',
            'link': 'https://www.linkedin.com/in/dr-lawrence-nderu',
            'image': './assets/images/interview-3.jpeg',
            'type': 'linkedin'
        }
    ]

def scrape_linkedin_profile(url):
    """Scrape LinkedIn profile and return posts data"""
    try:
        driver = setup_driver()
        driver.get(url)
        
        # Wait for the page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # Give JavaScript more time to render
        time.sleep(5)
        
        # Extract the page source after JavaScript has rendered
        html_content = driver.page_source
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Close the browser
        driver.quit()
        
        # Extract data from the profile
        # Note: This is a simplified example. The actual selectors may need adjustment.
        posts = []
        
        # Try to find recent posts/activity
        # This is a simplified approach - actual implementation would need more robust selectors
        articles = soup.find_all('article', class_='feed-shared-update-v2')
        
        if not articles:
            # Fallback to other selectors
            articles = soup.find_all('div', {'data-urn': True})
        
        for i, article in enumerate(articles[:3]):  # Limit to 3 posts
            # Try to extract title (may be in different elements)
            title_elem = article.find('span', class_='break-words') or article.find('span', class_='feed-shared-text')
            title = title_elem.text.strip() if title_elem else f"LinkedIn Update {i+1}"
            
            # Try to extract description
            desc_elem = article.find('div', class_='feed-shared-text') or article.find('p')
            description = desc_elem.text.strip() if desc_elem else "Check out this LinkedIn update"
            
            # Try to extract image
            img_elem = article.find('img', {'data-ghost-url': True}) or article.find('img', class_='feed-shared-image')
            image_url = img_elem.get('src') if img_elem else './assets/images/interview-1.jpeg'
            
            # Get post date (default to recent dates if not found)
            date_elem = article.find('span', class_='feed-shared-actor__sub-description')
            post_date = datetime.now() - timedelta(days=i*10)
            if date_elem:
                try:
                    date_text = date_elem.text.strip()
                    if 'day' in date_text:
                        days = int(date_text.split()[0])
                        post_date = datetime.now() - timedelta(days=days)
                except:
                    pass
            
            posts.append({
                'date': post_date.isoformat(),
                'title': title[:100] + ('...' if len(title) > 100 else ''),
                'description': description[:200] + ('...' if len(description) > 200 else ''),
                'link': url,
                'image': image_url if img_elem and 'http' in image_url else './assets/images/interview-1.jpeg',
                'type': 'linkedin'
            })
        
        return posts if posts else get_fallback_data()
    
    except Exception as e:
        print(f"Error scraping LinkedIn: {e}")
        return get_fallback_data()

@app.route('/api/linkedin', methods=['GET'])
def get_linkedin_data():
    """API endpoint to get LinkedIn data"""
    profile_url = request.args.get('url', 'https://www.linkedin.com/in/dr-lawrence-nderu/')
    
    # Try to get data from cache first
    cached_data = get_cached_data()
    if cached_data:
        return jsonify(cached_data)
    
    # If not in cache, scrape the profile
    try:
        posts = scrape_linkedin_profile(profile_url)
        save_to_cache(posts)
        return jsonify(posts)
    except Exception as e:
        print(f"Error: {e}")
        # Return fallback data if scraping fails
        return jsonify(get_fallback_data())

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 