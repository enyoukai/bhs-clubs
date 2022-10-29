import { useAuth } from '../contexts/AuthContext';
import {
	Navigate,
  } from "react-router-dom";

import Loading from '../components/Loading';

export default function ProtectedRoute({children})
{
	const { user, signInFetched } = useAuth();

	if (!signInFetched) return <Loading/>;

	return user == null ? <Navigate to='/register'/> : children;

}