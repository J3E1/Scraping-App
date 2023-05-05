# Scraping App

This is an app for scraping website data and displaying it in a beautiful UI.

## Getting Started

To get started, follow these steps:

To get started with this project, please follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file in the root directory.
4. Add the following environment variables to the `.env` file:

+ PORT=99
+ SCRAPINGBEE_API_KEY=your_scrapingbee_api_key
+ GOOGLE_SAFE_BROWSING_API_KEY=your_google_safe_browsing_api_key

Replace `your_scrapingbee_api_key` and `your_google_safe_browsing_api_key` with your actual API keys.

5. Run `npm install` to install the dependencies of the server and  then change directory to client and run `npm install` to install the dependencies of client.
6. After installing dependencies, run `npm run dev` from root Dir to run the server and client concurrently.

## Technologies Used

- Node.js
- Express.js
- ScrapingBee Node SDK
- Cheerio
- React
- TypeScript
- Tailwind CSS
