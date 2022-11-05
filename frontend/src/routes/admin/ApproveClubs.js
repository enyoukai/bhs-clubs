import useApi, {methods} from '../../hooks/useApi';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';

export default function ApproveClubs()
{
	const {user, token} = useAuth();
	
	const getClubs = useApi('/admin/clubs', methods.GET, token);
	const patchClub = useApi('/admin/clubs', methods.PATCH, token);

	const [clubs, setClubs] = useState();

	useEffect(() => {getClubs.dispatch({populate: setClubs})}, []);

	async function approveClub(clubID)
	{
		patchClub.dispatch({body: {approved: true}, urlParam: `/${clubID}`});
		setClubs(prevClubs => prevClubs.filter(club => club.id !== clubID));
	}

	return (
		<div>
		<div>Peding Clubs...</div>
		{
			!getClubs.loading &&
			clubs.map(club => <Club key={club.id} club={club} approveClub={() => approveClub(club.id)}/>)
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