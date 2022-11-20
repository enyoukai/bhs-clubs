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
	const [signInFetched, setSignInFetched] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async function(user) {
			setUser(user);

			if (user !== null)
			{
				const adminStatus = await axios.get(`/admin/adminCheck/${user.uid}`);
				setIsAdmin(adminStatus.data.isAdmin);
				setToken(await user.getIdToken());
			}
			else
			{
				setToken(null);
				setIsAdmin(false);
			}

			setSignInFetched(true);
		});
		return unsubscribe
	}, []);

	function signOut()
	{
		return auth.signOut();
	}

	const authValue = {auth, user, signInFetched, isAdmin, token, signOut};
	
	return (
		<AuthContext.Provider value={authValue}>
			{props.children}
		</AuthContext.Provider>
	)

}