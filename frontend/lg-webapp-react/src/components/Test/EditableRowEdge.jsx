import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import axiosInstance from '../../axios'

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

    // const handleInputChange = (slug, key, value) => {
    //   let updatedValues = { ...row.values, [key]: { value, units: row.values[key]?.units || '' } };
    //
    //   // Calculate Weight Diff. when Pre-Wt. or Post-Wt. changes
    //   if (key === 'L_Pre-Wt.' || key === 'L_Post-Wt.' ) {
    //     const preWt = parseFloat(updatedValues['L_Pre-Wt.'].value) || 0;
    //     const postWt = parseFloat(updatedValues['L_Post-Wt.'].value) || 0;
    //     const weightDiff = (postWt - preWt).toFixed(2).replace(/\.?0+$/, '');
    //     const soilWt = parseFloat(updatedValues['Soil_Wt'].value) || 0; // Assuming Soil_Wt exists in values
    //     const pickup = soilWt !== 0 ? ((weightDiff / soilWt) * 100).toFixed(2).replace(/\.?0+$/, '') : 0;
    //
    //     updatedValues = {
    //       ...updatedValues,
    //       'L_Pickup': { value: pickup, units: '%' } // Setting Pickup value and units
    //     };
    //   }
    //
    //   if (key === 'R_Pre-Wt.' || key === 'R_Post-Wt.' ) {
    //     const preWt = parseFloat(updatedValues['R_Pre-Wt.'].value) || 0;
    //     const postWt = parseFloat(updatedValues['R_Post-Wt.'].value) || 0;
    //     const weightDiff = (postWt - preWt).toFixed(2).replace(/\.?0+$/, '');
    //     const soilWt = parseFloat(updatedValues['Soil_Wt'].value) || 0; // Assuming Soil_Wt exists in values
    //     const pickup = soilWt !== 0 ? ((weightDiff / soilWt) * 100).toFixed(2).replace(/\.?0+$/, '') : 0;
    //
    //     updatedValues = {
    //       ...updatedValues,
    //       'R_Pickup': { value: pickup, units: '%' } // Setting Pickup value and units
    //     };
    //   }
    //
    //   if (key === 'F1' || key === 'F2' || key === 'F3' || key === 'F4' || key === 'F5' || key === 'F6' ) {
    //     const F_values = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'];
    //
    //     // Filter out the values that are not defined or not valid floats
    //     const validValues = F_values.map(f => parseFloat(updatedValues[f]?.value)).filter(value => !isNaN(value));
    //
    //     // Calculate the sum of valid values
    //     const sum = validValues.reduce((acc, value) => acc + value, 0);
    //
    //     // Calculate the average based on the number of valid values
    //     const F_Avg = validValues.length > 0 ? (sum / validValues.length).toFixed(2).replace(/\.?0+$/, '') : 0;
    //
    //     updatedValues = {
    //       ...updatedValues,
    //       'F_AVG': { value: F_Avg, units: 'in' } // Setting Pickup value and units
    //     };
    //   }
    //   if (key === 'L1' || key === 'L2' || key === 'L3' ) {
    //     const L_values = ['L1', 'L2', 'L3'];
    //
    //     // Filter out the values that are not defined or not valid floats
    //     const validValues = L_values.map(f => parseFloat(updatedValues[f]?.value)).filter(value => !isNaN(value));
    //
    //     // Calculate the sum of valid values
    //     const sum = validValues.reduce((acc, value) => acc + value, 0);
    //
    //     // Calculate the average based on the number of valid values
    //     const L_Avg = validValues.length > 0 ? (sum / validValues.length).toFixed(2).replace(/\.?0+$/, '') : 0;
    //
    //     updatedValues = {
    //       ...updatedValues,
    //       'L_AVG': { value: L_Avg, units: 'in' } // Setting Pickup value and units
    //     };
    //   }
    //
    //   if (key === 'R1' || key === 'R2' || key === 'R3' ) {
    //     const L_values = ['R1', 'R2', 'R3'];
    //
    //     // Filter out the values that are not defined or not valid floats
    //     const validValues = L_values.map(f => parseFloat(updatedValues[f]?.value)).filter(value => !isNaN(value));
    //
    //     // Calculate the sum of valid values
    //     const sum = validValues.reduce((acc, value) => acc + value, 0);
    //
    //     // Calculate the average based on the number of valid values
    //     const R_Avg = validValues.length > 0 ? (sum / validValues.length).toFixed(2).replace(/\.?0+$/, '') : 0;
    //
    //     updatedValues = {
    //       ...updatedValues,
    //       'R_AVG': { value: R_Avg, units: 'in' } // Setting Pickup value and units
    //     };
    //   }
    //
    //   const updatedRow = {
    //     ...row,
    //     values: updatedValues
    //   };
    //
    //   setRows((prevRows) => {
    //     const updatedRows = [...prevRows];
    //     updatedRows[idx] = updatedRow;
    //     return updatedRows;
    //   });
    // };

   const handleCancel = async () => {
      await setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[idx] = initialRow.current; // Reset to the initial row state
        return updatedRows;
      });
       onCancelEdit(idx); // Call onCancelEdit after the state has been updated

    };



  return (
    <tr key={idx}>
      <td>{row.slug}</td>
      <td>
        <input
          type="text"
          value={row.tester}
          onChange={(e) => handleFieldChange('tester', e.target.value)}
        />
      </td>

      <td>
        <select
          value={row.testGroup}
          onChange={(e) => handleTestGroupChange(e.target.value)}
        >
          <option value="">Select Test Group</option>
          {testGroupOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
        {
          keys.map((key, index) => (
            <td key={index}>

                <input
                  type="text"
                  value={row.values[key]?.value || ''}
                  onChange={(e) => handleInputChange(row.slug, key, e.target.value)}
                  style={{ width: '35px' }}
                />
                <span>{row.values[key]?.units || ''}</span>
            </td>
          ))
        }
      {/*<td>{row.run}</td>*/}
      <td>
        <input
          type="number"
          value={row.run}
          onChange={(e) => handleFieldChange('run', parseInt(e.target.value))}
          style={{ width: '25px' }} // Adjust width as needed
        />
      </td>

      <td>
        <input
          type="text"
          value={row.remarks}
          onChange={(e) => handleFieldChange('remarks', e.target.value)}

        />
      </td>
      <td>{row.created_at}</td>
      <td>{row.last_updated}</td>
      <td>
        <button onClick={() => submitRow(idx)}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditableRowEdge;
