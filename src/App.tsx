import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Terminal } from './components/Terminal';
import { Logo } from './components/Logo';
import { FileSelector } from './components/FileSelector';
import { Checkpoint } from './components/Checkpoint';

const App = () => {

	return (
		<>
			<div className='flex flex-col justify-center items-center p-10 h-full'>
				<Logo size={'100'} />
				<div className='flex py-3 space-x-3'>
					<Checkpoint className='bg-pink-900 rounded-xl p-3 w-full' />
					<FileSelector className='bg-pink-900 rounded-xl p-3' />
				</div>
				<Terminal className='bg-pink-900 rounded-xl p-3 h-full w-full' />
			</div>
			<ToastContainer />
		</>
	);
};

export default App;
