import { ScrappedData } from '../Utils/util';

interface Props extends ScrappedData {}

export default function Result({
	image,
	title,
	description,
	author,
	publishedDate,
	locale,
	canonicalUrl,
}: Props) {
	return (
		<div className='bg-white shadow-lg rounded-lg overflow-hidden w-full mt-4'>
			<img className='h-56 w-full object-cover' src={image} alt={title} />
			<div className='p-4'>
				<h2 className='text-xl font-bold mb-2'>{title}</h2>
				<p className='text-gray-700 text-base'>{description}</p>
				<div className='flex items-center mt-4'>
					<div className='text-sm'>
						<p className='text-gray-500 leading-none'>Author : {author}</p>
						<p className='text-gray-500'>Published Date : {publishedDate}</p>
					</div>
				</div>
				<div className='flex justify-between items-center mt-4'>
					<p className='text-gray-400 text-sm'>Language : {locale}</p>
					<a
						href={canonicalUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'>
						Visit Site
					</a>
				</div>
			</div>
		</div>
	);
}
