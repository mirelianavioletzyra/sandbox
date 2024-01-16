const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
// const puppeteer = require('puppeteer'); // Uncomment if using Puppeteer

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/scrape', async (req, res) => {
    const url = req.body.url;
    // Perform the scraping here using Axios/Cheerio or Puppeteer
    // For example, using Axios and Cheerio:
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const pageTitle = $('title').text();
        // You can extract other data similarly
        
        // Send back the results to the frontend
        res.send(`<h1>Results from ${url}</h1><p>Title: ${pageTitle}</p>`);
    } catch (error) {
        res.send(`<p>Error: ${error.message}</p>`);
    }
    });
    
    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });