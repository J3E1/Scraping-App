import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';
import { ScrapingBeeClient } from 'scrapingbee';

const SB_API_KEY = process.env.SCRAPINGBEE_API_KEY as string;
const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
const API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

export const checkUrlSafety = async (url: string) => {
	const body = {
		client: {
			clientId: 'scraping-app',
			clientVersion: '1.0.0',
		},
		threatInfo: {
			threatTypes: [
				'MALWARE',
				'SOCIAL_ENGINEERING',
				'UNWANTED_SOFTWARE',
				'POTENTIALLY_HARMFUL_APPLICATION',
			],
			platformTypes: ['ANY_PLATFORM'],
			threatEntryTypes: ['URL'],
			threatEntries: [{ url }],
		},
	};

	const response = await fetch(API_URL, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	const data = await response.json();

	return data.matches ? false : true;
};

export async function scrapeUrl(
	url: string,
	generateScreenshot: boolean = false
) {
	try {
		const client = new ScrapingBeeClient(SB_API_KEY);
		const response = await client.get({
			url: url,
			params: {
				screenshot: generateScreenshot, // Take a screenshot
				window_width: generateScreenshot ? 1280 : undefined,
				window_height: generateScreenshot ? 720 : undefined,
			},
		});
		const decoder = new TextDecoder();
		const data = decoder.decode(response.data);
		if (generateScreenshot) {
			const fileName = `screenshot-${new Date().getTime()}.png`;
			const targetPath = path.join(
				__dirname,
				'../../../client/public',
				fileName
			);

			fs.writeFileSync(targetPath, response.data);
			return {
				path: fileName,
				screenshot: generateScreenshot,
			};
		}

		const $ = cheerio.load(data);

		// use cheerio to extract data from the HTML
		const title = $('title').text();
		const description = $('meta[name="description"]').attr('content');
		const author = $('meta[name="author"]').attr('content');
		const image = $('meta[property="og:image"]').attr('content');
		const type = $('meta[property="og:type"]').attr('content');
		const canonicalUrl = $('link[rel="canonical"]').attr('href');
		const locale = $('html').attr('lang');
		const publishedDate = $('meta[property="article:published_time"]').attr(
			'content'
		);
		const scrappedData = {
			screenshot: generateScreenshot,
			title,
			description: description ?? 'NA',
			author: author ?? 'NA',
			image: image ?? 'NA',
			type: type ?? 'NA',
			canonicalUrl: canonicalUrl ?? 'NA',
			locale: locale ?? 'NA',
			publishedDate: publishedDate ?? 'NA',
		};
		return scrappedData;
	} catch (err) {
		console.error(err);
		return null;
	}
}
