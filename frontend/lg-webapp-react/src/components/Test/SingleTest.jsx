import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import classes from './SingleTest.module.css'

export default function Test() {
	const { id } = useParams();
	const [data, setData] = useState({ tests: [] });

	useEffect(() => {
	axiosInstance(`/tests/${id}/`)
		.then((res) => {
			console.log(res.data);
			setData({ tests: res.data });
		})
		.catch((error) => {
			console.error("Error fetching data: ", error);
			// handle error appropriately
		});
}, [setData, id]);

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
							{data.tests.test_category}
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							{data.tests.description}
						</Typography>
					</Container>
				</div>
			</div>
		</Container>
	);
}
