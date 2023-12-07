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
// import CRBareData from "./CRCordlessBareDataCreate";




export default function TestDetailsTable(props) {

  const [testMeasures, setTestMeasures] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

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

  useEffect(() => {
  console.log('testMeasures:', testMeasures);
  }, [testMeasures]);

  // const [rows, setRows] = useState([
  //   {
  //     slug: '1',
  //     tester: 'a',
  //     testGroup: '',
  //     // test_measure: '',
  //     // value: '',
  //     // units: '',
  //     run: 1,
  //     remarks: 'adf',
  //     created_at: '',
  //     last_updated: '',
  //   }
  //
  // ]);
  // useEffect(() => {
  // console.log('rows:', rows);
  // }, [rows]);
  // const [rowToEdit, setRowToEdit] = useState(null);
  // const { row } = props;

  // const [groupStates, setGroupStates] = useState({});
  // const initialGroupStates = {};
  //
  // const handleDeleteRow = (targetIndex) => {
  //   setRows(rows.filter((_, idx) => idx !== targetIndex));
  // };
  //
  const handleEditRow = (idx) => {
    // setRowToEdit(idx);
    console.log('editRow:', idx);
    setModalOpen(true);
  };
  // const addRow = (group, measures) => {
  //   const newRow = {
  //     slug: '',
  //     tester: '',
  //     test_group: group,
  //     test_measure: measures,
  //     value: '',
  //     units: '',
  //     run: '',
  //     remarks: '',
  //     created: '',
  //     updated: '',
  //   };
  //
  //   setRows([...rows, newRow]);
  // }
  // const handleSubmit = (newRow) => {
  //   rowToEdit === null
  //   ? setRows([
  //     ...rows,
  //     newRow
  //   ])
  //   : setRows(
  //     rows.map((currRow, idx) => {
  //       if (idx !== rowToEdit) return currRow;
  //
  //       return newRow;
  //     })
  //   );
  // };

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
                                // Other necessary props
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
                              editRow={handleEditRow}
                              // Other necessary props
                            />
                          </div>
                        )}
                      </div>
                    );
                    {/*{measures &&*/}
                    {/*  Object.keys(measures).map((testGroup) => {*/}
                    {/*    const groupMeasures = measures[testGroup];*/}
                    {/*    return (*/}
                    {/*      <div key={testGroup}>*/}
                    {/*        <Typography variant="subtitle1" gutterBottom component="div">*/}
                    {/*          {testGroup}*/}
                    {/*        </Typography>*/}
                    {/*        {groupMeasures && (*/}
                    {/*          <TestDetailsTableRow*/}
                    {/*            testTarget={testTarget}*/}
                    {/*            testGroup={testGroup}*/}
                    {/*            testMeasures={groupMeasures}*/}
                    {/*            // addRow={() => addRow(testGroup, measures[0])} // Assuming it's an array, selecting the first item*/}
                    {/*            // deleteRow={handleDeleteRow}*/}
                    {/*            // editRow={handleEditRow}*/}
                    {/*          />*/}
                    {/*        )}*/}
                    {/*      </div>*/}
                    {/*    );*/}
                      {/*  })}*/}
                    // </div>

                  })}
              </Box>
            {/*</Collapse>*/}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}




