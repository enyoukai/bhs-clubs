import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

const AuthContext = React.createContext();

export function useAuth()
{
	return useContext(AuthContext);
}

export function AuthProvider(props)
{
	const [user, setUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [token, setToken] = useState();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async function(user) {
			if (user !== null)
			{
				const adminStatus = (await axios.get(`/account/${user.uid}`));

				setIsAdmin(adminStatus.data.isAdmin);
				const token = await user.getIdToken();

				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

				setToken(token);
			}
			else
			{
				axios.defaults.headers.common['Authorization'] = null;
				setToken(null);
				setIsAdmin(false);
			}

			setUser(user);
			setAuthLoading(false);
		});
		return unsubscribe
	}, []);

	function signOut()
	{
		return auth.signOut();
	}

	const authValue = {auth, user, authLoading, token, isAdmin, signOut};
	
	return (
		<AuthContext.Provider value={authValue}>
			{props.children}
		</AuthContext.Provider>
	)

}