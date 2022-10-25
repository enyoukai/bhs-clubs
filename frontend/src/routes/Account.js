import API from '../api/API.js';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';


export default function Account(props)
{
	const userId = useParams().id;
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function getUser() {
			setUser(await API.getUser(userId));
		}

		getUser();
	}, [])
	
	return (
		<>
			{ user ? <UserInfo user={user}/> : <Loading/>
			}
		</>
	)
}

function UserInfo(props)
{
	const clubs = props.user.clubs.map(club => <li>{club.name}</li>);
	return (
		<div>
			<div>Created Account: {props.user.creationTime}</div>
			<div>Email: {props.user.email}</div>

			<div>Clubs added:</div>
			<ul>{clubs}</ul>
		</div>
	)

}

function Loading()
{
	return (
		<div>
			Fetching from server...
		</div>
	)
}