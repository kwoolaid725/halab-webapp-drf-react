import React, {
  useEffect,
  useState
} from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import Button from '@mui/material/Button';
import axiosInstance from '../../axios'
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import EditableRowEdge  from './EditableRowEdge'
import StaticRowEdge  from './StaticRowEdge'
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";



function TestDetailsTableRowEdge(props){

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

        // console.log('Fetched Data:', jsonData); // Log the fetched data

        const edgeData = jsonData["Edge"];
        // console.log('Edge Data:', edgeData); // Log the specific "Carpet" data

        setTestMeasures(edgeData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array, ensuring the effect runs only once on mount

  useEffect(() => {
    // console.log('testMeasures - Edge', testMeasures);
  }, [testMeasures]);

  useEffect(() => {
    // Fetch rows from the database and update the 'allRows' state
    axiosInstance.get(`admin/tests/vacuum/testdetail/${props.testId}/?test_target=Edge`)
      .then(response => {
        setAllRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching rows', error);
      });

  }, []); // Fetch only once on component mount

   useEffect(() => {
      if (testMeasures && Object.keys(testMeasures).length > 0) {
        let soilWtMapData = {};

        Object.keys(testMeasures).forEach((key) => {
          const values = testMeasures[key];
          soilWtMapData[key] = { ...values };
        });

        setSoilWtMap(soilWtMapData);
      }
    }, [testMeasures]);

   const handleInputChange = (rows, setRows, slug, key, value) => {
    const updatedRows = rows.map((row) => {
      if (row.slug === slug) {
        let updatedValues = { ...row.values, [key]: { value, units: row.values[key]?.units || '' } };

        // Calculate Weight Diff. when Pre-Wt. or Post-Wt. changes
        if (key === 'L_Pre-Wt.' || key === 'L_Post-Wt.' ) {
          const preWt = parseFloat(updatedValues['L_Pre-Wt.'].value) || 0;
          const postWt = parseFloat(updatedValues['L_Post-Wt.'].value) || 0;
          const weightDiff = (postWt - preWt).toFixed(2).replace(/\.?0+$/, '');
          const soilWt = parseFloat(updatedValues['Soil_Wt'].value) || 0; // Assuming Soil_Wt exists in values
          const pickup = soilWt !== 0 ? ((weightDiff / soilWt) * 100).toFixed(2).replace(/\.?0+$/, '') : 0;

          updatedValues = {
            ...updatedValues,
            'L_Pickup': { value: pickup, units: '%' } // Setting Pickup value and units
          };
        }

        if (key === 'R_Pre-Wt.' || key === 'R_Post-Wt.' ) {
          const preWt = parseFloat(updatedValues['R_Pre-Wt.'].value) || 0;
          const postWt = parseFloat(updatedValues['R_Post-Wt.'].value) || 0;
          const weightDiff = (postWt - preWt).toFixed(2).replace(/\.?0+$/, '');
          const soilWt = parseFloat(updatedValues['Soil_Wt'].value) || 0; // Assuming Soil_Wt exists in values
          const pickup = soilWt !== 0 ? ((weightDiff / soilWt) * 100).toFixed(2).replace(/\.?0+$/, '') : 0;

          updatedValues = {
            ...updatedValues,
            'R_Pickup': { value: pickup, units: '%' } // Setting Pickup value and units
          };
        }

        if (key === 'F1' || key === 'F2' || key === 'F3' || key === 'F4' || key === 'F5' || key === 'F6' ) {
          const F_values = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'];

          // Filter out the values that are not defined or not valid floats
          const validValues = F_values.map(f => parseFloat(updatedValues[f]?.value)).filter(value => !isNaN(value));

          // Calculate the sum of valid values
          const sum = validValues.reduce((acc, value) => acc + value, 0);

          // Calculate the average based on the number of valid values
          const F_Avg = validValues.length > 0 ? (sum / validValues.length).toFixed(2).replace(/\.?0+$/, '') : 0;

          updatedValues = {
            ...updatedValues,
            'F_AVG': { value: F_Avg, units: 'in' } // Setting Pickup value and units
          };
        }
        if (key === 'L1' || key === 'L2' || key === 'L3' ) {
          const L_values = ['L1', 'L2', 'L3'];

          // Filter out the values that are not defined or not valid floats
          const validValues = L_values.map(f => parseFloat(updatedValues[f]?.value)).filter(value => !isNaN(value));

          // Calculate the sum of valid values
          const sum = validValues.reduce((acc, value) => acc + value, 0);

          // Calculate the average based on the number of valid values
          const L_Avg = validValues.length > 0 ? (sum / validValues.length).toFixed(2).replace(/\.?0+$/, '') : 0;

          updatedValues = {
            ...updatedValues,
            'L_AVG': { value: L_Avg, units: 'in' } // Setting Pickup value and units
          };
        }

        if (key === 'R1' || key === 'R2' || key === 'R3' ) {
          const L_values = ['R1', 'R2', 'R3'];

          // Filter out the values that are not defined or not valid floats
          const validValues = L_values.map(f => parseFloat(updatedValues[f]?.value)).filter(value => !isNaN(value));

          // Calculate the sum of valid values
          const sum = validValues.reduce((acc, value) => acc + value, 0);

          // Calculate the average based on the number of valid values
          const R_Avg = validValues.length > 0 ? (sum / validValues.length).toFixed(2).replace(/\.?0+$/, '') : 0;

          updatedValues = {
            ...updatedValues,
            'R_AVG': { value: R_Avg, units: 'in' } // Setting Pickup value and units
          };
        }

        const updatedRow = {
          ...row,
          values: updatedValues
        };

        return updatedRow;
      }
      return row;
    });

    setRows([...updatedRows]);
  };





  useEffect(() => {
      // Set 'initialRowState' as the default 'rows' state
      const initialRowState = {
        id: '',
        slug: `${props.testId}-Edge-${props.sample}${props.brushType}${props.testCase}-1`,
        tester: props.tester,
        testTarget: 'Edge',
        testGroup: '',
        run: 1,
        remarks: '',
        created_at: '',
        last_updated: '',
        isEditing: true,
        values: {},
        units: {},
        model: ''
      };
      setRows([initialRowState]);
      // console.log('initialRowState', initialRowState);

  }, [props.testId, props.testTarget, props.testGroup, props.tester]);


  useEffect(() => {
    // console.log('Test Measures Sand:', testMeasures);
    // console.log('Edge Measuress:', testMeasures)

    if (testMeasures) {
      let selectedMeasures = Array.isArray(testMeasures) ? testMeasures : [testMeasures];


      if (selectedMeasures) {
        const values = selectedMeasures[0]['Sand']; // Accessing the values for "Sand"
        const keys = Object.keys(values);


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
            axiosInstance(`/admin/tests/vacuum/testdetail/${props.testId}/?sample=${sampleId}&brush_type=${props.brushType}&test_case=${props.testCase}&test_target=Edge`)
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

    const convertToAMPM = (timestamp) => {
      const date = new Date(timestamp);

      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };

      // const formattedTime = date.toLocaleTimeString('en-US', options).replace(/:\d{2}\s/, ' ').replace(/^0/, '');

      return date.toLocaleDateString('en-US', options)
    };

    // Transform combinedRows to match the initialState structure
    const transformedRows = Object.values(combinedRows).map(row => ({

      id: '', // Assign an appropriate ID
      slug: row.slug,
      tester: row.tester, // Assuming 'tester' exists in fetchedRows
      testTarget: row.test_target, // Assuming 'testTarget' exists in fetchedRows
      testGroup: row.test_group, // Assuming 'testGroup' exists in fetchedRows
      run: row.run, // Adjust as needed
      remarks: row.remarks, // Adjust as needed
      created_at: convertToAMPM(row.created_at.split('.')[0]), // Adjust as needed
      last_updated: convertToAMPM(row.last_updated.split('.')[0]), // Adjust as needed
      isEditing: false, // Assuming default isEditing as false
      values: row.values || {}, // Setting the values from combinedRows
      units: row.units || {}, // Setting the units from combinedRows
    }));


    setRows(transformedRows);
  }
}, [fetchedRows]);

  useEffect(() => {
    // console.log('rows Edge', rows);
  }, [rows]);


  const [newRow, setNewRow] = useState({
    id: '',
    slug: '',
    tester: props.tester,
    testTarget: 'Edge',
    testGroup: '',
    run: 1,
    remarks: '',
    created_at: '',
    last_updated: '',
    isEditing: false,
    values: {},
    units: {},
    model: ''
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
    const newSlug = `${props.testId}-Edge-${props.sample}${props.brushType}${props.testCase}-${maxIndex}`; // Create a new slug for the row

    const previousRow = rows[rows.length - 1]; // Get the previous row
    const previousRun = previousRow ? previousRow.run : 0; // Get the previous row's run

    const updatedNewRow = {
        ...newRow,
        remarks: '',
        slug: newSlug,
        run: previousRun + 1, // Set the new row's run as the maximum index + 1
        units: { ...(rows[maxIndex - 1]?.units || {}) }, // Set the new row's units based on the previous row or an empty object
        keys: Object.keys(values),
        isEditing: true,
    };

      setNewRow(updatedNewRow); // Update the newRow state
      setRows([...rows, updatedNewRow]); // Update rows state

      // Other state updates or triggers for related effects

      // console.log('Rows:', rows);
  };


  const handleEdit = (slug) => {
    const updatedRows = [...rows];
    updatedRows[slug].isEditing = true;
    setRows(updatedRows);
    // console.log('slug', slug);
    // console.log('rows', rows);
    // console.log('updatedRows', updatedRows);
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
            // console.log('rowsToDelete', rowsToDelete)
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



  const toggleEditing = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].isEditing = !updatedRows[index].isEditing;
    setRows(updatedRows);
  };



  const submitRow = async (index) => {
    const editedRow = rows[index];
    const rowsWithSameSlug = allRows.filter(row => row.slug === editedRow.slug);

    if (rowsWithSameSlug.length > 0) {
      const putRequests = rowsWithSameSlug.map(row => {
        return Object.keys(editedRow.values).map(key => {
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
            formData.append('model', props.model);

            const url = `admin/tests/vacuum/testdetail/${rowToUpdate.test}/${rowToUpdate.slug}/${rowToUpdate.id}/`;
            const requestType = 'PUT';

            return axiosInstance({
              method: requestType,
              url: url,
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          }
        });
      });

      let successfulRequests = 0;

      Promise.all(putRequests.flat())
        .then(responses => {
          // Handle responses if needed

          successfulRequests = responses.length;

          if (successfulRequests === rowsWithSameSlug.length * Object.keys(editedRow.values).length) {
            // All PUT requests were successful, toggleEditing
            toggleEditing(index);
          }
        })
        .catch((error) => {
          console.error('Error updating row:', error);
        });
    } else {
      // New entry, perform a POST request
      const formDataArray = [];

      editedRow.keys.forEach((key) => {
        const formData = new FormData();

        const value = editedRow.values[key]?.value || '';
        const units = editedRow.values[key]?.units || '';

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
        formData.append('model', props.model);

        formDataArray.push(formData);
      });

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

      Promise.all(postRequests)
        .then(responses => {
          axiosInstance.get('admin/tests/vacuum/testdetail/')
            .then(response => {
              const updatedRows = response.data.map(row => {
                if (row.slug === editedRow.slug) {
                  return {
                    ...row,
                    created_at: row.created_at,
                    last_updated: row.last_updated
                  };
                }
                return row;
              });
              setAllRows(response.data);
              setRows(updatedRows);
              toggleEditing(index);
            })
            .catch(error => {
              console.error('Error fetching rows', error);
            });
        })
        .catch(errors => {
          console.error('Error posting data', errors);
        });
    }
  };

   const sortedData = rows.sort((a, b) => {
      // Assuming testGroup is a string, modify accordingly if it's a different type
      const testGroupComparison = b.testGroup.localeCompare(a.testGroup); // Reverse the order
      if (testGroupComparison !== 0) {
        return testGroupComparison;
      }
      // If testGroup is the same, compare by run
      return a.run - b.run; // Assuming run is a number, adjust accordingly if it's a string
    });

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }} >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
     <TableHead>
        <TableRow>
          <TableCell align="center" sx={{ margin: '0.1px', padding: '0.5px' }}>
            <Typography variant="subtitle2" fontWeight="bold">Row ID</Typography>
          </TableCell>
          <TableCell align="center" sx={{ margin: '0.1px', padding: '0.5px' }}>
            <Typography variant="subtitle2" fontWeight="bold">Tester</Typography>
          </TableCell>
          <TableCell align="center" sx={{ margin: '0.1px', padding: '0.5px' }}>
            <Typography variant="subtitle2" fontWeight="bold">Test Group</Typography>
          </TableCell>
          {keys && keys.map((key, index) => (
            <TableCell align="center" key={index} sx={{ margin: '0.1px', padding: '0.5px' }}>
              <Typography variant="subtitle2" fontWeight="bold">{key}</Typography>
            </TableCell>
          ))}
          <TableCell align="center" sx={{ margin: '0.1px', padding: '0.5px' }}>
            <Typography variant="subtitle2" fontWeight="bold">Run</Typography>
          </TableCell>
          <TableCell align="center" sx={{ margin: '0.1px', padding: '0.5px' }}>
            <Typography variant="subtitle2" fontWeight="bold">Remarks</Typography>
          </TableCell>
          <TableCell align="center" sx={{ margin: '0.1px', padding: '0.5px' }}>
            <Typography variant="subtitle2" fontWeight="bold">Created</Typography>
          </TableCell>
          <TableCell align="center" sx={{ margin: '0.1px', padding: '0.5px' }}>
            <Typography variant="subtitle2" fontWeight="bold">Updated</Typography>
          </TableCell>
          <TableCell align="center" sx={{ margin: '0.1px', padding: '0.5px' }}>
            <Typography variant="subtitle2" fontWeight="bold">Actions</Typography>
          </TableCell>
        </TableRow>
      </TableHead>


        <TableBody>
          {sortedData.map((row, idx) => (
              row.isEditing ? (
                <EditableRowEdge
                key={idx}
                row={row}
                idx={idx}
                // testGroup='Sand'
                testId={props.testId}
                keys={keys}
                handleInputChange={(slug, key, value) => handleInputChange(rows, setRows, slug, key, value)}
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
                <StaticRowEdge
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
            <td colSpan={keys.length + 7} align={"center"}>

              <IconButton variant="outlined" onClick={handleAddRow} style={{ color: 'steelblue' }} >
                <AddIcon />
              </IconButton>
            </td>
          </tr>

        </TableBody>
     </Table>
    </TableContainer>
  );
};

export default TestDetailsTableRowEdge;

