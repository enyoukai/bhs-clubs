import React, { useState } from 'react';
import API from '../api/API';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

import './SignIn.scss';

function Register(props)
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	async function register() {
		try{
			if (confirmPassword != password)
			{
				setErrorMessage("Confirm Password not equal to password");
				return;

			}
			await API.register(email, password);
			navigate('/');
		}
		catch (error) {
			setErrorMessage(error.message);
		}
	}

	return (
		<div className="signin">
			<div className="signin__form">
				<div className="signin__text signin__text--big">Hello New User</div>
				<div className="signin__error">{errorMessage}</div>
				<input className="signin__input" placeholder="Email" onChange={e => {setEmail(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input" placeholder="Password" type='password' onChange={e => {setPassword(e.target.value); setErrorMessage('');}}/>
				<input className="signin__input" placeholder="Confirm Password" type='password' onChange={e => {setConfirmPassword(e.target.value); setErrorMessage('');}}/>
				<button className="signin__btn signin__btn--submit" onClick={register}>Register</button>
			</div>
		</div>
	)
}

export default Register;