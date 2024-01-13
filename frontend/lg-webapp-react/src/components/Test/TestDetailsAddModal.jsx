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


export default function TestDetailsAddModal (props) {

	const navigate = useNavigate();
	const [sampleValue, setSampleValue] = useState('');
  const [invNoValue, setInvNoValue] = useState('');
  const [brushTypeValue, setBrushTypeValue] = useState('');
  const [testCaseValue, setTestCaseValue] = useState('');

  const [samples, setSamples] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  const [products, setProducts] = useState([]);
// const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearchResult, setSelectedSearchResult] = useState(null);
    // const [product, setProduct] = useState('');





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
          console.log('searched data:', response.data);
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
    }

  };
		 // Make API call here to get the id of the product category
  useEffect(() => {
      if (selectedSearchResult) {
        console.log('selectedSearchResult123:', selectedSearchResult)
          axiosInstance.get(`/samples/?product=${selectedSearchResult.id}`)
          .then(response => {
            setSamples(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }, [selectedSearchResult]);

    useEffect(
        () => {
            console.log('selected product:', selectedProduct);
            console.log('sampleValue:', sampleValue);
        }
    )
    const handleSubmit = (e) => {

        const slug = `${props.testId}-Bare-${sampleValue}${brushTypeValue}${testCaseValue}-1`;
        e.preventDefault();
        let formData = new FormData();
        formData.append('test_measure', '');
            formData.append('value', '');
            formData.append('units', '');
            formData.append('test', props.testId);
            formData.append('sample', sampleValue);
            formData.append('brush_type', brushTypeValue);
            formData.append('tester', 1);
            formData.append('owner', 1);
            formData.append('test_target', 'Bare');
            formData.append('test_group', 'Select Test Group');
            formData.append('test_case', testCaseValue);
            formData.append('slug', slug);
            formData.append('run', 1);
            formData.append('remarks', '');

        const url = `admin/tests/vacuum/testdetail/`;
        const requestType = 'POST'; // Use PUT for updating existing rows

        axiosInstance({
              method: requestType,
              url: url,
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })

        window.location.reload();
	};




	return (
		<React.Fragment>
          <Box>
            <form onSubmit={handleSubmit}>
            <TableContainer component={Paper}>
              <Table aria-label="fixed table">
                <TableHead>
                  <TableRow>
                    <TableCell>Test Sample</TableCell>
                    <TableCell align="left">Inventory Number</TableCell>
                    <TableCell align="left">Brush Type</TableCell>
                    <TableCell align="left">Test Case</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>

                    <Autocomplete
                      // options={searchResults.flatMap((option) => (option.model_name || option.brand ? option : []))}
                      options={searchResults.filter((option) => option.model_name || option.brand)}
                      groupBy={(option) => option.brand || 'Other'}
                      getOptionLabel={(option) => `${option.brand || ''} ${option.model_name || ''}`}
                      value={selectedSearchResult}
                      onInputChange={(event, newInputValue) => {
                        setSearchValue(newInputValue);
                        handleSearch(newInputValue); // Call handleSearch while typing
                        console.log('Search Results:', searchResults)
                      }}
                      onChange={(event, newValue) => {
                        console.log('Option selected:', newValue);
                        setSelectedSearchResult(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          size="small"
                          label="Search"
                        />
                      )}
                      renderOption={(props, option) => (
                        <li {...props}>
                          {option.model_name}
                        </li>
                    )}

                  />
                    <TableCell>
                     <FormControl variant="outlined" fullWidth required>
                        <InputLabel id="product-label">Samples</InputLabel>
                        <Select
                            value={sampleValue}
                            onChange={(event) => handleSelectionChange(event, 'sample')}
                            labelId="sample-label"
                            id="sample"
                            name="sample"
                            label="Sample"
                        >
                            {samples.map((option) => (
                                <MenuItem key={option.id} value={option.inv_no}>
                                    {option.inv_no}
                                </MenuItem>
                            ))}
                        </Select>
                     </FormControl>

                  </TableCell>

                    <TableCell>
                     <TextField
                        variant="outlined"
                        size="small"
                        value={brushTypeValue}
                        onChange={(e) => setBrushTypeValue(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={testCaseValue}
                        onChange={(e) => setTestCaseValue(e.target.value)}
                      />
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