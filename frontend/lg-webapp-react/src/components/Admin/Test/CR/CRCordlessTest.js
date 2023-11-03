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


export default function = (props) => {
  // const { CRcordless } = props;

  // if (!CRcordless || CRcordless.length === 0) return <p>Cannot find any samples, sorry</p>;
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = React.useState(row);

    // Handle change function for the input fields
  const handleInputChange = (e, field) => {
    setRowData({
      ...rowData,
      [field]: e.target.value,
    });
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
          {row.test_target}
        </TableCell>
         <TableCell component="th" scope="row">
          {row.test_group}
        </TableCell>
        {/*<TableCell component="th" scope="row">*/}
        {/*  <TextField*/}
        {/*    name="Fat"*/}
        {/*    value={rowData.fat}*/}
        {/*    onChange={(e) => handleInputChange(e, 'fat')}*/}
        {/*  />*/}
        {/*</TableCell>*/}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sand
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Tester</TableCell>
                    <TableCell>Soil Weight</TableCell>
                    <TableCell>Run</TableCell>
                    <TableCell>Initial Vacuum Weight</TableCell>
                    <TableCell>Final Vacuum Weight</TableCell>
                    <TableCell>Weight Difference</TableCell>
                    <TableCell>Pickup %</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Upload Images</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.sand.map((sand) => (
                    <TableRow key={sand.date}>
                      <TableCell component="th" scope="row">
                        {sand.date}
                      </TableCell>
                      <TableCell>{sand.tester}</TableCell>
                      <TableCell>{sand.soil_weight}</TableCell>
                      <TableCell>{sand.run}</TableCell>
                      <TableCell>{sand.vac_weight_i}</TableCell>
                      <TableCell>{sand.vac_weight_f}</TableCell>
                      <TableCell>{sand.vac_weight_diff}</TableCell>
                      <TableCell>
                        {Math.round(sand.vac_weight_diff / sand.soil_weight * 100)}
                      </TableCell>
                      <TableCell>{sand.remarks}</TableCell>
                      <TableCell>{sand.images}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Cheerios
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Tester</TableCell>
                    <TableCell>Test Measure</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.sand.map((sand) => (
                    <TableRow key={sand.date}>
                      <TableCell component="th" scope="row">
                        {sand.date}
                      </TableCell>
                      <TableCell>{sand.tester}</TableCell>
                      <TableCell>{sand.test_measure}</TableCell>
                      <TableCell align="right">{sand.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(sand.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.shape({
        sand: PropTypes.arrayOf(
          PropTypes.shape({
            amount: PropTypes.number.isRequired,
            customerId: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
          }),
        ).isRequired,
        cheerios: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                }),
        ).isRequired
      }
      ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('CR','BARE FLOORS', 159, 6.0, 24, 4.0, 3.99),
  createData('CR','CARPET', 237, 9.0, 37, 4.3, 4.99),
  createData('CR','EDGE CLEAN', 262, 16.0, 24, 6.0, 3.79),
  createData('CR','PET HAIR', 305, 3.7, 67, 4.3, 2.5),
  createData('CR','NOISE', 356, 16.0, 49, 3.9, 1.5),
  createData('CR','CONVENIENCE', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Test Category</TableCell>
            <TableCell>Test Target</TableCell>
            <TableCell>Test No.</TableCell>
            <TableCell>Test Case</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Test Sample</TableCell>
            <TableCell>Inv. No.</TableCell>
            <TableCell>Brush Type</TableCell>
            {/*<TableCell align="left">Protein&nbsp;(g)</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CRcordless;