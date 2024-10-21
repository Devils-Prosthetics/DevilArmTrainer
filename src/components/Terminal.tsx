import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { Button } from "./Button";
import { useConsoleStore } from "../stores/console";


export const Terminal = ({className, ...props}: {className: string}) => {
	const consoleState = useConsoleStore((state) => state);

	// Handle Start and Restart buttons
	// Handle Start button
	const handleStart = async () => {
		consoleState.set(['Starting serial port connection...']);
		try {
			const response = await invoke('serial_start', { port: '/dev/ttyACM0' }) as string;
			consoleState.set([response]);
		} catch (error) {
			consoleState.set([`Error: ${error}`]);
		}
	};

	// Handle Restart button (no backend call, just resets the console)
	const handleRestart = () => consoleState.set(['Restart clicked']);

	useEffect(() => {
		const unlisten = listen('serial-data', (event) => {
			consoleState.add(event.payload as string);
		});

		return () => {
			unlisten.then((fn) => fn());
		};
	}, []);

	return (
		<div className={`relative h-full ${className}`} {...props}>
			<div className="absolute right-3">
				<div className='flex space-x-2'>
					<Button className='w-fit' onClick={handleRestart}>
						Restart
					</Button>
					<Button className='w-fit' onClick={handleStart}>Start</Button>
				</div>
			</div>
			<div className="overflow-y-scroll h-full">
				{consoleState.output.map((line, index) => {
					return (<div key={index}>{line}</div>)
				})}
			</div>
		</div>
	);
}
