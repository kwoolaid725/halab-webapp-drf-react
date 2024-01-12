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


function TestDetailsTableRowCarpet(props){

  const [testMeasures, setTestMeasures] = useState(null);
  const [rows, setRows] = useState([]);
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState({});
  const [allRows, setAllRows] = useState([]);
  const [fetchedRows, setFetchedRows] = useState([]);
  const testGroupOptions = testMeasures ? Object.keys(testMeasures): [];
  const [soilWtMap, setSoilWtMap] = useState({});




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/test-measures.json');
        const jsonData = await response.json();

        console.log('Fetched Data:', jsonData); // Log the fetched data

        const carpetData = jsonData["Carpet"];
        console.log('Carpet Data:', carpetData); // Log the specific "Carpet" data

        setTestMeasures(carpetData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array, ensuring the effect runs only once on mount

  useEffect(() => {
    console.log('testMeasures - CARPET', testMeasures);
  }, [testMeasures]);

  useEffect(() => {
    // Fetch rows from the database and update the 'allRows' state
    axiosInstance.get(`admin/tests/vacuum/testdetail/${props.testId}/?test_target=Carpet`)
      .then(response => {
        setAllRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching rows', error);
      });

  }, []); // Fetch only once on component mount

//  useEffect(() => {
//     // Your logic to fetch and generate soilWtMap from the provided TestMeasures data
//     if (testMeasures && testMeasures.length > 0) {
//       const soilWtMapData = {};
//
//       // const measure = testMeasures[0]; // Assuming there's only one testMeasure data
//
//          console.log('Measure Carpet:', testMeasures);
//
//         const key = Object.keys(testMeasures);
//         console.log('Key Carpet:', key);
//
//         const values = testMeasures[key];
//         console.log('Values Carpet:', values);
//         // Check if 'values' is defined and contains 'Soil_Wt' property
//         if (values && values.Soil_Wt && values.Soil_Wt.value) {
//           soilWtMapData[key] = parseFloat(values.Soil_Wt.value); // Storing Soil_Wt value as a number
//         }
//         setSoilWtMap(soilWtMapData);
//       }
//
//
//   }, [testMeasures]);
//
//
// useEffect(() => {
//     console.log('soilWtMap', soilWtMap);
//
//   }
// , [soilWtMap]);




  useEffect(() => {
      // Set 'initialRowState' as the default 'rows' state
      const initialRowState = {
        id: '',
        slug: `${props.testId}-Carpet-${props.sample}${props.brushType}${props.testCase}-1`,
        tester: props.tester,
        testTarget: 'Carpet',
        testGroup: '',
        run: 1,
        remarks: '',
        created_at: '',
        last_updated: '',
        isEditing: false,
        values: {},
        units: {},
      };
      setRows([initialRowState]);
      // console.log('initialRowState', initialRowState);

  }, [props.testId, props.testTarget, props.testGroup, props.tester]);


  useEffect(() => {
    // console.log('Test Measures Sand:', testMeasures);
    console.log('Carpet Measuress:', testMeasures)

    if (testMeasures) {
      let selectedMeasures = Array.isArray(testMeasures) ? testMeasures : [testMeasures];
      const soilWtMapData = {};

      if (selectedMeasures) {
        const values = selectedMeasures[0]['Sand']; // Accessing the values for "Sand"
        const keys = Object.keys(values);

        console.log('Carpet Values:', values);
        console.log('Carpet Keys:', keys);

        if (values && values.Soil_Wt && values.Soil_Wt.value) {
          soilWtMapData['Sand'] = parseFloat(values.Soil_Wt.value); // Storing Soil_Wt value as a number
        }
        setSoilWtMap(soilWtMapData);

        // Update the rows state with "Sand" values and keys
        setRows(prevRows =>
          prevRows.map(row => ({
            ...row,
            values: { ...values },
            keys: keys
          }))
        );

        setValues(values);
        setKeys(keys);
      }
    }
  }, [testMeasures]);


  useEffect(() => {
    if (props.testId) {
      axiosInstance(`/samples/?inv_no=${props.sample}`)
        .then(response => {
          const sampleId = response.data[0]?.id;
            axiosInstance(`/admin/tests/vacuum/testdetail/${props.testId}/?sample=${sampleId}&brush_type=${props.brushType}&test_case=${props.testCase}&test_target=Carpet`)
              .then((res) => {
                const fetchedRows = res.data || [];
                setFetchedRows(fetchedRows);
              })
              .catch((error) => {
                console.error('Error fetching detailed data: ', error);
              });
            })
          }
  }, [props.testId]);

  useEffect(() => {
  if (fetchedRows.length > 0) {
    const combinedRows = fetchedRows.reduce((acc, row) => {
      const { slug, test_measure, value, units, ...otherValues } = row;

      if (!acc[slug]) {
        acc[slug] = {
          ...otherValues,
          slug,
          test_measure: test_measure ? [test_measure] : [],
          values: {},
          units: units ? [units] : {},
        };
      }

      if (test_measure) {
        if (!acc[slug].values[test_measure]) {
          acc[slug].values[test_measure] = { value: value || '', units: units || '' };
        }
      }

      return acc;
    }, {});

    // Transform combinedRows to match the initialState structure
    const transformedRows = Object.values(combinedRows).map(row => ({

      id: '', // Assign an appropriate ID
      slug: row.slug,
      tester: row.tester, // Assuming 'tester' exists in fetchedRows
      testTarget: row.test_target, // Assuming 'testTarget' exists in fetchedRows
      testGroup: row.test_group, // Assuming 'testGroup' exists in fetchedRows
      run: row.run, // Adjust as needed
      remarks: row.remarks, // Adjust as needed
      created_at: row.created_at.split('.')[0], // Adjust as needed
      last_updated: row.last_updated.split('.')[0], // Adjust as needed
      isEditing: false, // Assuming default isEditing as false
      values: row.values || {}, // Setting the values from combinedRows
      units: row.units || {}, // Setting the units from combinedRows
    }));


    setRows(transformedRows);
  }
}, [fetchedRows]);

  useEffect(() => {
    console.log('rows Carpet', rows);
  }, [rows]);


  const [newRow, setNewRow] = useState({
    id: '',
    slug: '',
    tester: props.tester,
    testTarget: 'Carpet',
    testGroup: '',
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
      // const firstRow = rows[0]; // Access the first row
      const previousRow = rows[rows.length - 1];
      const rowKeys = Object.keys(previousRow.values);
      const rowUnits = {};

      rowKeys.forEach((key) => {
        if (key !== 'Soil_Wt') {
          rowUnits[key] = previousRow.values[key]?.units || '';
        }
      });

      /// Create a copy of the first row with units for all values except soil_weight
      const updatedNewRow = {
        ...previousRow,
        values: {
          Soil_Wt: previousRow.values.Soil_Wt || { value: '', units: '' },
          // Set other values as empty strings
          ...(Object.fromEntries(
            Object.keys(previousRow.values)
              .filter(key => key !== 'Soil_Wt')
              .map(key => [key, { value: '', units: rowUnits[key] || '' }])
          )),
        },
        units: { ...rowUnits }, // Copy units
      };

      setNewRow(updatedNewRow); // Update the newRow state immediately
    }
  }, [rows]);


  const handleAddRow = () => {
    const maxIndex = rows.length > 0 ? Math.max(...rows.map(row => parseInt(row.slug.split('-').pop()))) + 1 : 1; // Get the maximum index of existing rows and increment by 1
    const newSlug = `${props.testId}-Carpet-${props.sample}${props.brushType}${props.testCase}-${maxIndex}`; // Create a new slug for the row

    const previousRow = rows[rows.length - 1]; // Get the previous row
    const previousRun = previousRow ? previousRow.run : 0; // Get the previous row's run

    const updatedNewRow = {
        ...newRow,
        remarks: '',
        slug: newSlug,
        run: previousRun + 1, // Set the new row's run as the maximum index + 1
        units: { ...(rows[maxIndex - 1]?.units || {}) }, // Set the new row's units based on the previous row or an empty object
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

  const handleDelete = (slug) => {

    // Display a confirmation dialog
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Make an API call to get all rows with the specified slug
      axiosInstance.get(`/admin/tests/vacuum/testdetail/${props.testId}/${slug}/`)
          .then((response) => {
            const rowsToDelete = response.data; // Get the rows with the specified slug
            // Iterate through the rows to delete each one
            console.log('rowsToDelete', rowsToDelete)
            rowsToDelete.forEach((row) => {
              axiosInstance.delete(`/admin/tests/vacuum/testdetail/${props.testId}/${slug}/${row.id}/`)
                  .then((deleteResponse) => {
                    // Handle successful deletion of each row
                    // Remove the deleted row from the local state if necessary
                    setRows((prevRows) => prevRows.filter((row) => row.slug !== slug));
                  })
                  .catch((deleteError) => {
                    // Handle error while deleting the row
                  });
            });
          })
          .catch((error) => {
            // Handle error while fetching rows with the specified slug
          });
    }
  };



  const toggleEditing = (slug) => {
    const updatedRows = [...rows];
    updatedRows[slug].isEditing = !updatedRows[slug].isEditing;
    setRows(updatedRows);
  };



  const submitRow = (idx) => {
    console.log('row', rows[idx])
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

          const url = `admin/tests/vacuum/testdetail/${rowToUpdate.test}/${rowToUpdate.slug}/${rowToUpdate.id}/`;
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
      } else {
        // New entry, perform a POST request
        const formDataArray = [];

        console.log('editedRow', editedRow)

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
                // testGroup='Sand'
                testId={props.testId}
                keys={keys}
                // handleInputChange={(slug, key, value) => handleInputChange(rows, setRows, slug, key, value)}
                submitRow={submitRow}
                setRows={setRows}
                rows={rows}
                testGroupOptions={testGroupOptions}
                soilWtMap={soilWtMap}
                onCancelEdit={(cancelIdx) => {
                  setRows((prevRows) =>
                    prevRows.map((r, index) =>
                      index === cancelIdx ? { ...r, isEditing: false } : r
                    )
                  );
                }}
              />
              ) : (
                <StaticRow
                  key={idx}
                  row={row}
                  idx={idx}
                  // testGroup='Sand'
                  keys={keys}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  testGroupOptions={testGroupOptions}
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

export default TestDetailsTableRowCarpet;

