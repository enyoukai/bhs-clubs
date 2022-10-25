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
		<div className="container">
			<div className="container__text container__text--big">Welcome Back</div>
			<div className="container__form">
				<input className="container__input" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
				<input className="container__input" placeholder="Password" type='password' onChange={e => setPassword(e.target.value)}/>
				<button className="container__btn container__btn--submit" onClick={signIn}>Sign In</button>
			</div>
		</div>
	)
}

export default SignIn;