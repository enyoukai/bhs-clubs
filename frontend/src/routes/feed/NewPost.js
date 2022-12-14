import React, {useState, useEffect, useReducer} from 'react';
import {useNavigate} from 'react-router-dom';

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

	const navigate = useNavigate();

	const createPost = useApi('/feed', 'post', token);
	const getUser = useApi(`/account/${user.uid}`);
	
	function handleSubmit(e)
	{
		e.preventDefault();

		if (!title || !body || !selectClub) 
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
		}
	}, [getUser.loading]);
	
	useEffect(() => {
		if (!createPost.loading && !createPost.error)
		{
			navigate('/feed');
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
			<div className='p-5'>
				<h2 className='text-3xl text-center'>New Post</h2>
				{success && <div>{success}</div>}
				{error && <div>{error}</div>}
				<form onSubmit={handleSubmit} className='w-full'>
					<div className="text-xl mt-4">Title</div>
					<textarea className="resize-none border border-neutral-400 rounded-sm" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
					<div className="text-xl mt-4">Body</div>
					<textarea className="resize-none border border-neutral-400 rounded-sm" type="text" value={body} onChange={(e) => setBody(e.target.value)}/>
					<div className="text-xl mt-4">Club:</div>
					<select className="border border-neutral-400 rounded-sm" value={selectClub} onChange={(e) => setSelectClub(e.target.value)}>
						<option value="" disabled>Select Club</option>
						{clubs.map((club) => <option key={club.id} value={club.id}>{club.name}</option>)}
					</select>
					<div className="text-xl mt-4">Photo:</div>
					<input className="block" type="file" onChange={(e) => setFile(e.target.files[0])}/>
					{file && <img className="mt-4 w-96" alt="uploaded" src={URL.createObjectURL(file)}/>}
					<button className="text-xl border bg-neutral-900 text-neutral-100 px-20 py-4 rounded-xl mt-5 hover:bg-green-500" type="submit">Submit</button>
				</form>
			</div>
			}
		</>
	)
}