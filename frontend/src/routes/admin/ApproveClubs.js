import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';

export default function ApproveClubs()
{
	const [clubs, setClubs] = useState([]);
	const {user} = useAuth();
	
	useEffect(() => {
		async function fetchClubs()
		{
			const res = await axios.get('/admin/clubs', {headers: {authorization: `Bearer ${await user.getIdToken()}`}});
			setClubs(res.data);
		}
		
		fetchClubs();
	}, []);
	console.log(clubs);
	async function approveClub(ID)
	{
		await axios.patch(`/admin/clubs/${ID}`, {approved: true}, {headers: {authorization: `Bearer ${await user.getIdToken()}`}});
	}

	return (
		<div>
		<div>Peding Clubs...</div>
		{
			clubs.map(club => <Club key={club.id} club={club} approveClub={() => approveClub(club.id)}/>)
		}
		</div>
	)
}

function Club(props)
{
	return (
		<div>
			<div>{props.club.name}</div>
			<div>{props.club.id}</div>
			<button onClick={props.approveClub}>Approve Club</button>

		</div>
	)
}