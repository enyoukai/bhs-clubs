import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

import './Feed.scss'
import axios from 'axios';

export default function Feed() {
	const [feed, setFeed] = useState();
	const [feedLoading, setFeedLoading] = useState(true);
	const { user, authLoading } = useAuth();

	const [filterByClubsIn, setFilterByClubsIn] = useState(false);

	useEffect(() => {
		axios.get('/feed').then(res => setFeed(res.data)).then(() => setFeedLoading(false));
	}, []);

	function handleDelete(id) {
		axios.delete(`/feed/${id}`).then(setFeed(prevFeed => prevFeed.filter(post => post.id !== id)));
	}

	function handleSave(postId, body) {
		return axios.patch(`/feed/${postId}`, { body: body }).then(setFeed(prevFeed => {
			prevFeed.forEach((post) => {
				if (post.id !== postId) return;
				post.body = body;
			});

			return prevFeed;
		}));
	}

	function filterByIn() {
		if (!filterByClubsIn || !user) return feed;

		return feed.filter(post => {
			// TODO: CHANGE THIS TO NOT RELY ON OVERFETCHING
			if (!post.club) return false;

			return post.club.officers.includes(user.uid) || post.club.members.includes(user.uid);
		})
	}

	const filteredFeed = filterByIn(feed);

	console.log(filteredFeed);
	return (
		<div className="pt-10 px-10">
			<div className="text-center text-4xl font-semibold text-neutral-900">Recent Club Activities...</div>
			<div className='flex justify-between mt-5'>
				{user && <button onClick={() => setFilterByClubsIn(prevSetting => !prevSetting)} className={`ease-in-out duration-300 mx-auto border border-neutral-800 p-2 rounded-lg ${filterByClubsIn && 'bg-neutral-700 text-neutral-200'}`}>My Clubs</button>}
			</div>
			<Link to='newpost'><div className="text-2xl text-center mt-5 text-green-500 font-semibold">Add new post</div></Link>
			{!feedLoading && filteredFeed.map(post =>
				<Post key={post.id} post={post} isAuthor={authLoading || user === null ? false : (user.uid === post.author.id)} handleDelete={handleDelete} handleSave={handleSave} />
			)}
		</div>
	)
}

function Post(props) {
	const [showOptions, setShowOptions] = useState(false);
	const [editingBody, setEditingBody] = useState(props.post.body);
	const [editing, setEditing] = useState(false);

	const post = props.post;

	function toggleEdit() {
		setEditing(prevEdit => {
			if (!prevEdit) setEditingBody(post.body);
			return !prevEdit
		});
	}

	function handleSave() {
		props.handleSave(post.id, editingBody).then(setEditing(false));
	}

	return (
		<div className="border-solid border bg-neutral-100 rounded-md w-2/5 mx-auto my-5 px-10 pb-10 pt-2 break-words">
			<div onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)} className="float-right text-xl">
				...{showOptions && <PostOptions isAuthor={props.isAuthor} id={post.id} handleDelete={props.handleDelete} handleEdit={toggleEdit} />}
			</div>
			<div className='mt-7 mb-5'>
				<Link to={`${post.id}`} className="text-xl font-bold">{post.title}</Link>
				<div className="text-sm ">by {<Link to={`/account/${post.author.id}`}>{post.author.username}</Link>} for {post.club ? <Link to={`/club/${post.club.id}`}>{post.club.name}</Link> : "DELETED CLUB"}</div>
			</div>
			{editing ? <textarea value={editingBody} onChange={e => setEditingBody(e.target.value)} className="text-xl mb-8 rounded-md border h-36 border-neutral-400 w-full p-2 resize-none" /> : <div className="whitespace-pre-wrap">{post.body}</div>}
			{post.file && <img className="mx-auto mt-5" alt="post" width={'400rem'} src={`/images/${post.file}`} />}
			{editing &&
				<div className='flex items-center justify-between'>
					{editing && <button className='block text-xl bg-neutral-900 px-20 py-3 rounded-xl text-neutral-100 font-medium' onClick={handleSave}>Save</button>}
					<button onClick={toggleEdit} className='border rounded-xl text-xl font-medium my-auto px-10 py-3 border-neutral-700'>Cancel</button>
				</div>
			}
		</div>
	)
}

function PostOptions(props) {
	const shareLink = `${window.location.href}/${props.id}`;
	const [copied, setCopied] = useState(false);
	const [copyInterval, setCopyInterval] = useState();

	function handleCopy() {
		navigator.clipboard.writeText(shareLink);
		if (copyInterval) clearInterval(copyInterval);

		setCopied(true);
		setCopyInterval(setInterval(() => {
			setCopied(false);
		}, 1000));
	}

	return (
		<div className='absolute border border-neutral-800 bg-white text-neutral-800 p-1 rounded-sm'>
			<button className='p-1 block w-full hover:bg-neutral-200' onClick={handleCopy}>{copied ? 'Copied!' : 'Share'}</button>
			{props.isAuthor &&
				<>
					<button className='p-1 block w-full hover:bg-neutral-200' onClick={props.handleEdit}>Edit</button>
					<button className='p-1 block w-full text-red-600 hover:bg-red-600 hover:text-white' onClick={() => props.handleDelete(props.id)}>Delete</button>
				</>
			}
		</div>
	)

}