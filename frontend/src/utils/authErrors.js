export default function authCodeToError(code) {
	const authErrors = {
		'auth/user-not-found': 'User not found',
		'auth/invalid-email': 'Invalid Email',
		'auth/wrong-password': 'Incorrect Password',
		'auth/weak-password': 'Password must be at least 6 characters long', // very settings dependent
		'auth/too-many-requests': 'Rate limited. Please try again in a bit.',
		'auth/email-already-in-use': 'That email is already being used'

	};

	return code in authErrors ? authErrors[code] : 'Something went wrong. Check developer console for more information.';
}