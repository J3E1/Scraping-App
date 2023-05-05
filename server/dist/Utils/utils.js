"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeUrl = exports.checkUrlSafety = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const scrapingbee_1 = require("scrapingbee");
const SB_API_KEY = process.env.SCRAPINGBEE_API_KEY;
const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
const API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;
const checkUrlSafety = (url) => __awaiter(void 0, void 0, void 0, function* () {
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
    const response = yield fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(body),
    });
    const data = yield response.json();
    return data.matches ? false : true;
});
exports.checkUrlSafety = checkUrlSafety;
function scrapeUrl(url, generateScreenshot = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new scrapingbee_1.ScrapingBeeClient(SB_API_KEY);
            const response = yield client.get({
                url: url,
                params: {
                    screenshot: generateScreenshot,
                    window_width: generateScreenshot ? 1280 : undefined,
                    window_height: generateScreenshot ? 720 : undefined,
                },
            });
            const decoder = new TextDecoder();
            const data = decoder.decode(response.data);
            if (generateScreenshot) {
                const fileName = `screenshot-${new Date().getTime()}.png`;
                const targetPath = path_1.default.join(__dirname, '../../../client/public', fileName);
                fs_1.default.writeFileSync(targetPath, response.data);
                return {
                    path: fileName,
                    screenshot: generateScreenshot,
                };
            }
            const $ = cheerio_1.default.load(data);
            // use cheerio to extract data from the HTML
            const title = $('title').text();
            const description = $('meta[name="description"]').attr('content');
            const author = $('meta[name="author"]').attr('content');
            const image = $('meta[property="og:image"]').attr('content');
            const type = $('meta[property="og:type"]').attr('content');
            const canonicalUrl = $('link[rel="canonical"]').attr('href');
            const locale = $('html').attr('lang');
            const publishedDate = $('meta[property="article:published_time"]').attr('content');
            const scrappedData = {
                screenshot: generateScreenshot,
                title,
                description: description !== null && description !== void 0 ? description : 'NA',
                author: author !== null && author !== void 0 ? author : 'NA',
                image: image !== null && image !== void 0 ? image : 'NA',
                type: type !== null && type !== void 0 ? type : 'NA',
                canonicalUrl: canonicalUrl !== null && canonicalUrl !== void 0 ? canonicalUrl : 'NA',
                locale: locale !== null && locale !== void 0 ? locale : 'NA',
                publishedDate: publishedDate !== null && publishedDate !== void 0 ? publishedDate : 'NA',
            };
            return scrappedData;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    });
}
exports.scrapeUrl = scrapeUrl;
