import useApi from '../hooks/useApi';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuth } from '../contexts/AuthContext'

import './NewClub.scss';

export default function NewClub() {
	// TODO: make a reducer later
	const [formState, setFormState] = useState({name: '', description: '', location: '', date: '', time: '', advisor: ''});
	const [file, setFile] = useState();

	const [error, setError] = useState('');

	const {token} = useAuth();

	const createClub = useApi('/clubs', 'post', token);

	const navigate = useNavigate();

	async function submitClub() {
		let errorFields = [];

		for (const [key, value] of Object.entries(formState))
		{
			if (value == '') errorFields.push(key);
		}

		if (errorFields.length > 0)
		{
			setError("Following fields need to be filled: " + errorFields.join(' '));
			return;
		}
		// const body = {name: formState.name, description: formState.description, location: formState.location, date: formState.date, time: formState.time, advisor: formState.advisor};
		
		const formData = new FormData();
		for (const key in formState)
		{
			formData.append(key, formState[key]);
		}

		formData.append('verification', file);

		for (const value of formData.values()) {
			console.log(value);
		}

		createClub.dispatch({body: formData});
	}

	function handleChange(e)
	{
		setFormState((prevState) => ({...prevState, [e.target.name]: e.target.value}));

		if (error) setError('');
	}

	useEffect(() => {
		if (!createClub.loading && !createClub.error)
		{
			navigate('/?submitted=true');
		}
	}, [createClub.loading])
	return (
		<div className="newClub">
			<div className="newClub__text newClub__text--large">Requesting Club</div>
			{error && <div className="newClub__error">{error}</div>}
			<div className="newClub__form">
				<div className="newClub__text">Name</div>
				<input name='name' value={formState.name} className="newClub__input" onChange={handleChange}></input>
				<div className="newClub__text">Description</div>
				<textarea name='description' value={formState.description} className="newClub__input" onChange={handleChange}></textarea>
				<div className="newClub__text">Location</div>
				<input name='location' value={formState.location} className="newClub__input" onChange={handleChange}></input>
				<div className="newClub__text">Date</div>
				<input name='date' value={formState.date} className="newClub__input" onChange={handleChange}></input>
				<div className="newClub__text">Time</div>
				<input name='time' value={formState.time} className="newClub__input" onChange={handleChange}></input>
				<div className="newClub__text">Advisor</div>
				<input name='advisor' value={formState.advisor} className="newClub__input" onChange={handleChange}></input>
				<div className="newClub__text">Verification</div>
				<input name='verification' onChange={(e) => setFile(e.target.files[0])} type="file"/>
			</div>
			<button className="newClub__btn" onClick={submitClub}>Add Club</button>
		</div>
	)

}