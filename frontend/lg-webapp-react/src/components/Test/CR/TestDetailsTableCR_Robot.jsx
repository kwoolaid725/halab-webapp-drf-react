import React from 'react'

import TestDetailsTableRowRobotCarpet from './Vacuum_Robot/TestDetailsTableRow_RobotCarpet'
import TestDetailsTableRowRobotBare from './Vacuum_Robot/TestDetailsTableRow_RobotBare'


import CustomTabPanel from '../../UI/TabPanel'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const TestDetailsTableCrRobot = (props) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


   return (
    <Box sx={{ width: '100%', marginLeft: '25px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',  marginLeft: '25px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Bare" />
          <Tab label="Carpet" />
          {/* Add more tabs as needed */}
        </Tabs>
      </Box>

      {/* Content for Bare (Item One) */}
      <CustomTabPanel value={value} index={0}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '3px solid #fed0bb', padding: '2px', textAlign: 'center', backgroundColor: '#db5375' }}>
                  <h3 style={{ margin: '0', fontSize: '1.5rem',  color: 'white' }}>Bare Floor</h3>
                </th>
              </tr>
            </thead>
            <tbody style={{ border: '1px solid #ddd' }}>
              <TestDetailsTableRowRobotBare
                testId={props.testId}
                sample={props.sample}
                brushType={props.brushType}
                tester={props.tester}
                testCase={props.testCase}
                model={props.model}
              />
            </tbody>
          </table>
        </CustomTabPanel>


        <CustomTabPanel value={value} index={1}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>

           <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #fed0bb', padding: '2px', textAlign: 'center', backgroundColor: '#73bfb8' }}>
                  <h3 style={{ margin: '0', fontSize: '1.5rem', color: 'white' }}>Carpet</h3>
                </th>
              </tr>
            </thead>
            <tbody style={{ border: '1px solid #ddd' }}>
              <TestDetailsTableRowRobotCarpet
                testId={props.testId}
                sample={props.sample}
                brushType={props.brushType}
                tester={props.tester}
                testCase={props.testCase}
                model={props.model}
              />
            </tbody>
          </table>
        </CustomTabPanel>
      {/* Add more CustomTabPanel components for additional tabs as needed */}
    </Box>
  );
};

export default TestDetailsTableCrRobot;
