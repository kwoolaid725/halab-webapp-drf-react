import React, { useEffect, useState } from 'react';
// import './App.css';
import AdminProducts from './AdminProducts';
import PostLoadingComponent from '../../Post/PostLoading';
import axiosInstance from '../../../axios';

// function Admin() {
// 	const PostLoading = PostLoadingComponent(Posts);
// 	const [appState, setAppState] = useState({
// 		loading: true,
// 		posts: null,
// 	});
//
// 	const fetchPosts = async () => {
// 		try {
// 			const res = await axiosInstance.get('/posts/');
// 			const allPosts = res.data;
// 			setAppState({ loading: false, posts: allPosts });
// 			console.log(res.data);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};
//
// 	useEffect(() => {
// 		fetchPosts();
// 	}, []);

function AdminProductsList() {
	const PostLoading = PostLoadingComponent(AdminProducts);
	const [appState, setAppState] = useState({
		loading: true,
		products: null,
	});

	const fetchProducts = async () => {
		try {
			const res = await axiosInstance.get('/products/');
			const allProducts = res.data;
			setAppState({ loading: false, products: allProducts });
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="App">
			<h1>Latest Products</h1>
			<PostLoading isLoading={appState.loading} products={appState.products} />
		</div>
	);
}
export default AdminProductsList;