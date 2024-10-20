import { useState } from "react";

export const Terminal = () => {
	const [consoleOutput, setConsoleOutput] = useState('Console output will appear here.');

	// Handle Start and Restart buttons
	// Handle Start button
	const handleStart = async () => {
		setConsoleOutput('Starting serial port connection...');
		try {
			const response = await invoke('serial_start', { port: '/dev/ttyACM0' });
			setConsoleOutput(response);
		} catch (error) {
			setConsoleOutput(`Error: ${error}`);
		}
	};

	// Handle Restart button (no backend call, just resets the console)
	const handleRestart = () => setConsoleOutput('Restart clicked');

	return (
		<div style={{ width: '100%', position: 'absolute', bottom: '30px', textAlign: 'center' }}>
			<div
				style={{
					margin: '20px auto',
					width: '95%',
					height: '200px',
					border: '1px solid black',
					padding: '10px',
					overflowY: 'scroll',
					color: 'white',
					backgroundColor: '#565656',
					textAlign: 'left'
				}}
			>
				{consoleOutput.split('\n').map((line, index) => {
					return (<span key={index}>{line}</span>)
				})}
			</div>
			<button onClick={handleRestart} style={{ marginRight: '10px' }}>
				Restart
			</button>
			<button onClick={handleStart}>Start</button>
		</div>
	);
}
