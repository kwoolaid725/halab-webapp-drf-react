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


const EditableRowRobotBare = ({
  row,
  idx,
  testGroup,
  keys,
  categoriesData,
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
      <TableCell component="th" scope="row">
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
     {Object.entries(row.values).map(([categoryName, categoryData]) => (
        <TableCell key={categoryName} align="center">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '60px' }}>
            {Object.entries(categoryData).map(([key, value]) => (
              <TableCell key={`${categoryName}-${key}`} style={{ marginBottom: '5px' }}>
                {value.value}
                {value.units && (
                  <Box sx={{ display: 'inline-block', marginLeft: '2px' }}>
                    {value.units}
                  </Box>
                )}
              </TableCell>
            ))}
          </div>
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

export default EditableRowRobotBare;
