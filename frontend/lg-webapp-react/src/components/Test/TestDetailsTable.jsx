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
  const [groupRows, setGroupRows] = useState({});

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
    if (testMeasures) {
      const updatedRows = {};

      Object.keys(testMeasures).forEach((target) => {
        const measures = testMeasures[target];
        const rows = [];

        if (Array.isArray(measures)) {
          measures.forEach((measure, index) => {
            const slug = `test_no_${target}_${Object.keys(measure)[0]}_${index + 1}`; // Assuming only one key within the object
            rows.push({
              slug,
              tester: 'a',
              testGroup: Object.keys(measure)[0], // Assuming only one key within the object
              run: index + 1,
              remarks: '',
              created_at: '',
              last_updated: '',
              isEditing: false,
              values: measure,
              units: {},
            });
            updatedRows[slug] = rows[index];
          });
        } else {
          const slug = `test_no_${target}_${Object.keys(measures)[0]}_1`; // Assuming only one key within the object
          rows.push({
            slug,
            tester: 'a',
            testGroup: Object.keys(measures)[0], // Assuming only one key within the object
            run: 1,
            remarks: '',
            created_at: '',
            last_updated: '',
            isEditing: false,
            values: measures,
            units: {},
          });
          updatedRows[slug] = rows[0];
        }

        updatedRows[target] = rows;
      });

      setGroupRows(updatedRows);
    }
  }, [testMeasures]);


  const handleEditRow = (slug) => {
    const updatedRows = { ...groupRows };
    updatedRows[slug].isEditing = true;
    setGroupRows(updatedRows);
    setRowToEdit(slug);
    setModalOpen(true);
  };

  const handleAddRowToTable = (target, group) => {
    const updatedRows = { ...groupRows };

    // Extract the current rows for the specific target and group
    const currentRows = updatedRows[target] || [];

    const newRun = currentRows.length > 0 ? currentRows[currentRows.length - 1].run + 1 : 1;
      const newRow = {
        slug: `test_no_${target}_${group}_${newRun}`,
        tester: 'a',
        testGroup: group,
        run: newRun,
        remarks: '',
        created_at: '',
        last_updated: '',
        isEditing: false,
        values: {}, // Each row starts with an empty value object
        units: {},
      };

      // Add the new row to the existing rows for the specific target and group
      updatedRows[target] = [...currentRows, newRow];

      setGroupRows(updatedRows);
      setRowToEdit(newRow.slug);
      console.log('updatedRows', updatedRows);
      };

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
                                addRowToTable={handleAddRowToTable}
                                editRow={handleEditRow}
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
                              addRowToTable={handleAddRowToTable}
                              editRow={handleEditRow}
                              // Other necessary props
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




