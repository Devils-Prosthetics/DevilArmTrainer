import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Terminal } from './components/Terminal';
import { Logo } from './components/Logo';
import { FileSelector } from './components/FileSelector';
import { Checkpoint } from './components/Checkpoint';

const App = () => {

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Logo />

			{/* Left Section */}
			<Checkpoint />

			{/* Right Section */}
			<FileSelector style={{ width: '50%', padding: '0px' }} />

			<Terminal />
			<ToastContainer />
		</div>
	);
};

export default App;
