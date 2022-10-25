import { signOut } from "firebase/auth";
import { useAuth } from '../contexts/AuthContext';
import {
	useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

export default function SignOut()
{
    const { signOut } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        signOut().then(navigate("/"));
    }, []);

    return (
        <div>Signing you out...</div>
    )
}