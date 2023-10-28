import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from "@mui/material/Card";
import { Box } from "@mui/system";

export default function SignUp() {
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`user/register/`, {
				email: formData.email,
				user_name: formData.username,
				password: formData.password,
			})
			.then((res) => {
				navigate('/login');
				console.log(res);
				console.log(res.data);
			})
			.catch((error) => {
        	console.error('An error occurred:', error);
		    });
	};

	// const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
			<CssBaseline />
			<Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" noValidate sx={{ width: '100%', mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					{/* ... rest of your form code ... */}
				</Box>
			</Card>
		</Container>
	);
}