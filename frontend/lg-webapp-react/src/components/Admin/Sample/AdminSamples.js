import React from 'react';
import classes from './AdminSamples.module.css';

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

const AdminSamples = (props) => {
	const { samples } = props;

	if (!samples || samples.length === 0) return <p>Cannot find any samples, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Product</TableCell>
									<TableCell align="left">Inventory Number</TableCell>
									<TableCell align="left">Serial Number</TableCell>
									<TableCell align="left">Remarks</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{samples.map((sample) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">
												{sample.id}
											</TableCell>
                      						<TableCell align="left">{sample.product}</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/sample/' + sample.inv_no}
													className={classes.link}
												>
													{sample.inv_no}
												</Link>
											</TableCell>
											<TableCell align="left">{sample.serial_no}</TableCell>
											<TableCell align="left">{sample.remarks}</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/admin/samples/edit/' + sample.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/admin/samples/delete/' + sample.id}
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
											Add New Sample
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
export default AdminSamples;