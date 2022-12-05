import useApi from '../hooks/useApi';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

import { useAuth } from '../contexts/AuthContext'

import './NewClub.scss';

function capitalizeFirstLetter(str)
{
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function NewClub() {
	// TODO: make a reducer later
	const [formState, setFormState] = useState({name: '', description: '', location: '', dates: [], time: '', advisor: '', tags: {service: false, academic: false, educational: false, misc: false }, verification: null});

	const [error, setError] = useState('');

	const {token} = useAuth();

	const createClub = useApi('/clubs', 'post', token);

	const navigate = useNavigate();

	async function submitClub(e) {
		e.preventDefault();
		const errorFields = [];

		for (const [key, value] of Object.entries(formState))
		{
			if (!value || (Array.isArray(value) && value.length === 0)) {
				errorFields.push(key);
			}
		}

		if (errorFields.length > 0)
		{
			let errorMessage = "Following fields need to be filled: "; 
			errorMessage += errorFields.map(field => capitalizeFirstLetter(field)).join(', ');
			setError(errorMessage);

			return;
		}
		
		const formData = new FormData();
		for (const key in formState)
		{
			formData.append(key, JSON.stringify(formState[key]));
		}

		formData.append('verification', formState.verification);

		createClub.dispatch({body: formData, headers: {'Content-Type': 'multipart/form-data'}});
	}

	function handleTextChange(e)
	{
		setFormState((prevState) => ({...prevState, [e.target.name]: e.target.value}));

		if (error) setError('');
	}

	function handleDateChange(dates) {
		const newDateState = [];

		dates.forEach((isSelected, day) => isSelected && newDateState.push(day))

		setFormState((prevState) => ({...prevState, dates: newDateState}));

		if (error) setError('');
	}

	function handleDrop(files)
	{
		setFormState((prevState) => ({...prevState, verification: files[0]}));
	}

	function handleTagChange(tag) {
		setFormState((prevState) => {
			const newTagState = prevState.tags;
			newTagState[tag] = !newTagState[tag];
			
			return {...prevState, tags: newTagState};
 		});
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
				<div className="newClub__text">Days</div>
				<DatePicker dateHandler={handleDateChange}/>
				{/* <input name='date' value={formState.date} className="newClub__input" onChange={handleTextChange}></input> */}
				<div className="newClub__text">Time</div>
				<input name='time' value={formState.time} className="newClub__input" onChange={handleTextChange}/> 
				<div className="newClub__text">Advisor</div>
				<input name='advisor' value={formState.advisor} className="newClub__input" onChange={handleTextChange}></input>
				<div className="newClub__text">Tags</div>
				<TagPicker tags={formState.tags} handleTagChange={handleTagChange}/>
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
			{props.currentImg ? <img className='mx-auto' alt='verification' src={URL.createObjectURL(props.currentImg)}/> : <p>Drag file here</p>}
		</div>
	)
}

// LIFT THIS STATE UP
function DatePicker(props) {
	const {dateHandler} = props;
	const [selectedDates, setSelectedDates] = useState(Array.apply(null, Array(7)).map(() => false));
 
	function toggleDate(date) {
		return () => {
			setSelectedDates((prevDates) => {
				const cloneDates = Array.from(prevDates);
				cloneDates[date] = !cloneDates[date];

				return cloneDates;
			});
		}
	}

	useEffect(() => dateHandler(selectedDates), [selectedDates]);

	return (
		<div className="grid grid-cols-7 text-center gap-4">
			<button type="button" onClick={toggleDate(0)} className={`border rounded-md ease-in-out duration-300 ${selectedDates[0] ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>S</button>
			<button type="button" onClick={toggleDate(1)} className={`border rounded-md ease-in-out duration-300 ${selectedDates[1] ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>M</button>
			<button type="button" onClick={toggleDate(2)} className={`border rounded-md ease-in-out duration-300 ${selectedDates[2] ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>T</button>
			<button type="button" onClick={toggleDate(3)} className={`border rounded-md ease-in-out duration-300 ${selectedDates[3] ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>W</button>
			<button type="button" onClick={toggleDate(4)} className={`border rounded-md ease-in-out duration-300 ${selectedDates[4] ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>T</button>
			<button type="button" onClick={toggleDate(5)} className={`border rounded-md ease-in-out duration-300 ${selectedDates[5] ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>F</button>
			<button type="button" onClick={toggleDate(6)} className={`border rounded-md ease-in-out duration-300 ${selectedDates[6] ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>S</button>
		</div>
	)
}

function TagPicker(props)
{
	return (
		<div>
			{Object.entries(props.tags).map(([tag, value]) => 
				<button onClick={() => props.handleTagChange(tag)} className={`block border p-5 rounded-md w-full mb-5 text-left ease-in-out duration-300 ${value ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-800 text-neutral-100' }`}>
					{capitalizeFirstLetter(tag)}	
				</button>
			
			)}
		</div>
	)
}

function TimePicker(props)
{
	return (
		<div>
			<input/>
			<input/>

		</div>
	)

}