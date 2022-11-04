import useApi, {methods} from '../../hooks/useApi';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';

export default function ApproveClubs()
{
	const {user, token} = useAuth();
	
	const getClubs = useApi('/admin/clubs', 'get', token);
	// const patchClubs = useApi('')

	useEffect(() => getClubs.invoke, []);

	async function approveClub(ID)
	{
		// await axios.patch(`/admin/clubs/${ID}`, {approved: true}, {headers: {authorization: `Bearer ${await user.getIdToken()}`}});
		// useApi(`/admin/clubs/${ID}`, 'patch', token, {approved: true});
	}

	return (
		<div>
		<div>Peding Clubs...</div>
		{
			!getClubs.loading &&
			getClubs.data.map(club => <Club key={club.id} club={club} approveClub={() => approveClub(club.id)}/>)
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