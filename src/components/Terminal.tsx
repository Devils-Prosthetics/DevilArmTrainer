import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

export const Terminal = (props: any) => {
	const [consoleOutput, setConsoleOutput] = useState('Console output will appear here.');

	// Handle Start and Restart buttons
	// Handle Start button
	const handleStart = async () => {
		setConsoleOutput('Starting serial port connection...');
		try {
			const response = await invoke('serial_start', { port: '/dev/ttyACM0' }) as string;
			setConsoleOutput(response);
		} catch (error) {
			setConsoleOutput(`Error: ${error}`);
		}
	};

	// Handle Restart button (no backend call, just resets the console)
	const handleRestart = () => setConsoleOutput('Restart clicked');

	useEffect(() => {
		const unlisten = listen('serial-data', (event) => {
			setConsoleOutput((prev) => `${prev}\n${event.payload}`);
		});

		return () => {
			unlisten.then((fn) => fn());
		};
	}, []);

	return (
		<div {...props}>
			<div>
				{consoleOutput.split('\n').map((line, index) => {
					return (<span key={index}>{line}</span>)
				})}
			</div>
			<button onClick={handleRestart}>
				Restart
			</button>
			<button onClick={handleStart}>Start</button>
		</div>
	);
}
