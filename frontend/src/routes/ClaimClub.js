
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import DropZone from 'components/DropZone';

import './NewClub.scss';
import axios from 'axios';


export default function NewClub() {
	const [club, setClub] = useState();
	const [clubLoading, setClubLoading] = useState(true);

	const [verification, setVerification] = useState();

	const { id: clubId } = useParams();

	useEffect(() => {
		axios.get(`/clubs/${clubId}`).then(res => setClub(res.data)).then(() => setClubLoading(false));
	}, [clubId]);

	const navigate = useNavigate();

	async function submitClub(e) {
		e.preventDefault();

		const formData = new FormData();

		formData.append('verification', verification);

		axios.post(`/clubs/${clubId}/claims`, formData).then(() => navigate('/'));
	}

	function handleDrop(files) {
		setVerification(files[0]);
	}

	return (
		<>
			{!clubLoading && <div className="bg-neutral-800 mx-auto w-1/2 rounded-lg p-20 my-10 text-neutral-100 text-4xl">
				<div className="text-center mb-10">Registering as Owner of {club.name}</div>
				<form onSubmit={submitClub} className="flex flex-col gap-4">
					<div className="text-2xl">Verification</div>
					<DropZone currentImg={verification} onDrop={handleDrop} />
					<button type="submit" className="mt-4 text-4xl text-neutral-800 bg-neutral-100 p-6 rounded-lg font-medium">Claim</button>
				</form>
			</div>}
		</>
	)
}

