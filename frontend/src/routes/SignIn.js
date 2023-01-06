import React, { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

import authCodeToError from 'utils/authErrors';
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
			setErrorMessage(authCodeToError(error.code));
		}
	}

	return (
		<div className="bg-neutral-800 w-1/3 mx-auto px-10 py-8 my-5 rounded-md">
			<div className="text-4xl text-center text-neutral-100 mb-7">Welcome Back</div>
			<form onSubmit={signIn} className="flex flex-col flex-start gap-5 text-center text-neutral-100">
				<input className="signin__input text-lg pl-4" placeholder="Email" onChange={e => {setEmail(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input text-lg pl-4" placeholder="Password" type='password' onChange={e => {setPassword(e.target.value); setErrorMessage('');}}/>
				{errorMessage && <div className="text-md text-left text-red-500">{errorMessage}</div>}
				<button type="submit" className="text-xl p-2 rounded-md text-neutral-800 bg-neutral-200 hover:bg-white" onClick={signIn}>Sign In</button>
			</form>
		</div>
	)
}

export default SignIn;