# zalando-scrapers

## Description

This repository contains Node.js scrapers for scraping Zalando product listings and Zalando product details page using Puppeteer.
Scrapers handles dynamic page loading, Pagination, and extracts structured data like product names, brand names, prices, sizes, images, and other details.

➡ Full tutorial available [here](https://crawlbase.com/blog/how-to-create-zalando-scraper/).

## Scraper Overview

### 1. Product Listing Scraper

Scrapes Zalando search and category pages.

Extracts:

- **Product Title**
- **Brand Name**
- **Price**
- **Product URL**
- **Thumbnail**

Supports infinite scrolling to load all products.

### 2. Product Detail Scraper

Visits individual product pages.

Extracts:

- **Product Title**
- **Brand Name**
- **Product Details**
- **Price**
- **Available Sizes**
- **Image URLs**

## Environment Setup

1. **Install Node.js**
   Download and install from [nodejs.org](https://nodejs.org/).

2. **Install Dependencies**
   ```bash
   npm install puppeteer axios
   ```

## Project Structure

```bash
zalando-scrapers/
├── listingScraper.js     # Scrapes product listings
├── detailScraper.js      # Scrapes product details
├── .gitignore            # Git ignore file
├── README.md             # Project documentation
├── package.json          # Project dependencies and scripts
└── package-lock.json     # Locked dependency versions
```

## Running the Scrapers

### Step 1: Scrape Product Listings

Edit the listingScraper.js file with your desired Zalando search URL.

Run:

```bash
node listingScraper.js
```

Results will be saved in `zalando_product_listings.json`.

### Step 2: Scrape Product Details

Feed the product URLs from `products.json` into the `detailScraper.js`.

Run:

```bash
node detailScraper.js
```

Detailed data will be saved in `zalando_product_details.json`.

## Example Outputs

**products.json:**

```json
[
	{
		"title": "Handbag - black",
		"brandName": "Anna Field",
		"price": "34,99 €",
		"productUrl": "https://en.zalando.de/anna-field-handbag-black-an651h0x2-q11.html",
		"thumbnail": "https://img01.ztat.net/article/spp-media-p1/4ce13463cf9a4dda9828bfc44f65bb6e/45133485dd0c4b03b1b122f0deeb0801.jpg?imwidth=300&filter=packshot"
	}
]
```

**productDetails.json:**

```json
[
	{
    "url": "https://en.zalando.de/anna-field-handbag-black-an651h0x2-q11.html",
    "title": "Handbag - black",
    "brandName": "Anna Field",
    "details": { "Fastening:": "Zip", "Pattern:": "Plain", "Details:": "Buckle" },
    "price": "108,95 €",
    "sizes": {
      "Height:": "28 cm (Size One Size)",
      "Length:": "36 cm (Size One Size)",
      "Width:": "12 cm (Size One Size)"
    },
    "imageUrls": [
      "https://img01.ztat.net/article/spp-media-p1/3359d0e0d8484d9ba930544c6c71a861/7859902ec50b4d88899541e3c1cf976b.jpg?imwidth=762",
      "https://img01.ztat.net/article/spp-media-p1/4ce13463cf9a4dda9828bfc44f65bb6e/45133485dd0c4b03b1b122f0deeb0801.jpg?imwidth=762&filter=packshot",
      "https://img01.ztat.net/article/spp-media-p1/4ce13463cf9a4dda9828bfc44f65bb6e/45133485dd0c4b03b1b122f0deeb0801.jpg?imwidth=156&filter=packshot",
      .... more
    ]
  }
]
```

## Optimizing with Crawlbase Smart Proxy (Recommended)

While the default scrapers work, you may get blocked or throttled if scraping large volumes.

To solve this, you can integrate [Crawlbase Smart Proxy](https://crawlbase.com/smart-proxy/) into your Puppeteer setup for smooth, reliable scraping.

## How to Use Crawlbase Smart Proxy

1. **Sign Up at Crawlbase**
   Create an [account](https://crawlbase.com/signup) and get your Smart Proxy token.

2. **Modify Puppeteer Launch** Update your script to route traffic through Crawlbase Proxy:

```javascript
const browser = await puppeteer.launch({
	args: ['--proxy-server=http://_USER_TOKEN_@smartproxy.crawlbase.com:8012'], // Replace _USER_TOKEN_ with your API token
});
```

3. **Updated Example** Here's a [full proxy-integrated example](https://crawlbase.com/blog/how-to-create-zalando-scraper/#Optimizing-with-Crawlbase-Smart-Proxy) from the blog showing how to scrape product details safely through Crawlbase.

✅ Using a proxy will:

- Bypass blocks automatically.
- Mimic real users.
- Allow high-volume data extraction.

## To-Do List

- Add support for paginating multiple search terms.
- Implement CSV export alongside JSON.
- Add retry mechanisms on failed page loads.
- Build a CLI tool version for easier use.
