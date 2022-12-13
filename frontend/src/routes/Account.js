import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Loading from '../components/Loading';

export default function Account()
{
	const [accountLoading, setAccountLoading] = useState(true);
	const [account, setAccount] = useState();

	const userID = useParams().id;

	useEffect(() => {
		axios.get(`/account/${userID}`).then(res => setAccount(res.data)).then(()=>setAccountLoading(false));
	}, [userID])
	
	return (
		<div>
			{ accountLoading ? <Loading/> : <UserInfo user={account}/>}
		</div>
	)
}

function UserInfo(props)
{
	const memberClubs = [];
	const officerClubs = [];

	props.user.clubs.forEach(club => {
		if (club.officers.includes(props.user.id)) officerClubs.push(club);
		else if (club.members.includes(props.user.id)) memberClubs.push(club);
		else {
			console.error(`Something went wrong with club ${club.name}`);
			console.error(club);
		}
	});

	return (
		<div>
			<div>Username: {props.user.username}</div>
			<div>Created Account: {props.user.creationTime}</div>
			<div>Email: {props.user.email}</div>

			<div>Officer in:</div>
			<ul>{officerClubs.map(club => <Club key={club.id} club={club} officer={true}/>)}</ul>
			<div>Member in:</div>
			<ul>{memberClubs.map(club => <Club key={club.id} club={club} officer={false}/>)}</ul>
		</div>
	)
}

function Club(props) {
	return (
		<li>
			<div>{props.club.name}</div>
			{props.officer && <Link className="text-green-500" to={`/club/${props.club.id}/modify`}>EDIT</Link>}
		</li>
	)
}