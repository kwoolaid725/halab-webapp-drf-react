// InteractiveBarChart.js
import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const InteractiveBarChart = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // const handleFilterChange = (filter) => {
  //   setSelectedFilter(filter);
  //
  //   // Apply filtering logic based on your data structure
  //   if (filter === 'all') {
  //     setFilteredData(data);
  //   } else {
  //     const filtered = data.filter((item) => /* Your filter logic here */);
  //     setFilteredData(filtered);
  //   }
  // };

  return (
    <div>
      <div>
        Filter:
        <select
          value={selectedFilter}
          // onChange={(e) => (e.target.value)}
        >
          <option value="all">All</option>
          {/* Add other filter options here */}
        </select>
      </div>
      <div style={{ height: '400px' }}>
        <ResponsiveBar
          data={filteredData}
          keys={['value']}
          indexBy="country"
          margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
          padding={0.3}
          // Add other chart configurations here
        />
      </div>
    </div>
  );
};

export default InteractiveBarChart;
