import React, {useState, useEffect} from 'react';
import useApi from '../../hooks/useApi';
import {Link} from 'react-router-dom';

import './Feed.scss'
export default function Feed()
{
	const getFeed = useApi('/feed');
	const [feed, setFeed] = useState();

	useEffect(() => {getFeed.dispatch({populate: setFeed})}, []);

	return (
		<div className="pt-10 px-10">
			<div className="text-center text-4xl">Recent Club Activities...</div>
			<Link to='newpost' className="text-2xl">Add new post</Link>
			{!getFeed.loading && feed.map(post => <Post key={post.id} post={post}/>)}
		</div>
	)
}

function Post(props)
{
	const post = props.post;
	return (
		<div className="flex flex-col gap-8 border-solid border bg-neutral-100 rounded-md w-2/5 mx-auto my-5 p-10">
			<div>
				<Link to={`${post.id}`} className="text-xl font-bold">{post.title}</Link>
				<div className="text-sm">by {<Link to={`/account/${post.author}`}>{post.author}</Link>} for {post.club ? <Link to={`/club/${post.club.id}`}>{post.club.name}</Link> : "DELETED CLUB"}</div>
			</div>
			<div className="text-xl">{props.post.body}</div>
			{post.file && <img className="mx-auto" width={'400rem'} src={`/images/${post.file}`}/>}
		</div>
	)
}