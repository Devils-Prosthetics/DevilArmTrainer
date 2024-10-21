import { useState } from "react";
import { Button } from "./Button";

// Sample data for table and line graph
const sampleData: Point[] = [
	{ name: 'Point 1', value: 10 },
	{ name: 'Point 2', value: 30 },
	{ name: 'Point 3', value: 20 },
	{ name: 'Point 4', value: 80 },
	{ name: 'Point 5', value: 70 }
];

type Point = {
	name: string,
	value: number
}

export const Checkpoint = ({className, ...props}: {className?: string}) => {
	const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);	// State to track selected data point

	// Handle dot click (select a data point)
	const handleDotClick = (point: Point) => {
		setSelectedPoint(point); // Update selected point
	};

	return (
		<div {...props} className={`flex justify-center items-center ${className}`}>
			{/* Table with Line Graph */}
			<table className="bg-pink-950 p-4 rounded-xl border-separate border-spacing-x-5 whitespace-nowrap">
				<thead>
					<tr>
						<th>Name</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{sampleData.map((data, index) => (
						<tr key={index}>
							<td className="text-center">{data.name}</td>
							<td className="text-center">{data.value}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='flex flex-col w-full justify-center items-center mx-2'>
				{/* Line Graph with Dots */}
				<div>
					<svg className='w-full h-full' viewBox='0 0 410 100' >
						{/* Line */}
						<polyline
							fill="none"
							stroke="white"
							strokeWidth="3"
							points={sampleData.map((data, index) => `${index * 100 + 5},${100 - data.value}`).join(' ')}
						/>
						{/* Dots on the Line Graph */}
						{sampleData.map((data, index) => (
							<circle
								key={index}
								cx={index * 100 + 5}	// Positioning x based on index
								cy={100 - data.value}	// Positioning y based on value
								r="5"
								fill={selectedPoint === data ? 'red' : 'white'}	/* Selected point in red */
								stroke="black"
								strokeWidth="1"
								cursor="pointer"
								onClick={() => handleDotClick(data)}	// Handle dot click
							/>
						))}
					</svg>
				</div>

				{/* Rectangle with Text - Display Selected Data */}
				<div>
					<span>
						{selectedPoint ? `Selected: ${selectedPoint.name} - Value: ${selectedPoint.value}` : 'No data point selected'}
					</span>
				</div>

				{/* Load Model Button */}
				<Button>Load Model</Button>
			</div>
		</div>
	);
}