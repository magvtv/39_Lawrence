# LinkedIn Scraper Server

This is a server-side component for scraping LinkedIn profiles and providing the data to the portfolio website.

## Features

- Scrapes LinkedIn profiles using Selenium WebDriver
- Caches data to reduce load time and avoid rate limiting
- Provides fallback data when scraping fails
- CORS-enabled API for client-side consumption

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Install Chrome browser (if not already installed)

3. Run the server:

```bash
python app.py
```

The server will run on port 5000 by default.

## API Endpoints

### GET /api/linkedin

Returns LinkedIn posts data for a given profile.

**Query Parameters:**
- `url` (optional): The LinkedIn profile URL to scrape. Defaults to Dr. Lawrence Nderu's profile.

**Response:**
An array of LinkedIn post objects with the following properties:
- `date`: ISO-formatted date string
- `title`: Post title
- `description`: Post description
- `link`: URL to the post
- `image`: Image URL (or fallback path)
- `type`: Always "linkedin"

## Implementation Notes

This server uses Selenium WebDriver with Chrome in headless mode to render and scrape LinkedIn pages. This approach:

1. Allows JavaScript to execute, ensuring dynamic content is loaded
2. Bypasses CORS restrictions that prevent client-side scraping
3. Can be deployed on a server to provide an API for the portfolio

## Performance Considerations

- Server-side caching reduces the number of requests to LinkedIn
- Default cache expiry is 24 hours
- Graceful fallback to static data when scraping fails

## Deployment

For production, consider deploying this service on:
- Heroku
- AWS Lambda
- Google Cloud Functions
- Any VPS that supports Python

Make sure to update the CORS settings to allow only your portfolio domain. 