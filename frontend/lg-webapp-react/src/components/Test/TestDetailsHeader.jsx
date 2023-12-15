import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TestDetailsTableRow from "./TestDetailsTableRow";
import Input from '@mui/material/Input';

const TEST_CATEGORY = [
  { value: 'CR', label: 'CR' },
  { value: 'RU', label: 'Real-Use' },
  { value: 'FT', label: 'Field Test' },
  { value: 'CRDI', label: 'CRDI' },
];

const PRODUCT_CATEGORY = [
  { value: '1', label: 'Cordless Vacuum' },
  { value: '2', label: 'Robot Vacuum' },
];

const TEST_STATUS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
];

function TestDetailsHeader(props) {

  // console.log('dueDate', dueDate);

  return (
    <React.Fragment>
      {/* First row: Test Category, Product Category */}
      <TableRow>
        <TableCell sx={{ width: '100px' }} colSpan={1}>Test Category</TableCell>
        <TableCell colSpan={1}>
          {props.testCategory}
        </TableCell>


        <TableCell sx={{ width: '100px' }} colSpan={1}>Product Category</TableCell>
        <TableCell colSpan={2}>
          {props.productCategory}
        </TableCell>
        <TableCell colSpan={2}></TableCell>
      </TableRow>

      {/* Second row: Test No., Description */}
      <TableRow>
        <TableCell sx={{ width: '100px' }} colSpan={1}>Test No.</TableCell>
        <TableCell >
          {props.testId}
        </TableCell>
        <TableCell>Description</TableCell>
        <TableCell colSpan={4}>
          {props.description}
        </TableCell>
      </TableRow>

      {/* Third row: Test Status, Due Date, Completion Date */}
      <TableRow>
        <TableCell>Test Status</TableCell>
        <TableCell colSpan={1}>
          <Select variant="outlined" size="small">
            {TEST_STATUS.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell sx={{ width: '100px' }}>Due Date</TableCell>
        <TableCell colSpan={1}>
          <TextField
            variant="outlined"
            size="small"
            type="date"
            value={props.dueDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TableCell>
         <TableCell sx={{ width: '100px' }}>Completion Date</TableCell>
         <TableCell colSpan={1}>
          <TextField
            variant="outlined"
            size="small"
            type="date"
            value={props.completionDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TableCell>
        <TableCell colSpan={2}></TableCell>
      </TableRow>

      {/* Fourth row: Remarks */}
      <TableRow>
        <TableCell>Remarks</TableCell>
        <TableCell colSpan={5}>
          <TextField variant="outlined" size="small" multiline fullWidth />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default TestDetailsHeader;