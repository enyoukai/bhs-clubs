import React, { useState } from 'react';
import API from '../api/API.js';

function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleOnClick()
	{	
		API.login(email, password);
	}

	return (
		<div>
			<div>Email</div>
			<input onChange={e => setEmail(e.target.value)}/>
			<div>Password</div>
			<input type='password' onChange={e => setPassword(e.target.value)}/>
			<button onClick={handleOnClick}>Sign In</button>
		</div>
	)
}

export default SignIn;