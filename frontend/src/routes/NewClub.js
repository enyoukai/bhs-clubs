import useApi from '../hooks/useApi';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

import { useAuth } from '../contexts/AuthContext'

import './NewClub.scss';

export default function NewClub() {
	// TODO: make a reducer later
	const [formState, setFormState] = useState({name: '', description: '', location: '', date: '', time: '', advisor: '', verification: null});

	const [error, setError] = useState('');

	const {token} = useAuth();

	const createClub = useApi('/clubs', 'post', token);

	const navigate = useNavigate();

	function capitalizeFirstLetter(str)
	{
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	async function submitClub(e) {
		e.preventDefault();
		const errorFields = [];

		for (const [key, value] of Object.entries(formState))
		{
			if (!value) {
				errorFields.push(key);
			}
		}

		if (errorFields.length > 0)
		{
			let errorMessage = "Following fields need to be filled: "; 
			for (let i = 0; i < errorFields.length; i++)
			{
				errorMessage += capitalizeFirstLetter(errorFields[i]);
				if (i !== errorFields.length - 1) errorMessage += ", "
			}
			setError(errorMessage);

			return;
		}
		
		const formData = new FormData();
		for (const key in formState)
		{
			formData.append(key, formState[key]);
		}

		formData.append('verification', formState.file);

		createClub.dispatch({body: formData});
	}

	function handleTextChange(e)
	{
		setFormState((prevState) => ({...prevState, [e.target.name]: e.target.value}));

		if (error) setError('');
	}

	function handleDrop(files)
	{
		setFormState((prevState) => ({...prevState, ['verification']: files[0]}));
	}

	useEffect(() => {
		if (!createClub.loading && !createClub.error)
		{
			navigate('/?submitted=true');
		}
	}, [createClub.loading, createClub.error, navigate])

	return (
		<div className="bg-neutral-800 mx-auto w-1/2 rounded-lg p-20 my-10 text-neutral-100 text-4xl">
			<div className="text-6xl text-center mb-20">Requesting Club</div>
			{error && <div className="text-red-500 my-4 text-base">* {error}</div>}
			<form onSubmit={submitClub} className="flex flex-col gap-8">
				<div className="newClub__text">Name</div>
				<input name='name' value={formState.name} className="newClub__input" onChange={handleTextChange}></input>
				<div className="newClub__text">Description</div>
				<textarea name='description' value={formState.description} className="newClub__input" onChange={handleTextChange}></textarea>
				<div className="newClub__text">Location</div>
				<input name='location' value={formState.location} className="newClub__input" onChange={handleTextChange}></input>
				<div className="newClub__text">Date</div>
				<input name='date' value={formState.date} className="newClub__input" onChange={handleTextChange}></input>
				<div className="newClub__text">Time</div>
				<input name='time' value={formState.time} className="newClub__input" onChange={handleTextChange}></input>
				<div className="newClub__text">Advisor</div>
				<input name='advisor' value={formState.advisor} className="newClub__input" onChange={handleTextChange}></input>
				<div className="newClub__text">Verification</div>
				<DropZone currentImg={formState.verification} onDrop={handleDrop}/>
				<button type="submit" className="mt-4 text-4xl text-neutral-800 bg-neutral-100 p-6 rounded-lg font-medium">Add Club</button>
			</form>
		</div>
	)

}

function DropZone(props) {
	const onDrop = props.onDrop;

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div {...getRootProps({ className: 'border-dotted border-2 p-5 dropzone text-neutral-100' })}>
			<input {...getInputProps()} />
			{props.currentImg ? <img className='mx-auto' src={URL.createObjectURL(props.currentImg)}/> : <p>Drag file here</p>}
		</div>
	)
}