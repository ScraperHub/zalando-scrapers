const fs = require('fs');
const puppeteer = require('puppeteer');

// Function to scrape product details from a single product URL
async function scrapeProductDetails(page, productUrl) {
	await page.goto(productUrl, { timeout: 0 });

	// Click the "Details" section
	const detailsButtonSelector = 'div[data-testid="pdp-accordion-details"] button';
	const sizesButtonSelector = 'div[data-testid="pdp-accordion-size_fit"] button';

	// Wait for the details button and click it
	await page.waitForSelector(detailsButtonSelector, { timeout: 0 });
	await page.click(detailsButtonSelector, { timeout: 0 });

	// Wait for the sizes button and click it
	await page.waitForSelector(sizesButtonSelector);
	await page.click(sizesButtonSelector);

	// Scraping product details
	const productDetails = await page.evaluate(() => {
		const title = document.querySelector('span.EKabf7.R_QwOV')?.innerText; // Product title
		const brandName = document.querySelector('span.OBkCPz.Z82GLX')?.innerText; // Brand name
		const details = Object.fromEntries(
			Array.from(
				document.querySelectorAll('div[data-testid="pdp-accordion-details"] div.qMOFyE')
			).map((item) => [
				item.querySelector('dt')?.innerText.trim(),
				item.querySelector('dd')?.innerText.trim(),
			])
		); // Product details
		const price = document.querySelector('span.voFjEy.Km7l2y')?.innerText; // Price
		const sizes = Object.fromEntries(
			Array.from(
				document.querySelectorAll('div[data-testid="pdp-accordion-size_fit"] div.qMOFyE')
			).map((item) => [
				item.querySelector('dt')?.innerText.trim(),
				item.querySelector('dd')?.innerText.trim(),
			])
		); // Available Sizes
		const imageUrls = Array.from(document.querySelectorAll('ul.COuNvj._0xLoFW li img')).map(
			(img) => img.src
		); // Product images URL

		return { title, brandName, details, price, sizes, imageUrls };
	});

	return { url: productUrl, ...productDetails };
}

// Function to save scraped data to a JSON file
function saveDataToJson(data, filename = 'zalando_product_details.json') {
	fs.writeFileSync(filename, JSON.stringify(data, null, 2));
	console.log(`Data successfully saved to ${filename}`);
}

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const productUrls = [
		'https://en.zalando.de/anna-field-handbag-black-an651h0x2-q11.html',
		'https://en.zalando.de/zign-handbag-black-zi151h08a-q11.html',
		// Add more product URLs here
	];

	const allProductDetails = [];

	for (const url of productUrls) {
		const details = await scrapeProductDetails(page, url);
		allProductDetails.push(details);
	}

	// Save scraped product details to a JSON file
	saveDataToJson(allProductDetails);

	await browser.close();
})();
