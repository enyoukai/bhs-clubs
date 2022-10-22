import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth()
{
	return useContext(AuthContext);
}

export function AuthProvider(props)
{
	// useEffect(() => {
	// 	const unsubscribe = auth.onAuthStateChanged(auth) }, [])
	return (
		<AuthContext.Provider value={auth}>
			{props.children}
		</AuthContext.Provider>
	)

}