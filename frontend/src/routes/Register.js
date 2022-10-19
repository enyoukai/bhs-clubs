import React, { useState } from 'react';
import API from '../api/API';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

function Register(props)
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
		const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();

	async function register() {
		try{
			const user = await API.register(email, password);
			auth.currentUser.getIdToken().then(token => localStorage.setItem('authorization', token));
			navigate('/');
		}
		catch (error) {
			console.log(error.code + ' ' + error.message);
		}
	}

	return (
		<div>
			<div>Email</div>
			<input onChange={e => setEmail(e.target.value)}/>
			<div>Password</div>
			<input type='password' onChange={e => setPassword(e.target.value)}/>
			<div>Confirm Password</div>
			<input type='password' onChange={e => setConfirmPassword(e.target.value)}/>
			<button onClick={register}>Register</button>
		</div>
	)
}

export default Register;