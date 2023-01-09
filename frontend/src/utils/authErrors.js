export default function authCodeToError(code)
{
	const authErrors = {
		'auth/user-not-found' : 'User not found',
		'auth/invalid-email' : 'Invalid Email',
		'auth/wrong-password' : 'Incorrect Password',
		'auth/weak-password' : 'Password must be at least 6 characters long' // very settings dependent
	};

	return authErrors[code];
}