import { useAuth } from '../../contexts/AuthContext';
import {
	Navigate,
  } from "react-router-dom";

import Loading from '../../components/Loading';

export default function AdminRoute({children})
{
	const { user, signInFetched, isAdmin } = useAuth();

	if (!signInFetched) return <Loading/>;
	return user !== null && isAdmin ? children : <Navigate to='/'/>;

}