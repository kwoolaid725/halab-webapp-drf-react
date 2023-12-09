import React, {
  useEffect,
  useState
} from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import Button from '@mui/material/Button';
import { TestModal } from './TestModal';
import axiosInstance from '../../axios'
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';

// const testGroup = 'Bare';
// const testMeasures = {
//
// }


const TestDetailsTableRow = ({ testTarget, testGroup, testMeasures, addRow, deleteRow, editRow }) => {

   const initialRowState = {
      slug: `test_no_${testTarget}_${testGroup}_1`,
      tester: 'a',
      testGroup: '',
      run: 1,
      remarks: '',
      created_at: '',
      last_updated: '',
      isEditing: false,
      values: {},
      units: {},
  };

  const [rows, setRows] = useState([initialRowState]);

  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState({});
  const [isEditingRows, setIsEditingRows] = useState(Array(rows.length).fill(false));

  const [isEditing, setIsEditing] = useState(false);


  const handleEdit = (idx) => {
    const updatedRows = [...rows];
    updatedRows[idx].isEditing = true;
    setRows(updatedRows);

    editRow(testTarget, testGroup);
  };


  useEffect(() => {
    console.log('Test Target:', testTarget);
    console.log('Test Group:', testGroup);
    console.log('Test Measures:', testMeasures);
    let selectedMeasures = [];

    if (testMeasures) {
      if (Array.isArray(testMeasures[testGroup])) {
        selectedMeasures = testMeasures[testGroup];
      } else if (testMeasures[testGroup]) {
        selectedMeasures = [testMeasures[testGroup]];
      }
    }
    if (
      selectedMeasures
    ) {
      const values = selectedMeasures[0];
      const keys = Object.keys(values);

      console.log('Values:', values);
      console.log('Keys:', keys);


      // Update the rows state with new keys and values for the selected measures
      setRows((prevRows) =>
        prevRows.map((row) => ({
          ...row,
          values: { ...values },
          keys: [...keys]
       }))
    );

      setValues(values);
      setKeys(keys);

    }
  }, [testTarget, testGroup, testMeasures]);

  const handleAddRow = () => {
    const newRun = rows.length > 0 ? rows[rows.length - 1].run + 1 : 1;
    const newRow = {
      slug: `test_no_${testTarget}_${testGroup}_${newRun}`,
      tester: 'a',
      testGroup: testGroup,
      run: newRun,
      remarks: '',
      created_at: '',
      last_updated: '',
      isEditing: false,
      values: {}, // Each row starts with an empty value object
      units: {},
    };

    setRows([...rows, newRow]);
  };

   const toggleEditing = (idx) => {
    const updatedRows = [...rows];
    updatedRows[idx].isEditing = !updatedRows[idx].isEditing;
    setRows(updatedRows);
  };

  // Function to handle input changes for each cell in a row
  const handleInputChange = (slug, key, value) => {
    const updatedRows = rows.map((row) => {
      if (row.slug === slug) {
        const updatedValues = { ...row.values };
        updatedValues[key] = {
          ...(updatedValues[key] || {}),
          value: value,
        };

        return {
          ...row,
          values: updatedValues,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const submitRow = (idx) => {
    const editedRow = rows[idx];
    const formDataArray = [];

    // Loop through each key in the editedRow object
    editedRow.keys.forEach((key) => {
      const formData = new FormData();

      const value = editedRow.values[key]?.value || '';
      const units = editedRow.values[key]?.units || '';

      // Populate formData with appropriate values for the current key
      formData.append('test_measure', key);
      formData.append('value', value);
      formData.append('units', units);

      // if (editedRow.values[key]) {
      //   formData.append('value', editedRow.values[key].value || '');
      //   formData.append('units', editedRow.values[key].units || '');
      // } else {
      //   formData.append('value', '');
      //   formData.append('units', '');
      // }
      formData.append('test', 1);
      formData.append('sample', 1234);
      formData.append('brush_type', 'DMS');
      formData.append('tester', 1);
      formData.append('owner', 1);
      formData.append('test_target', 'Bare');
      formData.append('test_group', editedRow.testGroup);
      formData.append('test_case', 'REG');
      formData.append('slug', editedRow.slug);
      formData.append('run', editedRow.run);
      formData.append('remarks', editedRow.remarks);

      formDataArray.push(formData);

    });

    // Submit each formData instance separately
    formDataArray.forEach((formData) => {
      axiosInstance
        .post(`admin/tests/vacuum/testdetail/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log('Posted successfully!', response);
          // Handle success if needed
          toggleEditing(idx);
          // window.location.reload();
        })
        .catch((error) => {
          console.error('Error posting data', error);
          // Handle errors
        });
    });

	};


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tester</th>
            <th>Test Group</th>
            {keys.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
            <th>Run</th>
            <th>Remarks</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.isEditing ? (
                <>
                  <td>
                    <td>{row.slug}</td>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.tester}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[idx] = { ...updatedRows[idx], tester: e.target.value };
                        setRows(updatedRows);
                      }}
                    />
                  </td>
                  <td>{testGroup}</td>
                 {keys.map((key, index) => (
                    <td key={index}>
                      <input
                        type="text"
                        value={row.values[key]?.value || ''} // Use row.values[key]?.value if defined, otherwise an empty string
                        onChange={(e) => {
                          handleInputChange(row.slug, key, e.target.value);
                        }}
                      />
                      <span>
                        {row.values[key]?.units || ''} {/* Display units */}
                      </span>
                    </td>
                  ))}

                  <td>{row.run}</td>
                  <td>
                    <input
                      type="text"
                      value={row.remarks}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[idx].remarks = e.target.value;
                        setRows(updatedRows);
                      }}
                    />
                  </td>
                  <td>{row.created_at}</td>
                  <td>{row.last_updated}</td>
                  <td>
                  <button onClick={() => submitRow(idx)}>Save</button>
                  </td>
                </>
                ) : (
                <>
                  <td>{row.slug}</td>
                  <td>{row.tester}</td>
                  <td>{testGroup}</td>
                  {keys.map((key, idx) => (
                    <td key={idx}>
                      {row.values[key]?.value} {row.values[key]?.units}
                    </td>
                  ))}
                  <td>{row.run}</td>
                  <td>{row.remarks}</td>
                  <td>{row.created_at}</td>
                  <td>{row.last_updated}</td>
                  <td>
                   <button onClick={() => handleEdit(idx)}>Edit</button>
                   {/*<button onClick={handleEdit}>Edit</button>*/}
                  </td>
                </>
              )}

                {/*<span>*/}
                {/*  <BsFillPencilFill*/}
                {/*      className="edit-btn"*/}
                {/*      onClick={() => editRow(idx)}*/}
                {/*  />*/}
                {/*  <BsFillTrashFill />*/}
                {/*</span>*/}
            </tr>
          ))}
          <tr>
            <td colSpan={keys.length + 7}>
              <Button variant="contained" onClick={handleAddRow}>
                Add Row
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TestDetailsTableRow;

