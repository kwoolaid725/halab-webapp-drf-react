import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DateField } from '@mui/x-date-pickers/DateField';
import classes from './CreatePost.module.css';


export default function ProductCreate() {
	function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}

	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		brand: '',
		model_name: '',
		slug: '',
		color: '',
	});

	const [productData, updateFormData] = useState(initialFormData);
	const [productImage, setProductImage] = useState(null);

	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setProductImage({
							image: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'model_name') {
			updateFormData({
				...productData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
				['slug']: slugify(e.target.value.trim()),
			});
		} else {
			updateFormData({
				...productData,
				// Trimming any whitespace
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	const handleSubmit = (e) => {
					e.preventDefault();
					let formData = new FormData();
					formData.append('category', productData.category);
					formData.append('brand', productData.brand);
					formData.append('slug', productData.slug);
					formData.append('author', 1);
					formData.append('color', productData.color);
					// formData.append('release_date', productData.release_date);
					formData.append('image', productImage.image[0]);
					axiosInstance.post(`admin/products/create/`, formData,{
									headers: {
										'Content-Type': 'multipart/form-data'
									}
					});
					navigate('/admin/');
					window.location.reload();
	};


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create New Product
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="brand"
								label="Brand"
								name="brand"
								autoComplete="brand"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="model_name"
								label="Model Name"
								name="model_name"
								autoComplete="model_name"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="slug"
								label="slug"
								name="slug"
								autoComplete="slug"
								value={productData.slug}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="color"
								label="color"
								name="color"
								autoComplete="color"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
            {/*<Grid item xs={12}>*/}
						{/*	<DateField*/}
						{/*		variant="outlined"*/}
						{/*		required*/}
						{/*		fullWidth*/}
						{/*		id="color"*/}
						{/*		label="color"*/}
						{/*		name="color"*/}
						{/*		autoComplete="color"*/}
						{/*		onChange={handleChange}*/}
						{/*		multiline*/}
						{/*		rows={4}*/}
						{/*	/>*/}
						{/*</Grid>*/}
						<input
							accept="image/*"
							className={classes.input}
							id="product-image"
							onChange={handleChange}
							name="image"
							type="file"
						/>
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