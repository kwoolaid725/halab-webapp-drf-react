import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import classes from './Tests.module.css';
import TestContext from '../../context/TestContext'
import Button from '@mui/material/Button';
export default function Tests( test ) {
	const testCtx = useContext(TestContext);

	function handleAddToTest() {
		testCtx.addItem(test);
	}

	// const { tests } = props;
	// if (!tests || tests.length === 0) return <p>Cannot find any tests, sorry</p>;
	// // return (
	// // 	<React.Fragment>
	// 		<Container maxWidth="md" component="main">
	// 			<Grid container spacing={5} alignItems="flex-end">
	// 				{tests.map((test) => {
	// 					return (
	// 						// Enterprise card is full width at sm breakpoint
	// 						<Grid item key={tests.id} xs={12} md={4}>
	// 							<Card className={classes.card}>
	// 								<Link
	// 									color="textPrimary"
	// 									href={`/tests/${tests.id}`}
	// 									className={classes.link}
	// 								>
	// 								</Link>
	// 								<CardContent classeName={classes.cardContent}>
	// 									<Typography
	// 										gutterBottom
	// 										variant="h5"
	// 										component="div"
	// 										className={classes.testTitle}
	// 									>
	// 										{test.test_category.substr(0, 50)}
	// 									</Typography>
	// 									<Typography
	// 										variant="body2"
	// 										color="text.secondary"
	// 										className={classes.productText}
	// 									>
	// 										{test.description.substr(0, 60)}
	// 									</Typography>
	// 								</CardContent>
	// 							</Card>
	// 						</Grid>
	// 					);
	// 				})}
	// 			</Grid>
	// 		</Container>
	// 	</React.Fragment>
	// );
	return (
		<li className="test-item">
      <article>
        <div>
          <h3>{test.id}</h3>
          <p className="test-item-price">
            {test.test_category}
          </p>
          <p className="test-item-description">{test.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddToTest}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};
// export default Tests;

