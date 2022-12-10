// everything below here is a mess that sometimes works and other times doesn't 
// TODO: REFACTOR EVERYTHING OTNEAUH SONEAUH SOCAUH S,.ACR AHPLEASTNUHS OTNEUHASTN HKTNAEHKS TNAHOET UHATUH TH.UC,HA ,HAC H

import useApi from "../hooks/useApi";
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAuth } from '../contexts/AuthContext';
import { useDropzone } from 'react-dropzone';
import Loading from '../components/Loading';
import './Club.scss';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {arrayToDates} from 'utils/dateUtils';


export default function Club() {
	const { user, authLoading } = useAuth();

	const clubId = useParams().id;

	const [club, setClub] = useState();
	const [clubLoading, setClubLoading] = useState(true);

	const [userClubs, setUserClubs] = useState();

	useEffect(() => {
		axios.get(`/clubs/${clubId}`).then(res => setClub(res.data)).then(() => setClubLoading(false));
	}, [clubId]);

	useEffect(() => {
		if (authLoading) return;
		if (user) axios.get(`/account/${user.uid}/clubs`).then(res => setUserClubs(res.data));
	}, [authLoading, user]);
	
	function isUserRegistered(user, id)
	{
		let registered = false;
		user.clubs.forEach(club => {
			if (club.id === id) 
			{
				registered = true;
			}
		});

		return registered;
	}
	return (
		<>
			{userClubs && <Register userId={user.uid} userClubs={userClubs} clubId={club.id}/>}
			{clubLoading ? <Loading /> : <ClubInfo club={club} />}
		</>
	)
}

function ClubInfo(props) {
	const club = props.club;
	const [editing, setEditing] = useState(false);
	const { user, authLoading } = useAuth();
	
	return (
		<div className="pt-9 px-20">
			<div className="flex flex-col items-center">
				<h2 className="text-4xl font-bold text-neutral-800">{club.name}</h2>
				{!authLoading && user !== null && club.officers.includes(user.uid) && <button className="text-2xl mt-4" onClick={() => setEditing(!editing)}>Edit</button>}
			</div>
			{editing ? <ModifyInfo setEditing={setEditing} club={club} /> : <ReadOnlyInfo club={club} />}
		</div>
	)
}

function conditionalRenderItem(item) {
	if (item.type === 'text') return (<span className="text-2xl">{item.content}</span>)
	if (item.type === 'img-file') return (<img className="mx-auto" width={"400rem"} src={URL.createObjectURL(item.content)} />)
	if (item.type === 'img-link') return (<img className="mx-auto" width={"400rem"} src={`/images/${item.content}`} />);
}

function ModifyInfo(props) {
	const club = props.club;
	const { token, authLoading } = useAuth();

	const updateForm = useApi(`/clubs/${club.id}/info`, 'put', token);

	const [items, setItems] = useState([]);
	const [input, setInput] = useState('');

	const [submitStatus, setSubmitStatus] = useState('');

	function handleOnDragEnd(result) {
		if (result.destination === null) return;

		const itemsClone = Array.from(items);

		const [source] = itemsClone.splice(result.source.index, 1);
		itemsClone.splice(result.destination.index, 0, source);
		setItems(itemsClone);
	}

	async function handleSubmit() {
		setSubmitStatus('Saving...');
		const form = new FormData();
		const payload = [];
		let fileIndex = 0;
		items.forEach((item, index) => {
			if (item.type === 'text' || item.type === 'img-link') payload.push({ type: item.type, content: item.content });
			else if (item.type === 'img-file') {
				form.append(`images[${index}]`, item.content);
				payload.push({ type: item.type, content: fileIndex });
				fileIndex++;
			}
		});

		form.append('items', JSON.stringify(payload));

		await updateForm.dispatch({ body: form });

		props.setEditing(false);
	}

	function addText() {
		const newItems = items.concat([{ type: 'text', content: input, id: uuidv4() }]);
		setItems(newItems);
		setInput('');
	}

	useEffect(() => {
		async function fetch() {
			const data = (await axios.get(`/clubs/${club.id}`)).data.infoFormat;
			const processed = data.map((item) => ({ type: item.type, content: item.content, id: uuidv4() }));

			setItems(processed);
		}
		fetch();

	}, []);

	function deleteItem(index) {
		return () => {
			setItems(items => {
				const nextItems = Array.from(items);
				nextItems.splice(index, 1);

				return nextItems;
			});
		}
	}

	const onDrop = useCallback(acceptedFiles => {
		const processedFiles = acceptedFiles.map((file) => {
			return {
				type: 'img-file',
				content: file,
				id: uuidv4()
			}
		});

		setItems(prevItems => prevItems.concat(processedFiles));
	}, []);

	return (
		<div className="mx-4">
			{submitStatus && <div>{submitStatus}</div>}
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="content">
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef}>
							{items.map((item, index) => {
								return (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided) => (
											<li className="flex gap-2 flex-col items-start" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
												{conditionalRenderItem(item)}
												<button className="text-red-400" onClick={deleteItem(index)}>Delete</button>
											</li>
										)}
									</Draggable>
								)
							})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			<div className='flex flex-col items-center gap-5'>
				<textarea className="border-solid border-2" value={input} onChange={(e) => setInput(e.target.value)} />
				<button className="bg-neutral-300 p-2 rounded-md" onClick={addText}>Add Text Box</button>
				<DropZone onDrop={onDrop} />
				<button className="border border-neutral-400 text-neutral-800 px-5 py-3 rounded-md text-2xl hover:bg-neutral-100 " onClick={handleSubmit}>Save</button>
			</div>
		</div>
	)
}

function DropZone(props) {
	const onDrop = props.onDrop;

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div {...getRootProps({ className: 'border-dashed border-black border-2 p-5 dropzone' })}>
			<input {...getInputProps()} />
			{isDragActive ? <p>Drop here</p> : <p>Drag files or click here</p>}
		</div>
	)
}

function ReadOnlyInfo(props) {
	const club = props.club;
	const [items, setItems] = useState([]);

	useEffect(() => {
		async function fetch() {
			const data = (await axios.get(`/clubs/${club.id}`)).data.infoFormat;

			const processed = data.map((item) => ({ type: item.type, content: item.content }));

			setItems(processed);
		}
		fetch();
	}, [club.id]);

	return (
		<div className="p-6">
			{<InfoDefault club={club}/>}
			<ul>
				{items.map((item, idx) => <li className="mt-4" key={idx}>{conditionalRenderItem(item)}</li>)}
			</ul>

		</div>
	)
}

function InfoDefault(props) {
	const club = props.club;
	return (
		<div className="float-left mr-10 flex flex-col gap-3 bg-neutral-100 px-6 py-3 rounded-lg width w-1/4 text-2xl mb-20">
			<div>{club.description}</div>
			<div>{club.location}</div>
			<div>{arrayToDates(club.dates).join(', ')}</div>
			<div>{club.time}</div>
			<div>{club.advisor}</div>
		</div>
	)
}

// RACE CONDITION CAUSED BY TRYING TO GET USER.UID BUT NO CHECK ON IT

function Register(props) {
	const [registered, setRegistered] = useState(props.userClubs.includes(props.clubId))

	function handleRegister() {
		axios.post(`/account/${props.userId}/clubs`, {clubId: props.clubId}).then(() => setRegistered(true));
	}

	if (registered) return <div>Already registered</div>
	else return <button onClick={handleRegister}>Register</button>
}