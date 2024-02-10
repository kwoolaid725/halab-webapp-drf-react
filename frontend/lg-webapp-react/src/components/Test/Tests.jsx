import React from 'react';
import classes from './Tests.module.css';

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


const convertToAMPM = (timestamp) => {

    const date = new Date(timestamp);

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    // Check if date is null before formatting
    const formattedTime = date ? date.toLocaleDateString('en-US', options) : null; // Return null if date is null
    return formattedTime;
};
const Tests = (props) => {
	const { tests } = props;

	if (!tests || tests.length === 0) return <p>Cannot find any tests, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="xl" component="main">
				<Paper>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Test Category</TableCell>
									<TableCell align="left">Product Category</TableCell>
									<TableCell align="left">Description</TableCell>
									<TableCell align="left">Status</TableCell>
									<TableCell align="left">Created Date</TableCell>
									<TableCell align="left">Due Date</TableCell>
									<TableCell align="left">Completion Date</TableCell>
									<TableCell align="left">Attachment</TableCell>
									<TableCell align="left">Remarks</TableCell>
									<TableCell align="left">Owner</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tests.map((test) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">
												{test.id}
											</TableCell>
											<TableCell align="left">{test.test_category}</TableCell>
											<TableCell align="left">{test.product_category}</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/test/' + test.id}
													className={classes.link}
												>
													{test.description}
												</Link>
											</TableCell>
											<TableCell align="left">{test.test_status}</TableCell>
											<TableCell align="left">{convertToAMPM(test.created_at.split('.')[0])}</TableCell>
											<TableCell align="left">{test.due_date}</TableCell>
											<TableCell align="left">{test.completion_date ? convertToAMPM(test.completion_date.split('.')[0]) : ''}</TableCell>
											<TableCell align="left">
												<a href={test.attachment} download>Download</a>
											</TableCell>
											<TableCell align="left">{test.remarks}</TableCell>
											<TableCell align="left">{test.owner}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default Tests;