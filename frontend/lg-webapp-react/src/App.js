import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  useRoutes,
  Link,
  Outlet,
  useParams } from 'react-router-dom';

import Home from './components/Home/Home';
import PostLists from './components/Post/PostLists';

import ProductLists from './components/Product/ProductLists'
import SingleProduct from './components/Product/SingleProduct'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Single from './components/Post/Single';
import AdminPosts from './components/Admin/AdminPosts';
import CreatePost from './components/Admin/CreatePost';
import DeletePost from './components/Admin/DeletePost';
import EditPost from './components/Admin/EditPost';
import ProductCreate from './components/Admin/ProductCreate';
import ProductDelete from './components/Admin/ProductDelete';
import ProductEdit from './components/Admin/ProductEdit';

import Admin from './Admin';



// import SearchBar from "material-ui-search-bar";
import { useNavigate } from 'react-router-dom';

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
		{ path: '/admin', element: <Admin /> },
		{ path: '/admin/posts/create', element: <CreatePost /> },
		{ path: '/admin/posts/delete/:id', element: <DeletePost /> },
		{ path: '/admin/posts/edit/:id', element: <EditPost /> },

		{ path: '/products', element: <ProductLists /> },
		{ path: '/products/:slug', element: <SingleProduct /> },
		{ path: '/admin/products/create', element: <ProductCreate /> },
		{ path: '/admin/products/delete/:id', element: <ProductDelete /> },
		{ path: '/admin/products/edit/:id', element: <ProductEdit /> },

		{ path: '/register', element: <Register /> },
		{ path: '/login', element: <Login /> },
		{ path: '/logout', element: <Logout /> },
		// { path: '/post/:slug', element: <Single /> },
	]);
	return element;
}
// function Navigation() {
// 	const navigate = useNavigate();
// 	const [data, setData] = useState({ search: '' });
//
// 	const goSearch = (search) => {
// 		navigate('/search/' + search);
// 		window.location.reload();
// 	};
// 	return (
// 			<SearchBar
// 					value={data.search}
// 					onChange={(newValue) => setData({ search: newValue })}
// 					onRequestSearch={() => goSearch(data.search)}
// 					/>
// 	);
// }

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

				{/*<Navigation/>*/}
			</nav>
			<Routes/>
		</Router>
	);



}

export default App;