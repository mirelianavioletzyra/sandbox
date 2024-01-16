// Import the libraries
const axios = require('axios');
const cheerio = require('cheerio');

// URL of the page you want to scrape
const url = 'https://www.instructables.com/spinning-yarn/';

// Function to scrape the website
async function scrapeData() {
    try {
        // Fetching HTML of the page
        const { data } = await axios.get(url);
        
        // Using cheerio to load the HTML
        const $ = cheerio.load(data);

        // Extract data using cheerio
        const pageTitle = $('title').text(); // Example: Get page title

        console.log(pageTitle);
    } catch (error) {
        console.error("Error scraping data: ", error);
    }
}

// Run the function
scrapeData();
