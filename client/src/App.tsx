import { useState } from 'react';
import ScrappingApp from './Components/ScrappingApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<ScrappingApp />
			<ToastContainer position='top-center' />
		</>
	);
}

export default App;
