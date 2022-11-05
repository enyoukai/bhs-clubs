import React, { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

import './SignIn.scss';

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const {auth} = useAuth();

	const navigate = useNavigate();

	async function signIn()
	{	
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		}
		catch (error) {
			console.log(error.message);
			setErrorMessage(error.message);
		}
	}

	return (
		<div className="signin">
			<div className="signin__text signin__text--big">Welcome Back</div>
			<div className="signin__form">
				<div className="signin__error">{errorMessage}</div>
				<input className="signin__input" placeholder="Email" onChange={e => {setEmail(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input" placeholder="Password" type='password' onChange={e => {setPassword(e.target.value); setErrorMessage('');}}/>
				<button className="signin__btn signin__btn--submit" onClick={signIn}>Sign In</button>
			</div>
		</div>
	)
}

export default SignIn;