import React, { useEffect, useState } from 'react';
// import './App.css';
import AdminSamples from './AdminSamples';
import PostLoadingComponent from '../../Post/PostLoading';
import axiosInstance from '../../../axios';

function AdminSamplesList() {
	const PostLoading = PostLoadingComponent(AdminSamples);
	const [appState, setAppState] = useState({
		loading: true,
		samples: null,
	});

	const fetchSamples = async () => {
		try {
			const res = await axiosInstance.get('/samples/');
			const allSamples = res.data;
			setAppState({ loading: false, samples: allSamples });
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchSamples();
	}, []);

	return (
		<div className="App">
			<h1>Latest Samples</h1>
			<PostLoading isLoading={appState.loading} samples={appState.samples} />
		</div>
	);
}
export default AdminSamplesList;