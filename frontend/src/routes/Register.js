import React, { useState } from 'react';
import API from '../api/API.js';

function Register(props)
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	function handleOnClick() {
		API.register(email, password);
	}
	return (
		<div>
			<div>Email</div>
			<input onChange={e => setEmail(e.target.value)}/>
			<div>Password</div>
			<input type='password' onChange={e => setPassword(e.target.value)}/>
			<div>Confirm Password</div>
			<input type='password' onChange={e => setConfirmPassword(e.target.value)}/>
			<button onClick={handleOnClick}>Register</button>
		</div>
	)
}

export default Register;