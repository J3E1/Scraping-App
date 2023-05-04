import { RequestHandler } from 'express';
import { checkUrlSafety, scrapeUrl } from '../Utils/utils';

type BodyType = {
	url?: string;
	generateScreenshot?: boolean;
};
export const scrapUrl: RequestHandler = async (req, res) => {
	const { url, generateScreenshot } = req.body as BodyType;
	if (!url) {
		res.status(404).json({
			status: 0,
			error: 'Please provide a url.',
		});
		return;
	}

	const urlRegex =
		/^(?:(?:https?):\/\/)?(?:www\.)?([^\s.]+\.[^\s]{2,}|localhost[:?\d]*)\S*$/;

	if (!urlRegex.test(url)) {
		res.status(404).json({
			status: 0,
			error: 'Please provide a valid url.',
		});
		return;
	}

	try {
		const isSafe = await checkUrlSafety(url);

		if (!isSafe) {
			res.status(404).json({
				status: 0,
				error: 'Malicious URL. Try with different URL',
			});
			return;
		}

		const data = await scrapeUrl(url, generateScreenshot);
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
	} catch (error) {
		console.log(
			'🚀 ~ file: SBControllers.ts:81 ~ constscrapUrl:RequestHandler= ~ error:',
			error
		);
	}
};
