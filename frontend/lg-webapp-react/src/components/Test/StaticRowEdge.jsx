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
      <TableCell component="th" scope="row" align={"center"}>
        {row.slug}
      </TableCell>
      <TableCell component="th" scope="row" align={"center"}>
        {row.tester}
      </TableCell>
      <TableCell component="th" scope="row" align={"center"}>
        {row.testGroup}
      </TableCell>
       {keys.map((key, idx) => (
          <TableCell align={"center"} key={idx} sx={{
              fontSize: '14px',
              padding: '6px',
              fontWeight: ['F_AVG', 'R_AVG', 'L_Pickup', 'R_Pickup'].includes(key) ? 'bold' : 'normal',
              color: ['F_AVG', 'R_AVG', 'L_Pickup', 'R_Pickup'].includes(key) ? 'blue' : 'inherit' }}>

            {row.values[key]?.value}
              <Box sx={{ display: 'inline-block', marginLeft: '2px' }}>
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