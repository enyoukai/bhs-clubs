import API from '../api/API.js';
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Loading from '../components/Loading';

export default function Account()
{
	const userId = useParams().id;
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function getUser() {
			const user = await API.getUser(userId);
			setUser(user);
		}

		getUser();
	}, [userId])
	
	return (
		<div>
			{ user ? <UserInfo user={user}/> : <Loading/>}
		</div>
	)
}

function UserInfo(props)
{
	const clubs = props.user.clubs.map(club => <Club key={club.id} club={club}/>);
	return (
		<div>
			<div>Created Account: {props.user.creationTime}</div>
			<div>Email: {props.user.email}</div>

			<div>Clubs added:</div>
			<ul>{clubs}</ul>
		</div>
	)
}

function Club(props) {
	return (
		<div>
			<div>{props.club.name}</div>
			<Link to={`/modifyClub/${props.club.id}`}>EDIT</Link>
		</div>
	)
}