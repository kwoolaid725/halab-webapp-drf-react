import React, {useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Autocomplete from '@mui/material/Autocomplete';
import GroupHeader from '@mui/material/ListItem';
import GroupItems from '@mui/material/ListItem';

import TestDetailsTableCR from "./TestDetailsTableCR";
import TestDetailsTable from "./TestDetailsTable";
import axiosInstance from "../../axios";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";


export default function TestDetailsAddSample (props) {

  const navigate = useNavigate();
  const [sampleValue, setSampleValue] = useState('');
  const [invNoValue, setInvNoValue] = useState('');


  const [samples, setSamples] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [testMeasures, setTestMeasures] = useState([]);
  const [values, setValues] = useState([]);
  const [keys, setKeys] = useState([]);

  const [brandModel, setBrandModel] = useState([]);
// const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearchResult, setSelectedSearchResult] = useState(null);

  const [brushTypeValue, setBrushTypeValue] = useState({
      value: 'Carpet',
      customInput: '',
    });

  const [testCaseValue, setTestCaseValue] = useState({
      value: 'REG',
      customInput: '',
    });

  const brushTypeOptions = ['Carpet', 'Fluffy', 'Dual', 'DMS', 'Other'];
  const testCaseOptions = ['REG', 'HARD', 'SOFT', 'Other'];



  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/test-measures.json');
          const jsonData = await response.json();
          const bareData = jsonData["Bare"];
          // console.log('Bare Data:', bareData)
          setTestMeasures(bareData);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      fetchData();
    }, []);


  useEffect(() => {
    if (testMeasures) {
      let selectedMeasures = Array.isArray(testMeasures) ? testMeasures : [testMeasures];

      // Find the object that contains "Sand"
      const sandMeasure = selectedMeasures.find(measure => Object.keys(measure)[0] === "Sand");

      if (sandMeasure) {
        const values = sandMeasure["Sand"][0];
        const keys = Object.keys(values);

        // console.log('measureValues:', values);
        // console.log('measureKeys:', keys);



        setValues(values);
        setKeys(keys);
      }
    }
  }, [testMeasures]);



  useEffect(() => {
    axiosInstance(`/categories/?name=${props.productCategory}`)
      .then(response => {
        const fetchedCategoryId = response.data[0]?.id; // Assuming the API returns an array
        setCategoryId(fetchedCategoryId);
      })
      .catch(error => {
        console.error('Error fetching category ID:', error);
      });
  }, [props.productCategory]);


  // Fetch all products for the autocomplete when the component mounts
  useEffect(() => {
    if (categoryId) {
      axiosInstance(`/products/?category=${categoryId}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [categoryId]);

    const handleSearch = (inputValue) => {

    // Make an API call based on the searchValue
      axiosInstance(`/products/search/custom/${categoryId}/?search=${inputValue}`)
        .then(response => {
          // console.log('searched data:', response.data);
          // Update the state with search results
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };




	const handleSelectionChange = (event, type) => {
    let selectedValue = event.target.value;

    if (type === 'sample') {
      setSampleValue(selectedValue);
    } else if (type === 'brushType') {
      setBrushTypeValue((prev) => ({
        value: selectedValue,
        customInput: prev.customInput,
      }));
    } else if (type === 'testCase') {
      setTestCaseValue((prev) => ({
        value: selectedValue,
        customInput: prev.customInput,
      }));
    }

  };
		 // Make API call here to get the id of the product category
  useEffect(() => {
      if (selectedSearchResult) {
        // console.log('selectedSearchResult123:', selectedSearchResult)
          axiosInstance.get(`/samples/?product=${selectedSearchResult.id}`)
          .then(response => {
            setSamples(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }, [selectedSearchResult]);

    useEffect(() => {
      if (selectedSearchResult) {
        // console.log('selectedSearchResult123:', selectedSearchResult)
          axiosInstance.get(`/products/?id=${selectedSearchResult.id}`)
          .then(response => {
            const fetchedBrand = response.data[0]?.brand; // Assuming the API returns an array
            const fetchedModel = response.data[0]?.model_name; // Assuming the API returns an array
            // concat the brand and model name
            const model = `${fetchedBrand} ${fetchedModel}`;
            setBrandModel(model);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }, [selectedSearchResult]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formDataArray = [];
      const slug = `${props.testId}-Bare-${sampleValue}${brushTypeValue.customInput || brushTypeValue.value}${testCaseValue.customInput || testCaseValue.value}-1`;


      Object.entries(values).forEach(([key, value]) => {


        const formData = new FormData();
        formData.append('test_measure', key);
        formData.append('value', value?.value || '');
        formData.append('units', value?.units || '');
        formData.append('test', props.testId);
        formData.append('sample', sampleValue);
        formData.append('brush_type', brushTypeValue.customInput || brushTypeValue.value);
        formData.append('tester', 1);
        formData.append('owner', 1);
        formData.append('test_target', 'Bare');
        formData.append('test_group', 'Select Test Group');
        formData.append('test_case', testCaseValue.customInput || testCaseValue.value);
        formData.append('slug', slug);
        formData.append('run', 1);
        formData.append('remarks', '');
        formData.append('model', brandModel);

        formDataArray.push(formData);
      });

      console.log('formDataArray1234:', formDataArray);
      try {
        // Submit each formData instance separately
        await Promise.all(formDataArray.map(formData => {
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
        }));

        window.location.reload();
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    };




	return (
		<React.Fragment>
          <Box>
           <form onSubmit={handleSubmit}>
          <TableContainer component={Paper}>
            <Table aria-label="fixed table">
              <TableHead>
                <TableRow style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TableCell style={{ width: '34%', height: '50px', textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                              Test Sample
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: '22%', height: '50px', textAlign: 'center' }}>
                     <Typography variant="subtitle1" fontWeight="bold">
                              Inventory Number
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: '22%', height: '50px', textAlign: 'center' }}>
                     <Typography variant="subtitle1" fontWeight="bold">
                              Brush Type
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: '22%', height: '50px', textAlign: 'center' }}>
                     <Typography variant="subtitle1" fontWeight="bold">
                              Test Case
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  <TableRow style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TableCell align="center" style={{ width: '34%' }}>
                      <Autocomplete
                        // options={searchResults.flatMap((option) => (option.model_name || option.brand ? option : []))}
                        options={searchResults.filter((option) => option.model_name || option.brand)}
                        groupBy={(option) => option.brand || 'Other'}
                        getOptionLabel={(option) => `${option.brand || ''} ${option.model_name || ''}`}
                        value={selectedSearchResult}
                        onInputChange={(event, newInputValue) => {
                          setSearchValue(newInputValue);
                          handleSearch(newInputValue); // Call handleSearch while typing
                          // console.log('Search Results:', searchResults)
                        }}

                        onChange={(event, newValue) => {
                          // console.log('Option selected:', newValue);
                          setSelectedSearchResult(newValue);
                        }}

                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="big"
                            label="Search"// Adjust the height according to your preference
                          />
                        )}
                        renderOption={(props, option) => (
                          <li {...props}>
                            {option.model_name}
                          </li>
                      )}
                      />
                    </TableCell>
                     <TableCell align="center" style={{ width: '22%', }}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        required

                      >
                        <InputLabel id="product-label">Samples</InputLabel>
                        <Select
                          value={sampleValue}
                          onChange={(event) => handleSelectionChange(event, 'sample')}
                          labelId="sample-label"
                          id="sample"
                          name="sample"
                          label="Sample"
                          // style={{ height: '40px' }}
                        >
                          {samples.map((option) => (
                            <MenuItem key={option.id} value={option.inv_no}>
                              {option.inv_no}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell align="center" style={{ width: '22%' }}>
                     <FormControl
                        variant="outlined"
                        fullWidth
                        required
                      >
                        <InputLabel id="brush-type-label">Brush Type</InputLabel>
                        <Select
                          value={brushTypeValue.value}
                          onChange={(event) => handleSelectionChange(event, 'brushType')}
                          labelId="brush-type-label"
                          id="brush-type"
                          name="brushType"
                          label="Brush Type"
                        >
                          {brushTypeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                        {brushTypeValue.value === 'Other' && (
                          <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Type your brush type"
                            value={brushTypeValue.customInput}
                            onChange={(e) => setBrushTypeValue((prev) => ({ ...prev, customInput: e.target.value }))}
                          />
                        )}
                      </FormControl>
                    </TableCell>
                    <TableCell align="center" style={{ width: '22%' }}>
                      <FormControl
                          variant="outlined"
                          fullWidth
                          required
                        >
                          <InputLabel id="test-case-label">Test Case</InputLabel>
                          <Select
                            value={testCaseValue.value}
                            onChange={(event) => handleSelectionChange(event, 'testCase')}
                            labelId="test-case-label"
                            id="test-case"
                            name="testCase"
                            label="Test Case"
                          >
                            {testCaseOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {testCaseValue.value === 'Other' && (
                            <TextField
                              variant="outlined"
                              size="small"
                              placeholder="Type your test case"
                              value={testCaseValue.customInput}
                              onChange={(e) => setTestCaseValue((prev) => ({ ...prev, customInput: e.target.value }))}
                            />
                          )}
                        </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            </form>
          </Box>

      </React.Fragment>
	);
}