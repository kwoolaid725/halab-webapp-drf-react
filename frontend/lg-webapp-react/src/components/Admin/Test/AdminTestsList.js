import React, { useEffect, useState } from 'react';
// import './App.css';
import AdminTests from './AdminTests';
import PostLoadingComponent from '../../Post/PostLoading';
import axiosInstance from '../../../axios';

function AdminTestsList() {
	const PostLoading = PostLoadingComponent(AdminTests);
	const [appState, setAppState] = useState({
		loading: true,
		tests: null,
	});

	const fetchTests = async () => {
		try {
			const res = await axiosInstance.get('/tests/');
			const allTests = res.data;
			setAppState({ loading: false, tests: allTests });
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchTests();
	}, []);

	return (
		<div className="App">
			<h1>Latest Tests</h1>
			<PostLoading isLoading={appState.loading} tests={appState.tests} />
		</div>
	);
}
export default AdminTestsList;