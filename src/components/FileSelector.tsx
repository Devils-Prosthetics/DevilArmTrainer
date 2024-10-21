import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./Button";
import { InputFile } from "./InputFile";
import { useConsoleStore } from "../stores/console";

export const FileSelector = (props: any) => {
	const [folderContent, setFolderContent] = useState<string[]>([]);
	const consoleAdd = useConsoleStore((state) => state.add);

	// Function to handle folder selection
	const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;
		const folderData = [];
		for (let i = 0; i < files.length; i++) {
			folderData.push(files[i].name);
		}
		setFolderContent(folderData);
	};

	const handleFileUpload = async () => {
		const files = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files;
		if (!files || files.length < 1) return;

		const file = files[0];
		
		const reader = new FileReader();
		
		reader.onload = async () => {
			try{
				// Call the Rust backend to upload the file
				const response = await invoke('upload_file_to_pi');

				console.log(response);
			} catch (error) {
				`${error}`.split('\n').forEach(consoleAdd)
				toast(`Failed to upload`);
			}
		};
		reader.readAsArrayBuffer(file);
	};


	return (
		<div {...props}>
			{/* Display Folder Contents */}
			<div>
				<ul>
					{folderContent.map((file, index) => (
						<li key={index}>{file}</li>
					))}
				</ul>
			</div>

			{/* New and Load Buttons */}
			<div className="flex flex-col justify-center items-center">
				{/* Folder Selection Box */}
				<Button onClick={handleFileUpload}>Upload to Raspberry Pi</Button>
				<InputFile onChange={handleFolderSelect} className="mt-2" />
			</div>
		</div>
	);
}
