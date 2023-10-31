import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import classes from './SingleProduct.module.css'

export default function Product() {
	const { slug } = useParams();
	const [data, setData] = useState({ products: [] });

	useEffect(() => {
	axiosInstance(`/products/${slug}/`)
		.then((res) => {
			console.log(res.data);
			setData({ products: res.data });
		})
		.catch((error) => {
			console.error("Error fetching data: ", error);
			// handle error appropriately
		});
}, [setData, slug]);

	return (
	<Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
			<CssBaseline />
			<div className={classes.card}>
				<div className={classes.box}>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							{data.products.brand}
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							{data.products.model_name}
						</Typography>
					</Container>
				</div>
			</div>
		</Container>
	);
}
