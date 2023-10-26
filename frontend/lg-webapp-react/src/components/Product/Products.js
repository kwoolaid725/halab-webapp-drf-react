import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Products = (props) => {
	const { products } = props;
	if (!products || products.length === 0) return <p>Cannot find any products, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{products.map((product) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={product.id} xs={12} md={4}>
								<Card sx={{ bgcolor: (theme) => theme.palette.grey[200] }}>
									<CardMedia
										component="img"
										height="140"
										image="https://source.unsplash.com/random"
										alt="random"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{product.brand.substr(0, 50)}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{product.model_name.substr(0, 60)}...
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Products;