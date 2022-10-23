import { useAuth } from '../contexts/AuthContext';
import {
	Navigate,
  } from "react-router-dom";
  
export default function ProtectedRoute({children})
{
	const { user } = useAuth();

	if (user == null) 
	{
		return <Navigate to='/register'/>
	}

	return children;

}