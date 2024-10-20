import { useState } from "react";

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

export const Checkpoint = (props: any) => {
	const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);	// State to track selected data point

	// Handle dot click (select a data point)
	const handleDotClick = (point: Point) => {
		setSelectedPoint(point); // Update selected point
	};

	return (
		<div {...props}>
			{/* Table with Line Graph */}
			<div>
				<table border="1" style={{ width: '100%' }}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
						</tr>
					</thead>
				</table>
				<div style={{ maxHeight: '120px', overflowY: 'auto' }}>
					<table border="1" style={{ width: '100%' }}>
						<tbody>
							{sampleData.map((data, index) => (
								<tr key={index}>
									<td>{data.name}</td>
									<td>{data.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Line Graph with Dots */}
				<div style={{ marginTop: '20px' }}>
					<svg width="100%" height="100">
						{/* Line */}
						<polyline
							fill="none"
							stroke="white"
							strokeWidth="3"
							points={sampleData.map((data, index) => `${index * 100},${100 - data.value}`).join(' ')}
						/>
						{/* Dots on the Line Graph */}
						{sampleData.map((data, index) => (
							<circle
								key={index}
								cx={index * 100}	// Positioning x based on index
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
			</div>

			{/* Rectangle with Text - Display Selected Data */}
			<div
				style={{
					marginTop: '20px',
					padding: '10px',
					height: '100px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'white',
					border: '1px solid black',
					backgroundColor: '#565656'
				}}
			>
				<span>
					{selectedPoint ? `Selected: ${selectedPoint.name} - Value: ${selectedPoint.value}` : 'No data point selected'}
				</span>
			</div>

			{/* Load Model Button */}
			<button style={{ marginTop: '20px' }}>Load Model</button>
		</div>
	);
}