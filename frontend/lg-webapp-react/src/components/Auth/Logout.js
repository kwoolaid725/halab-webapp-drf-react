import React, { useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function SignOut() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		logout();
		navigate('/login');
	});
	return <div>Logout</div>;
}