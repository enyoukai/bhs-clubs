import API from '../api/API'

import React, { useState, useEffect } from 'react';
import { Club } from '../api/API'
import { useNavigate } from "react-router-dom";

import { useAuth } from '../contexts/AuthContext'

import styles from './NewClub.module.css';

export default function NewClub() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [day, setDay] = useState('');
	const [time, setTime] = useState('');
	const [advisor, setAdvisor] = useState('');

	const navigate = useNavigate();

	const auth = useAuth();

	function submitClub() {
		const club = new Club(name, description, location, day, time, advisor);
		API.createClub(club);
		navigate('/');
	}

	return (
		<div class>
			<div>Add New Club</div>
			<div>Name</div>
			<input onChange={e => setName(e.target.value)}></input>
			<div>Description</div>
			<input onChange={e => setDescription(e.target.value)}></input>
			<div>Location</div>
			<input onChange={e => setLocation(e.target.value)}></input>
			<div>Day</div>
			<input onChange={e => setDay(e.target.value)}></input>
			<div>Time</div>
			<input onChange={e => setTime(e.target.value)}></input>
			<div>Advisor</div>
			<input onChange={e => setAdvisor(e.target.value)}></input>
			<button onClick={submitClub}>Add Club</button>
		</div>
	)

}