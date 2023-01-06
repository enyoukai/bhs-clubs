import React, { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

import authCodeToError from 'utils/authErrors';

import useApi from '../hooks/useApi';

import './SignIn.scss';

function Register(props)
{
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const {auth} = useAuth();

	const {loading: registerLoading, error: registerError, dispatch: registerDispatch} = useApi('/account', 'post');

	const navigate = useNavigate();

	async function register(e) {
		e.preventDefault();
		
		try{
			if (confirmPassword !== password)
			{
				setErrorMessage("Confirm Password not equal to password");
				return;
			}
			
			const userCred = await createUserWithEmailAndPassword(auth, email, password);
			const token = await userCred.user.getIdToken();

			await registerDispatch({body: {username: username}, headers: {Authorization: `Bearer ${token}`}});

			navigate('/');
		}
		catch (error) {
			setErrorMessage(authCodeToError(error.code));
		}
	}

	return (
		<div className="bg-neutral-800 w-1/3 mx-auto px-10 py-8 my-5 rounded-md">
			<div className="text-4xl text-center text-neutral-100 mb-7">Hello New User</div>
			<form className="flex flex-col flex-start gap-5 text-center text-neutral-100" onSubmit={register}>
				<input className="signin__input text-lg pl-4" placeholder="Username" onChange={e => {setUsername(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input text-lg pl-4" placeholder="Email" onChange={e => {setEmail(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input text-lg pl-4" placeholder="Password" type='password' onChange={e => {setPassword(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input text-lg pl-4" placeholder="Confirm Password" type='password' onChange={e => {setConfirmPassword(e.target.value); setErrorMessage('');}}/>
				{errorMessage && <div className="text-md text-left text-red-500">{errorMessage}</div>}
				<button type="submit" className="text-xl p-2 rounded-md text-neutral-800 bg-neutral-200 hover:bg-white" onClick={register}>Sign Up</button>
			</form>
		</div>
	)
}

export default Register;