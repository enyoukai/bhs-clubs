import useApi, {methods} from '../../hooks/useApi';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';

export default function ApproveClubs()
{
	const [clubs, setClubs] = useState([]);
	const {user} = useAuth();
	
	const {data, loading} = useApi('/admin/clubs');
	console.log(data);
	useEffect(() => {
		async function fetchClubs()
		{
			// const res = await axios.get('/admin/clubs', {headers: {authorization: `Bearer ${await user.getIdToken()}`}});
			// setClubs(res.data);
		}
		
		fetchClubs();
	}, [user]);
	console.log(clubs);
	async function approveClub(ID)
	{
		// await axios.patch(`/admin/clubs/${ID}`, {approved: true}, {headers: {authorization: `Bearer ${await user.getIdToken()}`}});
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