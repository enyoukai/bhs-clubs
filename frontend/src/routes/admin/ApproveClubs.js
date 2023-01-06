import useApi, {methods} from 'hooks/useApi';
import React, {useState, useEffect} from 'react';
import {useAuth} from 'contexts/AuthContext';

import {arrayToDates} from 'utils/dateUtils';
import axios from 'axios';

export default function ApproveClubs()
{
	const {token} = useAuth();
	
	const patchClub = useApi('/admin/clubs', methods.PATCH, token);

	const [clubs, setClubs] = useState();
	const [clubsLoading, setClubsLoading] = useState(true);

	useEffect(() => {
		async function fetch ()
		{
			const allClubs = (await axios.get('/admin/clubs')).data;
			setClubs(allClubs.filter(club => club.approved === false));
			setClubsLoading(false);
		}
		fetch();
	}, []);

	console.log(clubs);

	async function approveClub(clubID)
	{
		patchClub.dispatch({body: {approved: true}, params: `/${clubID}`});
		setClubs(prevClubs => prevClubs.filter(club => club.id !== clubID));
	}

	return (
		<div>
			<div>Pending Clubs...</div>
			{
				!clubsLoading &&
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
			<img width={"300rem"} src={"/images/" + props.club.verification}/>
			<button className="text-green-500" onClick={props.approveClub}>Approve Club</button>
		</div>
	)
}