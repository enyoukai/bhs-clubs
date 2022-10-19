import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export default function AuthProvider(props)
{
	return (
		<AuthContext.Provider value=''>
			{props.children}
		</AuthContext.Provider>
	)

}