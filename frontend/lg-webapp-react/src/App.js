import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  useRoutes,
  Link,
  Outlet,
  useParams } from 'react-router-dom';

import Home from './components/Home/Home';
import PostLoadingComponent from './components/PostLoading';
import Posts from './components/Posts';
import PostLists from './components/PostLists';

import ProductLists from './components/Product/ProductLists'
import Register from './components/Login/register';
import Login from './components/Login/login';
import Logout from './components/Login/logout';
import Single from './components/Single';

// const BlogPosts = {
//   'first-blog-post': {
//     title: 'First Blog Post',
//     description: 'Lorem ipsum dolor sit amet, consectetur adip.'
//   },
//   'second-blog-post': {
//     title: 'Second Blog Post',
//     description: 'Hello React Router v6'
//   }
// };

// function Posts() {
//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Post</h2>
//       <Outlet />
//     </div>
//   );
// }

//
// function PostLists() {
//   return (
//     <ul>
//       {Object.entries(BlogPosts).map(([slug, { title }]) => (
//         <li key={slug}>
//           <Link to={`/posts/${slug}`}>
//             <h3>{title}</h3>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function Post() {
//   const { slug } = useParams();
//   const post = BlogPosts[slug];
//   if(!post) {
//     return <span>The blog post you've requested doesn't exist.</span>;
//   }
//   const { title, description } = post;
//   return (
//     <div style={{ padding: 20 }}>
//       <h3>{title}</h3>
//       <p>{description}</p>
//     </div>
//   );
// }
//


function Routes() {
	const element = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/posts', element: <PostLists /> },
		// 	children: [
		// 		{ path: ':slug', element: <Single /> },
		// 	],
		// },
		{ path: '/post/:slug', element: <Single /> },

		{ path: '/products', element: <ProductLists /> },
		{ path: '/register', element: <Register /> },
		{ path: '/login', element: <Login /> },
		{ path: '/logout', element: <Logout /> },
		// { path: '/post/:slug', element: <Single /> },
	]);
	return element;
}


function App() {
	return (
		<Router>
			<nav style={{ margin: 10 }}>
				<Link to="/" style={{ padding: 5 }}>
					Home
				</Link>
				<Link to="/posts" style={{ padding: 5 }}>
					Posts
				</Link>
				<Link to="/products" style={{ padding: 5 }}>
					Products
				</Link>
				<Link to="/register" style={{ padding: 5 }}>
					Register
				</Link>
				<Link to="/login" style={{ padding: 5 }}>
					Login
				</Link>
				<Link to="/logout" style={{ padding: 5 }}>
					Logout
				</Link>
			</nav>
			<Routes/>
		</Router>
	);



}

export default App;