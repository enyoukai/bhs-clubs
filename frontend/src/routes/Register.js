import React, { useState } from 'react';
import API from '../api/API';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase'

function Register(props)
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	async function register() {
		try{
			const user = await createUserWithEmailAndPassword(auth, email, password);
			console.log(user);
		}
		catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div>
			<div>Email</div>
			<input onChange={e => setEmail(e.target.value)}/>
			<div>Password</div>
			<input type='password' onChange={e => setPassword(e.target.value)}/>
			<div>Confirm Password</div>
			<input type='password' onChange={e => setConfirmPassword(e.target.value)}/>
			<button onClick={register}>Register</button>
		</div>
	)
}

export default Register;