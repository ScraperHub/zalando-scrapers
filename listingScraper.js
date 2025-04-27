const puppeteer = require('puppeteer');
const fs = require('fs');

// Function to scrape product listings from Zalando
async function scrapeProductListings(page) {
	// Scraping product listings
	const products = await page.evaluate(() => {
		return Array.from(document.querySelectorAll('div.AnNemq article.z5x6ht.mo6ZnF')).map((card) => {
			const title = card.querySelector('div.Zhr-fS h3:last-child')?.innerText; // Product title
			const storeName = card.querySelector('div.Zhr-fS h3:first-child')?.innerText; // Store name
			const price = card.querySelector('span.sDq_FX.lystZ1')?.innerText; // Price
			const productUrl = card.querySelector('a')?.href; // Product URL
			const thumbnail = card.querySelector('img:first-child')?.src; // Image URL

			return { title, storeName, price, productUrl, thumbnail };
		});
	});

	return products;
}

// Pagination handling
async function scrapeAllProductListings(page, totalPages) {
	let allProducts = [];

	for (let i = 1; i <= totalPages; i++) {
		const url = `https://en.zalando.de/catalogue/?q=handbags&p=${i}`;
		await page.goto(url, { timeout: 0 });
		await page.waitForSelector('main#main-content'); // Wait for product cards to load

		const products = await scrapeProductListings(page);
		allProducts = allProducts.concat(products); // Combine products from all pages
	}

	return allProducts;
}

// Function to save scraped data to a JSON file
function saveDataToJson(data, filename = 'zalando_product_listings.json') {
	fs.writeFileSync(filename, JSON.stringify(data, null, 2));
	console.log(`Data successfully saved to ${filename}`);
}

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const totalPages = 1; // Specify the total number of pages you want to scrape
	const allProductListings = await scrapeAllProductListings(page, totalPages);

	// Save scraped product listings to a JSON file
	saveDataToJson(allProductListings);

	await browser.close();
})();
