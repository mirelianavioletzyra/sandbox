const axios = require('axios');
const cheerio = require('cheerio');
const robotsParser = require('robots-parser');

// URL of the page you want to scrape
const url = 'https://www.instructables.com/spinning-yarn/';

// Base URL for fetching robots.txt
const baseUrl = new URL(url).origin;
const robotsUrl = `${baseUrl}/robots.txt`;

// Function to fetch and parse robots.txt
async function getRobotsParser() {
    try {
        const { data } = await axios.get(robotsUrl);
        return robotsParser(robotsUrl, data);
    } catch (error) {
        console.error("Error fetching robots.txt: ", error);
        // In case of an error, return a parser that allows everything
        return robotsParser(robotsUrl, "");
    }
}

// Function to check if scraping is allowed
async function canScrape(url) {
    const robots = await getRobotsParser();
    return robots.isAllowed(url, 'User-agent: *');
}

// Function to scrape the website
async function scrapeData() {
    try {
        // Check if scraping is allowed
        const isAllowed = await canScrape(url);
        if (!isAllowed) {
            console.log("Scraping is blocked by robots.txt");
            return;
        }

        // Fetching HTML of the page
        const { data } = await axios.get(url);

        // Using cheerio to load the HTML
        const $ = cheerio.load(data);

        // Extracting the title and description
        const pageTitle = $('title').text();
        const pageDescription = $('meta[name="description"]').attr('content');

        console.log(`Title: ${pageTitle}`);
        console.log(`Description: ${pageDescription}`);
    } catch (error) {
        console.error("Error scraping data: ", error);
    }
}

// Run the function
scrapeData();

