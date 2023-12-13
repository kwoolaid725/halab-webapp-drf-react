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
import Admin from './Admin';
import AdminProductsList from "./components/Admin/Product/AdminProductsList";
import AdminPostsList from "./components/Admin/Post/AdminPostsList";
import CreatePost from './components/Admin/Post/PostCreate';
import DeletePost from './components/Admin/Post/PostDelete';
import EditPost from './components/Admin/Post/PostEdit';
import ProductCreate from './components/Admin/Product/ProductCreate';
import ProductDelete from './components/Admin/Product/ProductDelete';
import ProductEdit from './components/Admin/Product/ProductEdit';
import SampleCreate from './components/Admin/Sample/SampleCreate';
import SampleDelete from './components/Admin/Sample/SampleDelete';
import SampleEdit from './components/Admin/Sample/SampleEdit';
import AdminSamplesList from './components/Admin/Sample/AdminSamplesList';
import AdminTestsList from './components/Admin/Test/AdminTestsList';
import TestCreate from './components/Admin/Test/TestCreate';
import TestDelete from './components/Admin/Test/TestDelete';
import TestEdit from './components/Admin/Test/TestEdit';
import CollapsibleTable from "./components/Admin/Test/CR/TestDetail";
import CollapsibleTable_CR from "./components/Admin/Test/CR/CRCordlessTest";
import CRBareData from "./components/Admin/Test/CR/CRCordlessBareDataCreate";
import Table from "./components/Admin/Test/CR/Table";
import TestLists from "./components/Test/TestLists";

import TestDetailsTableRow from './components/Test/TestDetailsTableRow'
import TestDetailsTable from './components/Test/TestDetailsTable'
import TestDetails from './components/Test/TestDetails'


function Routes() {
	const element = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/admin', element: <Admin />},

		{ path: '/posts', element: <PostLists /> },
		{ path: '/post/:slug', element: <Single /> },
		{ path: '/admin/posts', element: <AdminPostsList /> },
		{ path: '/admin/posts/create', element: <CreatePost /> },
		{ path: '/admin/posts/delete/:id', element: <DeletePost /> },
		{ path: '/admin/posts/edit/:id', element: <EditPost /> },

		{ path: '/products', element: <ProductLists /> },
		{ path: '/products/:slug', element: <SingleProduct /> },
		{ path: '/admin/products', element: <AdminProductsList /> },
		{ path: '/admin/products/create', element: <ProductCreate /> },
		{ path: '/admin/products/delete/:id', element: <ProductDelete /> },
		{ path: '/admin/products/edit/:id', element: <ProductEdit /> },

		{ path: '/admin/samples', element: <AdminSamplesList /> },
		{ path: '/admin/samples/create', element: <SampleCreate /> },
		{ path: '/admin/samples/delete/:id', element: <SampleDelete /> },
		{ path: '/admin/samples/edit/:id', element: <SampleEdit /> },

		{ path: '/tests', element: <TestLists /> },

		{ path: '/admin/tests', element: <AdminTestsList /> },
		{ path: '/admin/tests/create', element: <TestCreate /> },
		{ path: '/admin/tests/delete/:id', element: <TestDelete /> },
		{ path: '/admin/tests/edit/:id', element: <TestEdit /> },
		{ path: '/admin/tests/testdetails', element: <CollapsibleTable /> },
		{ path: '/admin/tests/crcordless', element: <CollapsibleTable_CR /> },
		{ path: '/admin/tests/baredata', element: <CRBareData /> },
		{ path: '/admin/tests/test', element: <TestDetails /> },
		{ path: '/admin/tests/testtable', element: <TestDetailsTable /> },
		{ path: '/admin/tests/testrow', element: <TestDetailsTableRow /> },


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
				<Link to="/tests" style={{ padding: 5 }}>
					Tests
				</Link>
				<Link to="/admin" style={{ padding: 5 }}>
					BG Lab
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