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

export default function Club() {
	const clubID = useParams().id;
	const [club, setClub] = useState();
	const getClub = useApi('/clubs');
	const { signInFetched } = useAuth();

	useEffect(() => {
		getClub.dispatch({ params: `/${clubID}`, populate: setClub });
	}, [clubID]);

	return (
		<>
			{getClub.loading ? <Loading /> : <ClubInfo club={club} />}
		</>
	)
}

function ClubInfo(props) {
	const club = props.club;
	const [editing, setEditing] = useState(false);
	const { user, signInFetched } = useAuth();

	return (
		<div className="clubInfo">
			<div className="clubInfo__text clubInfo__text--large">{club.name}</div>
			{signInFetched && user !== null && club.uid === user.uid && <button onClick={() => setEditing(!editing)}>Edit</button>}
			{editing ? <ModifyInfo setEditing={setEditing} club={club} /> : <ReadOnlyInfo club={club} />}
		</div>
	)
}

function conditionalRenderItem(item) {
	if (item.type === 'text') return (<span>{item.content}</span>)
	if (item.type === 'img-file') return (<img width={"400rem"} src={URL.createObjectURL(item.content)} />)
	if (item.type === 'img-link') return (<img width={"400rem"} src={`/images/${item.content}`} />);
}

function ModifyInfo(props) {
	const club = props.club;
	const { token, signInFetched } = useAuth();

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
		<div>
			{submitStatus && <div>{submitStatus}</div>}
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="content">
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef}>
							{items.map((item, index) => {
								return (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided) => (
											<li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
												{
													conditionalRenderItem(item)
												}
												<button onClick={deleteItem(index)}>delete</button>
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
			<textarea value={input} onChange={(e) => setInput(e.target.value)} />
			<br />
			<button onClick={addText}>add</button>
			<br />
			<DropZone onDrop={onDrop} />
			<button onClick={handleSubmit}>submit</button>
		</div>
	)
}

function DropZone(props) {
	const onDrop = props.onDrop;

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div {...getRootProps({ className: 'dropzone' })}>
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

	}, []);

	return (
		<div>
			<ul>
				{items.map((item, idx) => <li key={idx}>{conditionalRenderItem(item)}</li>)}
			</ul>
		</div>
	)
}

function InfoFallback(props) {
	const club = props.club;
	return (
		<div>
			<div>{club.description}</div>
			<div>{club.location}</div>
			<div>{club.date}</div>
			<div>{club.time}</div>
			<div>{club.advisor}</div>
		</div>
	)
}