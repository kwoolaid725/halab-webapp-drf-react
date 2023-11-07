import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axios';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import classes from './TestCreate.module.css';
//MaterialUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';



export default function TestCreate() {

	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		  test_category: '',
		  product_category: '',
		  description: '',
		  test_status: '',
			due_date: '',
		  remarks: '',
		  owner: 1,
	});

	const [testData, updateFormData] = useState(initialFormData);
	const [testAttachment, setTestAttachment] = useState([]);
	const [categories, setCategories] = useState([]);



	//useEffect to get all categories
	useEffect(() => {
		// Make API call here after category selection
		axios.get(`http://localhost:8000/api/categories/`)
			.then(response => {
				setCategories(response.data);
				console.log(categories);
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}, []);



	const handleChange = (e) => {
		if ([e.target.name] == 'attachment') {
			setTestAttachment({
							attachment: e.target.files,
			});
			console.log(e.target.files);
		}else {
			updateFormData({
				...testData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('test_category', testData.test_category);
		formData.append('product_category', testData.product_category);
		formData.append('description', testData.description);
		// test_status set to "Open" by default
		formData.append('test_status', "PENDING");
		formData.append('due_date', testData.due_date);
		formData.append('remarks', testData.remarks);
		formData.append('owner', 1);
		// formData.append('attachment', testAttachment.attachment[0]);

		// 				axiosInstance.post(`admin/tests/create/`, formData,{
		// 								headers: {
		// 									'Content-Type': 'multipart/form-data'
		// 								}
		// 				});
		axiosInstance.post(`admin/tests/create/`, formData);
		navigate('/admin/tests');
					window.location.reload();
	};


	// };



    const TEST_CATEGORY = [
		{
			value: 'CR',
			label: 'CR'
		},
		{
			value: 'RU',
			label: 'Real-Use'
		},
		 {
			value: 'FT',
			label: 'Field Test'
		},
		 {
			value: 'CRDI',
			label: 'CRDI'
		},
    // Add more categories as needed
	];

	const TEST_STATUS = [
		{
			value: 'Open',
			label: 'Open'
		},
		{
			value: 'In Progress',
			label: 'In Progress'
		},
		 {
			value: 'Closed',
			label: 'Closed'
		},
		{
			value: 'Cancelled',
			label: 'Cancelled'
		}
	// Add more categories as needed
	];


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create New Test
				</Typography>
				<form className={classes.form} noValidate>
					 <Grid container spacing={2}>
						 <Grid item xs={12}>
								 <FormControl variant="outlined" fullWidth required>
										<InputLabel id="product-label">Test Category</InputLabel>
											<Select
												variant="outlined"
												required
												fullWidth
												id="test_category"
												label="Test Category"
												name="test_category"
												autoComplete="test_category"
												value={testData.test_category}
												onChange={handleChange}
											>
											{TEST_CATEGORY.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
											))}
											</Select>
								 </FormControl>
								 <FormControl variant="outlined" fullWidth required>
									 <InputLabel id="brand-label">Product Category</InputLabel>
										<Select
											variant="outlined"
											required
											fullWidth
											id="product_category"
											label="Category"
											name="product_category"
											autoComplete="product_category"
											value={testData.product_category}
											onChange={handleChange}
										>
											{categories.map((option) => (
												<MenuItem key={option.id} value={option.name}>
													{option.name}
												</MenuItem>
											))}
										</Select>
								 </FormControl>
								 <Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="description"
										label="Description"
										name="description"
										autoComplete="description"
										value={testData.description}
										onChange={handleChange}
										multiline
										rows={4}
									>
									</TextField>
	                             </Grid>

							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="due_date"
									label="Due Date"
									name="due_date"
									autoComplete="due_date"
									onChange={handleChange}
									multiline

								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="remarks"
									label="Remarks"
									name="remarks"
									autoComplete="remarks"
									onChange={handleChange}
									multiline
									rows={4}

								/>
							</Grid>
							{/*<input*/}
							{/*	accept=*/}
							{/*	className={classes.input}*/}
							{/*	id="test-attachement"*/}
							{/*	onChange={handleChange}*/}
							{/*	name="attachment"*/}
							{/*	type="file"*/}
							{/*/>*/}


					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create Product
					</Button>
				</form>
			</div>
		</Container>
	);
}