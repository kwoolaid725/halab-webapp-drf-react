import React, {
  useEffect,
  useState,
  useRef
} from 'react'

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import TableCell from "@mui/material/TableCell";


const EditableRowEdge = ({
  row,
  idx,
  testGroup,
  keys,
  handleInputChange,
  submitRow,
  setRows,
  rows,
  testGroupOptions,
  soilWtMap,
  testId,
  onCancelEdit

}) => {
    const initialRow = useRef({ ...row }); // Preserve the initial row prop


    const handleFieldChange = (fieldName, value) => {
      const updatedRow = { ...row, [fieldName]: value };
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[idx] = updatedRow;
        return updatedRows;
      });
    };


  // Function to handle changes in testGroup selection
  const handleTestGroupChange = (selectedTestGroup) => {

     if (selectedTestGroup === '') {
        return;
    }
    const soilWt = soilWtMap[selectedTestGroup].Soil_Wt.value || 0;
    const updatedValues = {
      ...row.values,
      Soil_Wt: { value: soilWt, units: 'g' }
    };

    const sameGroupRows = rows.filter((r) => r.testGroup === selectedTestGroup);
    const maxRunInGroup = sameGroupRows.reduce((maxRun, r) => {
      return r.run > maxRun ? r.run : maxRun;
    }, 0);

    const updatedRow = {
      ...row,
      testGroup: selectedTestGroup,
      run: maxRunInGroup + 1,
      values: updatedValues
    };

    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[idx] = updatedRow;
      return updatedRows;
    });
  };


   const handleCancel = async () => {
      await setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[idx] = initialRow.current; // Reset to the initial row state
        return updatedRows;
      });
       onCancelEdit(idx); // Call onCancelEdit after the state has been updated

    };



  return (

    <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="center" sx={{ fontSize: '8px'}}>
        {row.slug}
      </TableCell>
      <TableCell>
        <input
          type="text"
          value={row.tester}
          onChange={(e) => handleFieldChange('tester', e.target.value)}
          style={{ width: '30px', fontSize: '14px', textAlign: 'center', backgroundColor: row.tester === '' ? 'lightpink' : ''}}
        />
      </TableCell>

      <TableCell>
        <Select
          value={row.testGroup}
          onChange={(e) => handleTestGroupChange(e.target.value)}
          sx={{ height: '25px' }}
        >
          <MenuItem value="">Select Test Group</MenuItem>
          {testGroupOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </TableCell>

      {keys.map((key, index) => (
          <TableCell key={index} align={"center"} sx={{ margin: '1px', padding: '2px' }}>

            {['F1','F2','F3','F4','F5','F6', 'L1','L2','L3', 'R1','R2','R3'].includes(key) ? (
              <input
                type="text"
                value={row.values[key]?.value || ''}
                onChange={(e) => handleInputChange(row.slug, key, e.target.value)}
                style={{
                  width: '30px', // Adjust the width as needed
                  fontSize: '14px',
                  // marginRight: '1px',
                   padding: '0.5px 0',
                  textAlign: 'right',
                  backgroundColor: (row.values[key]?.value || '') === '' ? 'lightpink' : ''
                }}
              />
            ) : (
              ['L_Pre-Wt.', 'L_Post-Wt.', 'R_Pre-Wt.', 'R_Post-Wt.'].includes(key) ? (
                <input
                  type="text"
                  value={row.values[key]?.value || ''}
                  onChange={(e) => handleInputChange(row.slug, key, e.target.value)}
                  style={{
                    width: '45px', // Adjust the width as needed
                    fontSize: '14px',
                    marginRight: '1px',
                    textAlign: 'right',
                    backgroundColor: (row.values[key]?.value || '') === '' ? 'lightpink' : ''
                  }}
                />
              ) : (
                <span style={{
                  width: '30px', // Default width for other keys
                  fontSize: '14px',
                  marginRight: '1px',
                  textAlign: 'right'
                }}>
                  {row.values[key]?.value || ''}
                </span>
              )
            )}
            <span>{row.values[key]?.units || ''}</span>

          </TableCell>
        ))}

      <TableCell>
        <input
          type="number"
          value={row.run}
          onChange={(e) =>{
              const run = parseInt(e.target.value);
              console.log('row.run value:', run);

              handleFieldChange('run', parseInt(e.target.value))}}
          style={{
              width: '30px',
              textAlign: 'center',
              fontSize: '14px',
              backgroundColor: isNaN(row.run) || row.run === 0 ? 'lightpink' : 'transparent'

        }} // Adjust width as needed

        />
      </TableCell>

      <TableCell>
        <input
          type="text"
          value={row.remarks}
          onChange={(e) => handleFieldChange('remarks', e.target.value)}
          style={{ width: '200px', textAlign: 'left', fontSize: '14px' }}
        />
      </TableCell>
      <TableCell>{row.created_at}</TableCell>
      <TableCell>{row.last_updated}</TableCell>
     <TableCell>
        <Box sx={{ '& button': { m: 0.5 } }}>
            <Button variant="outlined" size="small" onClick={() => submitRow(idx)} style={{ color: 'green', borderColor: 'green' }}>
                <SaveIcon /> SAVE
            </Button>
            <Button variant="outlined" size="small" onClick={handleCancel} style={{ color: 'red', borderColor: 'red' }}>
                <CloseIcon />
            </Button>
        </Box>
    </TableCell>
    </TableRow>


  );
};

export default EditableRowEdge;
