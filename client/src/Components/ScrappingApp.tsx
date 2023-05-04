import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import { ScrappedData, scrapUrl } from '../Utils/util';
import Result from './Result';
import ScreenShot from './ScreenShot';

type Props = {};
export default function ScrappingApp({}: Props) {
	const [url, setUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [screenshotPath, setScreenshotPath] = useState('');
	const [screenshotMode, setScreenshotMode] = useState(false);
	const [sData, setSData] = useState<ScrappedData>({} as ScrappedData);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value.trim());
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setIsLoading(true);
		// Check if the URL is entered
		if (!url) {
			toast.error('Please enter a URL');
			setIsLoading(false);
			return;
		}

		// Check if the URL is valid with regex
		const urlRegex =
			/^(?:(?:https?):\/\/)?(?:www\.)?([^\s.]+\.[^\s]{2,}|localhost[:?\d]*)\S*$/;

		if (!urlRegex.test(url)) {
			toast.info('Please enter a valid URL');
			setIsLoading(false);
			return;
		}

		try {
			const scrappedData = await scrapUrl(url, screenshotMode);
			if (scrappedData.status === 0) {
				toast.error(scrappedData.error);
			} else {
				if (typeof scrappedData.data === 'string') {
					setScreenshotPath(scrappedData.data);
				} else {
					setSData(scrappedData.data);
				}
			}
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			toast.error('Something went wrong');
			setIsLoading(false);
		}
	};

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='container mx-auto'>
			<div className='mx-2'>
				<h1 className='text-3xl font-bold text-center my-8'>Scraping App</h1>
				<form onSubmit={handleSubmit}>
					<div className='flex items-center border-b-2 border-teal-500 py-2'>
						<input
							className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
							type='text'
							placeholder='Enter a URL'
							value={url}
							onChange={handleChange}
						/>
						<button
							onClick={() => setScreenshotMode(false)}
							className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
							type='submit'>
							Scrape
						</button>
						<button
							onClick={() => setScreenshotMode(true)}
							className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded ml-2'
							type='submit'>
							Screenshot
						</button>
					</div>
				</form>
				{Object.keys(sData).length !== 0 && <Result {...sData} />}
				{screenshotPath && <ScreenShot path={screenshotPath} />}
			</div>
		</div>
	);
}
