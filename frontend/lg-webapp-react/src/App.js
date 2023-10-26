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
import ProductLists from './components/Product/ProductLists'
import Header from './components/Header';
import Footer from './components/Footer'
import Register from './components/Login/register';

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

function PostLists() {
  const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
      loading: false,
      posts: null,
    });

    useEffect(() => {
      setAppState({ loading: true });
      const apiUrl = `http://127.0.0.1:8000/api/posts/`;
      fetch(apiUrl)
        .then((data) => data.json())
        .then((posts) => {
          setAppState({ loading: false, posts: posts });
        });
    }, [setAppState]);
    return (
		<div className="App">
			<h1>Latest Posts</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}


function Routes() {
	const element = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/posts',
			element: <PostLists />,
		  // children: [
			// 	{ index: true, element: <PostLists /> },
			// 	{ path: ':slug', element: <Post /> }
			// ],
		},
		{ path: '/products', element: <ProductLists /> },
		{ path: '/register', element: <Register /> },
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
			</nav>
			<Routes/>
		</Router>
	);



}

export default App;