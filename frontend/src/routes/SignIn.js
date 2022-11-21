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

	async function signIn(e)
	{	
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		}
		catch (error) {
			setErrorMessage(error.message);
		}
	}

	return (
		<div className="signin">
			<div className="signin__text signin__text--big">Welcome Back</div>
			<form onSubmit={signIn} className="signin__form">
				<div className="signin__error">{errorMessage}</div>
				<input className="signin__input" placeholder="Email" onChange={e => {setEmail(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input" placeholder="Password" type='password' onChange={e => {setPassword(e.target.value); setErrorMessage('');}}/>
				<button type="submit" className="signin__btn bg-neutral-200 hover:bg-white" onClick={signIn}>Sign In</button>
			</form>
		</div>
	)
}

export default SignIn;