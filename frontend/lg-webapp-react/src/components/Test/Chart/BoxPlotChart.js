
import React, { useState, useEffect} from 'react'
import { ResponsiveBoxPlot } from '@nivo/boxplot'

const BoxPlotChart = ({ data }) => {
  const [chartTitle, setChartTitle] = useState('');

   useEffect(() => {
  // Check if data has the expected properties
  if (data && data.length > 0 && data[0].testGroup) {
    setChartTitle(`${data[0].testTarget} ${data[0].testGroup} ${data[0].subgroup}`);
  } else {
    setChartTitle('Invalid Data'); // Set a default title or handle the case where data is invalid
  }
}, [data]);


  return (
    <div style={{ height: '400px' }}>
      <h2>{chartTitle}</h2>
      <ResponsiveBoxPlot
        data={data}
        margin={{ top: 60, right: 140, bottom: 60, left: 60 }}
        minValue= 'auto'
        maxValue='auto'// Adjust the maxValue as per your data
        groupBy="group" // Group by subgroup for multiple box plots
        groupMode="grouped"
        subGroupBy="subgroup"
        padding={0.12}
        enableGridX={true}
        colors={{ scheme: 'nivo' }}
        colorBy={'group'}
        // axisTop={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: '',
        //   legendOffset: 36
        // }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 0
        }}
        // axisBottom={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'group',
        //   legendPosition: 'middle',
        //   legendOffset: 32
        // }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Group',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'value',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        colors={{ scheme: 'nivo' }}
        borderRadius={2}
        borderWidth={2}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.3
            ]
          ]
        }}
        medianWidth={2}
        medianColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.3
            ]
          ]
        }}
        whiskerEndSize={0.6}
        whiskerColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.3
            ]
          ]
        }}
        motionConfig="stiff"
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemWidth: 60,
            itemHeight: 20,
            itemsSpacing: 3,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            symbolSize: 20,
            symbolShape: 'square',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}

export default BoxPlotChart
