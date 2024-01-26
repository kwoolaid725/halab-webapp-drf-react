import React from 'react'
import TestDetailsTableRowBare from './TestDetailsTableRowBare'
import TestDetailsTableRowCarpet from './TestDetailsTableRowCarpet'
import TestDetailsTableRowEdge from './TestDetailsTableRowEdge'
import CustomTabPanel from '../UI/TabPanel'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const TestDetailsTableCrCordless = (props) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


   return (
    <Box sx={{ width: '100%', marginLeft: '40px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',  marginLeft: '25px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Bare" />
          <Tab label="Carpet" />
          <Tab label="Edge" />
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
              <TestDetailsTableRowBare
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
              <TestDetailsTableRowCarpet
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

        <CustomTabPanel value={value} index={2}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>

            <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #fed0bb', padding: '2px', textAlign: 'center', backgroundColor: '#ff6b35' }}>
                  <h3 style={{ margin: '0', fontSize: '1.5rem',  color: 'white'  }}>Edge</h3>
                </th>
              </tr>
            </thead>
            <tbody style={{ border: '1px solid #ddd' }}>
              <TestDetailsTableRowEdge
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

export default TestDetailsTableCrCordless;
