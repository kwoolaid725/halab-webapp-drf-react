import React, {
  useEffect,
  useState
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
  testId

}) => {

   const handleFieldChange = (fieldName, value) => {
    const updatedRow = { ...row, [fieldName]: value };
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[idx] = updatedRow;
      return updatedRows;
    });
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
      <td>{testGroup}</td>
      {keys.map((key, index) => (
        <td key={index}>
          <input
            type="text"
            value={row.values[key]?.value || ''}
            onChange={(e) => handleInputChange(row.slug, keys[index], e.target.value)}
          />
          <span>{row.values[key]?.units || ''}</span>
        </td>
      ))}
      <td>{row.run}</td>
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
      </td>
    </tr>
  );
};

export default EditableRow;
