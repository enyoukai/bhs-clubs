import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Loading from '../components/Loading';

export default function Account()
{
	const [accountLoading, setAccountLoading] = useState(true);

	const userID = useParams().id;
	const [user, setUser] = useState();

	useEffect(() => {
		axios.get(`/account/${userID}`).then(res => setUser(res.data)).then(()=>setAccountLoading(false));
	}, [userID])
	
	return (
		<div>
			{ accountLoading ? <Loading/> : <UserInfo user={user}/>}
		</div>
	)
}

function UserInfo(props)
{
	const clubs = props.user.clubs.map(club => <Club key={club.id} club={club}/>);

	return (
		<div>
			<div>Username: {props.user.username}</div>
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
			<Link className="text-green-500" to={`/modify/${props.club.id}`}>EDIT</Link>
		</div>
	)
}