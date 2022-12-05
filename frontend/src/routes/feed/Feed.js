import React, {useState, useEffect} from 'react';
import useApi from '../../hooks/useApi';
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from 'contexts/AuthContext';

import './Feed.scss'
import axios from 'axios';
export default function Feed()
{
	const getFeed = useApi('/feed');
	const [feed, setFeed] = useState();

	const {user, authLoading} = useAuth();

	useEffect(() => {getFeed.dispatch({populate: setFeed})}, []);

	function handleDelete(id) {
		axios.delete(`/feed/${id}`).then(setFeed(prevFeed => prevFeed.filter(post => post.id !== id)));
	}

	return (
		<div className="pt-10 px-10">
			<div className="text-center text-4xl">Recent Club Activities...</div>
			<Link to='newpost'><div className="text-2xl text-center mt-5 text-green-500">Add new post</div></Link>
			{!getFeed.loading && feed.map(post => 
				<Post key={post.id} post={post} isAuthor={authLoading || user === null ? false : (user.uid === post.author.id)} handleDelete={handleDelete}/>
			)}
		</div>
	)
}

function Post(props)
{
	const [showOptions, setShowOptions] = useState(false);

	const post = props.post;
	return (
		<div className="border-solid border bg-neutral-100 rounded-md w-2/5 mx-auto my-5 px-10 pb-10 pt-2 break-words">
			<button onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)} className="float-right text-xl">
				...{showOptions && <PostOptions isAuthor={props.isAuthor} id={post.id} handleDelete={props.handleDelete}/>}
			</button>
			<div className='mt-7 mb-5'>
				<Link to={`${post.id}`} className="text-xl font-bold">{post.title}</Link>
				<div className="text-sm">by {<Link to={`/account/${post.author.id}`}>{post.author.username}</Link>} for {post.club ? <Link to={`/club/${post.club.id}`}>{post.club.name}</Link> : "DELETED CLUB"}</div>
			</div>
			<div className="text-xl mb-5">{props.post.body}</div>
			{post.file && <img className="mx-auto" alt="post" width={'400rem'} src={`/images/${post.file}`}/>}
		</div>
	)
}

function PostOptions(props)
{
	const shareLink = `${window.location.href}/${props.id}`;
	
	return (
		<div className='absolute border border-neutral-800 bg-white text-neutral-800 p-1 rounded-sm'>
			<button className='p-1 block w-full hover:bg-neutral-200' onClick={() => {navigator.clipboard.writeText(shareLink)}}>Share</button>
			{props.isAuthor && 
				<>
					<button className='p-1 block w-full hover:bg-neutral-200'>Edit</button>
					<button className='p-1 block w-full text-red-600 hover:bg-red-600 hover:text-white' onClick={() => props.handleDelete(props.id)}>Delete</button>
				</>
			}
		</div>
	)

}