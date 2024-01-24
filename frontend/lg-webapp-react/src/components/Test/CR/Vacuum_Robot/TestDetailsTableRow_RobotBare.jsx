import React, {
  useEffect,
  useState
} from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import axiosInstance from '../../../../axios';
import EditableRowRobotBare from './EditableRowRobotBare';
import StaticRowRobotBare from './StaticRowRobotBare';
import EditableRow from '../../EditableRow'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function TestDetailsTableRowRobotBare(props){

  const [testMeasures, setTestMeasures] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [rows, setRows] = useState([]);
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState({});
  const [allRows, setAllRows] = useState([]);
  const [fetchedRows, setFetchedRows] = useState([]);
  const testGroupOptions = testMeasures ? Object.keys(testMeasures).map(key => Object.keys(testMeasures[key])[0]) : [];
  const [soilWtMap, setSoilWtMap] = useState({});




  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/test-measures-robot.json');
          const jsonData = await response.json();
          const bareData = jsonData["CR"]["Bare"];
          console.log('robot measures:', bareData)
          setTestMeasures(bareData);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      fetchData();
    }, []);


  useEffect(() => {
    // Fetch rows from the database and update the 'allRows' state
    axiosInstance.get(`/admin/tests/vacuum/testdetail/${props.testId}/?test_target=Bare`)
      .then(response => {
        setAllRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching rows', error);
      });

  }, []); // Fetch only once on component mount



  useEffect(() => {
    if (testMeasures) {
      const formattedData = testMeasures.map(category => {
        const categoryName = Object.keys(category)[0];
        const measures = category[categoryName][0];
        const keys = Object.keys(measures);

        return {
          categoryName: categoryName,
          keys: keys,
          values: measures
        };
      });

      // Update the state with the formatted data
      setCategoriesData(formattedData);

      // Update the rows state
      setRows(() => {
        const newRow = {
          id: '',  // You may need to generate a unique ID here
          slug: `${props.testId}-Bare-${props.sample}${props.brushType}${props.testCase}-1`,
          tester: props.tester,
          testTarget: 'Bare',
          run: 1,
          remarks: '',
          created_at: '',
          last_updated: '',
          isEditing: false,
          values: formattedData.reduce((acc, category) => {
            acc[category.categoryName] = { ...category.values };
            return acc;
          }, {})
        };

        return [newRow];
      });
    }
  }, [testMeasures]);

  useEffect(() => {
       console.log('Rows-TDTR_RB:', rows);
  }
  , [rows]);

  // console.log('Rows-TDTR_RB-Keys:', rows);

  useEffect(() => {
    // Your logic to fetch and generate soilWtMap from the provided TestMeasures data
    if (testMeasures) {
      const soilWtMapData = {}; // Object to store Soil_Wt values for different keys

      testMeasures.forEach((measure) => {
        const key = Object.keys(measure)[0]; // Extracting the key, e.g., 'Sand', 'Rice', etc.
        const values = measure[key][0]; // Assuming there's only one set of values for each key
        soilWtMapData[key] = { ...values };
      //   if (values.Soil_Wt && values.Soil_Wt.value) {
      //     soilWtMapData[key] = parseFloat(values.Soil_Wt.value); // Storing Soil_Wt value as a number
      //   }
      });
      // console.log('soilWtMapData', soilWtMapData)
      setSoilWtMap(soilWtMapData); // Set the soilWtMap state
    }
  }, [testMeasures]);



   const handleInputChange = (rows, setRows, slug, category, key, value) => {
    const updatedRows = rows.map((row) => {
      if (row.slug === slug) {
        const updatedValues = { ...row.values };

        // Update the value for the specified category and key
        updatedValues[category][key] = {
          value: value,
          units: row.values[category][key]?.units || '', // Preserve existing units if available
        };

        console.log("updatedValues123", updatedValues)

        // Check if 'Soil_Wt' and 'Unpicked_Amt.' are defined before accessing their 'value' property
        if (category === 'Silica/Rice' && key === 'Unpicked_Amt.'){
          const soilWt = parseFloat(updatedValues[category]['Soil_Wt']['value']);
          const unpickedAmt = parseFloat(updatedValues[category]['Unpicked_Amt.']['value']);

          // Check if 'unpicked_amt' is defined before accessing its 'value' property
          if (!isNaN(soilWt) && !isNaN(unpickedAmt)) {
            const pickupValue = ((soilWt - unpickedAmt) / soilWt * 100).toFixed(2).replace(/\.?0+$/, '');
            // OR use the alternative formula: (soilWt - unpickedAmt) / soilWt * 100

            updatedValues[category]['Pickup'] = {
              value: isNaN(pickupValue) ? '' : pickupValue, // Ensure it's a number and round to 2 decimal places
              units: '%', // Assuming the unit is percentage
            };
          }
        }

        if (category === 'Cheerios' && key === 'Unpicked_Ct.'){
          const initialCt = parseFloat(updatedValues[category]['Initial_Ct.']['value']);
          const unpickedCt = parseFloat(updatedValues[category]['Unpicked_Ct.']['value']);

          // Check if 'unpicked_amt' is defined before accessing its 'value' property
          if (!isNaN(initialCt) && !isNaN(unpickedCt)) {
            const pickupValue = ((initialCt - unpickedCt) / initialCt * 100).toFixed(2).replace(/\.?0+$/, '');
            // OR use the alternative formula: (soilWt - unpickedAmt) / soilWt * 100

            updatedValues[category]['Pickup'] = {
              value: isNaN(pickupValue) ? '' : pickupValue,// Ensure it's a number and round to 2 decimal places
              units: '%', // Assuming the unit is percentage
            };
          }
        }

        if (category === 'Paper-Squares' && key === 'Unpicked_Ct.'){
          const initialCt = parseFloat(updatedValues[category]['Initial_Ct.']['value']);
          const unpickedCt = parseFloat(updatedValues[category]['Unpicked_Ct.']['value']);

          // Check if 'unpicked_amt' is defined before accessing its 'value' property
          if (!isNaN(initialCt) && !isNaN(unpickedCt)) {
            const pickupValue = ((initialCt - unpickedCt) / initialCt * 100).toFixed(2).replace(/\.?0+$/, '');
            // OR use the alternative formula: (soilWt - unpickedAmt) / soilWt * 100

            updatedValues[category]['Pickup'] = {
              value: isNaN(pickupValue) ? '' : pickupValue,// Ensure it's a number and round to 2 decimal places
              units: '%', // Assuming the unit is percentage
            };
          }
        }

        return {
          ...row,
          values: updatedValues,
        };
      }
      return row;
    });

    setRows([...updatedRows]);
  };


  useEffect(() => {
      // Set 'initialRowState' as the default 'rows' state
      const initialRowState = {
        id: '',
        slug: `${props.testId}-Bare-${props.sample}${props.brushType}${props.testCase}-1`,
        tester: props.tester,
        testTarget: 'Bare',
        // testGroup: '',
        run: 1,
        remarks: '',
        created_at: '',
        last_updated: '',
        isEditing: true,
        values: {}, // Initialize as an empty object
        // units: {},
        // model: `${props.model}`,
      };
      setRows([initialRowState]);
      // console.log('initialRowState', initialRowState);

  }, [props.testId, props.testTarget, props.testGroup, props.tester, props.model]);


  useEffect(() => {
    if (props.testId) {
      axiosInstance(`/samples/?inv_no=${props.sample}`)
        .then(response => {
          const sampleId = response.data[0]?.id;
            axiosInstance(`/admin/tests/vacuum/testdetail/${props.testId}/?sample=${sampleId}&brush_type=${props.brushType}&test_case=${props.testCase}&test_target=Bare`)
              .then((res) => {
                const fetchedRows = res.data || [];
                setFetchedRows(fetchedRows);
                // console.log('fetchedRows-robotBare', fetchedRows)
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
        const { slug, test_group, test_measure, value, units, ...otherValues } = row;

        if (!acc[slug]) {
          acc[slug] = {
            ...otherValues,
            slug,
            values: {
              [test_group]: {
                [test_measure]: { value: value || '', units: units || '' }
              }
            }
          };
        } else {
          if (!acc[slug].values[test_group]) {
            acc[slug].values[test_group] = {
              [test_measure]: { value: value || '', units: units || '' }
            };
          } else {
            acc[slug].values[test_group][test_measure] = { value: value || '', units: units || '' };
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


      // console.log("combinedRows", combinedRows);



    // Transform combinedRows to match the initialState structure
    const transformedRows = Object.values(combinedRows).map(row => ({

      id: '', // Assign an appropriate ID
      slug: row.slug,
      tester: row.tester, // Assuming 'tester' exists in fetchedRows
      testTarget: row.test_target, // Assuming 'testTarget' exists in fetchedRows
      // testGroup: row.test_group, // Assuming 'testGroup' exists in fetchedRows
      run: row.run, // Adjust as needed
      remarks: row.remarks, // Adjust as needed
      created_at: convertToAMPM(row.created_at.split('.')[0]), // Adjust as needed
      last_updated: convertToAMPM(row.last_updated.split('.')[0]), // Adjust as needed
      isEditing: false, // Assuming default isEditing as false
      values: row.values || {}, // Setting the values from combinedRows
      // units: row.units || {}, // Setting the units from combinedRows
    }));

    // console.log('transformedRows-RobotBare', transformedRows);

    setRows(transformedRows);
  }
}, [fetchedRows]);

  useEffect(() => {
    console.log('rows-robotBare', rows);
  }, [rows]);


 const handleAddRow = () => {
    const maxIndex = rows.length > 0 ? Math.max(...rows.map(row => parseInt(row.slug.split('-').pop()))) + 1 : 1;
    const newSlug = `${props.testId}-Bare-${props.sample}${props.brushType}${props.testCase}-${maxIndex}`;

    const previousRow = rows[rows.length - 1];
    const previousRun = previousRow ? previousRow.run : 0;

    // Define keys to keep from the previous row

    const keysToKeep = ["Initial_Ct.", "Soil_Wt"];

    // Loop through each category
   const valuesToKeep = {};
    Object.keys(previousRow.values).forEach(category => {
      valuesToKeep[category] = {};
      Object.keys(previousRow.values[category]).forEach(key => {
        const valueObj = previousRow.values[category][key];
        valuesToKeep[category][key] = {
          value: keysToKeep.includes(key) ? valueObj.value : '',
          units: valueObj.units || '',
        };
      });
    });

    const updatedNewRow = {
      ...previousRow,
      slug: newSlug,
      testTarget: "Bare",
      run: previousRun + 1,
      remarks: '',
      values: valuesToKeep,
      isEditing: true,
    };

    // setNewRow(updatedNewRow);
    setRows([...rows, updatedNewRow]);
  };


  const handleEdit = (slug) => {
    const updatedRows = [...rows];
    updatedRows[slug].isEditing = true;
    setRows(updatedRows);
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



  const submitRow = (index) => {
    const editedRow = rows[index];
    const rowsWithSameSlug = allRows.filter((row) => row.slug === editedRow.slug);

      if (rowsWithSameSlug.length > 0) {
      const putRequests = rowsWithSameSlug.map((row) => {
        const categoryRequests = Object.entries(editedRow.values).map(([category, categoryData]) => {
          const keyRequests = Object.entries(categoryData).map(([key, valueObj]) => {
            const value = valueObj.value || '';
            const units = valueObj.units || '';
            const rowToUpdate = rowsWithSameSlug.find((r) => r.id === row.id && r.test_measure === key && r.test_group === category);

            if (rowToUpdate) {
              const formData = new FormData();
              formData.append('test_measure', key);
              formData.append('value', value);
              formData.append('units', units);
              formData.append('test', props.testId);
              formData.append('sample', props.sample);
              formData.append('brush_type', props.brushType);
              formData.append('tester', 1);
              formData.append('owner', 1);
              formData.append('test_target', editedRow.testTarget);
              formData.append('test_group', category);
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
                  'Content-Type': 'multipart/form-data',
                },
              });
            }
          });

          return keyRequests;
        });

        return categoryRequests
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

        // console.log('editedRow', editedRow)

        Object.entries(editedRow.values).forEach(([category, categoryData]) => {
          Object.entries(categoryData).forEach(([key, valueObj]) => {
            const formData = new FormData();

            const value = valueObj.value || '';
            const units = valueObj.units || '';

            // Populate formData with appropriate values for the current key
            formData.append('test_measure', key);
            formData.append('value', value);
            formData.append('units', units);
            formData.append('test', props.testId);
            formData.append('sample', props.sample);
            formData.append('brush_type', props.brushType);
            formData.append('tester', 1);
            formData.append('owner', 1);
            formData.append('test_target', editedRow.testTarget);
            formData.append('test_group', category);
            formData.append('test_case', props.testCase);
            formData.append('slug', editedRow.slug);
            formData.append('run', editedRow.run);
            formData.append('remarks', editedRow.remarks);
            formData.append('model', props.model);

            formDataArray.push(formData);


        });
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
              toggleEditing(index);
            })
            .catch(error => {
              console.error('Error fetching rows', error);
            });
        })
        .catch(errors => {
          console.error('Error posting data', errors);
          // Handle errors
        });
    }
  };



  return (


   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">Row ID</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">Tester</Typography>
            </TableCell>
            {categoriesData && categoriesData.map(category => (
            <React.Fragment key={category.categoryName}>
               <TableCell key={category.categoryName} style={{ padding: 0, border: 'none', boxSizing: 'border-box' }}>
                {/* First row with category name */}
                <TableRow>
                  <TableCell colSpan={category.keys.length + 1} align="center" style={{ padding: 0, border: 'none', boxSizing: 'border-box' }}>
                    <Typography variant="subtitle1" fontWeight="bold">{category.categoryName}</Typography>
                  </TableCell>
                </TableRow>
                {/* Second row with keys */}
                <TableRow>
                  {category.keys.map((key, index) => (
                    <TableCell key={`${category.categoryName}-${key}`} align="center">
                      <Typography variant="subtitle1" fontWeight="bold">{key}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableCell>
            </React.Fragment>
          ))}
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">Run</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">Remarks</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">Created</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">Updated</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
              row.isEditing ? (
                <EditableRowRobotBare
                  key={idx}
                  row={row}
                  idx={idx}
                  // testGroup='Sand'
                  testId={props.testId}
                  keys={keys}
                  values={values}
                  categoriesData={categoriesData}
                  handleInputChange={(slug, category, key, value) => handleInputChange(rows, setRows, slug, category, key, value)}
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
                <StaticRowRobotBare
                  key={idx}
                  row={row}
                  idx={idx}
                  // testGroup='Sand'
                  keys={keys}
                  categoriesData={categoriesData}
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

export default TestDetailsTableRowRobotBare;

