import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Posts = (props) => {
	const { posts } = props;
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{posts.map((post) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={12} md={4}>
								<Card sx={{ bgcolor: (theme) => theme.palette.grey[200] }}>
									<Link
										color="textPrimary"
										href={'post/'+ post.slug}
										sx={{ padding: (theme) => theme.spacing(1, 0, 1.5) }}
									>
										<CardMedia
											component="img"
											height="140"
											image="https://source.unsplash.com/random"
											alt="random"
										/>
									</Link>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{post.title.substr(0, 50)}...
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{post.excerpt.substr(0, 60)}...
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
export default Posts;