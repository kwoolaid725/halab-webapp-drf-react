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



// 1. Create Test
//   1.1 Select Test Category
//   1.2 Select Product Category
//   1.3 User Input Description
//   1.4 Select Sample & Inv No
//   1.5 Select Brush Type
//   1.6 Select Owner
// 2. Create Test Detail
//   2.1 Test Targets are created automatically based on the test category and product category
//   2.2 Test Groups are created automatically based on the test targets
//   2.3 Test Measures are created automatically based on the test groups
//   2.4 Test Case is user input
//   2.5 Tester is selected from the current user logged in
//   2.6 Run is auto incremented
//   2.7 Created At is auto generated when row is created
//   2.8 Last Updated is auto generated when row is edited
//   2.9 Remarks is user input
//   2.10 Upload Images is user input
// 3. Post Data
//   3.1 Flatten the data because the data is nested
//   3.2 Post the data to the database when the user clicks the submit button
// 4. Edit Data
//   4.1 Edit the data when the user clicks the edit button
// 5. Delete Data
//   5.1 Delete the data when the user clicks the delete button
// 6. View Data
//   6.1 View the data details when test id is clicked
//   6.2 View the data details under each product with different inv no.
// 7. Search Data
//   7.1 Search the data by test id, test category, product category, description, sample, inv no, brush type, owner, test target, test group, test measure, test case, tester, run, created at, last updated, remarks
// 8. Filter Data
//   8.1 Filter the data by test id, test category, product category, description, sample, inv no, brush type, owner, test target, test group, test measure, test case, tester, run, created at, last updated, remarks



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
// console.log(flattenedData);


// sub_id, crated, last_updated, tester, soil_weight, vac_weight_i, vac_weight_f, vac_weight_diff, pickup, remarks, images




function Row(props) {
  const datad = {
    id: 1,
    test_target: 'Bare Floor', // bare
    test_group: 'Sand', // sand

  }


  const { row } = props;
  // const {  } = props;
  const [open, setOpen] = useState(false);
  // const [rowData, setRowData] = useState({
  //   ...data,
  //   soil_weight: data.test_measure.Sand[0].soil_weight,
  //   vac_weight_i: data.test_measure.Sand[0].vac_weight_i,
  //   vac_weight_f: data.test_measure.Sand[0].vac_weight_f,
  // });

    // Handle change function for the input fields
  // const handleInputChange = (e, field) => {
  //   setRowData({
  //     ...rowData,
  //     [field]: e.target.value,
  //   });
  // };



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
                  <TestDetailsTableRow rows={flattenedData} testGroup={group} testMeasures={measures} />
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


const rows = [
  createData1(1,'CR','Stick Vacuum (Cordless)', 'test1', 'LG A9',1234, 'DMS', 1),
  createData1(1, 'CR','Stick Vacuum (Cordless)', 'test1', 'Dyson Gen5', 1111, 'Carpet', 1),

];

let sandKeys = Object.keys(test_measure_bare.Bare[0].Sand[0]);
// console.log(sandKeys);

export default function TestDetailsTable() {
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
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
