import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from "@mui/material/TextField";
import TestDetailsTableRow from './TestDetailsTableRow';
import axiosInstance from "../../axios";
// import CRBareData from "./CRCordlessBareDataCreate";




const TestDetailsTable = (props) => {

  const [testMeasures, setTestMeasures] = useState(null);
  const [fetchedRows, setFetchedRows] = useState([]);

  useEffect(() => {
    console.log('Attempting to fetch data...');
    fetch('/test-measures.json')
      .then((response) => response.json())
      .then((jsonData) => {
        // Set the retrieved JSON data to state
        setTestMeasures(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  console.log('Sample value:', props.sample);

   useEffect(() => {
    if (props.testId) {
      axiosInstance(`/admin/tests/vacuum/testdetail/?test_no=${props.testId}`)
        .then((res) => {
          const testDataDetails = res.data;
          setFetchedRows(testDataDetails);
        })
        .catch((error) => {
          console.error('Error fetching detailed data: ', error);
          // Handle error appropriately
        });
    }
  }, [props.testId]);

  useEffect(() => {
    console.log('Fetched rows updated:', fetchedRows);
  }, [fetchedRows]);


    return (
      <React.Fragment>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
              <Box sx={{ margin: 1 }}>
              {testMeasures &&
                Object.keys(testMeasures).map((target) => {
                  const measures = testMeasures[target];
                  return (
                      <div key={target}>
                        <Typography variant="h6" gutterBottom component="div">
                          {target}
                        </Typography>
                        {Array.isArray(measures) ? (
                          measures.map((measure, index) => (
                            <div key={index}>
                              <Typography variant="body1">{Object.keys(measure)}</Typography>
                              {/* Include TestDetailsTableRow here */}
                              <TestDetailsTableRow
                                testTarget={target}
                                testGroup={Object.keys(measure)[0]} // Assuming only one key within the object
                                testMeasures={measure}
                                // editRow={handleEditRow}
                                testId={props.testId}
                                sample={props.sample}
                                brushType={props.brushType}
                                // tester={props.tester}
                                testCase={props.testCase}
                              />
                            </div>
                          ))
                         ) : (
                          <div key={Object.keys(measures)}>
                            <Typography variant="body1">{Object.keys(measures)}</Typography>
                            {/* Include TestDetailsTableRow here */}
                            <TestDetailsTableRow
                              testTarget={target}
                              testGroup={Object.keys(measures)[0]} // Assuming only one key within the object
                              testMeasures={measures}
                              // editRow={handleEditRow}
                              testId={props.testId}
                              sample={props.sample}
                              brushType={props.brushType}
                              // tester={props.tester}
                              testCase={props.testCase}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}

            </Box>
            {/*</Collapse>*/}
          </TableCell>
        </TableRow>
      </React.Fragment>
      );



}

export default TestDetailsTable;




