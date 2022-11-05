import React, {useState, useEffect} from 'react';

import useApi from '../../hooks/useApi';
import {useAuth} from '../../contexts/AuthContext';

export default function NewPost()
{
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [selectClub, setSelectClub] = useState('');

	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const [userData, setUserData] = useState();
	const [clubs, setClubs] = useState();

	const {user, token} = useAuth();

	const createPost = useApi('/feed', 'post', token);
	const getUser = useApi(`/account/${user.uid}`);
	
	function handleSubmit(e)
	{
		e.preventDefault();

		if (title === '' || body === '') 
		{
			setError("Fields cannot be blank");
			return;
		}

		createPost.dispatch({body: {title: title, body: body, club: selectClub}});
	}

	useEffect(() => {
		getUser.dispatch({populate: setUserData});
	}, []);

	useEffect(() => {
		if (!getUser.loading)
		{
			setClubs(userData.clubs);
			userData.clubs.length > 0 ? setSelectClub(userData.clubs[0].id) : setSelectClub('');
		}
	}, [getUser.loading]);
	
	useEffect(() => {
		if (!createPost.loading && !createPost.error)
		{
			setSuccess("Post successfully added!");
			setTitle('');
			setBody('');
		}

	}, [createPost.loading]);

	return (
		<>
			{clubs !== undefined &&
			<div>
				<h2>New Post</h2>
				{success && <div>{success}</div>}
				{error && <div>{error}</div>}
				<form onSubmit={handleSubmit}>
					<label>
						Title:
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
					</label>
					<br/>
					<label>
						Body:
						<textarea type="text" value={body} onChange={(e) => setBody(e.target.value)}/>
					</label>
					<br/>
					<label>Club:</label>
					<select value={selectClub} onChange={(e) => setSelectClub(e.target.value)}>
						{clubs.map((club) => <option key={club.id} value={club.id}>{club.name}</option>)}
					</select>
					<br/>
					<button type="submit">Submit</button>
				</form>
			</div>
			}
		</>
	)
}