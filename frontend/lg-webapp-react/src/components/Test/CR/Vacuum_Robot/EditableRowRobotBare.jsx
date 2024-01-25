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
   const [originalRow, setOriginalRow] = useState({ ...row });


    const categoryOrder = categoriesData.map((categoryData) => categoryData.categoryName);
      const keyOrderMap = {};

      // Iterate through categoriesData to store the order of keys for each category
      categoriesData.forEach((categoryData) => {
        const categoryName = categoryData.categoryName;
        const categoryKeys = categoryData.keys;
        keyOrderMap[categoryName] = categoryKeys;
      });



    const handleFieldChange = (fieldName, value) => {
      const updatedRow = { ...row, [fieldName]: value };
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[idx] = updatedRow;
        return updatedRows;
      });
    };


    const handleCancel = async () => {
      await setRows((prevRows) => {
        const updatedRows = [...prevRows];
        const updatedRow = {
          ...updatedRows[idx],
          values: { ...initialRow.current.values }, // Reset to the initial values state
        };

        updatedRows[idx] = updatedRow;
        return updatedRows;
      });

      onCancelEdit(idx); // Call onCancelEdit after the state has been updated
    };

    // const handleCancel = async () => {
    //   await setRows((prevRows) => {
    //     const updatedRows = prevRows.map((row, i) => (i === idx ? { ...initialRow.current, isEditing: false } : row));
    //     return updatedRows;
    //   });
    //
    //   onCancelEdit(idx); // Call onCancelEdit after the state has been updated
    // };

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
     {categoryOrder.map((categoryName) => (
      <TableCell key={categoryName} align="center">
        <div style={{ display: 'flex', flexDirection: 'row', gap: '0px' }}>
          {keyOrderMap[categoryName].map((key) => (
            <TableCell key={`${categoryName}-${key}`} style={{ marginBottom: '5px' }}>
              {/* Use the keyOrderMap to determine the order of keys for the current category */}
              {["Unpicked_Amt.", "Unpicked_Ct.", "Runtime"].includes(key) ? (
                <input
                  type="text"
                  value={row.values[categoryName][key]?.value || ''}
                  onChange={(e) => {
                    console.log('Input change event:', e.target.value);
                    handleInputChange(row.slug, categoryName, key, e.target.value)
                  }}
                  style={{
                    width: '75px',
                    fontSize: '16px',
                    marginRight: '5px',
                    textAlign: 'right',
                    backgroundColor: (row.values[categoryName][key]?.value || '') === '' ? 'lightpink' : ''
                  }}
                />
              ) : (
                <span style={{ width: '75px', fontSize: '16px', marginRight: '5px', textAlign: 'right' }}>
                  {row.values[categoryName][key]?.value || ''}
                </span>
              )}
              {row.values[categoryName][key]?.units && (
                <Box sx={{ display: 'inline-block', marginLeft: '2px' }}>
                  {row.values[categoryName][key]?.units}
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
