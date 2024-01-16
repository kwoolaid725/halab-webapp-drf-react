import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import axiosInstance from '../../axios'

const EditableRow = ({
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
    const initialRow = useRef({ ...row } ); // Preserve the initial row prop

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
    const soilWt = soilWtMap[selectedTestGroup].Soil_Wt.value || 0;
    // console.log('row:', row)
    
      
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

    // const handleInputChange = (row, setRows, slug, key, value) => {
    //   let updatedValues = { ...row.values, [key]: { value, units: row.values[key]?.units || '' } };
    //   // console.log('updatedValues123:', updatedValues);
    //
    //   // Calculate Weight Diff. when Pre-Wt. or Post-Wt. changes
    //   if (key === 'Pre-Wt.' || key === 'Post-Wt.') {
    //     const preWt = parseFloat(updatedValues['Pre-Wt.'].value) || 0;
    //     const postWt = parseFloat(updatedValues['Post-Wt.'].value) || 0;
    //     const weightDiff = (postWt - preWt).toFixed(2).replace(/\.?0+$/, '');
    //     const soilWt = parseFloat(updatedValues['Soil_Wt'].value) || 0; // Assuming Soil_Wt exists in values
    //     const pickup = soilWt !== 0 ? ((weightDiff / soilWt) * 100).toFixed(2).replace(/\.?0+$/, '') : 0;
    //
    //     updatedValues = {
    //       ...updatedValues,
    //       'Wt.-Diff.': { value: weightDiff, units: 'g' },
    //       'Pickup': { value: pickup, units: '%' } // Setting Pickup value and units
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
        {/*{*/}
        {/*  keys.map((key, index) => (*/}
        {/*    <td key={index}>*/}
        {/*      {key === 'Pre-Wt.' || key === 'Post-Wt.' ? (*/}
        {/*        <input*/}
        {/*          type="text"*/}
        {/*          value={row.values[key]?.value || ''}*/}
        {/*          onChange={(e) => handleInputChange(row.slug, key, e.target.value)}*/}
        {/*        />*/}
        {/*      ) : (*/}
        {/*        <span>{row.values[key]?.value || ''}</span>*/}
        {/*      )}*/}
        {/*      <span>{row.values[key]?.units || ''}</span>*/}
        {/*    </td>*/}
        {/*  ))*/}
        {/*}*/}

        {
          keys.map((key, index) => (
            <td key={index}>
              <input
                type="text"
                value={row.values[key]?.value || ''}
                onChange={(e) => handleInputChange(row.slug, key, e.target.value)}
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

export default EditableRow;
