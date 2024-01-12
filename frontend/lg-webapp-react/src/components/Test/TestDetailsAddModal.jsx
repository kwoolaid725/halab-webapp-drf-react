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

    const [products, setProducts] = useState([]);
	// const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedBrand, setSelectedBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    // const [product, setProduct] = useState('');


    //useEffect to get all brands
	useEffect(() => {
		// Make API call here after category selection
		axiosInstance(`http://localhost:8000/api/brands/`)
			.then(response => {
				setBrands(response.data);

			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}, []);



	const handleSelectionChange = (event, type) => {
		let selectedValue = event.target.value;

		let brand = selectedBrand;

	     if (type === 'brand') {
			setSelectedBrand(selectedValue);
			brand = selectedValue;
		} else if (type === 'product') {
           setSelectedProduct(selectedValue);

        } else if (type === 'sample') {
           setSampleValue(selectedValue);
        }

		 // Make API call here to get the id of the product category
          axiosInstance(`/categories/?name=${props.productCategory}`)
            .then(response => {
              const categoryId = response.data[0]?.id; // Assuming the API returns an array
              // Use categoryId to fetch products
              axiosInstance(`/products/?category=${categoryId}&brand=${brand}`)
                .then(response => {
                  setProducts(response.data);
                })
                .catch(error => {
                  console.error('There was an error!', error);
                });
            })
            .catch(error => {
              console.error('There was an error!', error);
            });
        };


        useEffect(() => {
          // Fetch rows from the database and update the 'allRows' state
          if (selectedProduct && products.length > 0) {
            axiosInstance(`/products/?model_name=${selectedProduct}`)
              .then(response => {
                const productId = response.data[0]?.id;
                console.log('selectedProduct:', selectedProduct);
                return axiosInstance.get(`/samples/?product=${productId}`);
              })
              .then(response => {
                setSamples(response.data);
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }
        }, [selectedProduct, products]);

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
                    {/*<TableCell>*/}
                    {/*  <TextField*/}
                    {/*    variant="outlined"*/}
                    {/*    size="small"*/}
                    {/*    value={sampleValue}*/}
                    {/*    onChange={(e) => setSampleValue(e.target.value)}*/}
                    {/*  />*/}
                    {/*</TableCell>*/}
                     <FormControl variant="outlined" fullWidth required>
                             <InputLabel id="brand-label">Brand</InputLabel>
                                <Select value={selectedBrand} onChange={(event) => handleSelectionChange(event, 'brand')}>
                                    {brands.map((option) => (
                                        <MenuItem key={option.id} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                     </FormControl>
                     <FormControl variant="outlined" fullWidth required>
                        <InputLabel id="product-label">Product</InputLabel>
                        <Select
                            value={selectedProduct}
                            onChange={(event) => handleSelectionChange(event, 'product')}
                            labelId="product-label"
                            id="product"
                            name="product"
                            label="Product"
                        >
                            {products.map((option) => (
                                <MenuItem key={option.id} value={option.model_name}>
                                    {option.model_name}
                                </MenuItem>
                            ))}
                        </Select>
                     </FormControl>
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

                    {/*  <TableCell>*/}
                    {/*      <Autocomplete*/}
                    {/*        options={samples}*/}
                    {/*        getOptionLabel={(option) => option.inv_no value={option.inv_no}}*/}
                    {/*        value={sampleValue}*/}
                    {/*        onChange={(e, newValue) => setSampleValue(newValue)}*/}
                    {/*        renderInput={(params) => (*/}
                    {/*          <TextField*/}
                    {/*            {...params}*/}
                    {/*            label="Test Sample"*/}
                    {/*            variant="outlined"*/}
                    {/*            size="small"*/}
                    {/*          />*/}
                    {/*        )}*/}
                    {/*      />*/}
                    {/*    </TableCell>*/}
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