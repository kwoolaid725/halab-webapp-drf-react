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

function flattenData(data) {
  let flattenedData = [];

  for (let measure in data.test_measure) {
    data.test_measure[measure].forEach(item => {
      for (let key in item) {
        if (item[key] !== '') {
          let flatItem = {
            test_target: data.test_target,
            test_group: data.test_group,
            sample: data.sample,
            brush_type: data.brush_type,
            test_measure: key,
            value: item[key]
          };
          flattenedData.push(flatItem);
        }
      }
    });
  }

  return flattenedData;
}

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


function createData( id, test_target, test_group, test_measure,test_case,tester, run, created_at, last_updated, remarks) {
  return {
    id, // test_id + '-' + auto increment
    test_target, // bare
    test_group, // sand
    test_measure, // pickup
    test_case, // NA
    tester,// 1
    run,
    created_at,
    last_updated,
    remarks
  };
}

function createData1(test_id, test_category, product_category, description, sample, inv_no, brush_type, owner) {
  return {
    test_id,
    test_category,
    product_category,
    description,
    sample,
    inv_no,
    brush_type,
    owner,
  };
}
// test_category, product_category, description,
// test_id, tester, sample, brush_type, owner
// test_target, test_group, test_measure, value, units, date, remarks,


let data = createData( '1-1','Bare Floor', 'Sand', test_measure_bare, 'NA', 1, 1, '2021-10-10', '2021-10-10', 'NA');

let flattenedData = flattenData(data);
console.log(flattenedData);


// sub_id, crated, last_updated, tester, soil_weight, vac_weight_i, vac_weight_f, vac_weight_diff, pickup, remarks, images




function Row(props) {
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
  // const {  } = props;
  const [open, setOpen] = useState(false);

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
                  <TestDetailsTableRow rows={flattenedData} testGroup={group} testMeasures={measures} deleteRow={handleDeleteRow} editRow={handleEditRow}  />
                  </div>
                )})
                }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const testData = [
  createData1(1,'CR','Stick Vacuum (Cordless)', 'test1', 'LG A9',1234, 'DMS', 1),
  createData1(1, 'CR','Stick Vacuum (Cordless)', 'test1', 'Dyson Gen5', 1111, 'Carpet', 1),

];

let sandKeys = Object.keys(test_measure_bare.Bare[0].Sand[0]);
// console.log(sandKeys);

const TestDetailsTable = () => {
  return (
     <Box sx={{ margin: 1 }}>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Test ID</TableCell>
              <TableCell>Test Category</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Test Sample</TableCell>
              <TableCell>Inv. No.</TableCell>
              <TableCell>Brush Type</TableCell>
              <TableCell>Owner</TableCell>
              {/*<TableCell align="left">Protein&nbsp;(g)</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {testData.map((data) => (
              <Row key={data.name} row={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TestDetailsTable;