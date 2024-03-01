import React from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";

const StaticRowEdge = ({ row, idx, keys, handleEdit, handleDelete }) => {


  return (
  <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="center" sx={{ fontSize: '8px', padding: '8px', whiteSpace: 'nowrap' }}>
      {row.slug}
    </TableCell>
      <TableCell component="th" scope="row" align="left" sx={{ fontSize: '12px'}}>
        {row.tester}
      </TableCell>
      <TableCell component="th" scope="row" align={"center"}>
        {row.testGroup}
      </TableCell>
       {keys.map((key, idx) => (
          <TableCell align={"center"} key={idx} sx={{
              fontSize: '14px',
              padding: '0 0',
              fontWeight: ['F_AVG', 'R_AVG', 'L_AVG', 'L_Pickup', 'R_Pickup'].includes(key) ? 'bold' : 'normal',
              color: ['F_AVG', 'R_AVG', 'L_AVG', 'L_Pickup', 'R_Pickup'].includes(key) ? 'blue' : 'inherit',
              borderLeft: '1px dotted #ddd', // Add border to the left side
              borderRight: '1px dotted #ddd', // Add border to the right side
              width: '50px',
              textAlign: 'center',
          }}>

            {row.values[key]?.value}
              <Box sx={{
                display: 'inline',
                marginLeft: '1px',
                fontSize: '12px' }}>
                {row.values[key]?.units}
              </Box>
      </TableCell>
        ))}
      <TableCell component="th" scope="row" align={"center"}>
        {row.run}
      </TableCell>
      <TableCell component="th" scope="row" align={"center"}>
        {row.remarks}
      </TableCell>
      <TableCell component="th" scope="row" align={"center"}>
        {row.created_at}
      </TableCell>
      <TableCell component="th" scope="row" align={"center"}>
        {row.last_updated}
      </TableCell>

     <TableCell component="th" scope="row" align={"center"}>
      <Box sx={{ '& .edit-btn': { cursor: 'pointer', fontSize: '16px', color: 'steelblue' } }}>
        <IconButton className="edit-btn" onClick={() => handleEdit(idx)} style={{ border: 'none', background: 'none' }}>
          <BsFillPencilFill />
        </IconButton>
        <IconButton className="edit-btn" onClick={() => handleDelete(row.slug)} style={{ border: 'none', background: 'none' }}>
          <BsFillTrashFill />
        </IconButton>
      </Box>
    </TableCell>
    </TableRow>

  );
};

export default StaticRowEdge;