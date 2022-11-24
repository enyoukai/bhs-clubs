import useApi, {methods} from 'hooks/useApi';
import React, {useState, useEffect} from 'react';
import {useAuth} from 'contexts/AuthContext';

import {arrayToDates} from 'utils/dateUtils';

export default function ApproveClubs()
{
	const {token} = useAuth();
	
	const getClubs = useApi('/admin/clubs', methods.GET, token);
	const patchClub = useApi('/admin/clubs', methods.PATCH, token);

	const [clubs, setClubs] = useState();

	useEffect(() => {getClubs.dispatch({populate: setClubs})}, []);

	async function approveClub(clubID)
	{
		patchClub.dispatch({body: {approved: true}, params: `/${clubID}`});
		setClubs(prevClubs => prevClubs.filter(club => club.id !== clubID));
	}

	return (
		<div>
		<div>Pending Clubs...</div>
		{
			!getClubs.loading &&
			(clubs.length > 0 ? clubs.map(club => <Club key={club.id} club={club} approveClub={() => approveClub(club.id)}/>) : <div>Nothing to show</div>)
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
			<div>{arrayToDates(props.club.dates).join(', ')}</div>
			<div>{props.club.time}</div>
			<div>{props.club.advisor}</div>
			<div>{props.club.uid}</div>
			<img width={"300rem"} src={'/images/' + props.club.verification}/>
			<button className="text-green-500" onClick={props.approveClub}>Approve Club</button>
		</div>
	)
}