import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";


const testData = [
  createData1(1,'CR','Stick Vacuum (Cordless)', 'test1', 'LG A9',1234, 'DMS', 1),
  createData1(1, 'CR','Stick Vacuum (Cordless)', 'test1', 'Dyson Gen5', 1111, 'Carpet', 1),

];
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