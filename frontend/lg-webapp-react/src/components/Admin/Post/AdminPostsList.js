import React, { useEffect, useState } from 'react';
// import './App.css';
import AdminPosts from './AdminPosts';
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

function AdminPostsList() {
	const PostLoading = PostLoadingComponent(AdminPosts);
	const [appState, setAppState] = useState({
		loading: true,
		products: null,
	});

	const fetchPosts = async () => {
		try {
			const res = await axiosInstance.get('/posts/');
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className="App">
			<h1>Latest Posts</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default AdminPostsList;