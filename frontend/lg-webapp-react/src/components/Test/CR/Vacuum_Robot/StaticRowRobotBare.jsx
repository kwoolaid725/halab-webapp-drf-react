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

const StaticRowRobotBare = ({ row, idx, categoriesData, handleEdit, handleDelete }) => {

  const categoryOrder = categoriesData.map((categoryData) => categoryData.categoryName);
  const keyOrderMap = {};

  // Iterate through categoriesData to store the order of keys for each category
  categoriesData.forEach((categoryData) => {
    const categoryName = categoryData.categoryName;
    const categoryKeys = categoryData.keys;
    keyOrderMap[categoryName] = categoryKeys;
  });

  console.log('keyOrderMap:', keyOrderMap)

  console.log('row-staticrowrobotbare:', row)

  return (
  <TableRow key={`static-row-${idx}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="center" sx={{ fontSize: '8px'}}>
        {row.slug}
      </TableCell>
      <TableCell component="th" scope="row" align={"center"}>
        {row.tester}
      </TableCell>
      {/* Map through categoriesData to create TableCell for each categoryName */}
     {categoryOrder.map((categoryName) => (
      <TableCell key={categoryName} align="center">
        <div style={{ display: 'flex', flexDirection: 'row', gap: '26px',  }}>
          {/* Use the keyOrderMap to determine the order of keys for the current category */}
          {keyOrderMap[categoryName].map((key) => (
            <TableCell key={`${categoryName}-${key}`}
                       sx={{
                      fontSize: '14px',
                      padding: '1px 0',
                      fontWeight: ['Pickup', 'Runtime'].includes(key) ? 'bold' : 'normal',
                      color: ['Pickup', 'Runtime'].includes(key) ? 'blue' : 'inherit',
                      // border: '1px solid #ddd',

                      width: '50px',
                      textAlign: 'left',
                      border: 'none',

            }}>
                       {/*style={{ padding: '0px', border: 'none', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>*/}
              {row.values[categoryName][key]?.value}
              {row.values[categoryName][key]?.units && (
                <Box sx={{ display: 'inline-block', marginLeft: '1px', }}>
                  {row.values[categoryName][key]?.units}
                </Box>
              )}
            </TableCell>
          ))}
        </div>
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

export default StaticRowRobotBare;