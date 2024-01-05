import React, {
  useEffect,
  useState
} from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import Button from '@mui/material/Button';
import axiosInstance from '../../axios'
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import EditableRow  from './EditableRow'
import StaticRow  from './StaticRow'


function TestDetailsTableRow(props){

  const [rows, setRows] = useState([]);
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState({});
  const [allRows, setAllRows] = useState([]);



  // useEffect(() => {
  //   // Fetch rows from the database and update the 'allRows' state
  //   axiosInstance.get('admin/tests/vacuum/testdetail/')
  //     .then(response => {
  //       setAllRows(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching rows', error);
  //     });
  //
  // }, []); // Fetch only once on component mount



  // useEffect(() => {
  //   // console.log('Test Target:', props.testTarget);
  //   // console.log('Test Group:', props.testGroup);
  //   console.log('Test Measures:', props.testMeasures);
  //   // console.log('props.sample:', props.sample);
  //   let selectedMeasures = [];
  //
  //   if (props.testMeasures) {
  //     if (Array.isArray(props.testMeasures)) {
  //       selectedMeasures = props.testMeasures;
  //     } else if (props.testMeasures) {
  //       selectedMeasures = [props.testMeasures];
  //     }
  //   }
  //   if (
  //     selectedMeasures
  //   ) {
  //     const values = selectedMeasures[0];
  //     const keys = Object.keys(values);
  //
  //     console.log('Values:', values);
  //     console.log('Keys:', keys);
  //
  //
  //     // Update the rows state with new keys and values for the selected measures
  //     setRows((prevRows) =>
  //       prevRows.map((row) => ({
  //         ...row,
  //         values: { ...values },
  //         keys: [...keys]
  //      }))
  //   );
  //
  //     setValues(values);
  //     setKeys(keys);
  //
  //   }
  // }, [props.testTarget, props.testGroup, props.testMeasures]);


  // Use useEffect to update rows, keys, and values when the component mounts
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const response = await axiosInstance.get('admin/tests/vacuum/testdetail/');
        const fetchedData = response.data;

        // Assuming props.testMeasures has the required data structure
        const selectedMeasures = Array.isArray(props.testMeasures)
          ? props.testMeasures
          : [props.testMeasures];

        if (selectedMeasures.length > 0) {
          const values = selectedMeasures[0];
          const keys = Object.keys(values);

          setValues(values);
          setKeys(keys);

          // Update the rows state with new keys and values for the selected measures
          setRows(prevRows =>
            prevRows.map(row => ({
              ...row,
              values: { ...values },
              keys: [...keys],
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching rows', error);
      }
    };

    fetchDataAndUpdateState();
  }, [props.testTarget, props.testGroup, props.testMeasures]);


  useEffect(() => {
      // Set 'initialRowState' as the default 'rows' state
      const initialRowState = {
        id: '',
        slug: `${props.testId}-${props.testTarget}-${props.testGroup}-1`,
        tester: props.tester,
        testTarget: props.testTarget,
        testGroup: props.testGroup,
        run: 1,
        remarks: '',
        created_at: '',
        last_updated: '',
        isEditing: false,
        values: values,
        units: {},
      };
      setRows([initialRowState]);
      // console.log('initialRowState', initialRowState);

  }, [props.testId, props.testTarget, props.testGroup, props.tester]);



  const [newRow, setNewRow] = useState({
    id: '',
    slug: '',
    tester: props.tester,
    testTarget: props.testTarget,
    testGroup: props.testGroup,
    run: 1,
    remarks: '',
    created_at: '',
    last_updated: '',
    isEditing: false,
    values: {}, // Initialize as an empty object
    units: {}   // Initialize as an empty object
  });

  useEffect(() => {
    if (rows.length > 0) {
      const firstRow = rows[0]; // Access the first row
      const rowKeys = Object.keys(firstRow.values);
      const rowUnits = {};

      rowKeys.forEach((key) => {
        if (key !== 'soil_weight') {
          rowUnits[key] = firstRow.values[key]?.units || '';
        }
      });

      /// Create a copy of the first row with units for all values except soil_weight
      const updatedNewRow = {
        ...firstRow,
        values: {
          soil_weight: firstRow.values.soil_weight || { value: '', units: '' },
          // Set other values as empty strings
          ...(Object.fromEntries(
            Object.keys(firstRow.values)
              .filter(key => key !== 'soil_weight')
              .map(key => [key, { value: '', units: rowUnits[key] || '' }])
          )),
        },
        units: { ...rowUnits }, // Copy units
      };

      setNewRow(updatedNewRow); // Update the newRow state immediately
    }
  }, [rows]);


  const handleAddRow = () => {
    const newRowIndex = rows.length + 1; // Determine the index for the new row
    const newSlug = `${props.testId}-${props.testTarget}-${props.testGroup}-${newRowIndex}`; // Create a new slug for the row

    const previousRow = rows[rows.length - 1]; // Get the previous row
    const previousUnits = previousRow ? previousRow.units : {}; // Extract previous units

    const updatedNewRow = {
      ...newRow,
      slug: newSlug,
      run: newRowIndex,
      units: { ...previousUnits }, // Set the new row's units based on the previous row
      keys: Object.keys(values)
    };

    setNewRow(updatedNewRow); // Update the newRow state
    setRows([...rows, updatedNewRow]); // Update rows state

    // Other state updates or triggers for related effects

    console.log('Rows:', rows);
  };

  const handleEdit = (slug) => {
    const updatedRows = [...rows];
    updatedRows[slug].isEditing = true;
    setRows(updatedRows);
    console.log('slug', slug);
    console.log('rows', rows);
    console.log('updatedRows', updatedRows);
    // editRow(testTarget, testGroup);
  };


  const toggleEditing = (slug) => {
    const updatedRows = [...rows];
    updatedRows[slug].isEditing = !updatedRows[slug].isEditing;
    setRows(updatedRows);
  };

  // Function to handle input changes for each cell in a row
   const handleInputChange = (rows, setRows, slug, key, value) => {
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

    setRows([...updatedRows]); // Ensure you always set it as an array

  };

  const submitRow = (idx) => {
    const editedRow = rows[idx];

    // Filter rows to find all rows with the same slug
    const rowsWithSameSlug = allRows.filter(row => row.slug === editedRow.slug);

    if (rowsWithSameSlug.length > 0) {
    rowsWithSameSlug.forEach(row => {
      Object.keys(editedRow.values).forEach(key => {
        const value = editedRow.values[key]?.value || '';
        const units = editedRow.values[key]?.units || '';
        const rowToUpdate = rowsWithSameSlug.find(r => r.id === row.id && r.test_measure === key);

        if (rowToUpdate) {
          const formData = new FormData();

          formData.append('test_measure', key);
          formData.append('value', value);
          formData.append('units', units);
          formData.append('test', 1);
          formData.append('sample', props.sample);
          formData.append('brush_type', props.brushType);
          formData.append('tester', 1);
          formData.append('owner', 1);
          formData.append('test_target', editedRow.testTarget);
          formData.append('test_group', editedRow.testGroup);
          formData.append('test_case', props.testCase);
          formData.append('slug', editedRow.slug);
          formData.append('run', editedRow.run);
          formData.append('remarks', editedRow.remarks);

          const url = `admin/tests/vacuum/testdetail/${rowToUpdate.id}/`;
          const requestType = 'PUT'; // Use PUT for updating existing rows
          console.log('formData', formData);

          axiosInstance({
          method: requestType,
          url: url,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log('Posted successfully!', response);
          // Fetch updated data after successful update
          axiosInstance.get('admin/tests/vacuum/testdetail/')
            .then(response => {
              setAllRows(response.data);
            })
            .catch(error => {
              console.error('Error fetching rows', error);
            });
          toggleEditing(idx);
        })
        .catch((error) => {
          console.error('Error posting data', error);
          // Handle errors
        });
      }
    });
  });
      }else {
        // New entry, perform a POST request
        const formDataArray = [];


        editedRow.keys.forEach((key) => {
          const formData = new FormData();

          const value = editedRow.values[key]?.value || '';
          const units = editedRow.values[key]?.units || '';

          // Populate formData with appropriate values for the current key
          formData.append('test_measure', key);
          formData.append('value', value);
          formData.append('units', units);
          formData.append('test', 1);
          formData.append('sample', props.sample);
          formData.append('brush_type', props.brushType);
          formData.append('tester', 1);
          formData.append('owner', 1);
          formData.append('test_target', editedRow.testTarget);
          formData.append('test_group', editedRow.testGroup);
          formData.append('test_case', props.testCase);
          formData.append('slug', editedRow.slug);
          formData.append('run', editedRow.run);
          formData.append('remarks', editedRow.remarks);

          formDataArray.push(formData);

        });

       // Submit each formData instance separately
      const postRequests = formDataArray.map(formData => {
        const url = `admin/tests/vacuum/testdetail/`;
        const requestType = 'POST';

        return axiosInstance({
          method: requestType,
          url: url,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      });

      // Wait for all POST requests to complete
      Promise.all(postRequests)
        .then(responses => {
          // Fetch updated data after all POST requests are completed
          axiosInstance.get('admin/tests/vacuum/testdetail/')
            .then(response => {
              const updatedRows = response.data.map(row => {
                // Adjust this logic based on the structure of your response
                if (row.slug === editedRow.slug) {
                  return {
                    ...row,
                    created_at: row.created_at,
                    last_updated: row.last_updated
                  };
                }
                return row;
              });
              setAllRows(response.data); // Update allRows state with the latest data
              setRows(updatedRows); // Update rows state with new 'created_at' and 'last_updated' values
              toggleEditing(idx);
            })
            .catch(error => {
              console.error('Error fetching rows', error);
            });
        })
        .catch(errors => {
          console.error('Error posting data', errors);
          // Handle errors
        });
    };
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tester</th>
            <th>Test Group</th>
            {keys && keys.map((key, index) => (
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
              row.isEditing ? (
                <EditableRow
                key={idx}
                row={row}
                idx={idx}
                testGroup={props.testGroup}
                testId={props.testId}
                keys={keys}
                handleInputChange={(slug, key, value) => handleInputChange(rows, setRows, slug, key, value)}
                submitRow={submitRow}
                setRows={setRows}
                rows={rows}
              />
              ) : (
                <StaticRow
                  key={idx}
                  row={row}
                  idx={idx}
                  testGroup={props.testGroup}
                  keys={keys}
                  handleEdit={handleEdit}
                />
              )
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

