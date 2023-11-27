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


const testMeasures = {
"Bare": [
  {
    "Sand": [
      {
        "soil_weight": {
          "value": "40",
          "units": "g"
        },
        "vac_weight_i": {
          "value": "",
          "units": "g"
        },
        "vac_weight_f": {
          "value": "",
          "units": "g"
        },
        "vac_weight_diff": {
          "value": "",
          "units": "g"
        },
        "pickup": {
          "value": "",
          "units": "%"
        }
      }
    ]
  },
  {
    "Rice": [
      {
        "soil_weight": {
          "value": "40",
          "units": "g"
        },
        "vac_weight_i": {
          "value": "",
          "units": "g"
        },
        "vac_weight_f": {
          "value": "",
          "units": "g"
        },
        "vac_weight_diff": {
          "value": "",
          "units": "g"
        },
        "pickup": {
          "value": "",
          "units": "%"
        }
      }
    ]
  },
  {
    "Cheerios": [
      {
        "soil_weight": {
          "value": "40",
          "units": "g"
        },
        "vac_weight_i": {
          "value": "",
          "units": "g"
        },
        "vac_weight_f": {
          "value": "",
          "units": "g"
        },
        "vac_weight_diff": {
          "value": "",
          "units": "g"
        },
        "pickup": {
          "value": "",
          "units": "%"
        }
      }
    ]
  }
],
"Carpet":
    {
    "Sand":
      {
        "soil_weight": {
            "value": "100",
            "units": "g"
        },
        "vac_weight_i": {
            "value": "",
            "units": "g"
        },
        "vac_weight_f": {
            "value": "",
            "units": "g"
        },
        "vac_weight_diff": {
            "value": "",
            "units": "g"
        },
        "pickup": {
            "value": "",
            "units": "%"
        }
      }
    }
}
//
const testGroup = 'Sand'; // Example testGroup
const testCategory = 'Bare'; // Example testCategory





export default function TestDetailsTable(props) {

  const [testMeasures, setTestMeasures] = useState(null);

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



  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      slug: '1',
      tester: 'a',
      testGroup: '',
      // test_measure: '',
      // value: '',
      // units: '',
      run: 1,
      remarks: 'adf',
      created_at: '',
      last_updated: '',
    }

  ]);
  useEffect(() => {
  console.log('rows:', rows);
  }, [rows]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [groupStates, setGroupStates] = useState({});

    const initialGroupStates = {};

    const handleDeleteRow = (targetIndex) => {
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
      setRowToEdit(idx);

      setModalOpen(true);
    };
    const addRow = (group, measures) => {
      const newRow = {
        slug: '',
        tester: '',
        test_group: group,
        test_measure: measures,
        value: '',
        units: '',
        run: '',
        remarks: '',
        created: '',
        updated: '',
      };

      setRows([...rows, newRow]);
    }
    const handleSubmit = (newRow) => {
      rowToEdit === null
      ? setRows([
        ...rows,
        newRow
      ])
      : setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;

          return newRow;
        })
      );
    };

    return (
      <React.Fragment>
        {/*<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>*/}
        {/*  <TableCell>*/}
        {/*    <IconButton*/}
        {/*      aria-label="expand row"*/}
        {/*      size="small"*/}
        {/*      onClick={() => setOpen(!open)}*/}
        {/*    >*/}
        {/*      {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}*/}
        {/*    </IconButton>*/}
        {/*  </TableCell>*/}
        {/*  <TableCell component="th" scope="row">*/}
        {/*    {row.slug}*/}
        {/*  </TableCell>*/}
        {/*  <TableCell component="th" scope="row">*/}
        {/*    {row.test_category}*/}
        {/*  </TableCell>*/}
        {/*  <TableCell component="th" scope="row">*/}
        {/*    {row.product_category}*/}
        {/*  </TableCell>*/}
        {/*  <TableCell component="th" scope="row">*/}
        {/*    {row.description}*/}
        {/*  </TableCell>*/}
        {/*  <TableCell component="th" scope="row">*/}
        {/*    {row.sample}*/}
        {/*  </TableCell>*/}
        {/*  <TableCell component="th" scope="row">*/}
        {/*    {row.inv_no}*/}
        {/*  </TableCell>*/}
        {/*  <TableCell component="th" scope="row">*/}
        {/*    {row.brush_type}*/}
        {/*  </TableCell>*/}
        {/*  <TableCell component="th" scope="row">*/}
        {/*    {row.owner}*/}
        {/*  </TableCell>*/}
        {/*</TableRow>*/}
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {testMeasures &&
                  Object.keys(testMeasures).map((group) => {
                    const measures = testMeasures[group];
                    return (
                      <div key={group}>
                        <Typography variant="h6" gutterBottom component="div">
                          {group}
                        </Typography>
                        {measures && (
                          <TestDetailsTableRow
                            rows={rows}
                            testGroup={group}
                            testMeasures={measures}
                            addRow={() => addRow(group, measures[0])} // Assuming it's an array, selecting the first item
                            // deleteRow={handleDeleteRow}
                            // editRow={handleEditRow}
                          />
                        )}
                      </div>
                    );
                  })}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}




