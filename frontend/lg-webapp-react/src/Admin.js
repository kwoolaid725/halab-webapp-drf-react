import React, { useEffect, useState } from 'react';
import './App.css';

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
// import classes from "./App.module.css";

function Admin() {
    return(
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Paper>
					<Grid>
						<Link
							color="textPrimary"
							href={'/admin/posts/'}
							// className={classes.link}
						>
							Posts
						</Link>
					</Grid>
					<Grid>
						<Link
							color="textPrimary"
							href={'/admin/products/'}
							// className={classes.link}
						>
							Products
						</Link>
					</Grid>
					<Grid>
						<Link
							color="textPrimary"
							href={'/admin/samples/'}
							// className={classes.link}
						>
							Samples
						</Link>
					</Grid>
					<Grid>
						<Link
							color="textPrimary"
							href={'/admin/tests/'}
							// className={classes.link}
						>
							Tests
						</Link>
					</Grid>

                    {/* Add more links as needed */}
                </Paper>
            </Container>
        </React.Fragment>
    )
}
export default Admin;