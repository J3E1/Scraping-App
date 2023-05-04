type Props = { path: string };
export default function ScreenShot({ path }: Props) {
	return (
		<div className='bg-white shadow-lg overflow-hidden w-full mt-4'>
			<img src={'../../public/' + path} />
		</div>
	);
}
