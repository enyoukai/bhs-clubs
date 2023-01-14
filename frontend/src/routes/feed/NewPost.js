import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import useApi from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';
import formReducer from '../../reducers/FormReducer';

import DropZone from 'components/DropZone';

export default function NewPost() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [selectClub, setSelectClub] = useState('');
	const [file, setFile] = useState();

	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const [userData, setUserData] = useState();
	const [clubs, setClubs] = useState();

	const [formState, formDispatch] = useReducer(formReducer, { title: "", body: "", club: null });

	const { user, token } = useAuth();

	const navigate = useNavigate();

	const createPost = useApi('/feed', 'post', token);
	const getUser = useApi(`/account/${user.uid}`);

	function handleSubmit(e) {
		e.preventDefault();

		if (!title || !body || !selectClub) {
			setError("Fields cannot be blank");
			return;
		}

		const formData = new FormData();
		formData.append('title', title);
		formData.append('body', body);
		formData.append('club', selectClub);
		formData.append('file', file);
		createPost.dispatch({ body: formData });
	}

	useEffect(() => {
		getUser.dispatch({ populate: setUserData });
	}, []);

	useEffect(() => {
		if (!getUser.loading) {
			setClubs(userData.clubs);
		}
	}, [getUser.loading]);

	useEffect(() => {
		if (!createPost.loading && !createPost.error) {
			navigate('/feed');
		}

	}, [createPost.loading]);

	function handleTextChange(e) {
		formDispatch({ type: 'text', field: e.target.name, value: e.target.value });
	}

	function handleSelectChange(e) {
		formDispatch({ type: 'text', field: e.target.name, value: e.target.value });
	}

	return (
		<>
			{clubs !== undefined &&
				<div className='p-5 py-10'>
					<h2 className='text-4xl font-semibold text-center'>New Post</h2>
					{success && <div>{success}</div>}
					{error && <div>{error}</div>}
					<form onSubmit={handleSubmit} className='w-full px-20'>
						<div className="text-2xl mb-4 mt-8">Title</div>
						<textarea className="p-2 resize-none border border-neutral-400 rounded-sm w-full" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
						<div className="text-2xl mb-4 mt-8">Body</div>
						<textarea className="p-2 resize-none border border-neutral-400 rounded-sm w-full h-40" type="text" value={body} onChange={(e) => setBody(e.target.value)} />
						<div className="text-2xl mb-4 mt-8">Club:</div>
						<select className="px-4 py-2 border border-neutral-400 rounded-md" value={selectClub} onChange={(e) => setSelectClub(e.target.value)}>
							<option value="" disabled>Select Club</option>
							{clubs.map((club) => <option key={club.id} value={club.id}>{club.name}</option>)}
						</select>
						<div className="text-2xl mb-4 mt-8">Photo:</div>
						{/* <input className="block" type="file" onChange={(e) => setFile(e.target.files[0])}/> */}
						<DropZone currentImg={file} onDrop={(files) => setFile(files[0])} width='200rem'/>
						{/* {file && <img className="mt-4 w-96" alt="uploaded" src={URL.createObjectURL(file)}/>} */}
						<button className="block mx-auto text-xl border bg-neutral-900 text-neutral-100 px-20 py-4 rounded-xl mt-10 hover:bg-green-500" type="submit">Submit</button>
					</form>
				</div>
			}
		</>
	)
}