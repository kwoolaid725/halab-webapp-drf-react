import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import { Box } from "@mui/system";


export default function Post() {
	const { slug } = useParams();
	const [data, setData] = useState({ posts: [] });

	useEffect(() => {
	axiosInstance(`/posts/${slug}/`)
		.then((res) => {
			console.log(res.data);
			setData({ posts: res.data });
		})
		.catch((error) => {
			console.error("Error fetching data: ", error);
			// handle error appropriately
		});
}, [setData, slug]);

	return (
	<Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
			<CssBaseline />
			<Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Box sx={{ padding: (theme) => theme.spacing(8, 0, 6) }}>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							{data.posts.title}
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							{data.posts.excerpt}
						</Typography>
					</Container>
				</Box>
			</Card>
		</Container>
	);
}
