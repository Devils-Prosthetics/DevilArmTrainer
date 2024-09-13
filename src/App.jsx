import React, { useState } from 'react';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';

// Sample data for table and line graph
const sampleData = [
  { name: 'Point 1', value: 10 },
  { name: 'Point 2', value: 30 },
  { name: 'Point 3', value: 20 },
  { name: 'Point 4', value: 80 },
  { name: 'Point 5', value: 70 }
];

listen('download-started', (event) => {
  console.log(
    `downloading ${event.payload.contentLength} bytes from ${event.payload.url}`
  );
});

const App = () => {
  const [folderContent, setFolderContent] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState('Console output will appear here.');
  const [selectedPoint, setSelectedPoint] = useState(null);  // State to track selected data point

  // Function to handle folder selection
  const handleFolderSelect = (event) => {
    const files = event.target.files;
    const folderData = [];
    for (let i = 0; i < files.length; i++) {
      folderData.push(files[i].name);
    }
    setFolderContent(folderData);
  };

  // Handle Start and Restart buttons
  const handleStart = async () => {
    setConsoleOutput('Start clicked');
    const response = await invoke('serial_start', { port: '/dev/ttyUSB0'} );
    console.log('response:', response);
  };
  const handleRestart = () => setConsoleOutput('Restart clicked');

  // Handle dot click (select a data point)
  const handleDotClick = (point) => {
    setSelectedPoint(point);  // Update selected point
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Section */}
      <div style={{ width: '50%', padding: '20px' }}>
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
                  cx={index * 100}  // Positioning x based on index
                  cy={100 - data.value}  // Positioning y based on value
                  r="5"
                  fill={selectedPoint === data ? 'red' : 'white'}  /* Selected point in red */
                  stroke="black"
                  strokeWidth="1"
                  cursor="pointer"
                  onClick={() => handleDotClick(data)}  // Handle dot click
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Rectangle with Text - Display Selected Data */}
        <div
          style={{
            backgroundColor: '#000000',
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

      {/* Right Section */}
      <div style={{ width: '50%', padding: '0px' }}>

        {/* Display Folder Contents */}
        <div style={{ marginTop: '20px', height: '150px', overflowY: 'scroll', border: '1px solid black', backgroundColor: '#565656' }}>
          <ul>
            {folderContent.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>

        {/* New and Load Buttons */}
        <div style={{ marginTop: '20px' }}>
          <button>New</button>
          <button style={{ marginLeft: '10px' }}>Load</button>
          {/* Folder Selection Box */}
          <input type="file" webkitdirectory="true" onChange={handleFolderSelect} />
        </div>
      </div>

      {/* Bottom Console Section */}
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
          }}
        >
          {consoleOutput}
        </div>
        <button onClick={handleRestart} style={{ marginRight: '10px' }}>
          Restart
        </button>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  );
};

export default App;
