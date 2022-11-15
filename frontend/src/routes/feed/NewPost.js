import React, {useState, useEffect, useReducer} from 'react';

import useApi from '../../hooks/useApi';
import {useAuth} from '../../contexts/AuthContext';
import formReducer from '../../reducers/FormReducer';

export default function NewPost()
{
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [selectClub, setSelectClub] = useState('');
	const [file, setFile] = useState();

	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const [userData, setUserData] = useState();
	const [clubs, setClubs] = useState();

	const [formState, formDispatch] = useReducer(formReducer, {title: "", body: "", club: null});

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

		const formData = new FormData();
		formData.append('title', title);
		formData.append('body', body);
		formData.append('club', selectClub);
		formData.append('file', file);
		createPost.dispatch({body: formData});
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

	function handleTextChange(e) {
		formDispatch({type: 'text', field: e.target.name, value: e.target.value});
	}

	function handleSelectChange(e) {
		formDispatch({type: 'text', field: e.target.name, value: e.target.value});

	}

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
					<label>
						Photo:
						<input type="file" onChange={(e) => setFile(e.target.files[0])}/>
					</label>
					<br/>
					{file && <img alt="uploaded" src={URL.createObjectURL(file)}/>}
					<br/>
					<button type="submit">Submit</button>
				</form>
			</div>
			}
		</>
	)
}