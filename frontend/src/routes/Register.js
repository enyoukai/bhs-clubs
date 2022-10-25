import React, { useState } from 'react';
import API from '../api/API';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

import './SignIn.css';

function Register(props)
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
		const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();

	async function register() {
		try{
			const user = await API.register(email, password);
			navigate('/');
		}
		catch (error) {
			console.log(error.code + ' ' + error.message);
		}
	}

	return (
		<div className="container">
			<div className="container__form">
				<div className="container__text container__text--big">Hello New User</div>
				<input className="container__input" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
				<input className="container__input" placeholder="Password" type='password' onChange={e => setPassword(e.target.value)}/>
				<input className="container__input" placeholder="Confirm Password" type='password' onChange={e => setConfirmPassword(e.target.value)}/>
				<button className="container__btn container__btn--submit" onClick={register}>Register</button>
			</div>
		</div>
	)
}

export default Register;