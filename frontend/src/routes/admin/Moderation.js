import useApi from '../../hooks/useApi';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';

export default function Moderation()
{
	const {token} = useAuth();

	const {loading: clubsLoading, error: clubsError, dispatch: clubDispatch} = useApi('/clubs');
	const {loading: deleteLoading, error: deleteError, dispatch: deleteDispatch} = useApi('/clubs', 'delete', token);

	const [clubs, setClubs] = useState();
	const [error, setError] = useState('');

	useEffect(() =>
	{
		clubDispatch({populate: setClubs});
	}, []);

	async function deleteClub(id)
	{
		await deleteDispatch({params: `/${id}`});

		if (!deleteError)
		{
			setError('');
			setClubs((prevClubs) => prevClubs.filter(club => club.id !== id));
		}
		else
		{
			setError("Something went wrong!");			
		}
	}

	return (
		<div>
			{error && <div>{error}</div>}
			{!clubsLoading && clubs.map((club) => <Club key={club.id} deleteClub={deleteClub} club={club}/>)}
		</div>
	)
}

function Club(props)
{
	const club = props.club;
	return (
		<div>
			<div>{club.name}</div>
			<button className="text-red-500" onClick={() => props.deleteClub(club.id)}>Delete Club</button>
		</div>
	)
}