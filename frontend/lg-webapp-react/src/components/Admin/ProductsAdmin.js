import React from 'react';
import classes from './AdminPosts.module.css';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

const Products = (props) => {
	const { products } = props;

	if (!products || products.length === 0) return <p>Cannot find any products, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Category</TableCell>
									<TableCell align="left">Brand</TableCell>
									<TableCell align="left">Model Name</TableCell>
									<TableCell align="left">Release Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{products.map((product) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">
												{product.id}
											</TableCell>
											<TableCell align="left">{product.category}</TableCell>
                      <TableCell align="left">{product.brand}</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/product/' + product.slug}
													className={classes.link}
												>
													{product.model_name}
												</Link>
											</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/admin/products/edit/' + product.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/admin/products/delete/' + product.id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={4} align="right">
										<Button
											href={'/admin/products/create'}
											variant="contained"
											color="primary"
										>
											Add New Product
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default Products;