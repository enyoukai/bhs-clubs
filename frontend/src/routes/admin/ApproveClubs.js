import useApi, {methods} from '../../hooks/useApi';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';

export default function ApproveClubs()
{
	const {user, token} = useAuth();
	
	const [data, loading] = useApi('/admin/clubs', 'get', token);
	// console.log(loading);

	async function approveClub(ID)
	{
		// await axios.patch(`/admin/clubs/${ID}`, {approved: true}, {headers: {authorization: `Bearer ${await user.getIdToken()}`}});
	}

	return (
		<div>
		<div>Peding Clubs...</div>
		{
			!loading &&
			data.map(club => <Club key={club.id} club={club} approveClub={() => approveClub(club.id)}/>)
		}
		</div>
	)
}

function Club(props)
{
	return (
		<div>
			<div>{props.club.id}</div>
			<div>{props.club.name}</div>
			<div>{props.club.description}</div>
			<div>{props.club.location}</div>
			<div>{props.club.date}</div>
			<div>{props.club.time}</div>
			<div>{props.club.advisor}</div>
			<div>{props.club.uid}</div>
			<button onClick={props.approveClub}>Approve Club</button>
		</div>
	)
}