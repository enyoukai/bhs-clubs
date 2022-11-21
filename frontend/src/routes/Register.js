import React, { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

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
			setErrorMessage(error.message);
		}
	}

	return (
		<div className="signin">
			<form className="signin__form" onSubmit={register}>
				<div className="signin__text signin__text--big">Hello New User</div>
				<div className="signin__error">{errorMessage}</div>
				<input className="signin__input" placeholder="Username" onChange={e => {setUsername(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input" placeholder="Email" onChange={e => {setEmail(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input" placeholder="Password" type='password' onChange={e => {setPassword(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input" placeholder="Confirm Password" type='password' onChange={e => {setConfirmPassword(e.target.value); setErrorMessage('');}}/>
				<button type="submit" className="signin__btn bg-neutral-200 hover:bg-white" onClick={register}>Register</button>
			</form>
		</div>
	)
}

export default Register;