import React, { useState } from 'react';
import API from '../api/API.js';

import { useNavigate } from "react-router-dom";

import './SignIn.css';

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
		<div className="signin">
			<div className="signin__text signin__text--big">Welcome Back</div>
			<div className="signin__form">
				<input className="signin__input" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
				<input className="signin__input" placeholder="Password" type='password' onChange={e => setPassword(e.target.value)}/>
				<button className="signin__btn signin__btn--submit" onClick={signIn}>Sign In</button>
			</div>
		</div>
	)
}

export default SignIn;