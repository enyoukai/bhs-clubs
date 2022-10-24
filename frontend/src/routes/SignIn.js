import React, { useState } from 'react';
import API from '../api/API.js';

import { useNavigate } from "react-router-dom";

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	async function signIn()
	{	
		const user = await API.login(email, password);
		navigate('/');
	}

	return (
		<div>
			<div>Email</div>
			<input onChange={e => setEmail(e.target.value)}/>
			<div>Password</div>
			<input type='password' onChange={e => setPassword(e.target.value)}/>
			<button onClick={signIn}>Sign In</button>
		</div>
	)
}

export default SignIn;