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

let test_measure_bare = {
  Bare: [
      {
      Sand: [
        {
          soil_weight: {
              value: '40',
              units: 'g'
          },
          vac_weight_i: {
              value: '',
              units: 'g'
          },
          vac_weight_f: {
              value: '',
              units: 'g'
          },
          vac_weight_diff: {
              value: '',
              units: 'g'
          },
          pickup: {
              value: '',
              units: '%'
          }
        }
        ]
      },
      {
        Rice: [
          {
            soil_weight: {
              value: '50',
              units: 'g'
            },
            vac_weight_i: {
              value: '',
              units: 'g'
            },
            vac_weight_f: {
              value: '',
              units: 'g'
            },
            vac_weight_diff: {
              value: '',
              units: 'g'
            },
            pickup: {
              value: '',
              units: '%'
            }
          }
        ]
      },
      {
        Cheerios: [
          {
            soil_weight: {
                value: '25',
                units: 'g'
            },
            vac_weight_i: {
                value: '',
                units: 'g'
            },
            vac_weight_f: {
                value: '',
                units: 'g'
            },
            vac_weight_diff: {
                value: '',
                units: 'g'
            },
            pickup: {
                value: '',
                units: '%'
            }
          }
        ]
      }
  ]};


export default function TestDetailsTable(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      slug: '',
      tester: '',
      test_group: '',
      test_measure: '',
      value: '',
      units: '',
      run: '',
      remarks: '',
      created: '',
      updated: '',
    }

  ]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [groupStates, setGroupStates] = useState({});

  useEffect(() => {
      const initialRow = {
      slug: '',
      tester: '',
      test_group: '',
      test_measure: '',
      value: '',
      units: '',
      run: '',
      remarks: '',
      created: '',
      updated: ''
  };
  const initialGroupStates = {};

  test_measure_bare.Bare.forEach((item) => {
    const group = Object.keys(item)[0];
    initialGroupStates[group] = [initialRow];
  });

  setGroupStates(initialGroupStates);
  }, []);

 const addRow = (group) => {
  const newRow = {
      slug: '',
      tester: '',
      test_group: '',
      test_measure: '',
      value: '',
      units: '',
      run: '',
      remarks: '',
      created: '',
      updated: ''
  };
  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.test_id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.test_category}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.product_category}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.description}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.sample}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.inv_no}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.brush_type}
        </TableCell>
         <TableCell component="th" scope="row">
          {row.owner}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {test_measure_bare.Bare.map((item) => {
                const group = Object.keys(item)[0];
                let measures;
                if (item[group]) {
                  measures = item[group][0]; // assign value to measures here
                } else {
                  console.log(`Group ${group} not found in item`, item);
                }

                return (
                  <div>
                    <Typography variant="h6" gutterBottom component="div">
                      {group}
                    </Typography>
                  <TestDetailsTableRow rows={groupStates[group] || []} testGroup={group} testMeasures={measures} addRow={() => addRow(group)} deleteRow={handleDeleteRow} editRow={handleEditRow}  />
                  </div>
                )})
                }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}}




