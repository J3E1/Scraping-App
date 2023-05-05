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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapUrl = void 0;
const utils_1 = require("../Utils/utils");
const scrapUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, generateScreenshot } = req.body;
    if (!url) {
        res.status(404).json({
            status: 0,
            error: 'Please provide a url.',
        });
        return;
    }
    const urlRegex = /^(?:(?:https?):\/\/)?(?:www\.)?([^\s.]+\.[^\s]{2,}|localhost[:?\d]*)\S*$/;
    if (!urlRegex.test(url)) {
        res.status(404).json({
            status: 0,
            error: 'Please provide a valid url.',
        });
        return;
    }
    try {
        const isSafe = yield (0, utils_1.checkUrlSafety)(url);
        if (!isSafe) {
            res.status(404).json({
                status: 0,
                error: 'Malicious URL. Try with different URL',
            });
            return;
        }
        const data = yield (0, utils_1.scrapeUrl)(url, generateScreenshot);
        if (data === null) {
            res.status(404).json({
                status: 0,
                error: 'Something went wrong',
            });
            return;
        }
        if (data.screenshot === true) {
            res.status(200).json({
                status: 1,
                data: data.path,
            });
            return;
        }
        res.status(200).json({
            status: 1,
            data,
        });
        return;
    }
    catch (error) {
        console.log('🚀 ~ file: SBControllers.ts:81 ~ constscrapUrl:RequestHandler= ~ error:', error);
    }
});
exports.scrapUrl = scrapUrl;
