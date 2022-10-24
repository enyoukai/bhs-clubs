import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth()
{
	return useContext(AuthContext);
}

export function AuthProvider(props)
{
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => setUser(user));
		return unsubscribe
	}, [])

	const authValue = {auth, user};

	return (
		<AuthContext.Provider value={authValue}>
			{props.children}
		</AuthContext.Provider>
	)

}