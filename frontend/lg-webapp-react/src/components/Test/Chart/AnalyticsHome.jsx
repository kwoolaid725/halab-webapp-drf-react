// App.js
import React from 'react';
import InteractiveBarChart from './InterativeBarChart'

const data = [
  { country: 'A', value: 10 },
  { country: 'B', value: 15 },
  { country: 'C', value: 20 },
  // Add more data as needed
];

function AnalyticsHome() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nivo Interactive Bar Chart Example</h1>
      </header>
      <main>
        <InteractiveBarChart data={data} />
      </main>
    </div>
  );
}

export default AnalyticsHome;
